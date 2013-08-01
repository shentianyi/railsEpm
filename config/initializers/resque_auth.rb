require 'rake'
require "resque/server"
require 'resque/tasks'

Resque::Server.use(Rack::Auth::Basic) do |user, password|
  user="ifepm"
  password == "ifepm@"
end
# 
# ENV['QUEUE']='*'
# # ENV['COUNT']='5'
# # ENV['BACKGROUND']='yes'
# # ENV['PIDFILE']="tmp/pids/resque.pid"
# Rake::Task['resque:work'].invoke