#encoding: utf-8
require "c_z/redis_object"
class Entity < CZ::RedisObject
  attr_accessor :name
  
  
  def self.find_by_key( key )
    self.find( key )
  end
  
  
  
private

  def parent
    
  end
end