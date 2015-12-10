class AddDepartmentIdToUserInvites < ActiveRecord::Migration
  def change
    add_column :user_invites, :department_id, :integer
  end
end
