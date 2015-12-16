class UserGroup < ActiveRecord::Base
  belongs_to :user
  belongs_to :tenant
  has_many :user_group_items, :dependent => :destroy
  attr_accessible :description, :name, :user_id, :tenant_id

  acts_as_tenant

end
