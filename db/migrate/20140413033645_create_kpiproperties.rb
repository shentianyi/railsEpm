class CreateKpiproperties < ActiveRecord::Migration
  def change
    create_table :kpiproperties do |t|
      t.string :name
      t.references :tenant
      t.references :user
      t.timestamps
    end
    add_index :kpiproperties,:tenant_id
    add_index :kpiproperties,:user_id
  end
end
