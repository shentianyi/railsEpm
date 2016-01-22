#encoding: utf-8
class AttachmentPresenter<Presenter
  Delegators=[:id, :name, :path, :size, :type, :attachable_id, :attachable_type, :pathname]
  def_delegators :@attachment, *Delegators

  def initialize(attachment)
    @attachment=attachment
    self.delegators =Delegators
  end

  def as_basic_info base_url, type
    {
        id: @attachment.id,
        type: @attachment.type,
        value: @attachment.value(base_url),
        thumb: @attachment.thumb_url(base_url)
    }
  end

  def self.parse_attachments attachments, base_url
    infos=[]

    attachments.each do |attachment|
      infos<<AttachmentPresenter.new(attachment).as_basic_info(base_url, attachment.type)
    end

    infos
  end

end
