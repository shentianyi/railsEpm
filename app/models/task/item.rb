class Task::Item < ActiveRecord::Base

  self.inheritance_column = nil
  attr_accessible :assignor_id, :content, :dued_at, :generate_type, :status, :taskable_id, :taskable_type, :title, :to_due_at, :type, :user_id
end
