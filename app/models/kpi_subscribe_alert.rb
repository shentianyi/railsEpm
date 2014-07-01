class KpiSubscribeAlert < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessor :alert_type, :tenant_id, :value, :kpi_subscribe_id

  belongs_to :tenant
  belongs_to :kpi_subscribe

  def execute kpi_entry
    query = AnalyseService.chart_condition_filter(self.kpi_subscribe.chart_condition)
    query[:start_time] = kpi_entry.parsed_entry_at
    query[:end_time] = kpi_entry.parsed_entry_at
    data = Entry::Analyzer.new(query).analyse
    data.each do |d|
      puts d
=begin
      if SubscribeAlert.alert(self.alert_type,self.value,d)
        #create an alert message
      end
=end
    end
  end
end
