class Kpi::KpiFollowFlag
  NONE=0
  PARTLY=1
  ALL=2
  NA=3

  def self.display(v)
    case v
      when 0
        'NONE'
      when 1
        'PARTLY'
      when 2
        'ALL'
      else
        'NA'
    end
  end

  def self.code(v)
    case v
      when 0
        'NONE'
      when 1
        'PARTLY'
      when 2
        'ALL'
      else
        'NA'
    end
  end
end