class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title
      t.string :description
      t.references :user
      t.references :story_set
      t.references :tenant
      t.timestamps
    end
    add_index :stories,:user_id
    add_index :stories,:story_set_id
    add_index :stories,:tenant_id
  end
end