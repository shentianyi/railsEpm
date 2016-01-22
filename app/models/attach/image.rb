#encoding: utf-8
module Attach
  class Image<Attachment
    default_scope -> { where(type: AttachmentType::IMAGE) }

    mount_uploader :path, AttachmentImageUploader

    def value host
      host + self.path.url
    end

    def thumb
      self.path.small_thumb.url
    end

    def thumb_url(host)
      "#{host}#{thumb}"
    end
  end
end