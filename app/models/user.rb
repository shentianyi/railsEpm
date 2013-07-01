#encoding: utf-8
class User < ActiveRecord::Base
  belongs_to :tenant
  has_many :entity_group
  has_many :user_kpis
  attr_accessible :email, :first_name, :is_tenant, :last_name, :password, :remember_token, :remember_token_expires_at, :role_id, :salt, :status
  attr_accessible :input_password
  before_save :encrypt_password

  # acts as tenant
  acts_as_tenant(:tenant)

end
