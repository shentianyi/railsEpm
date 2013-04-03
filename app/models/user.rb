#encoding: utf-8
class User < Cz::BaseClass
  attr_accessor :name
  attr_accessor :kEntity, :subscription
  
  
  def self.find_by_account( nr )
    k = gen_key_with_account( nr )
    self.find( k )
  end
  
  def entity
    Entity.find( self.kEntity )
  end
  
  def subscription_update( arr )
    self.update(subscription: arr.to_json)
  end
  
  def subscription
    JSON.parse( @subscription )
  end
  
  def self.gen_key_with_account( nr )
    "USER:#{nr}"
  end
  

end