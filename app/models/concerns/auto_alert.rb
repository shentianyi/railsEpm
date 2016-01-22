module AutoAlert

  extend ActiveSupport::Concern
  included do
    after_commit :send_message, on: :create

    def send_message
      case self.class.to_s
        when 'UserKpiItem'
          TaskAlertWorker.perform_async(self.id)
        when 'KpiSubscribe'
          KpiFollowedAlertWorker.perform_async(self.id)
      end

    end
  end
end