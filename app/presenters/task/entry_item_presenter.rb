module Task
  class EntryItemPresenter<Presenter
    Delegators=[:id, :to_due_at, :dued_at, :status]
    def_delegators :@entry_item, *Delegators

    def initialize(entry_item)
      @entry_item=entry_item
      self.delegators =Delegators
    end


    def taskable
      @taskable||=@entry_item.taskable
    end

    def kpi
     @kpi||= @taskable.kpi
    end


    def department
      @department||= @taskable.department
    end


    def as_basic_info
      {
          task_item_id: @entry_item.id,
          title:UserKpiItemPresenter.new(self.taskable).task_title,
          due_flag: @entry_item.due?,
          to_due_at: @entry_item.to_due_at,
          dued_at: @entry_item.dued_at,
          status: @entry_item.status_display,
          status_value: @entry_item.status,
          kpi: KpiPresenter.new(self.kpi).as_basic_info(true),
          department: DepartmentPresenter.new(self.department).as_brief_info(false)
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