class CreateUserDepartments < ActiveRecord::Migration
  def change
    create_table :user_departments do |t|
      t.references :user
      t.references :department

      t.timestamps
    end
    add_index :user_departments, :user_id
    add_index :user_departments, :department_id
  end
end
