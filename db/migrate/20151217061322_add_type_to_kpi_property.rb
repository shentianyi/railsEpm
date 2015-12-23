class AddTypeToKpiProperty < ActiveRecord::Migration
  def change
    add_column :kpi_properties, :type, :integer
  end
end
