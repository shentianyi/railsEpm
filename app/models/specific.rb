#encoding: utf-8
class Specific < Cz::RedisObject
  attr_accessor :kEntity, :hFormula
  attr_accessor :leastKPI, :targetKPI, :warningKPI, :fatalKPI
  
  
  def save
    self.key ||= self.class.gen_key( self.kEntity, self.hFormula )
    self.warningKPI ||= (self.targetKPI*0.8).round(2)
    self.fatalKPI ||= (self.targetKPI*0.4).round(2)
    super
  end
  
  def self.find_by_kE_hF( kEntity, hFormula )
    k = gen_key( kEntity, hFormula )
    find( k )
  end
  
# private
  def self.gen_key( kEntity, hFormula )
    "SPECIFIC:entity:#{kEntity}:formula:#{hFormula}"
  end
    
end