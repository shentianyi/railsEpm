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
  end
end