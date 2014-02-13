#encoding: utf-8
class User < ActiveRecord::Base

  belongs_to :tenant
  belongs_to :entity
  belongs_to :entity_group
  has_many :entity_groups,:dependent=>:destroy
  has_many :kpis,:through=>:user_kpi_items
  has_many :user_kpi_items,:dependent=>:destroy
  has_many :kpi_entries, :through=>:user_kpi_items
  has_many :emails, :dependent=>:destroy

  attr_accessible :email, :password, :password_confirmation,:status,:perishable_token,:confirmed,:first_name,:last_name,:is_tenant
  attr_accessible :tenant_id,:role_id,:entity_id,:is_sys,:title,:entity_group_id

  acts_as_authentic do |c|
    c.login_field = :email
    c.validate_email_field = false
    c.merge_validates_format_of_email_field_options :message => 'My message'
  end
  # acts as tenant
  acts_as_tenant(:tenant)

  def method_missing(method_name,*args,&block)
    if Role::RoleMethods.include?(method_name)
      Role.send(method_name,self.role_id)
    else
      super
    end
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

  def deliver_user_confirmation!
    reset_perishable_token!
    UserConfirmationMailer.deliver_confirmation(self).deliver
  end

  def deliver_user_password_reset!
    reset_perishable_token!
    UserConfirmationMailer.deliver_password_reset(self).deliver
  end

  def create_tenant_user!(email,password,password_confirmation,company_name)
    self.email=email
    self.password=password
    self.password_confirmation=password_confirmation

    @tenant= Tenant.new(:company_name=>company_name,
                        :edition=>$trial_edition,
                        :subscription_status=>SubscriptionStatus::TRIAL,
                        :expire_at=>15.days.from_now)

    begin
      ActiveRecord::Base.transaction do
        @tenant.super_user=self

        self.tenant = @tenant
        self.status = UserStatus::ACTIVE
        self.is_tenant=true
        @tenant.save!
        self.save!
        @tenant.update_attributes :user_id=>self.id
        return self
      end
    rescue ActiveRecord::RecordInvalid => invalid
      raise invalid
    end
  end

  def self.by_role role
    self.joins('left join entities on users.entity_id=entities.id')
    .joins('left join entity_groups on users.entity_group_id=entity_groups.id')
    .where(role_id:role)
    .select('users.*,entities.name as entity_name,entity_groups.name as entity_group_name')
  end

  def role
    Role.display self.role_id
  end

  #待测试
  def insert_guide_template
    if self.id
      $redis_guid.hmset(self.id,$user_guide_template)
    end
  end

  def remove_guide_item(controller_name,action_name)
     $redis_guid.hdel(self.id,make_guide_key(controller_name,action_name))

  end

  def add_guide_item (controller_name,action_name)
    if !has_guide_item(controller_name,action_name)
        $redis_guid.hset(self.id,make_guide_key(controller_name,action_name),nil)
    end
  end

  def has_guide_item(controller_name,action_name)
    return $redis_guid.hexists(self.id,make_guide_key(controller_name,action_name))
  end

  def make_guide_key(controller_name,action_name)
    return controller_name.downcase  + '/' + action_name.downcase
  end


end
