module Task
  class EntryTaskService
    def self.business_day?(time)
      #TODO if task to do time is business day, it is hard to do
      true
    end

    def self.generate_task time=nil, frequency=nil
      Task::EntryItem.transaction do
        time=time||Time.now.utc

        q=UserKpiItem
        if frequency
          q=q.where(frequency: frequency)
        end

        q.where(auto_notification: true).each do |item|
          entry_at =Task::EntryItem.get_entry_at(item, time) # utc
          to_due_at=Task::EntryItem.get_to_due_at(item, entry_at)
          if business_day?(to_due_at)
            params={taskable_id: item.id, taskable_type: item.class.name, entry_at: entry_at}
            if (ei=Task::EntryItem.where(params).first)

            else
              params[:status]=Task::Status::PLANED
              params[:assigner_id]=item.assigner_id
              params[:user_id]=item.user_id
              params[:to_due_at]=to_due_at
              Task::EntryItem.create(params)

            end
          end
        end

      end
    end
  end
end