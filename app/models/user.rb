#encoding: utf-8
class User < ActiveRecord::Base
  include Redis::Search
  belongs_to :tenant
  belongs_to :entity
  belongs_to :department
  has_many :kpi_subscribes, :dependent => :destroy
  has_many :kpi_subscribe_users, :dependent => :destroy
  has_many :kpi_notifier, :through => :kpi_subscribe_users, :source => :kpi_subscribes
  has_many :user_departments, :dependent => :destroy
  has_many :departments, :through => :user_departments
  has_many :create_departs, :class_name => 'Department'
  has_many :user_entity_groups, :dependent => :destroy
  has_many :entity_groups, :through => :user_entity_groups
  has_many :kpis, :through => :user_kpi_items
  has_many :user_kpi_items, :dependent => :destroy
  has_many :entity_contacts
  #has_many :kpi_entries, :through => :user_kpi_items
  has_many :emails, :dependent => :destroy
  #
  has_many :story_sets, :dependent => :destroy
  has_many :stories, :dependent => :destroy
  has_many :story_set_users
  has_many :collaborated_story_sets, :through => :story_set_users
  has_many :report_snaps

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation #, :remember_me
  attr_accessible :status, :perishable_token, :confirmed, :first_name, :last_name, :is_tenant
  attr_accessible :tenant_id, :role_id, :entity_id, :department_id, :is_sys, :title #, :department_group_id
  attr_accessible :tel, :phone, :image_url
  attr_accessible :stuff_id, :current_project_id, :current_location, :device_id, :is_online, :last_request_at

  #acts_as_authentic do |c|
  #  c.login_field = :email
  #  c.validate_email_field = false
  #  c.merge_validates_format_of_email_field_options :message => 'My message'
  #end
  # acts as tenant
  acts_as_tenant(:tenant)

  redis_search_index(:title_field => :first_name,
                     :condition_fields => [:tenant_id, :is_sys, :role_id, :entity_id],
                     :prefix_index_enable => true,
                     :ext_fields => [:email])

  def method_missing(method_name, *args, &block)
    if Role::RoleMethods.include?(method_name)
      Role.send(method_name, self.role_id)
    else
      super
    end
  end

  def self.uniq_attr
    ['email']
  end

  def confirmed?
    return true #self.confirmed
  end

  def lock (email)
    user = User.find_by_email(email)
    if user
      user.status = UserStatus::LOCKED
      return user.save
    else
      return false
    end
  end


  def image
    User.get_image(User.get_image_name(self.image_url))
  end

  def self.get_avatar (image_url)
    get_image(get_image_name(image_url))
  end

  def self.get_image_name(image_url)
    unless image_url.blank?
      #arr= self.image_url.match(/(avatar\/)(.*)\?/)
      #local
      arr= image_url.match(/(avatar\/)(.*)/)
      return arr[2] if arr && arr.size==3
    else
      return ''
    end
  end

  def self.get_image(image_name)
    '/avatars/'+ image_name
  end

  def deliver_user_confirmation!
    reset_perishable_token!
    UserConfirmationMailer.deliver_confirmation(self).deliver
  end

  def deliver_user_password_reset!
    reset_perishable_token!
    UserConfirmationMailer.deliver_password_reset(self).deliver
  end

  def create_tenant_user!(first_name,email, password, password_confirmation, company_name)
    self.first_name=first_name
    self.email=email
    self.password=password
    self.password_confirmation=password_confirmation

    @tenant= Tenant.new(:company_name => company_name,
                        :edition => $trial_edition,
                        :subscription_status => SubscriptionStatus::TRIAL,
                        :expire_at => 1500.days.from_now)

    begin
      ActiveRecord::Base.transaction do
        @tenant.super_user=self
        self.tenant = @tenant
        self.status = UserStatus::ACTIVE
        self.is_tenant=true
        @tenant.save!
        self.save!
        @tenant.update_attributes :user_id => self.id
        return self
      end
    rescue ActiveRecord::RecordInvalid => invalid
      raise invalid
    end
  end

  def self.by_role role
    joins('left join entities on users.entity_id=entities.id')
    .joins('left join departments on users.department_id=departments.id')
    .where(role_id: role)
    .select('users.*,entities.name as entity_name,departments.name as department_name')
  end

  def role
    Role.display self.role_id
  end

  def department_names
    self.departments.pluck(:name).join(',')
  end

  def self.contact_attrs
    'users.id,users.first_name as name,users.tel,users.phone,users.email,users.title,users.image_url'
  end


  alias :devise_valid_password? :valid_password?

  def valid_password?(password)
    begin
      super(password)
    rescue BCrypt::Errors::InvalidHash
      stretches = 20
      digest = [password, self.password_salt].flatten.join('')
      stretches.times { digest = Digest::SHA512.hexdigest(digest) }
      if digest == self.encrypted_password
        self.encrypted_password = self.password_digest(password)
        self.save
        return true
      else
        return false
      end
    end
  end


  #待测试
  def insert_guide_template
    if self.id
      $redis_guid.hmset(self.id, $user_guide_template)
    end
  end

  def remove_guide_item(controller_name, action_name)
    $redis_guid.hdel(self.id, make_guide_key(controller_name, action_name))
  end

  def add_guide_item (controller_name, action_name)
    if !has_guide_item(controller_name, action_name)
      $redis_guid.hset(self.id, make_guide_key(controller_name, action_name), nil)
    end
  end

  def has_guide_item(controller_name, action_name)
    return $redis_guid.hexists(self.id, make_guide_key(controller_name, action_name))
  end

  def make_guide_key(controller_name, action_name)
    return controller_name.downcase + '/' + action_name.downcase
  end


end
