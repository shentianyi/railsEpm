class AddEntryDateToTaskItems < ActiveRecord::Migration
  def change
    add_column :task_items, :entry_at, :datetime
  end
end
