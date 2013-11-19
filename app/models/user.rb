#encoding: utf-8
class User < ActiveRecord::Base

  belongs_to :tenant
  belongs_to :entity

  has_many :entity_groups,:dependent=>:destroy
  has_many :kpis,:through=>:user_kpi_items
  has_many :user_kpi_items,:dependent=>:destroy
  has_many :kpi_entries, :through=>:user_kpi_items

  attr_accessible :email, :password, :password_confirmation,:status,:perishable_token,:confirmed,:first_name,:last_name,:is_tenant
  attr_accessible :tenant_id,:role_id,:entity_id,:is_sys

  acts_as_authentic do |c|
    c.login_field = :email
  end
  # acts as tenant
  acts_as_tenant(:tenant)

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

  def ability_entity_groups current_ability
    self.entity_groups.accessible_by(current_ability)
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
    return $redis_guid.hexists(self.id,controller_name,action_name)
  end

  def make_guide_key(controller_name,action_name)
    return controller_name.downcase  + '/' + action_name.downcase
  end


end
