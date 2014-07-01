class ChartCondition < ActiveRecord::Base
  attr_accessible :entity_group_id, :kpi_id, :calculate_type,
                  :time_string, :chartable_id, :chartable_type, :interval,:chart_type
  belongs_to :chartable, :polymorphic => true
  belongs_to :kpi
  belongs_to :entity_group

  def time_span
    DashboardItem.time_string_to_time_span self.time_string
  end

  def cache_data
    KpiEntryAnalyseCache.find_by_id(self.id, self.class.name).chart_data
  end

  def self.detail_by_chartable(chartable)
    chartable.chart_conditions.joins(:kpi).joins(:entity_group)
    .select('kpis.name as kpi_name,entity_groups.name as entity_group_name,chart_conditions.*')
  end

  #
  def check kpi_entry
    query = AnalyseService.chart_condition_filter self
    department = EntityGroup.find_by_id(query[:entity_group_id]).department
    entity = Entity.find_by_id(kpi_entry.entity_id)
    puts '#################################'
    puts query
    puts entity.to_json
    puts entity.department.to_json
    puts entity.department.path_ids
    puts department.id
    puts '#################################'
    if entity && entity.department && department && entity.department.path_ids.include?(department.id)
      puts kpi_entry.entry_at
      puts kpi_entry.entry_at >= query[:start_time]
      puts kpi_entry.entry_at <= query[:end_time]

      if kpi_entry.entry_at >= query[:start_time] && kpi_entry.entry_at <= query[:end_time]
        return true
      end
    end
    return true
  end
end
