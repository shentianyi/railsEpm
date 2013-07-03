#encoding: utf-8
class KpiEntryObserver<ActiveRecord::Observer
  observe :kpi_entry
  def before_create kpi_entry
    
  end
end
