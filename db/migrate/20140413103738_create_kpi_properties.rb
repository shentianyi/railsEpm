class CreateKpiProperties < ActiveRecord::Migration
  def change
    create_table :kpi_properties do |t|
    	t.string :name
    	t.references :user
    	t.references :tenant
    	t.timestamps
    end
    add_index :kpi_properties, :user_id
    add_index :kpi_properties, :tenant_id
  end
end
