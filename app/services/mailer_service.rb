#encoding: utf-8

class MailerService
  attr_accessor :from_mail, :from_name, :from, :to, :subject, :text, :attachment, :file_path, :delete_tmp_file
  ADDRESS= "https://api:key-45f5z85gnjq545rzvcv5n71dyatdjmo6@api.mailgun.net/v2/sandbox1973.mailgun.org/messages"

  def initialize params
    self.from_mail=params[:from_mail]
    self.from_name=params[:from_name]
    self.from="#{self.from_name}<#{self.from_mail}>"
    self.to=params[:to].kind_of?(String) ? params[:to] : params[:to].join(',')
    self.subject=params[:subject]
    self.text=params[:text]
    self.attachment=params[:attachment] if params.has_key?(:attachment)
    self.file_path =params[:file_path]
    self.delete_tmp_file = false #params[:delete_tmp_file]||false
  end

  def send
    data=Multimap.new
    data[:from]=self.from
    data[:to]=self.to
    data[:subject]=self.subject
    data[:text]=self.text

    if self.attachment
      if self.attachment.is_a?(String)
        data[:attachment]=File.new(File.join(self.file_path, self.attachment))
      elsif self.attachment.is_a?(Array)
        self.attachment.each do |a|
          data[:attachment]=File.new(File.join(self.file_path, a))
        end
      end
    end

    RestClient.post ADDRESS, data
    delete_local_file if self.delete_tmp_file
  end

  def delete_local_file
    if self.attachment
      if self.attachment.is_a?(String)
        File.delete(File.join(self.file_path, self.attachment))
      elsif self.attachment.is_a?(Array)
        self.attachment.each do |a|
          File.delete(File.join(self.file_path, a))
        end
      end
    end
  end

end
