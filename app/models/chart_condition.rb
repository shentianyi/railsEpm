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
end
