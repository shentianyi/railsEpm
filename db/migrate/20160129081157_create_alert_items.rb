class CreateAlertItems < ActiveRecord::Migration
  def change
    create_table :alert_items do |t|
      t.references :user
      t.integer :type
      t.integer :alertable_id
      t.string :alertable_type
      t.integer :status

      t.timestamps
    end
    add_index :alert_items, :user_id
  end
end
