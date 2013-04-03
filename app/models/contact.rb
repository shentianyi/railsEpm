#encoding: utf-8
class Contact < Cz::BaseClass
  attr_accessor :key, :title, :name, :email, :tel, :photoUrl
  attr_accessor :kEntity
  
  def initialize args={}
    super
    self.key = self.class.gen_key unless args.key?("key")
  end
  
  def entity
    Entity.find( self.kEntity )
  end
  
  
  
  def self.gen_key
    "CONTACT:#{$redis.incr 'epm_contact_incr_index'}"
  end
  
end