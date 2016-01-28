class AddRemindDateToTaskItems < ActiveRecord::Migration
  def change
    add_column :task_items, :remind_at, :datetime
  end
end
