#encoding: utf-8
class Entity < ActiveRecord::Base
  belongs_to :tenant
  attr_accessible :name, :status, :user_quantity

  acts_as_tenant(:tenant)
end
