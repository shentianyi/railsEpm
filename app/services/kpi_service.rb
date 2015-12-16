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

    kpi_on_user = {}
    kpi_on_user[:user] = UserPresenter.new(user).as_brief_info
    kpis = []
    user_kpis.each_with_index do |kpi, index|
      kpis[index] = KpiPresenter.new(kpi).as_basic_info
    end
    kpi_on_user[:kpis] = kpis

    puts kpi_on_user
    puts '------------------------------'
    if kpis.count > 0
      ApiMessage.new(result_code: 1, messages: kpi_on_user)
    else
      ApiMessage.new(messages: ['There Is No Requires Data'])
    end
  end
end