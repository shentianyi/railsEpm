#encoding: utf-8
module Attach
  class Snap<Attachment
    default_scope -> { where(type: AttachmentType::SNAP) }
  end
end