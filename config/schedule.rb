# After changes, do below:
# whenever --update-crontab epm  --set environment=development
#
every 30.minutes do # Many shortcuts available: :hour, :day, :month, :year, :reboot
  # command "cd /home/ding/EPM && echo EPM__test: $(pwd) >> /home/ding/EPM_test"
  rake 'cron:rand'
end
