class ChartCondition < ActiveRecord::Base
  attr_accessible :entity_group_id, :kpi_id, :calculate_type,
                  :time_string, :chartable_id, :chartable_type, :interval, :chart_type, :kpi_property,
                  :query, :data
  belongs_to :chartable, :polymorphic => true
  belongs_to :kpi
  belongs_to :entity_group

  after_destroy :clean_data_cache

  def time_span
    DashboardItem.time_string_to_time_span self.time_string
  end

  def cache_data
    if (cache=KpiEntryAnalyseCache.find_by_id(self.id, self.class.name)) && cache.chart_data
      cache.chart_data
    else
      if self.data
        return self.data
      else
        query = AnalyseService.chart_condition_filter(self)
        if query
          return Entry::Analyzer.new(query).analyse
        end
      end
    end
  end

  def self.detail_by_chartable(chartable)
    chartable.chart_conditions.joins(:kpi).joins(:entity_group)
        .select('kpis.name as kpi_name,entity_groups.name as entity_group_name,chart_conditions.*')
  end

  #
  def check kpi_entry
    query = AnalyseService.chart_condition_filter self
    eg = EntityGroup.find_by_id(query[:entity_group_id])
    return false if eg.nil?

#    department = EntityGroup.find_by_id(query[:entity_group_id]).department

    department=eg.department

    entity = Entity.find_by_id(kpi_entry.entity_id)
    if entity && entity.department && department && entity.department.path_ids.include?(department.id)
      if kpi_entry.entry_at >= query[:start_time] && kpi_entry.entry_at <= query[:end_time]
        return true
      end
    end
    return true
  end

  private
  def clean_data_cache
    if cache= KpiEntryAnalyseCache.find_by_id(self.id, self.class.name)
      cache.destroy
    end
  end
end
