#encoding: utf-8
class KpiItem < ActiveRecord::Base
  belongs_to :kpi
  attr_accessible :item_id
end
