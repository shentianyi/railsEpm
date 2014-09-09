class ReportSnap < ActiveRecord::Base
  self.inheritance_column=nil
  belongs_to :user
  belongs_to :tenant
  attr_accessible :data, :desc, :type, :type_string
  acts_as_tenant(:tenant)
end
