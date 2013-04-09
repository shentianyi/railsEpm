#encoding: utf-8
require 'digest/sha2'
class User < Cz::BaseClass
  attr_accessor :nr, :name, :password
  attr_accessor :pwd, :salt
  attr_accessor :kEntity, :subscription
  
  
  def initialize args={}
    self.password = args[:password] if args.key?(:password)
    args.delete(:password)
    super args
    self.key = self.class.gen_key_with_account(self.nr) unless args.key?("key")
  end
  
  def self.find_by_account( nr )
    k = gen_key_with_account( nr )
    find( k )
  end
  
  def entity
    Entity.find( self.kEntity )
  end
  
  def password=(password)
    if password.present?
          generate_salt
          self.pwd = self.class.encrypt_password(password, self.salt)
    end
  end
  
  def subscription_update( arr )
    self.update(subscription: arr.to_json)
  end
  
  def subscription
    JSON.parse( @subscription )
  end
  
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