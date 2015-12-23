class StorySet::StorySetStatus
  OPEN=0
  CLOSED=1

  def self.display(v)
    case v
      when 0
        'OPEN'
      when 1
        'CLOSED'
      else
        'CLOSED'
    end
  end

  def self.code(v)
    case v
      when 0
        'OPEN'
      when 1
        'CLOSED'
      else
        'CLOSED'
    end
  end
end