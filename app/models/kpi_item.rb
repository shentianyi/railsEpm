#encoding: utf-8
class KpiItem < ActiveRecord::Base
  belongs_to :kpi
  belongs_to :base_kpi,:class_name=>'Kpi',:foreign_key=>:item_id
  attr_accessible :item_id
end
