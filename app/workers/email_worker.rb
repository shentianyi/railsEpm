#encoding: utf-8
=begin
class EmailWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :email, :backtrace => true

  def perform(id, params)
    puts id
    puts params
  end
end
=end
