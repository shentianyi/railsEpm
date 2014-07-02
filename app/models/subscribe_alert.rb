class SubscribeAlert
  ALERTTYPE=["MAX","MIN"]

  def self.alert type,value,target
    self.send(type,value,target)
  end

  def self.MAX value,target
    if value >= target
      return true
    else
      return false
    end
  end

  def self.MIN value,target
    if value <= target
      return true
    else
      return false
    end
  end

  def self.display type
    case type
      when 'MAX'
        'aaa'
      when 'MIN'
        'bbb'
      else
        'NULL'
    end
  end

  def self.list_type
    ALERTTYPE.collect{|type| {type:type,display:display(type)} }
  end
end