#encoding: utf-8
class EntityGroup < ActiveRecord::Base

  belongs_to :user
  belongs_to :department
  has_many :users
  has_many :entity_group_items,:dependent => :delete_all
  has_many :entities, :through=>:entity_group_items
  has_many :entity_contacts,:as=>:contactable,:dependent=>:destroy
  has_many :contacts,:through=>:entity_contacts
  attr_accessible :name, :is_public,:description,:code,:department_id
  #,:parent,:ancestry,:is_department

end
