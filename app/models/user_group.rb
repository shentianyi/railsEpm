class UserGroup < ActiveRecord::Base
  belongs_to :user
  belongs_to :tenant
  has_many :user_group_items, :dependent => :destroy
  has_many :user_group_relations, :dependent => :destroy
  attr_accessible :description, :name, :user_id, :tenant_id

  acts_as_tenant

  validates_presence_of :name, presence: true, message: 'can not be blank'
  #validates_uniqueness_to_tenant :name, message: 'should be uniq'

end
