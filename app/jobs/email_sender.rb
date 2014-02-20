#encoding: utf-8
class EmailSender
  @queue='email_sender_queue'

  def self.perform id,params
    # generate pdf
    params.symbolize_keys!
    puts  params[:analysis].symbolize_keys!

    if @email=Email.find_by_id(id)
      attachments=params[:attachments]||[]
      if pdf=@email.generate_analysis_pdf_and_cache(params[:analysis])
        attachments<<{oriName: 'Analysis_Pdf.pdf', pathName: pdf}
      end
      # save attachments
      @email.save_attachments(attachments)
      # send email
      @email.send_mail
    end
  end
end
