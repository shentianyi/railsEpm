class KpiService
  # {"kpi"=>{
  #     "kpi_category_id"=>"12",
  #     "name"=>"a",
  #     "description"=>"a",
  #     "frequency"=>"90",
  #     "direction"=>"100",
  #     "target_max"=>"12",
  #     "target_min"=>"1",
  #     "unit"=>"100",
  #     "is_calculated"=>"false",
  #     "formula"=>"",
  #     "formula_string"=>"",
  #     "kpi_properties"=>["j", "s"]}}

  def self.building(params, user)
    Kpi.transaction do
      kpi = Kpi.new({
                        name: params[:kpi][:kpi_name],
                        description: params[:kpi][:description],
                        user_id: user.id,
                        target_max: params[:kpi][:target_max],
                        target_min: params[:kpi][:target_min],
                        unit: params[:kpi][:uom],
                        viewable: params[:kpi][:viewable][:viewable_code],
                        calculate_method: params[:kpi][:calculate_method],
                        user_group_id: params[:kpi][:viewable][:user_group_id]
                    })
      kpi.creator = user
      kpi.tenant_id = user.tenant_id

      #kpi_properties
      attrs = []
      unless params[:kpi][:attributes].blank?
        params[:kpi][:attributes].uniq.each { |name|
          if property = KpiProperty.find_by_name(name)
          else
            property = KpiProperty.new(:name => name)
            property.user = current_user
            property.tenant = current_tenant
            property.save
          end
          attrs << property
        }
      end

      if kpi.save
        kpi.add_properties(attrs)
      else
        return ApiMessage.new(messages: ['Kpi Created Error'])
      end

      #assign

      unless params[:assignments].blank?
        params[:assignments].each do |assignment|
          if to_user = user.tenant.users.find_by_email(assignment[:user])
            KpisHelper.assign_kpi_to_user_by_id(kpi.id, to_user, false)
          end
        end
      end

    end
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
end