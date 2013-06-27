#encoding: utf-8
class User < ActiveRecord::Base
  belongs_to :tenant
  has_many :user_entities
  attr_accessible :email, :first_name, :is_tenant, :last_name, :password, :remember_token, :remember_token_expires_at, :role_id, :salt, :status
  attr_accessible :input_password
  before_save :encrypt_password

  # acts as tenant
  acts_as_tenant(:tenant)

  def input_password
    @input_password
  end

  def input_password=(input_password)
    @input_password=input_password
  end

  def self.encrypt(input_password,salt)
    Digest::SHA2.hexdigest("--ifepm--#{input_password}--#{salt}--")
  end

  def encrypt(input_password)
    self.class.encrypt(input_password,self.salt)
  end

  def self.authenticate(email,input_password)
    u=find_by_email(email)
    u&&u.authenticated?(input_password) ? u : nil
  end

  def authenticated?(input_password)
    self.password==encrypt(input_password)
  end

  def remember_token?
    self.remember_token_expires_at && (Time.now.utc<remember_token_expires_at)
  end

  def remember_me
    self.remember_token_expires_at=2.weeks.from_now.utc
    self.remember_token=encrypt("#{self.salt}--#{remember_token_expires_at}")
    self.save(:validate=>false)
  end

  def forget_me
    self.remember_token_expires_at=self.remember_token=nil
    self.save(:validate=>false)
  end
  private

  def encrypt_password
    return if input_password.blank?
    self.salt=Digest::SHA2.hexdigest("--#{SecureRandom.uuid}--") if new_record?
    self.password=encrypt(input_password)
  end
end
