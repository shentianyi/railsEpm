class BackgroundTask
  def self.send_email(email_id, params)
    EmailWorker.perform_async(email_id, params)
  end

  def self.calculate_kpi(entry)
    CalculateWorker.perform_async(entry.id)
  end

  def self.create_kpi_entry(entries)
    KpiEntryCreateWorker.perform_async(entries)
  end


  def self.update_kpi_property_value(id)
    UpdateKpiPropertyValueWorker.perform_async(id)
  end
end