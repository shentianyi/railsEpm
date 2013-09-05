class Admin::KpiCategoryTemplate < ActiveRecord::Base
  has_many :admin_kpi_templates
  attr_accessible :description, :kpi_quantity, :name
  def self.uniq
    ['name']
  end

  def self.csv_headers
       ['Name','Description',$UPMARKER]
  end
end
