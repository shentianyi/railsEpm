class CreateTaskItems < ActiveRecord::Migration
  def change
    create_table :task_items do |t|
      t.integer :type
      t.string :title
      t.text :content
      t.integer :generate_type
      t.integer :assignor_id
      t.integer :user_id
      t.datetime :to_due_at
      t.datetime :dued_at
      t.integer :status
      t.integer :taskable_id
      t.string :taskable_type

      t.timestamps
    end
  end
end
