#encoding: utf-8
class Contact < ActiveRecord::Base
  belongs_to :tenant
  attr_accessible :department, :email, :image_url, :name, :phone, :tel, :title

  acts_as_tenant(:tenant)
end
