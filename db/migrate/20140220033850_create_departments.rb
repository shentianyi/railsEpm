class CreateDepartments < ActiveRecord::Migration
  def change
    create_table :departments do |t|
      t.string :name
      t.string :ancestry
      t.references :tenant
      t.references :user
      t.timestamps
    end
    add_index :departments,:ancestry
    add_index :departments,:tenant_id
    add_index :departments,:user_id
  end
end
