class DisplaySetListService

  def self.create_lists params, user
    p_ids=[]
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