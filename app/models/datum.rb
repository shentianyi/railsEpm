#encoding: utf-8
class Datum < Cz::RedisObject
  attr_accessor :kEntity, :hFormula, :type, :time
  attr_accessor :current, :state
  
  TIME_TREE = ["century", "year", "month", "day", "hour"]
  
  
  def initialize args={}
    super
    self.type = args[:type] || args["type"] || "hour"
    self.time = self.class.time_to_str( self.type, Time.now ) unless args.key?("time")
    self.key = self.class.gen_key( self.kEntity, self.hFormula, self.type, self.time ) unless args.key?("key")
    self.current = 0 unless args.key?("current") 
  end
  
  def self.fetch_raw( kEntity, hFormula )
    # sFile = File.join(Rails.root,"/tmp/test")
    # hFile = File.open( sFile,"r")
    # while line = hFile.gets
      # puts line
    # end
    
    # CSV.foreach(hFile,:headers=>true,:col_sep=>$CSVSP) do |row|
    nature = 
    time
    self.new( :kEntity=>kEntity, :hFormula=>hFormula, :type=>"hour" )
  end
  
  def self.find_current( kEntity, hFormula, type )
    time = time_to_str( type, Time.now )
    k = gen_key( kEntity, hFormula, type, time )
    find( k )
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
        sTime = self.class.time_to_str( sType, Time.now )
        kParent = self.class.gen_key( kEntity, hFormula, sType, sTime )
        self.add_parent( kParent )
      end
    end
    
  end
  
# private
    def self.gen_key( kEntity, hFormula, type, time )
      "DATA:entity:#{kEntity}:formula:#{hFormula}:TYPE:#{type}:#{time}"
    end
    
    def self.time_to_str( type, time )
      case type
      when "century"  then  time.strftime('%y')
      when "year" then time.strftime('%y')
      when "month" then time.strftime('%y%m')
      when "day"  then  time.strftime('%y%m%d')
      when "hour"  then  time.strftime('%y%m%d')
      end
    end
    
end