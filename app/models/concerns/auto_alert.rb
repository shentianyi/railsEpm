module AutoAlert

  extend ActiveSupport::Concern
  included do
    has_one :alert_item, :class_name => 'Alert::Item', :as => :alertable, :dependent => :delete
    after_create :produce_alert

    def produce_alert
      case self.class.name
        when 'Task::EntryItem'
          #create task alert
          alert=Alert::Item.new(status: Alert::Status::UNREAD, type: Alert::Type::TASK, alertable_id: self.id, alertable_type: self.class.name)
        when 'KpiSubscribe'
          #create kpi follow alert
          alert=Alert::Item.new({status: Alert::Status::UNREAD, type: Alert::Type::KPI_FOllOW})

        when 'UserKpiItem'
          #create assign alert
          alert=Alert::Item.new({status: Alert::Status::UNREAD, type: Alert::Type::ASSIGN_KPI})
        when 'StorySetUser'
          #create add discussion member alert
          alert=Alert::Item.new({status: Alert::Status::UNREAD, type: Alert::Type::ADD_TO_DISCUSSION})
        when 'UserDepartment'
          #create add department member alert
          alert=Alert::Item.new({status: Alert::Status::UNREAD, type: Alert::Type::ADD_TO_DEPARTMENT})
      end

      alert.user=self.user
      unless self.class.name =='Task::EntryItem'
        alert.alertable=self
        self.alert_item=alert
      end
      alert.save

    end
  end
end