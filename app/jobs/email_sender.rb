#encoding: utf-8
class EmailSender
  @queue='email_sender_queue'

  def self.perform id, params
    Email.handle_email_process id, params
  end
end
