#encoding: utf-8
class Entity < ActiveRecord::Base
  belongs_to :tenant
  has_many :entity_groups, :through=>:entity_group_items
  has_many :user_kpis
  has_many :users
  attr_accessible :name, :status, :user_quantity

  acts_as_tenant(:tenant)
end
