class CreateKpiSubscribeAlerts < ActiveRecord::Migration
  def change
    create_table :kpi_subscribe_alerts do |t|
      t.references :kpi_subscribe
      t.string :alert_type
      t.float :value
      t.references :tenant
      t.timestamps
    end
    add_index :kpi_subscribe_alerts, :kpi_subscribe_id
    add_index :kpi_subscribe_alerts, :tenant_id
  end
end
