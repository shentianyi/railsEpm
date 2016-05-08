class CreateDisplaySetLists < ActiveRecord::Migration
  def change
    create_table :display_set_lists do |t|
      t.references :user
      t.date :name
      t.string :remark

      t.timestamps
    end
    add_index :display_set_lists, :user_id
  end
end
