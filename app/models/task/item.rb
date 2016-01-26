class Task::Item < ActiveRecord::Base

  self.inheritance_column = nil
  attr_accessible :assignor_id, :content, :dued_at, :generate_type, :status,
                  :taskable_id, :taskable_type, :title, :to_due_at, :type, :user_id, :remind_at

  belongs_to :taskable, :polymorphic => true

  before_save :set_remind_at

  private
  def set_remind_at
    if self.to_due_at_changed? && self.to_due_at.present?
      self.remind_at=self.to_due_at-1.hour
    end
  end

end
