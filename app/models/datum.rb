#encoding: utf-8
class Datum < Cz::RedisObject
  attr_accessor :kEntity, :hFormula, :type, :time
  attr_accessor :current, :state
  
  TIME_TREE = ["century", "year", "month", "day", "hour", "minute", "second"]
  
  
  def initialize args={}
    super
    self.type = args[:type] || args["type"] || "hour"
    self.time = self.class.time_to_str( self.type, Time.now ) unless args.key?("time")
    self.current = args[:current] || args["current"] || 0
    self.state = args[:state] || args["state"] || $kpiState[:normal]
    self.key = self.class.gen_key( self.kEntity, self.hFormula, self.type, self.time ) unless args.key?("key")
  end
  
  def save
    if super
      zk = self.class.gen_key_zset( self.kEntity, self.hFormula, self.type )
      $redis.zadd( zk, Time.now.to_i, self.key )
      true
    else
      false
    end
  end
  
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
  
  def self.fetch_raw( kEntity, hFormula )
    sFile = File.join(Rails.root,"/tmp/test")
    # hFile = File.open( sFile,"r")
    # while line = hFile.gets
      # puts line
    # end
    
    fma = DataFormula.find(hFormula)
    CSV.foreach( sFile,:headers=>true,:col_sep=>";") do |row|
        sleep 10
        fma.people = row["People"].to_i
        obj = self.new( :kEntity=>kEntity, :hFormula=>hFormula, :type=>"second", :current=>fma.output )
        obj.save
        entity = Entity.find( kEntity )
        entity.send( :up_traversal, obj.hFormula, obj.type, obj.time )
        obj.upstream_average
    end
  end
  
  def self.find_current( kEntity, hFormula, type )
    time = time_to_str( type, Time.now )
    k = gen_key( kEntity, hFormula, type, time )
    find( k )
  end
  
  def self.find_point( kEntity, hFormula, type, t )
    time = time_to_str( type, Time.now )
    k = gen_key( kEntity, hFormula, type, time )
    find( k )
  end
  
  def upstream_average
    
    if self.son_nodes.size>0
      total = 0
      self.son_nodes.each do |kSon|
        node = Datum.find( kSon )
        total+=node.current.to_f
      end
      self.update(:current=> total/self.son_nodes.size)
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
    def self.gen_key( kEntity, hFormula, type, time )
      "DATA:entity:#{kEntity}:formula:#{hFormula}:TYPE:#{type}:#{time}"
    end
    
    def self.gen_key_zset( kEntity, hFormula, type )
      "DATA_zset:entity:#{kEntity}:formula:#{hFormula}:TYPE:#{type}"
    end
    
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
    
end