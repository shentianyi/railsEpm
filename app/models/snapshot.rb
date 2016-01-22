class Snapshot < ActiveRecord::Base
  belongs_to :attachment
  belongs_to :user
  attr_accessible :alert_id, :current_value, :lower_boundary, :upper_boundary, :user_id, :attachment_id
end
