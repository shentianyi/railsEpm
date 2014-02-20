class Department < ActiveRecord::Base
  # attr_accessible :title, :body

  attr_accessible :name,:parent,:ancestry,:user_id,:tenant_id

  belongs_to :user
  belongs_to :tenant
  
  has_many :entities, :dependent => :destroy
  has_one :entity_group, :dependent => :destroy

  after_create :create_entity_group
  after_destroy :destroy_entity_group

  has_ancestry
  acts_as_tenant(:tenant)

  private
  def create_entity_group
    #create the entity_group belongs to the department
    entity_group = EntityGroup.new(:name=>self.name,:department_id=>self.id)
    entity_group.user = self.user
    entity_group.save!
  end
end
