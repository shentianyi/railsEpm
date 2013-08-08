require 'resque/tasks'

task "resque:setup" => :environment  do
  ENV['QUEUE']='*'
  ENV['COUNT']='5'
  ENV['BACKGROUND']='yes'
  ENV['PIDFILE']="tmp/pids/resque.pid"
end

