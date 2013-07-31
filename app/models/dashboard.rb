class Dashboard < ActiveRecord::Base
  has_many :dashboard_items
  attr_accessible :user_id,:name,:description
  validates :user_id,:presence => true
  validates :name,:presence => true


end
