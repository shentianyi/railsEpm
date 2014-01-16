class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :sender
      t.string :reveivers
      t.string :file_path
      t.references :user
      t.timestamps
    end
    add_index :emails,:user_id
  end
end
