#encoding: utf-8
class Tenant < ActiveRecord::Base
  has_many :users
  has_many :kpi_categories
  has_many :entities
  attr_accessible :company, :domain, :edition_id, :expires_at, :phone_number, :status, :user_id, :user_quantity
end
