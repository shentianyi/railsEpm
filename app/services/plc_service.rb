class PlcService
  def self.post_data params

    kpi= Kpi.find_by_name('First')
    codes=params[:codes].split(',')
    values=params[:values].split(',')

    codes.each_with_index do |k, i|

      entity=Entity.find_by_code(k)

      KpiEntry.create(
          entry_type: 0,
          kpi_id: kpi.id,
          entry_at: Time.now,
          entity_id: entity.id,
          value: values[i],
          abnormal: false,
          target_max: 100,
          target_min: 10,
          frequency: kpi.frequency
      )

      if entity.is_last

        department=entity.department.parent

        if plan=ProductionPlan.where(product_line: department.name,
                                     date: Date.today.to_time.utc).where('produced<=planned').order('id asc').limit(1).first
          plan.update_attributes(produced: plan.produced+1)
        end

      end
    end
  end


  def self.get_plan params
    data=[]
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
      elsif rest>=p.trigger_min && rest<=p.trigger_max
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