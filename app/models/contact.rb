#encoding: utf-8
class Contact < ActiveRecord::Base
  belongs_to :tenant
  has_many :entity_contacts#,:dependent => :destroy
  attr_accessible :department, :email, :image_url, :name, :phone, :tel, :title, :tenant_id
  acts_as_tenant(:tenant)

  before_destroy :destroy_delete_image
  after_update :update_delete_image

  def self.uniq_attr
    ['email']
  end

  private
  def destroy_delete_image
    AliyunOssService.delete_avatar(Contact.get_image_name(self.image_url)) unless self.image_url.blank?
  end

  def update_delete_image
    if self.image_url_changed? && !self.image_url_was.blank?
      AliyunOssService.delete_avatar Contact.get_image_name(self.image_url_was)
    end
  end

  def self.get_image_name url
    url.match(/(avatar\/)(.*)\?/)[2]
  end
end
