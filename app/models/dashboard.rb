class Dashboard < ActiveRecord::Base
  has_many :dashboard_items, :dependent => :destroy
  attr_accessible :user_id,:name,:description
  validates :user_id,:presence => true
  validates :name,:presence => true

  def self.get_id_by_name(id)
    name = ""
    dashboard = Dashboard.where('id=?',id)
    if dashboard
      name = dashboard.name
    end
    return name
  end
end
