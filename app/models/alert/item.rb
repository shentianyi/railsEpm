
class Alert::Item < ActiveRecord::Base
  self.inheritance_column = nil
  belongs_to :alertable, :polymorphic => true

  belongs_to :user
  attr_accessible :alertable_id, :alertable_type, :status, :type, :user_id
end
