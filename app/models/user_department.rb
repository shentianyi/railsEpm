class UserDepartment < ActiveRecord::Base
  belongs_to :user
  belongs_to :department
  # attr_accessible :title, :body
  attr_accessible :user_id,:department_id
end
