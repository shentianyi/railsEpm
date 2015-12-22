#encoding: utf-8
module Attach
  class File<Attachment
    default_scope -> { where(type: AttachmentType::FILE) }
  end
end