class AnalyseService
  def self.condition_filter condition
    entity_group = EntityGroup.find(condition.entity_group)
    unless  entity_group
      return false
    end
    time_span = DashboardItem.time_string_to_time_span condition.time_string

    count = time_range_count(time_span[:start].iso8601.to_s, time_span[:end].iso8601.to_s, dashboard_itme.interval)
    if count > 150
      return false
    end
    query = {}
    query[:kpi_id] = condition.kpi_id
    query[:entity_group_id] = condition.entity_group
    query[:start_time] = time_span[:start].iso8601.to_s
    query[:end_time] = time_span[:end].iso8601.to_s
    query[:average] = condition.calculate_type=='AVERAGE' ? true : false
    query[:frequency] = 100
    query
  end

  def self.get_data condition
    unless q = condition_filter condition
      return false
    end
    query = q
    Entry::Analyzer.new(query).analyse
  end
end