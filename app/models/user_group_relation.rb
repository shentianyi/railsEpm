class UserGroupRelation < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :user_group

  attr_accessible :user_group_id, :tenant_id,:user_groupable_id, :user_groupable_type
  belongs_to :user_groupable, :polymorphic => true


end
