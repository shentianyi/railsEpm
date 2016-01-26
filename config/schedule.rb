# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

set :environment, 'development'
set :output, {:error => 'log/cron_error_log.log', :standard => 'log/cron_log.log'}

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

# 生成任务
# hour
every '40 * * * *' do
  rake 'entry:hour'
end
# 周日23:40分 和 周五 22:40分
# every '40 23 * * 0' do
#   rake 'entry:hour'
# end
# every '40 22 * * 5' do
#   rake 'entry:hour'
# end

# day
every '40 23 * * *' do
  rake 'entry:day'
end
# 周日到周四
# every '40 23 * * 0-4' do
#   rake 'entry:day'
# end

# week
# 只在周四生成，周五的
every '40 23 * * 4' do
  rake 'entry:week'
end

# month
# 每天都去检查
every '40 23 * * *' do
  rake 'entry:month'
end

# quarter
# 3月的30号
# 6,9,12月的29号
every '40 23 30 3 *' do
  rake 'entry:month'
end
every '40 23 29 6,9,12 *' do
  rake 'entry:month'
end