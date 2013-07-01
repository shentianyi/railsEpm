class UserKpi < ActiveRecord::Base
  belongs_to :entity
  belongs_to :user
  belongs_to :kpi
  has_many :kpi_entry
  # attr_accessible :title, :body
end
