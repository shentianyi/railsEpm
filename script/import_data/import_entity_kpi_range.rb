require 'csv'
Dir["#{ARGV[0]}/*.csv"].each do |f|
  puts "importing: #{f}"
  CSV.foreach(f,:headers=>true,:col_sep=>';') do |row|
    if user_kpi_item=UserKpiItem.where(:kpi_id=>row["KPIID"],:entity_id=>row["EntityID"]).first
      puts row["Max"]
       user_kpi_item.update_attributes(:target_max=>row["Max"],:target_min=>row["Min"])
    end
  end
  puts "imported: #{f}"
end
