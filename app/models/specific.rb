#encoding: utf-8
class Specific < Cz::RedisObject
  attr_accessor :kEntity, :hFormula
  attr_accessor :leastKPI, :targetKPI, :currentKPI
  
  
  def initialize args={}
    super
    self.key = self.class.gen_key( self.kEntity, self.hFormula ) unless args.key?("key")
  end
  
  def self.find_current( kEntity, hFormula )
    k = gen_key( kEntity, hFormula )
    find( k )
  end
  
# private
  def self.gen_key( kEntity, hFormula )
    "SPECIFIC:entity:#{kEntity}:formula:#{hFormula}"
  end
    
end