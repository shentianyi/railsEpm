class ChangeColumnTypeFromStringToText < ActiveRecord::Migration
  def change
    change_column :kpis,:formula_string,:text 
    change_column :kpis,:formula,:text 
  end
end
