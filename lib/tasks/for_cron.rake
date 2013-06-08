namespace :cron do
  
  # [功能：] 显示数据库的 schema 。
  desc "Prints the schema lists"
  task :schema_list => :environment do
    puts ActiveRecord::Base.connection.select_values('select version from schema_migrations order by version')
  end
  
  # [功能：] cron 的执行程序，目前采用测试数据。
  desc "Random Fetch_Raw ... ..."
  task :rand => :environment do
      Datum.fetch_raw
  end
  
  
end