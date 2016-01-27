module Task
  class EntryItem<Task::Item
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
        p h
        if user_kpi_item.frequency==KpiFrequency::Hourly
          to_due=to_due+h[1].to_i.minutes
        else
          to_due= to_due+h[0].to_i.hours+h[1].to_i.minutes
        end
      end
      to_due.utc
    end

    def due?
      [Task::Status::DUE_IN_PLAN, Task::Status::DUE_AFTER_PLAN].include?(self.status)
    end

    def status_display
      Task::Status.display(self.status)
    end


    def self.un_dues(user_kpi_item_id, user)
      where(taskable_id: user_kpi_item_id,
            taskable_type: UserKpiItem.name,
            status: Task::Status::PLANED,
            user_id: user.id)
    end
  end
end