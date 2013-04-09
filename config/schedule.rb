

# After changes, do below:
# whenever --update-crontab epm  --set environment=development
#
every 1.minute do # Many shortcuts available: :hour, :day, :month, :year, :reboot
  command "echo EPM__test: $(date) >> /home/ding/EPM_test"
end

