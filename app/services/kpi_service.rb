class KpiService
  def self.building(params, user)
    puts params
    begin
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
        if params[:kpi][:viewable][:user_group_id].present?
          kpi.user_group = UserGroup.find_by_id(params[:kpi][:viewable][:user_group_id])
        end

        #kpi_properties
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
          ##assign
          params[:assignments].each do |assignment|
            if ((to_user = user.tenant.users.find_by_email(assignment[:user])) && (department = Department.find_by_id(assignment[:department_id])))
              KpisHelper.assign_kpi_to_department_user(kpi, to_user, department, assignment, user)
            end
          end

          #task
          #TODO

          KpiPresenter.new(kpi).as_kpi_basic_feedback(['Kpi Created Success'], 1, false)
        else
          puts '-------------------------------------'
          puts kpi.errors.to_json
          puts '-------------------------------------'
          return ApiMessage.new(messages: ['Kpi Created Error'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end


  def self.updating(params, user, kpi)
    puts params
    # begin
      Kpi.transaction do
        puts "update---------------------------------------------------------------------"
        kpi.update_attributes({
                                  name: params[:kpi][:kpi_name],
                                  description: params[:kpi][:description],
                                  target_max: params[:kpi][:target_max].to_f,
                                  target_min: params[:kpi][:target_min].to_f,
                                  unit: params[:kpi][:uom],
                                  viewable: params[:kpi][:viewable][:viewable_code],
                                  calculate_method: params[:kpi][:calculate_method]
                                  # user_group_id: params[:kpi][:viewable][:user_group_id]
                              })
        if params[:kpi][:viewable][:user_group_id].present?
          kpi.user_group = UserGroup.find_by_id(params[:kpi][:viewable][:user_group_id])
        end

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

        #assign new update
        params[:assignments].each do |assignment|
          if ((to_user = user.tenant.users.find_by_email(assignment[:user])) && (department = Department.find_by_id(assignment[:department_id])))
            if assignment[:assignment_id].blank?
              KpisHelper.assign_kpi_to_department_user(kpi, to_user, department, assignment, user)
            else
             if item= UserKpiItem.find_by_id(assignment[:assignment_id])
                          item.update_attributes({
                                                                                       user_id: to_user.id,
                                                                                       department_id: department.id,
                                                                                       target_max: kpi.target_max,
                                                                                       target_min: kpi.target_min,
                                                                                       remind_time: assignment[:time],
                                                                                       frequency: assignment[:frequency],
                                                                                       auto_notification: assignment[:auto_notification]
                                                                                   })
               end
            end
          end
        end

        #task
        #TODO

        KpiPresenter.new(kpi).as_kpi_basic_feedback(['Kpi Update Success'], 1, false)
      end
    # rescue => e
    #   ApiMessage.new(messages: [e.message])
    # end
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
    if KpiSubscribe.where(tenant_id: params[:user].tenant_id, user_id: params[:user].id, kpi_id: params[:ks][:kpi_id], department_id: params[:ks][:department_id]).first
      return ApiMessage.new(messages: ['Can Not Repeat Follow'])
    end

    begin
      kpi = Kpi.find_by_id(params[:ks][:kpi_id])
      department = Department.find_by_id(params[:ks][:department_id])
      KpiSubscribe.transaction do
        if kpi && department
          kpi_subscribe = KpiSubscribe.new(params[:ks])
          kpi_subscribe.tenant_id = params[:user].tenant_id
          kpi_subscribe.user_id = params[:user].id

          alerts = []
          alerts << KpiSubscribeAlert.new({
                                              alert_type: Kpi::SubscribeAlert::MAX,
                                              value: params[:upper_boundary],
                                              tenant_id: params[:user].tenant_id
                                          })
          alerts << KpiSubscribeAlert.new({
                                              alert_type: Kpi::SubscribeAlert::MIN,
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
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.unfollow_kpi params
    begin
      kpi = Kpi.find_by_id(params[:kpi_id])
      department = Department.find_by_id(params[:department_id])
      KpiSubscribe.transaction do
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
    end
  end

  def self.user_accessable_kpis user, page=0, size=20
    KpiPresenter.as_on_users(Kpi.accesses_by_user(user).offset(page*size).limit(size), user, false)
  end

  def self.user_created_kpis user, page=0, size=20
    KpiPresenter.as_on_users(Kpi.created_by_user(user).offset(page*size).limit(size), user, false)
  end

  def self.user_followed_kpis user, page=0, size=20
    KpiPresenter.as_on_users(Kpi.followed_by_user(user).offset(page*size).limit(size), user, false)
  end

  def self.user_followed_details user,page=0,size=20
    KpiSubscribePresenter.as_followed_details(KpiSubscribe.followed_details_by_user(user).offset(page*size).limit(size), user)
  end

  def self.details kpi,user
    KpiPresenter.new(kpi).as_kpi_details(true,user)
  end

  def self.properties kpi_id
    if kpi=Kpi.find_by_id(kpi_id)
      KpiPresenter.new(kpi).as_properties_info
    else
      ApiMessage.new(messages: ['Kpi Not Exist'])
    end
  end

  def self.add_properties params, user
    begin
      KpiProperty.transaction do
        if kpi=Kpi.find_by_id(params[:kpi_id])
          property = KpiProperty.new(:name => params[:name], :type => params[:type])
          property.user = user
          property.tenant = user.tenant
          kpi.kpi_properties<<property
          KpiPropertyPresenter.new(property).as_property_basic_feedback(['Kpi Property Add Success'])
        else
          ApiMessage.new(messages: ['Kpi Not Exist'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.update_properties params
    begin
      KpiProperty.transaction do
        if kpi=Kpi.find_by_id(params[:kpi_id]) && property=KpiProperty.find_by_id(params[:property_id])
          property.update_attributes({:name => params[:name], :type => params[:type]})
          KpiPropertyPresenter.new(property).as_property_basic_feedback(['Kpi Property Update Success'])
        else
          ApiMessage.new(messages: ['Kpi Or Property Not Exist'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.delete_property params
    begin
      KpiProperty.transaction do
        if property=KpiProperty.find_by_id(params[:property_id])
          property.destroy
          ApiMessage.new(result_code: 1, messages: ['Property Delete Success'])
        else
          ApiMessage.new(messages: ['Kpi Or Property Not Exist'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.assigns user, params
    if kpi=Kpi.find_by_id(params[:kpi_id])
      KpiPresenter.new(kpi).as_assigns user
    else
      ApiMessage.new(messages: ['Kpi Not Exist'])
    end
  end

  def self.add_assigns params, user
    begin
      mmsg = KpisHelper.validate_assigns params[:assigns], user
      unless mmsg.result
        return ApiMessage.new(messages: [mmsg.contents])
      end

      UserKpiItem.transaction do
        if kpi=Kpi.find_by_id(params[:kpi_id])
          params[:assigns].each do |assignment|
            to_user = user.tenant.users.find_by_email(assignment[:user])
            department = Department.find_by_id(assignment[:department_id])
            KpisHelper.assign_kpi_to_department_user(kpi, to_user, department, assignment, user)
          end

          KpiPresenter.new(kpi).as_kpi_basic_feedback(['Kpi Assign Success'], 1, false)
        else
          ApiMessage.new(messages: ['Kpi Not Exist'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.unassign params
    begin
      UserKpiItem.transaction do
        if assign=UserKpiItem.find_by_id(params[:assignment_id])
          assign.destroy
          ApiMessage.new(result_code: 1, messages: ['Kpi UnAssign Sucess'])
        else
          ApiMessage.new(messages: ['This Assign Not Exist'])
        end
      end
    rescue => e
      ApiMessage.new(messages: [e.message])
    end
  end

  def self.department_select user, params
    departments=[]

    kpi=user.tenant.kpis.find_by_id(params[:kpi_id])
    unless kpi
      return ApiMessage.new(messages: ['Kpi Not Found'])
    end

    puts params
    puts '--------------------------------------------'
    # get root departments
    if params[:department_id].blank?
      departments = user.root_departments
    else
      if department = DepartmentService.get_department(user, params[:department_id])
        if department.access_childreable(user)
          departments = department.children
        else
          return ApiMessage.new(messages: ['Department You cannot access'])
        end
      else
        return ApiMessage.new(messages: ['Department not found'])
      end
    end

    #return infos
    {
        user: UserPresenter.new(user).as_brief_info(false),
        kpi: KpiPresenter.new(kpi).as_basic_info(false),
        department_follow_states: KpiPresenter.as_on_kpi_departments(user, kpi, departments)
    }
  end


end
