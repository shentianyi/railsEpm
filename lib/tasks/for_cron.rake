namespace :cron do
  
  desc "Prints the schema lists"
  task :schema_list => :environment do
    puts ActiveRecord::Base.connection.select_values('select version from schema_migrations order by version')
  end
  
  
  desc "Random Fetch_Raw ... ..."
  task :rand => :environment do
      Datum.fetch_raw
  end
  
  
end