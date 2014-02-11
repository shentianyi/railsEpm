#encoding: utf-8
class EntityGroup < ActiveRecord::Base
  has_ancestry

  belongs_to :user
  has_many :entity_group_items
  has_many :entities, :through=>:entity_group_items
  has_many :entity_contacts,:as=>:contactable,:dependent=>:destroy
  has_many :contacts,:through=>:entity_contacts

  attr_accessible :name, :is_public,:description,:code ,:parent
end
