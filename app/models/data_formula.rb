#encoding: utf-8
class DataFormula < Cz::BaseClass
  attr_accessor :formula, :name, :desc
  attr_accessor :people, :out, :rft, :defeat
  
  FORMULA_ZSET_KEY="EPM_FORMULA_ZSET"
  @@list = {}
  
  # [功能：] 当初始化 Rails 实例加载类时，执行此代码，将数据库中的公式加载为类实例。
  $redis.zrange(FORMULA_ZSET_KEY, 0, -1).each do |kFma|
    fma = DataFormula.find(kFma)
    @@list[fma.key] = Proc.new { |obj| obj.instance_eval  fma.formula  }
  end
  
  # [功能：] 存储到 Redis ，自动生成 key 。
  def save
    self.key ||= self.class.gen_key
    if super
      $redis.zadd( DataFormula::FORMULA_ZSET_KEY, 0, self.key )
      true
    else
      false
    end
  end
  
  # [功能：] 公式列表数组。
  def self.selection_list( sIndex=0, eIndex=-1 )
    $redis.zrange(FORMULA_ZSET_KEY, sIndex, eIndex).map do |kFma|
      if d=DataFormula.find(kFma)
        {:kpiId=>d.key, :kpiName=>d.name, :kpiDesc=>d.desc }
      end
    end
  end
  
  # [功能：] 所选公式的计算值。
  def output
    re = @@list[self.key].call( self )
    re.to_f.round(2)
  end

  # [功能：] 将结果转换为高精度的类型。
  def out
    BigDecimal(@out)
  end
  
  # [功能：] 生成 key 。
  def self.gen_key
    "FORMULA:#{$redis.incr 'epm_formula_incr_index'}"
  end
  
end
