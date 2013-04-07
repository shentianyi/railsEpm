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
  
  def up_traversal
    
  end
  
# private

  def self.gen_key
    "ENTITY:#{$redis.incr 'epm_entity_incr_index'}"
  end
  
  def id
    self.key.sub("ENTITY:",'').to_i
  end
end