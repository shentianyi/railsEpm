#encoding: utf-8
module Attach
  class Snap<Attachment
    has_one :snapshot, :dependent => :destroy, :foreign_key => :attachment_id

    default_scope -> { where(type: AttachmentType::SNAP) }

    mount_uploader :path, AttachmentSnapUploader

    def self.get_id attach
      if attach.respond_to?(:snapshot)
        puts attach.snapshot.id if attach.snapshot
        # raise 'ssss'
      end
    end

    def chart_data
      #JSON.parse(File.read($snapshot_path + Attach::File.find_by_id(id).path.url))
      JSON.parse(File.read("public" + self.path.url))
    end

    def value host
      nil
    end

    def thumb
      Settings.thumb.follow_snap
    end

    def thumb_url(host)
      "#{host}/#{thumb}"
    end

  end
end