#encoding: utf-8
class User < ActiveRecord::Base
  include Redis::Search

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

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
  has_many :entities, :through => :entity_groups
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

  #
  has_many :user_invites
  has_many :user_groups

  has_many :access_tokens, class_name: 'Doorkeeper::AccessToken', foreign_key: :resource_owner_id


  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation #, :remember_me
  attr_accessible :status, :perishable_token, :confirmed, :first_name, :last_name, :nick_name, :is_tenant
  attr_accessible :tenant_id, :role_id, :entity_id, :department_id, :is_sys, :title #, :department_group_id
  attr_accessible :tel, :phone, :image_url
  attr_accessible :stuff_id, :current_project_id, :current_location, :device_id, :is_online, :last_request_at

  validates_presence_of :nick_name, message: 'can not be blank'

  after_create :create_view_and_entity_for_general_user
  after_create :generate_access_token

  #acts_as_authentic do |c|
  #  c.login_field = :email
  #  c.validate_email_field = false
  #  c.merge_validates_format_of_email_field_options :message => 'My message'
  #end
  # acts as tenant
  acts_as_tenant(:tenant)

  redis search
  redis_search_index(:title_field => :nick_name,
                     :condition_fields => [:tenant_id, :is_sys, :role_id, :entity_id],
                     :prefix_index_enable => true,
                     :ext_fields => [:email])


  def create_view_and_entity_for_general_user
    #name code description tenant_id
    if self.entity.nil?
      #create entity
      args = {}
      args[:description] = args[:code] = args[:name] = (self.first_name||self.nick_name)
      entity = Entity.new(args)
      if entity.save
        #update user
        user = User.find_by_id(self.id)
        raise "Sorry, Update User's Entity failed!" if user.blank?
        user.update_attributes :entity_id => entity.id
      else
        raise "Sorry, Build default Entity failed!"
      end
    end if self.tenant.settings(:entity).auto_create_for_general_user

    #name user_id tenant_id
    if self.entity_groups.blank?
      args = {}
      args[:name] = self.first_name
      args[:user_id] = self.id
      args[:tenant_id] = self.tenant.id
      entity_group = EntityGroup.new(args)
      unless entity_group.save
        raise "Sorry, Build default Entity Groups failed!"
      end
    end if self.tenant.settings(:entity_group).auto_create_for_general_user
  end

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
    true #self.confirmed
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

  def create_tenant_user!(first_name, email, password, password_confirmation, company_name)
    self.first_name=first_name
    self.nick_name=first_name
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
    'users.id,users.nick_name as name,users.tel,users.phone,users.email,users.title,users.image_url'
  end


  # the last access token for user
  def access_token
    access_tokens.where(application_id: System.default_app.id,
                        revoked_at: nil).where('date_add(created_at,interval expires_in second) > ?', Time.now.utc).
        order('created_at desc').
        limit(1).
        first || generate_access_token
  end


  # user root user_departments
  def root_user_departments
    uds=self.user_departments.joins(:department)
    udids=uds.collect { |u| u.department_id }
    uds.reject { |u| udids.include?(u.department.parent_id) }
  end

  # private
  # generate token
  def generate_access_token
    if System.default_app
      Doorkeeper::AccessToken.create!(application_id: System.default_app.id,
                                      resource_owner_id: self.id,
                                      expires_in: Doorkeeper.configuration.access_token_expires_in)
    end
  end


end
