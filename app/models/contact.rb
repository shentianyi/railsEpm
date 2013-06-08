#encoding: utf-8
class Contact < Cz::BaseClass
  attr_accessor :key, :title, :name, :email, :tel, :photoUrl
  attr_accessor :kEntity
  
  # [功能：] 存储到 Redis ，自动生成 key 。
  def save
    self.key ||= self.class.gen_key
    super
  end
  
  # [功能：] 获取工作单元的对象
  def entity
    Entity.find( self.kEntity )
  end
  
  
  # [功能：] 生成 key 。
  def self.gen_key
    "CONTACT:#{$redis.incr 'epm_contact_incr_index'}"
  end
  
end