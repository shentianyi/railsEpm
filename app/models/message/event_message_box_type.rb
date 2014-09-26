class EventMessageBoxType
  STORY_SET_EVENT=100

  def self.types
    self.constants.collect { |c|
      self.const_get(c)
    }
  end
end