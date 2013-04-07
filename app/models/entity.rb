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
  
  def up_traversal( hFormula, type, time )

      if self.parent_nodes.size>0
        self.parent_nodes.each do |kParent|
          node = Entity.find( kParent )
          total = 0
          node.son_nodes.each do |kSon|
            kDatum = Datum.gen_key( kSon, hFormula, type, time )
            return false  unless datum = Datum.find( kDatum )
            total+=datum.current.to_f
          end
          kDatum = Datum.gen_key( kParent, hFormula, type, time )
          datum = Datum.find( kDatum )
          cur = (node.son_nodes.size.zero?) ? 0 : (total/self.son_nodes.size)
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