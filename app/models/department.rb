class Department < ActiveRecord::Base
  # attr_accessible :title, :body

  attr_accessible :name,:parent,:ancestry,:user_id,:tenant_id

  belongs_to :user
  belongs_to :tenant
  
  has_many :entities, :dependent => :destroy

  acts_as_tenant(:tenant)
end
