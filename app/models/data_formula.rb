#encoding: utf-8
class DataFormula < Cz::BaseClass
  attr_accessor :formula, :name, :desc
  attr_accessor :people, :total, :production, :time
  
  FORMULA_ZSET_KEY="EPM_FORMULA_ZSET"
  @@list = {}
  
  $redis.zrange(FORMULA_ZSET_KEY, 0, -1).each do |kFma|
    fma = DataFormula.find(kFma)
    @@list[fma.key] = Proc.new { |obj| obj.instance_eval  fma.formula  }
  end
  
  def self.selection_list
    $redis.zrange(FORMULA_ZSET_KEY, 0, -1).map{|d| [d.formula, d.id] }
  end
  
  def output
    @@list[self.id].call self
  end

  def total
    @total.to_f
  end
  
  
  def self.gen_key
    "FORMULA:#{$redis.incr 'epm_formula_incr_index'}"
  end
  
end
