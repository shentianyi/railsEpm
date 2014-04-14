#encoding: utf-8
class KpiEntryCreateJob
  @queue='kpi_entry_job_queue'

  def self.perform entries
    entries.each do |k|
      date=Time.parse(k['entry_at']).utc
      if kpi_entry=KpiEntry.where(user_kpi_item_id: k['user_kpi_item_id'],
                                  parsed_entry_at: date,
                                  entity_id: k['entity_id']).first
        kpi_entry.update_attributes(:original_value => k['value'])
      else
        KpiEntry.new(original_value: k['value'],
                     user_kpi_item_id: k['user_kpi_item_id'],
                     parsed_entry_at: date,
                     entity_id: k['entity_id'],
                     user_id: k['user_id'],
                     target_max: k['target_max'],
                     target_min: k['target_min'],
                     kpi_id: k['kpi_id'],
                     entry_type: 1).save
      end
    end
  end
end
