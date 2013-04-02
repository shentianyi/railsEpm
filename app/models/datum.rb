#encoding: utf-8
class Datum < CZ::RedisObject
  attr_accessor :type, :current
  
  TIME_TREE = ["century", "year", "month", "day", "hour"]
  
  def initialize args={}
    self.gen_key()
    
    
    if self.respond_to?(:default)
      self.default.each do |k,v|
        instance_variable_set "@#{k}",v
      end
    end
    
    args.each do |k,v|
      instance_variable_set "@#{k}",v
    end
    
  end
  
  def self.fetch_raw( kEntity, hFormula )
    sFile = File.join(Rails.root,"/tmp/test")
    hFile = File.open( sFile,"rw")
    while line = hFile.gets
      puts line
    end
    
    # CSV.foreach(hFile,:headers=>true,:col_sep=>$CSVSP) do |row|
    # nature = 
    # time
    # self.new(:nature=>:h)
  end
  
  def trace_average
    
    if self.son_nodes.size>0
      total = 0
      self.son_nodes.each do |kSon|
        node = Datum.find( kSon )
        total+=node.current
      end
      self.current = total
    end
    
    idx = Datum::TIME_TREE.index(self.type)
    if idx != 0
      if self.parent_nodes.size>0
        self.parent_nodes.each do |kParent|
          node = Datum.find( kParent )
          node.send(:trace_average)
        end
      else
        sType = Datum::TIME_TREE[idx-1]
        sTime = self.time_to_str( sType, Time.now )
        kParent = self.gen_key( kEntity, hFormula, sType, sTime )
        self.add_parent( kParent )
      end
    end
    
  end
  
private
    def gen_key( kEntity, hFormula, type, time )
      "DATA:entity:#{kEntity}:formula:#{hFormula}:TYPE:#{type}:#{time}"
    end
    
    def time_to_str( type, time )
      case type
      when "century"  then  time.strftime('%y')
      when "year" then time.strftime('%y')
      when "month" then time.strftime('%y%m')
      when "day"  then  time.strftime('%y%m%d')
      when "hour"  then  time.strftime('%y%m%d')
      end
    end
    
end