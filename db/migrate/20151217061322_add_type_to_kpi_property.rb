class AddTypeToKpiProperty < ActiveRecord::Migration
  def change
    add_column :kpi_properties, :attr_type, :integer
  end
end
