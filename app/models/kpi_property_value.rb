class KpiPropertyValue < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :value, :count, :kpi_property_item_id

  belongs_to :kpi_property_item

  def self.by_property_id(kpi_id, property_id)
    joins(:kpi_property_item).where(kpi_property_items: {kpi_id: kpi_id, kpi_property_id: property_id})
    .select('kpi_property_values.*,kpi_property_items.kpi_property_id')
  end

  def self.desc_property_value item_id, value
    puts "DEL"
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
    puts "ADD"
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
      property_val.update_attribute("count", property_val.count+1)
    end
  end
end
