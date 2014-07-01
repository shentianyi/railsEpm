class CreateKpiSubscribes < ActiveRecord::Migration
  def change
    create_table :kpi_subscribes do |t|
      t.references :user
      t.references :kpi
      t.references :tenant
      t.timestamps
    end
    add_index :kpi_subscribes, :user_id
    add_index :kpi_subscribes, :tenant_id
    add_idnex :kpi_subscribes, :kpi_id
  end
end
