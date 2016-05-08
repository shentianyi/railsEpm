class CreateDisplaySetItems < ActiveRecord::Migration
  def change
    create_table :display_set_items do |t|
      t.references :display_set_list
      t.references :department

      t.timestamps
    end
    add_index :display_set_items, :display_set_list_id
    add_index :display_set_items, :department_id
  end
end
