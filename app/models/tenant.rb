#encoding: utf-8
class Tenant < ActiveRecord::Base
  has_many :oauth_applications, class_name: 'Doorkeeper::Application', as: :owner
  has_many :users,:dependent=>:destroy
  has_many :kpi_categories,:dependent=>:destroy
  has_many :entities,:dependent=>:destroy
  has_many :kpis,:dependent=>:destroy
  has_many :departments,:dependent => :destroy
  belongs_to :super_user ,:class_name=>'User',:foreign_key=>'user_id'
  has_many :kpi_subscribes, :dependent => :destroy

  attr_accessible :company_name, :edition, :subscription_reference, :expire_at,:subscription_status
  attr_accessible :customer_first_name, :customer_last_name,:customer_email,:customer_phone,:user_id,:access_key

  has_settings do |s|
    s.key :entity ,:defaults=>{:auto_create_for_general_use=>true}
    s.key :entity_group ,:defaults=>{:auto_create_for_general_user=>true}
  end


end
