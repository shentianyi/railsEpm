namespace :entry do
  desc 'generate hour task'
  task :hour => :environment do
    EntryTaskGenWorker.perform_async(Time.now,KpiFrequency::Hourly)
  end

  desc 'generate day task'
  task :day => :environment do
    EntryTaskGenWorker.perform_async(Time.now,KpiFrequency::Daily)
  end

  desc 'generate week task'
  task :week => :environment do
    EntryTaskGenWorker.perform_async(Time.now,KpiFrequency::Weekly)
  end

  desc 'generate month task'
  task :month => :environment do
    EntryTaskGenWorker.perform_async(Time.now,KpiFrequency::Monthly)
  end

  desc 'generate quarter task'
  task :quarter => :environment do
    EntryTaskGenWorker.perform_async(Time.now,KpiFrequency::Quarterly)
  end

  desc 'generate year task'
  task :year => :environment do
    EntryTaskGenWorker.perform_async(Time.now,KpiFrequency::Yearly)
  end



end