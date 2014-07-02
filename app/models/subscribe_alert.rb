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
        I18n.t 'subscription.alert-type.max'
      when 'MIN'
        I18n.t 'subscription.alert-type.min'
      else
        I18nt 'subscription.alert-type.error'
    end
  end

  def self.list_type
    ALERTTYPE.collect{|type| {type:type,display:display(type)} }
  end
end