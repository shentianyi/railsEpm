class ChartType
  Highchart = 0
  CurrentStatus = 1
  SummaryReport = 2
  StationData = 3
  TrackingReport = 4
  Defect = 5
  VehicleInfo = 6
  DailyDPV = 7
  DailyFTQ = 8

  def self.partial(type)
    case type
      when Highchart
        'chart'
      when CurrentStatus
        'current-status'
      when StationData
        'station-data'
      when DailyDPV
        'daily-dpv'
      when DailyFTQ
        'daily-ftq'
      else
        'demo'
    end
  end
end