class CreateDashboardItems < ActiveRecord::Migration
  def change
    create_table :dashboard_items do |t|
      t.belongs_to :dashboard,:null=>false
      t.string :entity_group,:null=>false
      t.string :kpi_id,:null=>false
      t.string :calculate_type,:null=>false
      t.string :time_string,:null=>false
      t.integer :sequence
      t.timestamps
    end
  end


  private

end
