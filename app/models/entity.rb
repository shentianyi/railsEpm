#encoding: utf-8
class Entity < ActiveRecord::Base
  belongs_to :tenant
  has_many :user_entities
  attr_accessible :name, :status, :user_quantity

  has_ancestry
  acts_as_tenant(:tenant)
end
