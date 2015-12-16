class CreateKpiUserSubscribes < ActiveRecord::Migration
  def change
    create_table :kpi_user_subscribes do |t|
      t.references :kpi
      t.references :user
      t.references :tenant
      t.string :follow_flag

      t.timestamps
    end
    add_index :kpi_user_subscribes, :kpi_id
    add_index :kpi_user_subscribes, :user_id
    add_index :kpi_user_subscribes, :tenant_id
  end
end
