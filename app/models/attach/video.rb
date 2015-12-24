#encoding: utf-8
module Attach
  class Video<Attachment
    default_scope -> { where(type: AttachmentType::VIDEO) }
  end
end