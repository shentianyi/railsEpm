class CreateReportSnaps < ActiveRecord::Migration
  def change
    create_table :report_snaps do |t|
      t.string :desc
      t.integer :type
      t.string :type_string
      t.references :user
      t.text :data
      t.references :tenant

      t.timestamps
    end
    add_index :report_snaps, :user_id
    add_index :report_snaps, :tenant_id
  end
end
