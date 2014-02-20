#encoding: utf-8

class MailerService
  attr_accessor :from_mail, :from_name, :from, :to, :subject, :text, :attachment
  ADDRESS= "https://api:key-815jqt0315prsi9k3pmz3n330kq5rbz3@api.mailgun.net/v2/sandbox1973.mailgun.org/messages"

  def initialize params
    self.from_mail=params[:from_mail]
    self.from_name=params[:from_name]
    self.from="#{self.from_name}<#{self.from_mail}>"
    self.to=params[:to].kind_of?(String) ? params[:to] : params[:to].join(',')
    self.subject=params[:subject]
    self.text=params[:text]
    self.attachment=params[:attachment] if params.has_key?(:attachment)
  end

  def send
    data=Multimap.new
    data[:from]=self.from
    data[:to]=self.to
    data[:subject]=self.subject
    data[:text]=self.text

    if self.attachment
      if self.attachment.is_a?(String)
        data[:attachment]=File.new(self.attachment)
      elsif self.attachment.is_a?(Array)
        self.attachment.each do |a|
          data[:attachment]=File.new(a)
        end
      end
    end

    RestClient.post ADDRESS, data
  end
end
