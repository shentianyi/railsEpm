class KpiService
  def self.building(params, user)
    puts params
    Kpi.transaction do
      update_flag = false
      if params[:kpi][:kpi_id].present? && kpi=Kpi.find_by_id(params[:kpi][:kpi_id])
        #Update Kpi
        update_flag = true
        puts "update---------------------------------------------------------------------"
        kpi.update_attributes({
                                  name: params[:kpi][:kpi_name],
                                  description: params[:kpi][:description],
                                  target_max: params[:kpi][:target_max],
                                  target_min: params[:kpi][:target_min],
                                  unit: params[:kpi][:uom],
                                  viewable: params[:kpi][:viewable][:viewable_code],
                                  calculate_method: params[:kpi][:calculate_method],
                                  user_group_id: params[:kpi][:viewable][:user_group_id]
                              })
      else
        #Create Kpi
        kpi = Kpi.new({
                          name: params[:kpi][:kpi_name],
                          description: params[:kpi][:description],
                          target_max: params[:kpi][:target_max],
                          target_min: params[:kpi][:target_min],
                          unit: params[:kpi][:uom],
                          viewable: params[:kpi][:viewable][:viewable_code],
                          calculate_method: params[:kpi][:calculate_method],
                          user_group_id: params[:kpi][:viewable][:user_group_id]
                      })
        kpi.creator = user
        kpi.tenant = user.tenant
      end

      #kpi_properties
      if update_flag
        p_ids =[]
        params[:kpi][:attributes].each { |attr| p_ids<< attr[:attribute_id] unless attr[:attribute_id].blank? }
        puts '---------------------------------------------------------'
        puts p_ids
        d_p_ids = kpi.kpr_properties.pluck(:id) - p_ids.uniq
        puts d_p_ids
        puts '---------------------------------------------------------'
        d_p_ids.each do |i|
          KpiProperty.find_by_id(i).destroy
        end
      end

      params[:kpi][:attributes].each do |attr|
        if attr[:attribute_id].blank?
          property = KpiProperty.new(:name => attr[:attribute_name], :type => attr[:attribute_type])
          property.user = user
          property.tenant = user.tenant
          kpi.kpi_properties<<property
        else
          property = KpiProperty.find_by_id(attr[:attribute_id])
          if property && ((property.name != attr[:attribute_name]) || (property.type != attr[:attribute_type]))
            property.update_attributes({:name => attr[:attribute_name], :type => attr[:attribute_type]})
          end
        end
      end


      if kpi.kpi_category.blank?
        kpi.kpi_category=user.tenant.kpi_categories.first
      end

      if kpi.save
        #assign
        if update_flag
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
        end

        params[:assignments].each do |assignment|
          unless ((to_user = user.tenant.users.find_by_email(assignment[:user])) && (department = Department.find_by_id(assignment[:department_id])))
            if assignment[:assignment_id].blank?
              KpisHelper.assign_kpi_to_department_user(kpi, to_user, department)
            else
              UserKpiItem.find_by_id(assignment[:assignment_id]).update_attributes({
                                                                                       user_id: to_user.id,
                                                                                       department_id: department.id,
                                                                                       target_max: kpi.target_max,
                                                                                       target_min: kpi.target_min
                                                                                   })
            end
          end
        end

        #task
        #TODO
      else
        return ApiMessage.new(messages: ['Kpi Created Error'])
      end
    end

    ApiMessage.new(result_code: 1, messages: ['Kpi Create Success'])
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
    # return []
    Kpi.accesses_by_user(user)
  end

  def self.user_created_kpis user
    user_kpis = Kpi.where(user_id: user.id)

    kpi_on_user = []
    user_kpis.each_with_index do |kpi, index|
      kpi_on_user[index] = {}
      creater = User.find_by_id(kpi.user_id).blank? ? user : User.find_by_id(kpi.user_id)
      kpi_on_user[index][:kpi] = KpiPresenter.new(kpi).as_basic_info
      kpi_on_user[index][:user] = UserPresenter.new(creater).as_brief_info
      kpi_on_user[index][:follow_flag] = 'ALL'
      kpi_on_user[index][:is_created] = user==creater
      kpi_on_user[index][:is_managable] = true
    end

    puts kpi_on_user
    puts '------------------------------'
    kpi_on_user
  end

  def self.user_followed_kpis user
    kpi_subscribes = KpiSubscribe.where(user_id: user.id).group(:kpi_id)

    kpi_on_user = []
    kpi_subscribes.each_with_index do |kpi_subscribe, index|
      kpi_on_user[index] = {}
      creater = User.find_by_id(kpi_subscribe.kpi.user_id).blank? ? user : User.find_by_id(kpi_subscribe.kpi.user_id)
      kpi_on_user[index][:kpi] = KpiPresenter.new(kpi_subscribe.kpi).as_basic_info
      kpi_on_user[index][:user] = UserPresenter.new(creater).as_brief_info
      kpi_on_user[index][:follow_flag] = 'ALL'
      kpi_on_user[index][:is_created] = user==creater
      kpi_on_user[index][:is_managable] = true
    end

    puts kpi_on_user
    puts '------------------------------'
    kpi_on_user
  end
end