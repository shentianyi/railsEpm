#encoding: utf-8
class KpiEntry < ActiveRecord::Base
  belongs_to :user_kpi
  attr_accessible :entry_at, :entry_frequency,:value,:original_value
end
