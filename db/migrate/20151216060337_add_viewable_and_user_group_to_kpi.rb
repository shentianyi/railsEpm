class AddViewableAndUserGroupToKpi < ActiveRecord::Migration
  def change
    add_column :kpis, :user_group_id, :integer
    add_column :kpis, :viewable, :integer
    add_column :kpis, :calculate_method, :integer
  end
end
