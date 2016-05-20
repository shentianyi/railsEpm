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
  DefectInfo = 9
  Float = 10
  TopIssue = 11
  WeeklyReport = 12
  WaitTimeInHours = 13
  CycleTimeInHours = 14
  WorkingTimeInHours = 15
  TVCycleTime = 101
  MovingTime = 102
  HistoryDetail = 103
  MovingAndCycleTime = 104

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
      when WaitTimeInHours
        'wait-time-in-hours'
      when CycleTimeInHours
        'cycle-time-in-hours'
      when WorkingTimeInHours
        'working-time-in-hours'
      when TVCycleTime
        'tv_cycle_time'
      when MovingTime
        'moving-time'
      when HistoryDetail
        'history-detail'
      when MovingAndCycleTime
        'moving-cycle'
      else
        'demo'
    end
  end
end