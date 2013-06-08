#encoding: utf-8
class Datum < Cz::RedisObject
  attr_accessor :kEntity, :hFormula, :type, :time
  attr_accessor :current, :state
  
  TIME_TREE = ["century", "year", "month", "day", "hour", "minute", "second"]
  
  # [功能：] 存储到 Redis ，自动生成 key 。
  def save
    self.current ||= 0
    self.state ||= $kpiState[:normal]
    self.type ||= "hour"
    self.time ||= self.class.time_to_str( self.type, Time.now )
    self.key ||= self.class.gen_key( self.kEntity, self.hFormula, self.type, self.time )
    if super
      zk = self.class.gen_key_zset( self.kEntity, self.hFormula, self.type )
      $redis.zadd( zk, Time.now.to_i, self.key )
      true
    else
      false
    end
  end
  
  # [功能：] （重定义）更新属性，需要根据当前值设置状态。
  def update attrs={}
    attrs[:state] = set_state_by_current(attrs[:current])  if attrs.key?( :current )
    super attrs
  end
  
  # [功能：] 从数据中心获取数据，并更新各项指标的值。
  def self.thrift_get( kEntity, hFormula )
      (0..4).each do |i|
        sleep 10
        result = $thrift.getOnJobPeopleNum(i,Time.now.to_i,Time.now.to_i)
        fma = DataFormula.find(hFormula)
        fma.people = result.value
        
        obj = self.new( :kEntity=>kEntity, :hFormula=>hFormula, :type=>"second", :current=>fma.output )
        obj.save
        entity = Entity.find( kEntity )
        entity.send( :up_traversal, obj.hFormula, obj.type, obj.time )
        obj.upstream_average
      end
  end
  
  # [功能：] 测试函数，从测试文件中读取数据，并更新各项指标的值。
  def self.fetch_raw
    sFile = File.join(Rails.root,"/tmp/test")
    rr=2+rand(10)
    
    fma = DataFormula.find("FORMULA:0")
    fmaRFT = DataFormula.find("FORMULA:1")
    fmaPPM = DataFormula.find("FORMULA:2")
    fmaE1 = DataFormula.find("FORMULA:3")
    CSV.foreach( sFile,:headers=>true,:col_sep=>";") do |col|
        next if $.!=rr
        # system "cd #{Rails.root}/tmp && echo EPM__cron: $(date) >> EPM_cron"
          fma.people = col["People"].to_i
          fmaRFT.rft = col["Rft"].to_i
          fmaRFT.out = col["Out"].to_i
          fmaPPM.defeat = col["Defeat"].to_i
          fmaPPM.out = col["Out"].to_i
          fmaE1.people = col["People"].to_i
          fmaE1.out = col["Out"].to_i
          ["ENTITY:MB", "ENTITY:COC"].each do |kEntity|
              [fma, fmaRFT, fmaPPM, fmaE1].each do |hF|
                  obj = self.new( :kEntity=>kEntity, :hFormula=>hF.key, :type=>"minute" )
                  obj.save
                  obj.update( :current=>hF.output )
                  entity = Entity.find( kEntity )
                  entity.send( :up_traversal, obj.hFormula, obj.type, obj.time )
                  obj.upstream_average
              end
          end
    end
  end
  
  # [功能：] 获取某工作单元对某项指标，在当前时间的值。
  def self.find_current( kEntity, hFormula, type )
    time = time_to_str( type, Time.now )
    k = gen_key( kEntity, hFormula, type, time )
    find( k )
  end
  
  # [功能：] 获取某工作单元对某项指标，在某时间点的值。
  def self.find_point( kEntity, hFormula, type, t )
    time = time_to_str( type, t )
    k = gen_key( kEntity, hFormula, type, time )
    find( k )
  end
  
  # [功能：] 在以时间分类数据的树结构中回溯。
  def upstream_average
    
    if self.son_nodes.size>0
      total = 0
      self.son_nodes.each do |kSon|
        node = Datum.find( kSon )
        total+=node.current.to_f
      end
      self.update(:current=> (total/self.son_nodes.size).round(2) )
      entity = Entity.find( self.kEntity )
      entity.send( :up_traversal, self.hFormula, self.type, self.time )
    end
    
    idx = Datum::TIME_TREE.index(self.type)
    if idx != 0
      if self.parent_nodes.size>0
        self.parent_nodes.each do |kParent|
          node = Datum.find( kParent )
          node.send(:upstream_average )
        end
      else
        sType = Datum::TIME_TREE[idx-1]
        parent = self.class.new( :kEntity=>self.kEntity, :hFormula=>self.hFormula, :type=>sType )
        parent.save
        self.add_parent( parent.key )
        parent.add_son( self.key )
        parent.send(:upstream_average )
      end
    end
    
  end
  
# private
    # [功能：] 生成 key 。
    def self.gen_key( kEntity, hFormula, type, time )
      "DATA:entity:#{kEntity}:formula:#{hFormula}:TYPE:#{type}:#{time}"
    end
    
    # [功能：] 生成附属zset类型数据的 key 。
    def self.gen_key_zset( kEntity, hFormula, type )
      "DATA_zset:entity:#{kEntity}:formula:#{hFormula}:TYPE:#{type}"
    end
    
    # [功能：] 根据类型，将时间转换为字符串。
    def self.time_to_str( type, time )
      case type.to_s
      when "century"  then  time.strftime('%Y')
      when "year" then time.strftime('%y')
      when "month" then time.strftime('%y/%m')
      when "day"  then  time.strftime('%y/%j')
      when "hour"  then  time.strftime('%y/%jT%H')
      when "minute"  then  time.strftime('%y/%jT%H:%M')
      when "second"  then  time.strftime('%y/%jT%X')
      end
    end
    
private
  # [功能：] 根据指标的计算值，设置此项指标的状态。
  def set_state_by_current( cur )
    level = $kpiState[:normal]
    if spec = Specific.find_by_kE_hF( self.kEntity, self.hFormula )
      target = spec.targetKPI.to_f
      warning = spec.warningKPI.to_f
      fatal = spec.fatalKPI.to_f
      least = spec.leastKPI.to_f
      return level if cur>=warning
      case cur
      when fatal...warning
        level = $kpiState[:warning]
      when least...fatal
        level = $kpiState[:fatal]
      else
        level = $kpiState[:unmarked]
      end
    end
    return level
  end
    
end