#encoding: utf-8

class UpdateKpiPropertyValueWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :flag, :backtrace => true, :retry => false

  def perform(id)
    if entry=KpiEntry.where(id: id).first
      if kpi=Kpi.find_by_id(entry.kpi_id)
        kpi_entry.dynamic_attributes.each { |attr_id|
          item = kpi.kpi_property_items.where("kpi_property_id = ?", attr_id.tr("a", "")).first if kpi
          KpiPropertyValue.add_property_value(item.id, kpi_entry[attr_id]) if item
        }
      end
    end
  end

end