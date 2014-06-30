class Comment < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  has_many :attachments, :as => :attachable, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)
end
