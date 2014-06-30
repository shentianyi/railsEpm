class Story < ActiveRecord::Base
  attr_accessible :title, :description
  belongs_to :user
  belongs_to :story_set
  has_many :chart_conditions, :as => :chartable, :dependent => :destroy
  has_many :attachments, :as => :attachable, :dependent => :destroy
  has_many :comments, :as=> :commentable, :dependent => :destroy
  belongs_to :tenant
  acts_as_tenant(:tenant)
end
