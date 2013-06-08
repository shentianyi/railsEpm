#encoding: utf-8
require 'digest/sha2'
class User < Cz::BaseClass
  attr_accessor :nr, :name, :password
  attr_accessor :pwd, :salt
  attr_accessor :kEntity, :subscription
  
  
  # [功能：] 存储到 Redis ，自动生成 key 。（需要妥善处理密码）
  def initialize args={}
    self.password = args[:password] if args.key?(:password)
    args.delete(:password)
    super args
    self.subscription = args[:subscription]||"{}"  unless args.key?("subscription")
    self.key = self.class.gen_key_with_account(self.nr) unless args.key?("key")
  end
  
  # [功能：] （find）根据 nr 找用户对象。
  def self.find_by_account( nr )
    k = gen_key_with_account( nr )
    find( k )
  end
  
  # [功能：] 获取工作台对象。
  def entity
    Entity.find( self.kEntity )
  end
  
  def password=(password)
    if password.present?
          generate_salt
          self.pwd = self.class.encrypt_password(password, self.salt)
    end
  end
  
  # [功能：] 更新订阅指标。
  def subscription_update( kEntity, arr )
    hash = JSON.parse( @subscription )
    hash[kEntity] = arr
    self.update(subscription: hash.to_json)
  end
  
  # [功能：] 获取订阅的指标。
  def subscription( kEntity )
    hash = JSON.parse( @subscription )
    return hash[kEntity]  if hash.key?(kEntity)
    entity = Entity.find( kEntity )
    return [] if entity.parent_nodes.blank?
    kParent = entity.parent_nodes.first
    return [] unless hash.key?(kParent)
    hash[kEntity] = hash[kParent]
    self.update(subscription: hash.to_json)
    return hash[kEntity]
  end
  
  # [功能：] 生成 key 。
  def self.gen_key_with_account( nr )
    "USER:#{nr}"
  end
  
  def self.authenticate( nr, password)
        if staff = find_by_account( nr )
              if staff.pwd == encrypt_password(password, staff.salt)
                   staff
              end
        end
  end
  def self.encrypt_password(password, salt)
        Digest::SHA2.hexdigest(password + "epm" + salt)
  end


  private
      def generate_salt
            self.salt = self.object_id.to_s + rand.to_s
      end

end