#encoding: utf-8
class Admin::KpiCategoryTemplate < ActiveRecord::Base
  has_many :admin_kpi_templates,:class_name=>'Admin::KpiTemplates'
  attr_accessible :description, :kpi_quantity, :name
  
  def self.uniq_attr
    ['name']
  end

  def self.csv_headers
       ['Name','Description',$UPMARKER]
  end
  
end
