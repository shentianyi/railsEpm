require 'rufus-scheduler'

SCHEDULER = Rufus::Scheduler.new
KpiCalculateQueue.instance

SCHEDULER.every '10s' do
  #puts "check kpi calculate queue".blue
  KpiCalculateQueue.instance.check
  #EmailWorker.perform_async(User.first.id,User.first.first_name)
end