class CreateAlerts < ActiveRecord::Migration
  def change
    create_table :alerts do |t|
      t.string :topic
      t.references :user
      t.integer :type
      t.integer :offset
      t.integer :alertable_id
      t.string :alertable_type

      t.timestamps
    end
    add_index :alerts, :user_id
  end
end
