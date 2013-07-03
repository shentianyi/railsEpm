class CreateUserKpis < ActiveRecord::Migration
  def change
    create_table :user_kpis do |t|
      t.references :entity
      t.references :user
      t.references :kpi
      t.float :target
      t.timestamps
    end
    add_index :user_kpis, :entity_id
    add_index :user_kpis, :user_id
    add_index :user_kpis, :kpi_id
  end
end
