class EntryService
  def self.create_entry params, user
    validate_entry(params, user)
  end

  def self.get_entry_chart_data params, user
    validate_get_data(params, user) do |params|
      Query::QueryService.query(params, Query::QueryService::CHART)
    end
  end

  def self.get_entry_chart_aggregate_data params, user
    validate_get_data(params, user) do |params|
      Query::QueryService.query(params, Query::QueryService::CHART_AGGREGATE)
    end
  end


  private
  def self.validate_entry(params, user)
    kpi=nil
    department=nil

    base_fields={id: params[:data][:entry_id],
                 original_value: params[:data][:data][:value],
                 entry_at: params[:data][:data][:time],
                 entry_type: 0}
    unless params[:task_item_id].blank?
      if task_item=Task::EntryItem.find_by_id(params[:task_item_id])
        base_fields[:task_item_id]=task_item
        user_kpi_item=task_item.taskable
        if user_kpi_item.present?
          params[:data][:data][:time]=task_item.entry_at
          kpi=user_kpi_item.kpi
          department=user_kpi_item.department
        end
      end
    else
      kpi=Kpi.find_by_id(params[:data][:kpi_id])
      department=Department.find_by_id(params[:data][:department_id])
    end

    if kpi.present? && department.present?
      if item=user.user_kpi_items.where(kpi_id: kpi.id, department_id: department.id).first
        KpiEntryPresenter.new(update_create_entry({base_attrs: {id: params[:data][:entry_id],
                                                                task_item_id:params[:task_item_id],
                                                                original_value: params[:data][:data][:value],
                                                                kpi_id: kpi.id,
                                                                frequency: kpi.frequency,
                                                                user_kpi_item_id: item.id,
                                                                user_id: user.id,
                                                                department_id: department.id,
                                                                entity_id: department.default_entity.id,
                                                                target_max: kpi.target_max,
                                                                target_min: kpi.target_min,
                                                                entry_at: params[:data][:data][:time],
                                                                entry_type: 0},
                                                   properties: params[:data][:data][:attributes],
                                                   kpi: kpi
                                                  })).as_kpi_basic_feedback(['Entry Success'], 1)
      else
        ApiMessage.new(messages: ['Kpi not Assigned'])
      end
    else
      ApiMessage.new(messages: ['Kpi or Department no found'])
    end
  end


  def self.update_create_entry(entry)
    attrs = {}
    attrs = attrs.merge(entry[:base_attrs])
    kpi = entry[:kpi]
    if entry[:properties].present?
      ids=kpi.kpi_properties.pluck(:id)

      entry[:properties].each do |property|
        attrs["a#{property[:attribute_id]}"] = property[:attribute_value] if ids.include?(property[:attribute_id].to_i)
      end
    end
    #update
    if entry[:id].present? && (kpi_entry=KpiEntry.find(entry[:id]))
      kpi_entry.update_attributes(attrs)
    else
      kpi_entry = KpiEntry.new(attrs)
      kpi_entry.save
    end
    kpi_entry
  end


  def self.validate_get_data params, user
    # TODO Query Data Right about KPI & DEPARTMENT

    if params[:follow_id].present?
      if item=user.kpi_subscribes.where(id: params[:follow_id]).first
        params[:kpi_subscribe]=item
        params[:kpi]=item.kpi
        params[:department]=item.department
      else
        return ApiMessage.new(messages: ['Follow ID not found'])
      end
    else
      if (kpi=Kpi.find_by_id(params[:kpi_id])) && (department=Department.find_by_id(params[:department_id]))
        params[:kpi]=kpi
        params[:department]=department

      else
        return ApiMessage.new(messages: ['KPI or Department not found'])
      end
    end


    yield(params) if block_given?
  end
end