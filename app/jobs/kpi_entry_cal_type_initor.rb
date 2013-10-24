#encoding: utf-8
class KpiEntryCalTypeInitor
 @queue='kpi_entry_init_queue'
 def self.perform kpi_id
     KpiEntriesHelper.init_cal_type_kpi_entry kpi_id
 end
end
