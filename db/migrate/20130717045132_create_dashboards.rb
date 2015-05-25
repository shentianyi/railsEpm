class CreateDashboards < ActiveRecord::Migration
  def change
    create_table :dashboards do |t|
      t.belongs_to :user, :null=>false
      t.string :name, :null=>false
      t.string :description
      t.timestamps
    end
  end
end
