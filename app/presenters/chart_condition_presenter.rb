#encoding: utf-8
class ChartConditionPresenter<Presenter
  Delegators=[:id, :entity_group_id, :entity_group_name, :kpi_id, :kpi_name,:kpi_property, :time_span, :calculate_type, :interval, :cache_data,:chart_type]
  def_delegators :@chart_condition, *Delegators
  attr_accessor :start_time, :end_time, :time_span

  def initialize(chart_condition)
    @chart_condition=chart_condition
    @time_span=@chart_condition.time_span
    @start_time= time_span[:start].iso8601
    @end_time =time_span[:end].iso8601
    self.delegators =Delegators
  end
end
