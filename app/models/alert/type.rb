module Alert
  class Type
    TASK=100
    KPI_FOllOW=200
    SYSTEM=300
    # system
    ADD_TO_DISCUSSION=310
    ADD_TO_DEPARTMENT=320
    ASSIGN_KPI=330

    def self.display(type)
      case type
        when TASK
          'Task Alert'
        when KPI_FOllOW
          'Kpi Followed Alert'
        when ADD_TO_DISCUSSION
          'System Discussion Alert'
        when ADD_TO_DEPARTMENT
          'System Department Alert'
        when ASSIGN_KPI
          'System Assign Kpi alert'
        else
          'System Alert'
      end
    end

    def self.systems
      [ADD_TO_DISCUSSION,ADD_TO_DEPARTMENT,ASSIGN_KPI]
    end

  end
end