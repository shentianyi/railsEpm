#encoding: utf-8

class EmailWorker
  include Sidekiq::Worker

  sidekiq_options :queue => :email, :backtrace => true, :retry => false

  def perform(id, params)
    Email.handle_email_process id, params
  end
end
