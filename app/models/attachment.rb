#encoding: utf-8
class Attachment < ActiveRecord::Base
  # attr_accessible :title, :body
  self.inheritance_column = nil
  belongs_to :attachable, :polymorphic => true

  attr_accessible :name, :path, :size, :type, :attachable_id, :attachable_type, :pathname

  after_destroy :delete_attach_file

  # this method can be used to add attachemts
  def self.add attachments, attachable, oss=true
    unless attachments.blank?
      attachments.each do |att|
        att.symbolize_keys! if att.respond_to?(:symbolize_keys!)
        path = File.join($AttachTmpPath, att[:pathName])
        size = FileData.get_size(path)
        type = FileData.get_type(path)
        data = AttachService.generate_attachment path
        url = AliyunOssService.store_attachments(path, data)
        attachable.attachments<<Attachment.new(:name => att[:oriName], :path => url, :size => size, :type => type, :pathname => att[:pathName])
      end
    end
    return attachable.attachments
  end


  def is_image?
    self.type=='image'
  end

  def real_path(pre_url)
    self.path.nil? ?  '' : (self.path.include?('http') ? self.path : "#{pre_url}/files/attach?f=#{self.path}")
  end

  private
  def delete_attach_file
    AliyunOssService.delete_attachments self.pathname
  end
end
