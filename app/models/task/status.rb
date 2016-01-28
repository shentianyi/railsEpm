module Task
  class Status
    PLANED=100
    DUE_IN_PLAN=200
    DUE_AFTER_PLAN=300

    def self.display v
      case v
        when PLANED
          'planed'
        when DUE_IN_PLAN
          'due in plan'
        when DUE_AFTER_PLAN
          'due after plan'
        else
          'planed'
      end
    end

    def self.all
     [PLANED,DUE_IN_PLAN,DUE_AFTER_PLAN]
    end

    def self.dues
      [Task::Status::DUE_IN_PLAN, Task::Status::DUE_AFTER_PLAN]
    end
  end
end