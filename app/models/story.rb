class Story < ActiveRecord::Base
  attr_accessible :title, :description
  belongs_to :user
  belongs_to :story_set
  has_many :attachments, :as => :attachable, :dependent => :destroy
end
