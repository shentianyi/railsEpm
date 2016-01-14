#encoding: utf-8
class Attachment < ActiveRecord::Base

  self.inheritance_column = nil
  belongs_to :attachable, :polymorphic => true

  attr_accessible :name, :path, :size, :type, :attachable_id, :attachable_type, :pathname

  # after_destroy :delete_attach_file
  #
  # # this method can be used to add attachemts
  def self.add attachments, attachable, oss=false
    unless attachments.blank?
      attachments.each do |att|
        att.symbolize_keys! if att.respond_to?(:symbolize_keys!)
        path = File.join($AttachTmpPath, att[:pathName])
        size = FileData.get_size(path)
        type = FileData.get_type(path)
        data = AttachService.generate_attachment path
        url = AliyunOssService.store_attachments(path, data) if oss
        attachable.attachments<<Attachment.new(:name => att[:oriName], :path => url, :size => size, :type => type, :pathname => att[:pathName])
      end
    end
    return attachable.attachments
  end

  #
  #
  # def is_image?
  #   self.type=='image'
  # end
  #
  # def real_path(pre_url)
  #   self.path.nil? ?  '' : (self.path.include?('http') ? self.path : "#{pre_url}/files/attach?f=#{self.path}")
  # end
  #
  # private
  # def delete_attach_file
  #   AliyunOssService.delete_attachments self.pathname
  # end

  def become_child
    case self.type
      when 'image'
        attach= self.becomes(Attach::Image)
      when 'snap'
        attach= self.becomes(Attach::Snap)
      else
        return
    end
  end

  def value(host)
    if attach=self.become_child
      attach.value(host)
    end
  end

  def thumb_url(host)
    if attach=self.become_child
      attach.thumb_url(host)
    end
  end

  def self.add_image_attachment attachment
    image=ActionDispatch::Http::UploadedFile.new(attachment)

    i=Attach::Image.new(path: image)
    i.save
    i
  end

  def self.add_snap_attachment user, attachment
    attach=Attach::Snap.new()

    File.open(Settings.snap.chart_data, 'w+') do |f|
      f.write(attachment[:snap])
      attach.path = f
    end

    snapshot=Snapshot.new({
                              user_id: user.id,
                              alert_id: attachment[:alert_id],
                              current_value: attachment[:current_value_text],
                              lower_boundary: attachment[:lower_boundary_text],
                              upper_boundary: attachment[:upper_boundary_text]
                          })
    snapshot.attachment = attach
    attach.snapshot=snapshot

    attach.save
    attach
  end

  # def self.add_attachment user, attachments, attachable
  #   unless attachments.blank?
  #     attachments.each do |attachment|
  #       if self.respond_to?("add_#{attachment[:type]}_attachment")
  #         attachable.attachments<<self.send(:"add_#{attachment[:type]}_attachment", user, attachment)
  #       end
  #     end
  #   end
  # end

  def self.add_attachments ids, attachable
    ids.each do |id|
      if attachment=self.find_by_id(id)
        attachable.attachments<<attachment
      end
    end
  end
end
