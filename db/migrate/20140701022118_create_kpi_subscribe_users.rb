class CreateKpiSubscribeUsers < ActiveRecord::Migration
  def change
    create_table :kpi_subscribe_users do |t|
      t.references :user
      t.references :kpi_subscribe
      t.timestamps
    end
    add_index :kpi_subscribe_users, :user_id
    add_index :kpi_subscribe_users, :kpi_subscribe_id
  end
end
