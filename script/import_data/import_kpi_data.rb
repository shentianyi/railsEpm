require 'csv'
Dir["#{ARGV[0]}/*.csv"].each do |f|
  puts "importing: #{f}"
  CSV.foreach(f,:headers=>true,:col_sep=>';') do |row|
    params={}
    if user_kpi_item=UserKpiItem.where(:kpi_id=>row["KPIID"],:entity_id=>row["EntityID"]).first
      params[:user_kpi_item_id]=user_kpi_item.id
      params[:kpi_id]=row["KPIID"]
      params[:entity_id]=row["EntityID"]
      params[:entry_at]=row["Date"]
      params[:value]=row["Value"]
      KpiEntriesHelper.create_update_kpi_entry params
    end
  end
  puts "imported: #{f}"
end
