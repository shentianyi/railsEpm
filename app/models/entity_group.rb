#encoding: utf-8
class EntityGroup < ActiveRecord::Base

  belongs_to :creator, :class_name => 'User', :foreign_key => :user_id
  belongs_to :department
  belongs_to :tenant
  #has_many :users
  belongs_to :tenant
  has_many :user_entity_groups, :dependent => :destroy
  has_many :entity_group_items, :dependent => :delete_all
  has_many :entities, :through => :entity_group_items
  has_many :entity_contacts, :as => :contactable, :dependent => :destroy
  has_many :contacts, :through => :entity_contacts, :source => :user
  has_many :chart_conditions, dependent: :destroy

  attr_accessible :name, :is_public, :description, :code, :department_id, :user_id, :tenant_id,:show_index
  acts_as_tenant(:tenant)

  attr_accessor :can_modify
  #,:parent,:ancestry,:is_department


  def can_modify_by_user user
    self.user_id==user.id #&& self.department.nil?
  end

  def can_destroy_by_user(user)
    self.user_id==user.id && self.department.nil?
  end

  def shared_user
    user_entity_groups.joins(:user).where(UserEntityGroup.arel_table[:user_id].not_eq(self.user_id))
        .select('users.id,users.first_name,users.email,user_entity_groups.id as user_entity_group_id')
  end

  def unshared_user
    User.where(role_id: Role.director).where(User.arel_table[:id].not_in(self.user_entity_groups.pluck(:user_id)))
        .select('users.first_name,users.email,users.id')
  end
end
