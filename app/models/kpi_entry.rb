#encoding: utf-8
class KpiEntry < ActiveRecord::Base
  belongs_to :user_kpi_item
  delegate :kpi,:to=>:user_kpi_item

  attr_accessible :entry_at, :entry_frequency,:value,:original_value,:parsed_entry_at
  attr_accessible :user_kpi_item_id
end
