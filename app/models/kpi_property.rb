class KpiProperty < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name,:user_id,:tenant_id
  belongs_to :user
  belongs_to :tenant
  has_many :kpi_property_items, :dependent => :destroy
  has_many :kpi_property_values, :through =>:kpi_property_items, :dependent => :destroy

  acts_as_tenant(:tenant)

  validate :validate_create_update
  validates :name, :presence => true

  def self.property_values kpi_id,kpi_property_id
    item = KpiPropertyItem.where("kpi_id = ? AND kpi_property_id = ?",kpi_id,kpi_property_id)
    if item.nil?
      nil
    else
      item.kpi_property_values.pluck(:value)
    end
  end

  def validate_create_update
    errors.add(:name, I18n.t('manage.kpi.cannot_repeat')) if self.class.where("BINARY name = ?",self.name).first if self.new_record?
    errors.add(:name, I18n.t('manage.kpi.cannot_repeat')) if self.class.where("BINARY name = ?",self.name).where('id<>?',self.id) unless new_record?
  end
end
