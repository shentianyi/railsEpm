#encoding: utf-8
class Tenant < ActiveRecord::Base
  has_many :users
  has_many :kpi_categories
  has_many :entities
  belongs_to :super_user ,:class_name=>'User',:foreign_key=>'user_id'
  attr_accessible :company, :domain, :edition_id, :expires_at, :phone_number, :status, :user_quantity
end
