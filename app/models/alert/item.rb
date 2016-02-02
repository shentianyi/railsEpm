class Alert::Item < ActiveRecord::Base
  self.inheritance_column = nil
  belongs_to :alertable, :polymorphic => true

  belongs_to :user
  attr_accessible :alertable_id, :alertable_type, :status, :type, :user_id

  scope :tasks, -> { where(type: Alert::Type::TASK) }
  scope :systems, -> { where(type: Alert::Type.systems) }
  scope :kpi_followed, -> { where(type: Alert::Type::KPI_FOllOW) }

  after_create :send_push_notification

  def handle_type
    Alert::HandleType::MANUAL
  end

  def self.by_type(type)
    case type
      when Alert::Type::TASK
        tasks
      when Alert::Type::SYSTEM
        systems
      when Alert::Type::KPI_FOllOW
        kpi_followed
      else
        self
    end
  end

  def text
    @text||= begin
      case type
        when Alert::Type::ADD_TO_DISCUSSION
          "you are invited to discussion #{self.alertable.story_set.title}"
        when Alert::Type::ADD_TO_DEPARTMENT
          "you are invited to #{self.alertable.department.creator.nick_name}'s department #{self.alertable.department.name}"
        when Alert::Type::ASSIGN_KPI
          "you are assigned kpi #{self.alertable.kpi.name}"
        when Alert::Type::KPI_FOllOW
          "#{self.alertable.user.nick_name} Follow The KPI #{self.alertable.kpi.name} At Department #{self.alertable.department.name} Success."
        when Alert::Type::TASK
          "#{self.alertable.taskable.kpi.name} for #{self.alertable.taskable.department.name}"
        else
          ''
      end
    rescue

    end
  end

  def target_id
    @target_id||= begin
      case type
        when Alert::Type::ADD_TO_DISCUSSION
          self.alertable.story_set.stories.first.id
        when Alert::Type::ADD_TO_DEPARTMENT
          self.alertable.department.id
        when Alert::Type::ASSIGN_KPI
          self.alertable_id
        when Alert::Type::KPI_FOllOW
          self.alertable_id
        when Alert::Type::TASK
          self.alertable_id
        else
          ''
      end
    rescue

    end
  end

  private
  def send_push_notification
    Alert::PushWorker.perform_async(self.id)
  end
end
