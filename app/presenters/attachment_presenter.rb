#encoding: utf-8
class AttachmentPresenter<Presenter
  Delegators=[:id, :name, :path, :size, :type, :attachable_id, :attachable_type, :pathname]
  def_delegators :@attachment, *Delegators

  def initialize(attachment)
    @attachment=attachment
    self.delegators =Delegators
  end

  def as_basic_info host_port, type
    {
        id: @attachment.id,
        type: @attachment.type,
        value: @attachment.value(host_port),
        thumb: @attachment.thumb_url(host_port)
    }
  end

  def self.parse_attachments attachments, host_port
    infos=[]

    attachments.each do |attachment|
      infos<<AttachmentPresenter.new(attachment).as_basic_info(host_port, attachment.type)
    end

    infos
  end

end
