#encoding: utf-8
module Attach
  class Image<Attachment
    default_scope -> { where(type: AttachmentType::IMAGE) }

    mount_uploader :path, AttachmentImageUploader
  end
end