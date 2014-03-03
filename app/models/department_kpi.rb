class DepartmentKpi < ActiveRecord::Base
  belongs_to :department
  belongs_to :kpi
  attr_accessible :kpi_quantity,:kpi_id,:department_id
end
