namespace :entry do
  desc 'generate hour task'
  task :hour => :environment do
    EntryTaskGenWorker.perform_async(Time.now, KpiFrequency::Hourly)
  end

  desc 'generate day task'
  task :day => :environment do
    EntryTaskGenWorker.perform_async(Time.now, KpiFrequency::Daily)
  end

  desc 'generate week task'
  task :week => :environment do
    EntryTaskGenWorker.perform_async(Time.now, KpiFrequency::Weekly)
  end

  desc 'generate month task'
  task :month => :environment do
    EntryTaskGenWorker.perform_async(Time.now, KpiFrequency::Monthly)
  end

  desc 'generate quarter task'
  task :quarter => :environment do
    EntryTaskGenWorker.perform_async(Time.now, KpiFrequency::Quarterly)
  end

  desc 'generate year task'
  task :year => :environment do
    EntryTaskGenWorker.perform_async(Time.now, KpiFrequency::Yearly)
  end

  # bundle exec rake entry:gen[2]
  desc 'generate all task by cmd start fom some days ago'
  task :gen,[:day]=> :environment do |t, args|
    p args
    start_time=args[:day].to_i.days.ago
    end_time=Time.now
    while (start_time<end_time) do
      p start_time

      EntryTaskGenWorker.perform_async(start_time, KpiFrequency::Hourly)
      EntryTaskGenWorker.perform_async(start_time, KpiFrequency::Daily)
      EntryTaskGenWorker.perform_async(start_time, KpiFrequency::Weekly)
      EntryTaskGenWorker.perform_async(start_time, KpiFrequency::Monthly)
      EntryTaskGenWorker.perform_async(start_time, KpiFrequency::Quarterly)
      EntryTaskGenWorker.perform_async(start_time, KpiFrequency::Yearly)

      start_time+=1.hour
    end
  end
end