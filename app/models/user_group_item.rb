class UserGroupItem < ActiveRecord::Base
  belongs_to :user_group
  belongs_to :tenant
  belongs_to :user
  attr_accessible :user_group_id, :user_id, :tenant_id

  acts_as_tenant
end
