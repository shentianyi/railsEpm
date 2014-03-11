class Department < ActiveRecord::Base
  # attr_accessible :title, :body

  attr_accessible :name, :parent, :ancestry, :user_id, :tenant_id
  attr_accessor :default_entity
  belongs_to :creator, :class_name => 'User', :foreign_key => :user_id
  belongs_to :tenant

  has_many :entities
  has_one :entity_group, :dependent => :destroy

  has_many :department_kpis, :dependent => :destroy
  has_many :kpis, :through => :department_kpis
  has_many :user_departments, :dependent => :destroy
  has_many :users, :through => :user_departments

  after_create :create_entity_group

  has_ancestry
  acts_as_tenant(:tenant)

  validate :validate_create_update
  validates :name, presence: true

  #private
  def create_entity_group
    #create the entity_group belongs to the department
    entity_group = EntityGroup.new(:name => self.name, :department_id => self.id)
    entity_group.creator = self.creator
    entity_group.entities<<self.default_entity if self.default_entity
    entity_group.save!
  end

  def validate_create_update
    errors.add(:name, I18n.t("fix.cannot_repeat")) if Department.where(:name => self.name, :tenant_id => self.tenant_id).first if new_record?
    errors.add(:name, I18n.t("fix.cannot_repeat")) if Department.where(:name => self.name, :tenant_id => self.tenant_id).where('id <> ?', self.id).first unless new_record?
  end
end
