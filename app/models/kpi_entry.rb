#encoding: utf-8
class KpiEntry < ActiveRecord::Base
  belongs_to :user_kpi_item
  belongs_to :kpi ,:class_name=>'Kpi',:foreign_key=>'kpi_id'

  attr_accessible :entry_at, :frequency,:value,:original_value,:parsed_entry_at,:abnormal
  attr_accessible :user_kpi_item_id,:kpi_id,:entity_id,:user_id
  
  # def self.value_abnormal value
    # value.finite?
  # end
end
