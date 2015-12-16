class KpiFollowFlag
  NONE=100
  PARTLY=200
  ALL=300
  NA=400

  def self.display(v)
    case v
      when 100
        'NONE'
      when 200
        'PARTLY'
      when 300
        'ALL'
      else
        'NA'
    end
  end

  def self.code(v)
    case v
      when 100
        'NONE'
      when 200
        'PARTLY'
      when 300
        'ALL'
      else
        'NA'
    end
  end
end