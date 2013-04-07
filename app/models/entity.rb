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
    if self.son_nodes.size>0
      total = 0
      self.son_nodes.each do |kSon|
        node = Entity.find( kSon )
        total+=node.current.to_f
      end
      self.update(:current=> total/self.son_nodes.size)
      kDatum = Datum.gen_key( self.key, hFormula, type, time )
      entity = Datum.find( kDatum )
      entity.send( :up_traversal, hFormula, type, time )
    end
    
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
  
# private

  def self.gen_key
    "ENTITY:#{$redis.incr 'epm_entity_incr_index'}"
  end
  
  def id
    self.key.sub("ENTITY:",'').to_i
  end
end