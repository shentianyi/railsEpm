class KpiPropertyValue < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :value, :count, :kpi_property_item_id

  belongs_to :kpi_property_item
  #delegate :kpi_property, to: :kpi_property_item
delegate :kpi,to: :kpi_property_item
  def self.by_property_id(kpi_id, property_id)
    joins(:kpi_property_item).where(kpi_property_items: {kpi_id: kpi_id, kpi_property_id: property_id})
    .select('kpi_property_values.*,kpi_property_items.kpi_property_id')
  end

  def self.by_kpi_id(kpi_id)
    #joins(kpi_property_item: :kpi_property).where(kpi_property_items: {kpi_id: kpi_id})
    #.select('kpi_property_values.*,kpi_properties.name as property_name,kpi_properties.id as property_id')

    joins('right join kpi_property_items on kpi_property_items.id=kpi_property_values.kpi_property_item_id inner join kpi_properties as k on kpi_property_items.kpi_property_id = k.id').where(kpi_property_items: {kpi_id: kpi_id})
    .select('kpi_property_values.*,k.name as property_name,k.id as property_id')
  end

  def self.desc_property_value item_id, value
    if item_id.blank? || value.blank?
      return
    end
    #puts "DEL"
    property_val = self.where("kpi_property_item_id = ? AND value = ?", item_id, value).first
    if !property_val.nil?
      if property_val.count <= 1
        property_val.destroy
      else
        property_val.update_attribute("count", property_val.count-1)
      end
    end
  end

  def self.add_property_value item_id, value
    if item_id.blank? || value.blank?
      return
    end
    #puts "ADD"
    property_val = self.where("kpi_property_item_id = ? AND value = ?", item_id, value).first
    if property_val.nil?
      property_val = self.new
      #property_val.kpi_id = kpi_id
      #property_val.kpi_property_id = property_id
      property_val.kpi_property_item_id = item_id
      property_val.value = value
      property_val.count = 1
      property_val.save
    else
      #property_val.update_attribute("count", property_val.count+1)
    end
  end
end
