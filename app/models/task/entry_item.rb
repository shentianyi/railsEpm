module Task
  class EntryItem<Task::Item
    include AutoAlert

    attr_accessible :entry_at
    belongs_to :user
    default_scope { where(type: Task::Type::ENTRY) }


    def self.get_entry_at(user_kpi_item, time)
      (KpiFrequency.next_end_begin_date(time, user_kpi_item.frequency)+1.second).utc
    end

    def self.get_to_due_at(user_kpi_item, time)
      to_due=time.localtime # BJ time, hahaha..
      if user_kpi_item.remind_time.present? && (user_kpi_item.remind_time.split(':').length==2)
        h=user_kpi_item.remind_time.split(':')
        if user_kpi_item.frequency==KpiFrequency::Hourly
          to_due=to_due+h[1].to_i.minutes
        else
          to_due= to_due+h[0].to_i.hours+h[1].to_i.minutes
        end
      end
      to_due.utc
    end

    def due?
      Status.dues.include?(self.status)
    end

    def status_display
      Task::Status.display(self.status)
    end

    def self.by_statuses(user_kpi_item_id, user, status=Status.all)
      where(taskable_id: user_kpi_item_id,
            taskable_type: UserKpiItem.name,
            status: status,
            user_id: user.id)
    end

    def self.last_undue(user_kpi_item)
      where(taskable_type: UserKpiItem.name, taskable_id: user_kpi_item, status: Status::PLANED).order('to_due_at desc').first
    end

    def self.last_due(user_kpi_item)
      where(taskable_type: UserKpiItem.name, taskable_id: user_kpi_item, status: Status.dues).order('dued_at desc').first
    end

    def due
      unless due?
        s= Time.now > self.to_due_at ? Status::DUE_AFTER_PLAN : Status::DUE_IN_PLAN
        self.update_attributes(status: s, dued_at: Time.now.utc)
      end
    end

  end
end