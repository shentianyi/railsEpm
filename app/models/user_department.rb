# users belongs to department
# the name DepartmentUser would be better
class UserDepartment < ActiveRecord::Base
  include AutoAlert

  belongs_to :user
  belongs_to :department
  # attr_accessible :title, :body
  attr_accessible :user_id, :department_id, :is_manager
  # after_save :set_unset_user_role
  #
  # def set_unset_user_role
  #
  # end
end
