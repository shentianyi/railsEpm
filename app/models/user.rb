#encoding: utf-8
class User < CZ::RedisObject
  attr_accessor :name, :kEntity
  
  
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
    Entity.find_by_key( self.kEntity )
  end
  
  
  
private

  def parent
    
  end
end