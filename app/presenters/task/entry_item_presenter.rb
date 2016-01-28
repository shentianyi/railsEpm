module Task
  class EntryItemPresenter<Presenter
    Delegators=[:id, :to_due_at, :dued_at, :status]
    def_delegators :@entry_item, *Delegators

    def initialize(entry_item)
      @entry_item=entry_item
      self.delegators =Delegators
    end
    def as_basic_info
      {
          task_item_id: @entry_item.id,
          due_flag: @entry_item.due?,
          to_due_at: @entry_item.to_due_at,
          dued_at: @entry_item.dued_at,
          status: @entry_item.status_display,
          status_value: @entry_item.status,
          kpi: KpiPresenter.new(@entry_item.taskable.kpi).as_basic_info(true),
          department: DepartmentPresenter.new(@entry_item.taskable.department).as_brief_info(false)
      }
    end

    def self.as_basic_infos items
      infos=[]
      items.each do |item|
        infos<< new(item).as_basic_info
      end
      infos
    end
  end

end