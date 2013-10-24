#encoding: utf-8
class EntityGroup < ActiveRecord::Base
  belongs_to :user
  has_many :entity_group_items
  has_many :entities, :through=>:entity_group_items
  attr_accessible :name
end
