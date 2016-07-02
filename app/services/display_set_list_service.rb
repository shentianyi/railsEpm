class DisplaySetListService

  def self.create_lists params, user
    p_ids=[]
    DisplaySetList.transaction do
      params[:product_line_data].each do |p|
        if p.last[:status]=='true'
          p_ids<<p.last[:id].to_i
        end
      end

      puts params[:start_time].to_date
      puts params[:end_time].to_date
      params[:start_time].to_date.upto(params[:end_time].to_date).each do |date|
        if DisplaySetList.find_by_name(date)
        else
          list=DisplaySetList.new(name: date)
          list.user=user

          p_ids.uniq.each do |id|
            if department=Department.find_by_id(id)
              item=DisplaySetItem.new()
              item.department=department
              list.display_set_items<<item
            end
          end

          list.save
        end
      end
    end
  end

  def self.display_product_line date,remark='Default'
    data=[]
if remark.blank?
  remark='Default'
end
    Department.where(is_product_line: true).each do |d|
      data<<{
          id: d.id,
          cn_name: d.cn_name,
          status: false
      }
    end

    if dsl=  DisplaySetList.where(name:date,remark: remark).first
      dsl.display_set_items.each do |item|
        data.each do |i|
          if i[:id]==item.department_id
            i[:status]=true
          end
        end
      end
    end

    data
  end

  def self.set_product_line date, id, status,remark='Default'
    unless date.blank?
      list=DisplaySetList.where(name:date,remark: remark).first
      DisplaySetList.transaction do
        if list
          item=list.display_set_items.where(department_id: id).first
          if item && !status
            item.destroy
          elsif !item && status
            item=DisplaySetItem.new(department_id: id, display_set_list_id: list.id)
            item.save
          end
        else
          list=DisplaySetList.new(name: date,remark:remark)
          if list.save
            if status
              item=DisplaySetItem.new(department_id: id, display_set_list_id: list.id)
              item.save
            end
          end
        end
      end
    end
  end

end