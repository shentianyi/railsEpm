class ChartType
  Highchart = 0
  CurrentStatus = 1
  SummaryReport = 2
  StationData = 3
  TrackingReport = 44
  Defect = 5
  VehicleInfo = 6

  def self.partial(type)
    case type
      when Highchart
        'chart'
      when CurrentStatus
        'chart'
      else
        'chart'
    end
  end
end