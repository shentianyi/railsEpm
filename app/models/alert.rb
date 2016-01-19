class Alert < ActiveRecord::Base

  self.inheritance_column = nil
  belongs_to :alertable, :polymorphic => true
  belongs_to :user

  attr_accessible :alertable_id, :alertable_type, :offset, :topic, :type, :user_id
end
