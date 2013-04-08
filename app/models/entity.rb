#encoding: utf-8
class Entity < Cz::RedisObject
  attr_accessor :name, :kContact
  
  def initialize args={}
    super
    self.key = self.class.gen_key unless args.key?("key")
  end
  
  def add_contact( contact )
    self.update(kContact: contact.key)
    contact.update(kEntity: self.key)
  end
  
  def contact
    Contact.find( self.kContact )
  end
  
  def contact_hash
    hash = $redis.hgetall( self.kContact )
    hash.delete( "kEntity" )
    hash[:personId] = hash["key"]
    hash.delete( "key" )
    hash
  end
  
  def up_traversal( hFormula, type, time )

      if self.parent_nodes.size>0
        self.parent_nodes.each do |kParent|
          node = Entity.find( kParent )
          total = 0
          denominator = 0
          node.son_nodes.each do |kSon|
            kDatum = Datum.gen_key( kSon, hFormula, type, time )
            next  unless datum = Datum.find( kDatum )
            # return false  unless datum = Datum.find( kDatum )
            total+=datum.current.to_f
            denominator += 1
          end
          cur = (denominator.zero?) ? 0 : (total/denominator)
          kDatum = Datum.gen_key( kParent, hFormula, type, time )
          unless datum = Datum.find( kDatum )
            datum = Datum.new( :kEntity=>kParent, :hFormula=>hFormula, :type=>type, "time"=>time )
            datum.save
          end
          datum.update(:current=> cur)
          node.send(:up_traversal, hFormula, type, time )
        end
      end
      
  end
  
# private

  def self.gen_key
    "ENTITY:#{$redis.incr 'epm_entity_incr_index'}"
  end
  
  def id
    self.key.sub("ENTITY:",'').to_i
  end
end