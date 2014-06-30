class CreateStorySetUsers < ActiveRecord::Migration
  def change
    create_table :story_set_users do |t|
      t.references :story_set
      t.references :user
      t.timestamps
    end
    add_index :story_set_users, :story_set_id
    add_index :story_set_users, :user_id
  end
end
