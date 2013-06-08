#encoding: utf-8
class Specific < Cz::RedisObject
  attr_accessor :kEntity, :hFormula
  attr_accessor :leastKPI, :targetKPI, :warningKPI, :fatalKPI
  
  # [功能：] 存储到 Redis ，自动生成 key 。
  def save
    self.key ||= self.class.gen_key( self.kEntity, self.hFormula )
    self.warningKPI ||= (self.targetKPI*0.8).round(2)
    self.fatalKPI ||= (self.targetKPI*0.4).round(2)
    super
  end
  
  # [功能：] （find）根据工作单元号和公式找到定制信息。
  def self.find_by_kE_hF( kEntity, hFormula )
    k = gen_key( kEntity, hFormula )
    find( k )
  end
  
# private
  # [功能：] 生成 key 。
  def self.gen_key( kEntity, hFormula )
    "SPECIFIC:entity:#{kEntity}:formula:#{hFormula}"
  end
    
end