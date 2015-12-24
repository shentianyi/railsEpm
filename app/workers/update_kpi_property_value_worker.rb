#encoding: utf-8

class UpdateKpiPropertyValueWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :flag, :backtrace => true, :retry => false

  def perform(id)
    if entry=KpiEntry.find(id)
      if kpi=Kpi.find_by_id(entry.kpi_id)
        entry.dynamic_attributes.each { |attr_id|
          if item = kpi.kpi_property_items.where("kpi_property_id = ?", attr_id.tr("a", "")).first
            KpiPropertyValue.add_property_value(item.id, entry[attr_id])
          end
        }
      end
    end
  end

end