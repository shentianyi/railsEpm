#encoding: utf-8
class User < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :entity
  
  has_many :entity_group,:dependent=>:destroy
  has_many :kpis,:through=>:user_kpi_items
  has_many :user_kpi_items,:dependent=>:destroy
  has_many :kpi_entries, :through=>:user_kpi_items
  
  attr_accessible :email, :first_name, :is_tenant, :last_name, :password, :remember_token, :remember_token_expires_at, :role_id, :salt, :status
  attr_accessible :input_password


  # acts as tenant
  acts_as_tenant(:tenant)

end
