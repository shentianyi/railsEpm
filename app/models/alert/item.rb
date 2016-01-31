class Alert::Item < ActiveRecord::Base
  self.inheritance_column = nil
  belongs_to :alertable, :polymorphic => true

  belongs_to :user
  attr_accessible :alertable_id, :alertable_type, :status, :type, :user_id

  scope :tasks, -> { where(type: Alert::Type::TASK) }
  scope :systems, -> { where(type: Alert::Type.systems) }
  scope :kpi_followed, -> { where(type: Alert::Type::KPI_FOllOW) }

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
          "#{self.user.nick_name} Follow The KPI #{self.alertable.kpi.name} At Department #{self.alertable.department.name} Success."
        when Alert::Type::TASK
          "#{self.alertable.taskable.kpi.name} for #{self.alertable.taskable.department.name}"
        else
          ''
      end
    rescue

    end
  end
end
