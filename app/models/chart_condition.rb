class ChartCondition < ActiveRecord::Base
  attr_accessible :entity_group,:kpi_id,:calculate_type,:time_string,:cahrtable_id,:chartable_type,:interval
  belongs_to :chartable, :polymorphic => true
end
