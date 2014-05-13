=begin
require 'rufus-scheduler'

SCHEDULER = Rufus::Scheduler.new
KpiCalculateQueue.instance

SCHEDULER.every '2s' do
  puts Rails.env
  #puts "check kpi calculate queue".blue
  #KpiCalculateQueue.instance.check
  #EmailWorker.perform_async(User.first.id,User.first.first_name)
end
=end
