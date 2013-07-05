#encoding: utf-8
class UserKpiItem < ActiveRecord::Base
  belongs_to :entity
  belongs_to :user
  belongs_to :kpi
  has_many :kpi_entry
  attr_accessible :target,:kpi_id,:user_id,:entity_id
end
