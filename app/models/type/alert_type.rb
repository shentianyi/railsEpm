class AlertType
  TaskAlert = 0
  KpiFollowedAlert = 100
  SystemAlert = 200

  def self.display(type)
    case type
      when TaskAlert
        'Task Alert'
      when KpiFollowedAlert
        'Kpi Followed Alert'
      when SystemAlert
        'System Alert'
      else
        'System Alert'
    end
  end
end