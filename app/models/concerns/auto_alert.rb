module AutoAlert

  extend ActiveSupport::Concern
  included do
    has_one :alert, :as => :alertable, :dependent => :delete
    after_create :send_message
    #after_commit :send_message, on: :create

    def send_message

      case self.class.name
        when 'Task::EntryItem'
          Alerts::TaskAlertWorker.perform_async(self.id)
        when 'UserKpiItem'
          Alerts::AssignAlertWorker.perform_async(self.id)
        when 'KpiSubscribe'
          Alerts::KpiFollowedAlertWorker.perform_async(self.id)


      end

    end
  end
end