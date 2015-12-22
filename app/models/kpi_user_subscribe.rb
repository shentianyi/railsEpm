class KpiUserSubscribe < ActiveRecord::Base
  belongs_to :kpi
  belongs_to :user
  belongs_to :tenant
  attr_accessible :follow_flag, :kpi_id, :user_id, :tenant_id,:department_id

  acts_as_tenant
end
