# bundle exec sidekiq

namespace :sidekiq do
  desc "TODO"
  task :start => :environment do
    system *%W(script/sidekiq_jobs start)
    loca
  end

  task :stop => :environment do
    system *%W(script/sidekiq_jobs stop)
  end
end
