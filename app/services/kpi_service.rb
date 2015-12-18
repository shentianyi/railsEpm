class KpiService
  def self.building(params, user)
    puts params
    Kpi.transaction do
      #Create Kpi
      kpi = Kpi.new({
                        name: params[:kpi][:kpi_name],
                        description: params[:kpi][:description],
                        target_max: params[:kpi][:target_max],
                        target_min: params[:kpi][:target_min],
                        unit: params[:kpi][:uom],
                        viewable: params[:kpi][:viewable][:viewable_code],
                        calculate_method: params[:kpi][:calculate_method]
                        # user_group_id: params[:kpi][:viewable][:user_group_id]
                    })
      kpi.creator = user
      kpi.tenant = user.tenant
      kpi.user_group = UserGroup.find_by_id(params[:kpi][:viewable][:user_group_id])

      #kpi_properties
      params[:kpi][:attributes].each do |attr|
        if attr[:attribute_id].blank?
          property = KpiProperty.new(:name => attr[:attribute_name], :type => Kpi::KpiPropertyType.code(attr[:attribute_type]))
          property.user = user
          property.tenant = user.tenant
          kpi.kpi_properties<<property
        else
          property = KpiProperty.find_by_id(attr[:attribute_id])
          if property && ((property.name != attr[:attribute_name]) || (property.type != attr[:attribute_type]))
            property.update_attributes({:name => attr[:attribute_name], :type => Kpi::KpiPropertyType.code(attr[:attribute_type])})
          end
        end
      end


      if kpi.kpi_category.blank?
        kpi.kpi_category=user.tenant.kpi_categories.first
      end

      if kpi.save
        ##assign
        params[:assignments].each do |assignment|
          if ((to_user = user.tenant.users.find_by_email(assignment[:user])) && (department = Department.find_by_id(assignment[:department_id])))
            KpisHelper.assign_kpi_to_department_user(kpi, to_user, department, assignment)
          end
        end

        #task
        #TODO
      else
        puts '-------------------------------------'
        puts kpi.errors.to_json
        puts '-------------------------------------'
        return ApiMessage.new(messages: ['Kpi Created Error'])
      end
    end

    ApiMessage.new(result_code: 1, messages: ['Kpi Create Success'])
  end


  def self.updating(params, user, kpi)
    puts params
    Kpi.transaction do
      puts "update---------------------------------------------------------------------"
      kpi.update_attributes({
                                name: params[:kpi][:kpi_name],
                                description: params[:kpi][:description],
                                target_max: params[:kpi][:target_max],
                                target_min: params[:kpi][:target_min],
                                unit: params[:kpi][:uom],
                                viewable: params[:kpi][:viewable][:viewable_code],
                                calculate_method: params[:kpi][:calculate_method]
                                # user_group_id: params[:kpi][:viewable][:user_group_id]
                            })
      kpi.user_group = UserGroup.find_by_id(params[:kpi][:viewable][:user_group_id])

      #kpi_properties
      #delete
      p_ids =[]
      params[:kpi][:attributes].each { |attr| p_ids<< attr[:attribute_id] unless attr[:attribute_id].blank? }
      puts '---------------------------------------------------------'
      puts p_ids
      d_p_ids = kpi.kpi_properties.pluck(:id) - p_ids.uniq
      puts d_p_ids
      puts '---------------------------------------------------------'
      d_p_ids.each do |i|
        KpiProperty.find_by_id(i).destroy
      end

      #new update
      params[:kpi][:attributes].each do |attr|
        if attr[:attribute_id].blank?
          property = KpiProperty.new(:name => attr[:attribute_name], :type => Kpi::KpiPropertyType.code(attr[:attribute_type]))
          property.user = user
          property.tenant = user.tenant
          kpi.kpi_properties<<property
        else
          property = KpiProperty.find_by_id(attr[:attribute_id])
          if property && ((property.name != attr[:attribute_name]) || (property.type != attr[:attribute_type]))
            property.update_attributes({:name => attr[:attribute_name], :type => Kpi::KpiPropertyType.code(attr[:attribute_type])})
          end
        end
      end

      #assign
      #delete
      a_ids =[]
      params[:assignments].each { |assign| a_ids<< assign[:assignment_id] unless assign[:assignment_id].blank? }
      puts '---------------------------------------------------------'
      puts a_ids
      d_a_ids = UserKpiItem.where(kpi_id: kpi.id).pluck(:id) - a_ids.uniq
      puts d_a_ids
      puts '---------------------------------------------------------'
      d_a_ids.each do |i|
        UserKpiItem.find_by_id(i).destroy
      end

      # if kpi.save
      #assign new update
      params[:assignments].each do |assignment|
        if ((to_user = user.tenant.users.find_by_email(assignment[:user])) && (department = Department.find_by_id(assignment[:department_id])))
          if assignment[:assignment_id].blank?
            KpisHelper.assign_kpi_to_department_user(kpi, to_user, department, assignment)
          else
            UserKpiItem.find_by_id(assignment[:assignment_id]).update_attributes({
                                                                                     user_id: to_user.id,
                                                                                     department_id: department.id,
                                                                                     target_max: kpi.target_max,
                                                                                     target_min: kpi.target_min,
                                                                                     remind_time: assignment[:time],
                                                                                     frequency: assignment[:frequency]
                                                                                 })
          end
        end
      end

      #task
      #TODO
      # else
      #   return ApiMessage.new(messages: ['Kpi Update Error'])
      # end
    end

    ApiMessage.new(result_code: 1, messages: ['Kpi Update Success'])
  end

  def self.unit_select
    KpiUnit.as_select
  end


  def self.calculate_select
    KpiCalculate.as_select
  end

  def self.frequency_select
    KpiFrequency.as_select
  end

  def self.follow_kpi params
    kpi = Kpi.find_by_id(params[:ks][:kpi_id])
    department = Department.find_by_id(params[:ks][:department_id])
    KpiSubscribe.transaction do
      if kpi && department
        kpi_subscribe = KpiSubscribe.new(params[:ks])
        kpi_subscribe.tenant_id = params[:user].tenant_id
        kpi_subscribe.user_id = params[:user].id

        alerts = []
        alerts << KpiSubscribeAlert.new({
                                            alert_type: "MAX",
                                            value: params[:upper_boundary],
                                            tenant_id: params[:user].tenant_id
                                        })
        alerts << KpiSubscribeAlert.new({
                                            alert_type: "MIN",
                                            value: params[:lower_boundary],
                                            tenant_id: params[:user].tenant_id
                                        })
        kpi_subscribe.kpi_subscribe_alerts = alerts

        if kpi_subscribe.save
          ApiMessage.new(result_code: 1, messages: ['Followed This Kpi Success'])
        else
          ApiMessage.new(messages: kpi_subscribe.errors.full_messages)
        end
      else
        ApiMessage.new(messages: ['Kpi Or Department Not Exist'])
      end
    end
  end

  def self.unfollow_kpi params
    kpi = Kpi.find_by_id(params[:kpi_id])
    department = Department.find_by_id(params[:department_id])
    if kpi && department
      kpi_subscribe = KpiSubscribe.where(tenant_id: params[:user].tenant_id, user_id: params[:user].id, kpi_id: params[:kpi_id], department_id: params[:department_id]).first
      KpiSubscribe.transaction do
        if kpi_subscribe
          if kpi_subscribe.destroy
            # kpi_subscribe.kpi_subscribe_alerts = nil
            ApiMessage.new(result_code: 1, messages: ['UnFollowed This Kpi Success'])
          else
            ApiMessage.new(messages: kpi_subscribe.errors.full_messages)
          end
        else
          ApiMessage.new(messages: ['UnFollowed This Kpi'])
        end
      end
    else
      ApiMessage.new(messages: ['Kpi Or Department Not Exist'])
    end
  end

  def self.accessable_list user
    KpiPresenter.as_on_users(Kpi.accesses_by_user(user), user, false)
  end

  def self.user_created_kpis user
    KpiPresenter.as_on_users(Kpi.where(user_id: user.id), user, false)
  end

  def self.user_followed_kpis user
    KpiPresenter.as_on_users(Kpi.joins(:kpi_subscribes).where(kpi_subscribes: {user_id: user.id}), user, false)
  end

  def self.details kpi
    KpiPresenter.new(kpi).as_kpi_details
  end

  def self.properties kpi_id
    if kpi=Kpi.find_by_id(kpi_id)
      KpiPresenter.new(kpi).as_properties_info
    else
      ApiMessage.new(messages: ['Kpi Not Exist'])
    end
  end

  def self.add_properties params, user
    if kpi=Kpi.find_by_id(params[:kpi_id])
      property = KpiProperty.new(:name => params[:name], :type => Kpi::KpiPropertyType.code(params[:type]))
      property.user = user
      property.tenant = user.tenant
      kpi.kpi_properties<<property
      ApiMessage.new(result_code: 1, messages: ['Kpi Property Add Sucess'])
    else
      ApiMessage.new(messages: ['Kpi Not Exist'])
    end
  end

  def self.update_properties params
    if kpi=Kpi.find_by_id(params[:kpi_id]) && property=KpiProperty.find_by_id(params[:property_id])
      property.update_attributes({:name => params[:name], :type => Kpi::KpiPropertyType.code(params[:type])})
      ApiMessage.new(result_code: 1, messages: ['Kpi Property Update Sucess'])
    else
      ApiMessage.new(messages: ['Kpi Or Property Not Exist'])
    end
  end

  def self.assigns params
    if kpi=Kpi.find_by_id(params[:kpi_id])
      KpiPresenter.new(kpi).as_assigns
    else
      ApiMessage.new(messages: ['Kpi Not Exist'])
    end
  end

end