class PlcService
  def self.post_data params

    kpi= Kpi.first#find_by_name(Settings.app.kpi)
    codes=params[:codes].split(',')
    values=params[:values].split(',')

    codes.each_with_index do |k, i|

      p '-----------------------------------------'
      p k
      p '-----------------------------------------'
      entity=Entity.find_by_code(k)
      break if entity.blank?
      max=kpi.target_max
      min=kpi.target_max

      if entity
        if user= entity.users.first
          if item=user.user_kpi_items(kpi_id: kpi.id).first
            max=item.target_max
            min=item.target_min
          end
        end
      end

      v=values[i].to_f/1000


      return if v<1.5
      time=Time.parse(params[:time])


      if entity.is_last

        department=entity.department.parent
        ProductionPlan.transaction do
          if plan=ProductionPlan.where(product_line: department.cn_name,
                                       date: time.to_date.to_time.utc).where('produced<planned').order('`index` asc').limit(1).first
            qty=plan.produced
            plan.update_attributes(produced: qty+1)
          end
          #ProductionPlan.where(product_line:department.name,date:Date.today.to_time.utc).where('produced<=planned')
        end
      end


      return if v>(3*max)

      KpiEntry.create(
          entry_type: 0,
          kpi_id: kpi.id,
          entry_at: time.utc,
          entity_id: entity.id,
          original_value: v,
          value: v,
          abnormal: false,
          target_max: max,
          target_min: min,
          frequency: kpi.frequency,
          exception: v>max || v<min,
          a1: (v>max || v<min) ? 'YES' : 'NO'
      )

    end


  end


  def self.get_plan params
    data=[]

    # kv={'滚筒内装配线' => 'Drum Assembly Line',
    #     '滚筒箱体线' => 'Cabinet Assembly Line',
    #     '滚筒总装线' => 'Main Assembly Line', '滚筒包装线' => 'Packaging Line'}


    ProductionPlan.where(date: params[:date].utc,
                         product_line: params[:product_line]).each do |p|
      data<<{
          Id: p.id,
          Assembly: p.assembly,
          Prod_Line: p.product_line,
          Planned: p.planned,
          Produced: p.produced,
          Rest: p.planned-p.produced,
          Status: self.get_status(p)
      }
    end

    if data.length>0
      max_date=ProductionPlan.where('date>?', params[:date].utc).where(product_line: params[:product_line])
                   .order('`date` asc').first

      ProductionPlan.where(date: max_date.date,
                           product_line: params[:product_line]).each do |p|
        data<<{
            Id: p.id,
            Assembly: p.assembly,
            Prod_Line: p.product_line,
            Planned: p.planned,
            Produced: p.produced,
            Rest: p.planned-p.produced,
            Status: self.get_status(p)
        }
      end

    end


    ApiMessage.new({
                       meta: {
                           code: 200
                       },
                       data: data
                   })
  end

  def self.get_status p
    rest=p.planned-p.produced
    if p.is_confirmed
      '已确认'
    else
      if p.planned==p.produced
        '生产完'
      elsif rest<=p.trigger_max
        '警报'
      elsif p.produced>0
        '生产中'
      else
        '等待'
      end
    end
  end

  def self.confirm_plan params
    ProductionPlan.where(id: params[:ids].split(',')).update_all(is_confirmed: true)
    # if plan=ProductionPlan.find_by_id(params[:ids])
    #   plan.update_attributes(is_confirmed: true)
    # end
  end

end
