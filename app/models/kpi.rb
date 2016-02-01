class Kpi < ActiveRecord::Base


  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks


  belongs_to :kpi_category
  has_many :kpi_items, :dependent => :destroy
  has_many :kpi_parent_items, :class_name => 'KpiItem', :foreign_key => 'item_id'
  has_many :user_kpi_items, :dependent => :destroy
  has_many :base_kpis, :through => :kpi_items, :source => 'base_kpi'
  has_many :kpi_property_items, :dependent => :destroy
  has_many :kpi_properties, :through => :kpi_property_items

  has_many :kpi_property_values, through: :kpi_property_items
  has_many :department_kpis, :dependent => :destroy
  has_many :departments, :through => :department_kpis

  belongs_to :creator, :class_name => 'User', :foreign_key => 'user_id'

  has_one :user_group_relation, as: :user_groupable, :dependent => :destroy
  has_one :user_group, through: :user_group_relation
  has_many :user_group_items, through: :user_group

  has_many :kpi_subscribes,:dependent => :destroy
  has_many :kpi_user_subscribes,:dependent => :destroy

  has_many :story_sets

  #has_many :kpi_entries, :through => :user_kpi_items
  belongs_to :tenant
  attr_accessible :description, :direction, :frequency, :is_calculated, :period, :name, :target_max, :target_min, :unit, :formula, :formula_string, :user_group_id, :viewable, :calculate_method
  attr_accessible :kpi_category_id, :tenant_id, :user_id

  acts_as_tenant(:tenant)

  validate :validate_create_update

  def validate_create_update
    if !self.formula.blank?
      errors.add(:formula, I18n.t('manage.kpi.invalid')) if !FormulaValidator::complete_validate_infix(self.formula)
    end
    errors.add(:name, I18n.t('manage.kpi.cannot_repeat')) if self.class.where(:name => self.name, :kpi_category_id => self.kpi_category_id).first if new_record? # for create
    errors.add(:name, I18n.t('manage.kpi.cannot_repeat')) if self.class.where(:name => self.name, :kpi_category_id => self.kpi_category_id).where('id<>?', self.id).first unless new_record? # for update
  end


  mapping do
    indexes :name, type: :string, analyzer: :ik_max_word
    indexes :description, type: :string, analyzer: :ik_max_word
  end

  def self.parent_kpis_by_id id
    kpis= Kpi.joins(:kpi_items).where('kpi_items.item_id=?', id).all
    kpis.count>0 ? kpis : nil
  end

  def self.base_kpis current_ability
    self.accessible_by(current_ability).where(:is_calculated => false).all
  end

  def kpi_item_ids
    self.kpi_items.pluck(:item_id)
  end

  def calculate_formula(kpi_value)
    formula=self.formula.dump
    KpisHelper.parse_formula_items(formula).each do |item|
      formula.sub!("[#{item}]", kpi_value[item].to_s)
    end
    return formula.calculate
  end

  def self.ability_find_by_id id, current_ability
    self.accessible_by(current_ability).find_by_id(id)
  end

  def self.by_entity_group entity_group_id
    joins(:user_kpi_items).where(user_kpi_items: {entity_id: EntityGroupItem.where(entity_group_id: entity_group_id).pluck(:entity_id)})
        .uniq.select('kpis.id,name,description,kpis.target_max,kpis.target_min,kpi_category_id,kpis.frequency')
  end

  def unit_sym
    ::KpiUnit.get_entry_unit_sym(self.unit)
  end

  def add_properties attrs
    attrs.each { |attr|
      if item = KpiPropertyItem.where(kpi_id: self.id, kpi_property_id: attr.id).first

      else
        item = KpiPropertyItem.new(kpi_id: self.id, kpi_property_id: attr.id)
        item.save
        self.kpi_property_items<<item
      end
    }
    self.save
  end


  def self.accesses_by_user(user)
    partial_public_ids=Kpi.joins({user_group: :user_group_items}).where(viewable: KpiViewable::PARTIAL_PUBLIC, user_group_items: {user_id: user.id}).pluck(:id)
    partial_block_ids=Kpi.joins({user_group: :user_group_items}).where(viewable: KpiViewable::PARTIAL_BLOCK, user_group_items: {user_id: user.id}).pluck(:id)

    Kpi.where(tenant_id: user.tenant_id).where("(viewable=?) or (viewable=? and user_id=?) or (user_id=?) or (viewable=? and id in(?)) or (viewable=? and id not in(?))",
                                               KpiViewable::PUBLIC,
                                               KpiViewable::PRIVATE,
                                               user.id,
                                               user.id,
                                               KpiViewable::PARTIAL_PUBLIC,
                                               partial_public_ids,
                                               KpiViewable::PARTIAL_BLOCK,
                                               partial_block_ids
    ).uniq
  end

  def self.created_by_user(user)
    where(user_id: user.id)
  end

  def self.followed_by_user(user)
    Kpi.joins(:kpi_subscribes).where(kpi_subscribes: {user_id: user.id}).uniq
  end

  def follow_flag(user,department=nil)
    if department.blank?
      @follow_flag||=(KpiUserSubscribe.where(kpi_id: self.id, user_id: user.id).first || KpiUserSubscribe.new(follow_flag: Kpi::KpiFollowFlag::NONE))
    else
      kuss=KpiUserSubscribe.where(kpi_id: self.id, user_id: user.id, department_id: department.id)
      if kuss.blank?
        kuss_s=KpiUserSubscribe.where(kpi_id: self.id, user_id: user.id)
        if kuss_s.blank?
          @follow_flag||=KpiUserSubscribe.new(follow_flag: Kpi::KpiFollowFlag::NONE)
        else
          @follow_flag||=KpiUserSubscribe.new(follow_flag: Kpi::KpiFollowFlag::PARTLY)
        end

      else
        @follow_flag||=kuss.first
      end
    end
  end

  def followed?(user, department)
    self.kpi_subscribes.where(user_id: user.id, department_id: department.id).count>0
  end
end