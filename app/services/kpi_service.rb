class KpiService
  def self.unit_select
    KpiUnit.as_select
  end


  def self.calculate_select
    KpiCalculate.as_select
  end

  def self.frequency_select
    KpiFrequency.as_select
  end

  def self.user_created_kpis user
    user_kpis = Kpi.where(user_id: user.id)

    kpi_on_user = []
    user_kpis.each_with_index do |kpi, index|
      kpi_on_user[index] = {}
      creater = User.find_by_id(kpi.user_id).blank? ? user : User.find_by_id(kpi.user_id)
      kpi_on_user[index][:kpi] = KpiPresenter.new(kpi).as_basic_info
      kpi_on_user[index][:user] = UserPresenter.new(creater).as_brief_info
      kpi_on_user[index][:follow_flag] = 1
      kpi_on_user[index][:is_created] = user==creater
      kpi_on_user[index][:is_managable] = true

    end

    puts kpi_on_user
    puts '------------------------------'
    ApiMessage.new(result_code: 1, messages: kpi_on_user)
  end
end