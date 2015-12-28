#encoding: utf-8
class AttachmentPresenter<Presenter
  Delegators=[:id, :name, :path, :size, :type, :attachable_id, :attachable_type, :pathname]
  def_delegators :@attachment, *Delegators

  def initialize(attachment)
    @attachment=attachment
    self.delegators =Delegators
  end

  def as_basic_info host_port
    {
        id: @attachment.id,
        type: @attachment.type,
        url: host_port + Attach::Image.find(@attachment.id).path.url
    }
  end

  def self.parse_attachments attachments, host_port
    infos=[]

    attachments.each do |attachment|
      if attachment.type == "image"
        infos<<AttachmentPresenter.new(attachment).as_basic_info(host_port)
      else
        infos<<AttachmentPresenter.new(attachment).as_basic_info(host_port)
      end
    end

    infos
  end

end
