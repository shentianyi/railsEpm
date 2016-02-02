class Department < ActiveRecord::Base
  # attr_accessible :title, :body

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  attr_accessible :name, :parent, :ancestry, :description, :user_id, :tenant_id
  # attr_accessor :default_entity
  belongs_to :creator, :class_name => 'User', :foreign_key => :user_id
  belongs_to :tenant

  has_many :entities
  has_one :entity_group, :dependent => :destroy

  has_many :department_kpis, :dependent => :destroy
  has_many :kpis, :through => :department_kpis
  has_many :user_departments, :dependent => :destroy
  has_many :users, :through => :user_departments

  has_many :kpi_subscribes,:dependent => :destroy
  has_many :kpi_user_subscribes,:dependent => :destroy

  has_many :user_kpi_items,:dependent => :destroy

  # scope :default_entity, include(:entities),  where(is_default: true,department_id: self.id).first
  #after_create :create_entity_group

  has_one :default_entity, conditions:{is_default: true},class_name: 'Entity'

  has_ancestry
  acts_as_tenant(:tenant)

  #validate :validate_create_update
  validates_presence_of :name, presence: true, message: 'can not be blank'
  validates_uniqueness_to_tenant :name, message: 'should be uniq'

  mapping do
    indexes :name,type: :string, analyzer: :ik_max_word
    indexes :description,type: :string, analyzer: :ik_max_word
  end


  # def validate_create_update
  #   errors.add(:name, I18n.t("fix.cannot_repeat")) if Department.where(:name => self.name, :tenant_id => self.tenant_id).first if new_record?
  #   errors.add(:name, I18n.t("fix.cannot_repeat")) if Department.where(:name => self.name, :tenant_id => self.tenant_id).where('id <> ?', self.id).first unless new_record?
  # end

  def manageable(user)
    user.admin? || user.user_departments.joins(:department).where(department_id: self.path_ids, is_manager: true).count>0
  end

  def access_childreable(user)
    user.user_departments.joins(:department).where(department_id: self.path_ids).count>0
  end

  def self.all_departments(user)
    Department.subtree_ofs(user.root_departments)
  end

  def self.json_tree(nodes)
    nodes.map do |node, sub_nodes|
      {:id => node.id, :name => node.name, :data => {}, :children => json_tree(sub_nodes).compact}
    end
  end
end
