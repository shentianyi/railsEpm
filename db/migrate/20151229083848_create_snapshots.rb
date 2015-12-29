class CreateSnapshots < ActiveRecord::Migration
  def change
    create_table :snapshots do |t|
      t.references :attachment
      t.references :user
      t.integer :alert_id
      t.string :upper_boundary
      t.string :lower_boundary
      t.string :current_value

      t.timestamps
    end
    add_index :snapshots, :attachment_id
    add_index :snapshots, :user_id
  end
end
