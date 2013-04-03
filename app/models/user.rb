#encoding: utf-8
class User < Cz::BaseClass
  attr_accessor :name
  attr_accessor :kEntity, :subscription
  
  
  def self.find( key )
    if key == "epm"
      user = User.new( :key=>"test", :name=>"administrator", :kEntity=>"Entity:MB" )
      user.save
    else
      user = nil
    end
    user
  end
  
  def entity
    Entity.find( self.kEntity )
  end
  
  def subscription=( arr )
    @subscription = arr.to_json
  end
  
  def subscription
    JSON.parse( @subscription )
  end
  
  
  

end