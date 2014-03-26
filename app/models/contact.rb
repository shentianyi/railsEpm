#encoding: utf-8
class Contact < ActiveRecord::Base
  belongs_to :tenant
  attr_accessible :department, :email, :image_url, :name, :phone, :tel, :title, :tenant_id
  acts_as_tenant(:tenant)

  before_destroy :destroy_delete_image
  after_update :update_delete_image

  private
  def destroy_delete_image
    AliyunOssService.delete_avatar self.image_url unless self.image_url.blank?
  end

  def update_delete_image
    if self.image_url.changed? && !self.image_url.blank?
      AliyunOssService.delete_avatar self.image_url_was
    end
  end
end
