class AddCodeToKpis < ActiveRecord::Migration
  def change
    add_column :kpis, :code, :string
  end
end
