#encoding: utf-8
class Kpi::KpiPropertyType
  TEXT=100
  NUMBER=200
  LOCATION=300

  def self.display(v)
    case v
      when TEXT
        'Text'
      when NUMBER
        'Number'
      when LOCATION
        'Location'
      else
        'Text'
        # raise 'Error Kpi Property value'
    end
  end

  def self.code(v)
    case v
      when "text"
        TEXT
      when "number"
        NUMBER
      when "localtion"
        LOCATION
      else
        TEXT
    end
  end
end