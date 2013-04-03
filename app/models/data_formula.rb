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
  
  def initialize args={}
    super
    self.key = self.class.gen_key unless args.key?("key")
  end
  
  def save
    if super
      $redis.zadd( DataFormula::FORMULA_ZSET_KEY, 0, self.key )
      true
    else
      false
    end
  end
  
  def self.selection_list( sIndex=0, eIndex=-1 )
    $redis.zrange(FORMULA_ZSET_KEY, sIndex, eIndex).map do |kFma|
      if d=DataFormula.find(kFma)
        {:kpiId=>d.key, :kpiName=>d.name, :kpiDesc=>d.desc }
      end
    end
  end
  
  def output
    @@list[self.key].call self
  end

  def total
    @total.to_f
  end
  
  
  def self.gen_key
    "FORMULA:#{$redis.incr 'epm_formula_incr_index'}"
  end
  
end
