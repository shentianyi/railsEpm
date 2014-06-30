class Comment < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  has_many :attachments, :as => :attachable, :dependent => :destroy
end
