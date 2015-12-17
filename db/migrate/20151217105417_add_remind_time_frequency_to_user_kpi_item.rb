class AddRemindTimeFrequencyToUserKpiItem < ActiveRecord::Migration
  def change
    add_column :user_kpi_items, :remind_time, :string
    add_column :user_kpi_items, :frequency, :integer
  end
end
