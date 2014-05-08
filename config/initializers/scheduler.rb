require 'rufus-scheduler'

SCHEDULER = Rufus::Scheduler.new
$kpiqueue = KpiCalculateQueue.instance

SCHEDULER.every '5s' do
  puts "check kpi calculate queue".blue
  $kpiqueue.check
end