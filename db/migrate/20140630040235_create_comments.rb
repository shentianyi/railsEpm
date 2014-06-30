class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :user
      t.references :tenant
      t.string :content
      t.integer :commentable_id
      t.string :commentable_type
      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, :tenant_id
  end
end
