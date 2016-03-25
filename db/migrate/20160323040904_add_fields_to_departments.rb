class AddFieldsToDepartments < ActiveRecord::Migration
  def change
    add_column :departments, :cn_name, :string
    add_column :departments, :is_product_line, :boolean,default:false
  end
end
