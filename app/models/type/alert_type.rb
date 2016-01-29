class AlertType
  TASK=100
  KPI_FOllOW=200
  SYSTEM=300
  # system
  ADD_TO_DISCUSSION=310
  ADD_TO_DEPARTMENT=320

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
      else
        'System Alert'
    end
  end

end