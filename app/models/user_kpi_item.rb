#encoding: utf-8
class UserKpiItem < ActiveRecord::Base
  belongs_to :entity
  belongs_to :user
  belongs_to :kpi
  has_many :kpi_entry,:dependent=>:destroy
  attr_accessible :target_max,:target_min,:kpi_id,:user_id,:entity_id
end
