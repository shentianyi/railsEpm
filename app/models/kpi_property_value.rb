class KpiPropertyValue < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :value,:count,:kpi_property_id,:kpi_id

  belongs_to :kpi
  belongs_to :kpi_property

  def self.desc_property_value kpi_id,property_id,value
    property_val = self.where("kpi_id = ? AND property_id = ? AND value = ?",kpi_id,property_id,value).first
    if !property_val.nil?
      if property_val.count <= 1
        property_val.destroy
      else
        property_val.update_attribute("count",property_val.count-1)
      end
    end
  end

  def self.add_property_value kpi_id,property_id,value
    property_val = self.where("kpi_id = ? AND property_id = ? AND value = ?",kpi_id,property_id,value).first
    if property_val.nil?
      property_val = self.new
      property_val.kpi_id = kpi_id
      property_val.kpi_property_id = property_id
      property_val.value = value
      property_val.count = 1
      property_val.save
    else
      property_val.update_attribute("count",property_val.count+1)
    end
  end
end
