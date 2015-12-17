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
    kpi=Kpi.new({

                })
    kpi.creator=current_user
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
    return []

    Kpi.where(viewable: KpiViewable::PUBLIC)
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
    ApiMessage.new(result_code: 1, messages: kpi_on_user)
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
    ApiMessage.new(result_code: 1, messages: kpi_on_user)
  end
end