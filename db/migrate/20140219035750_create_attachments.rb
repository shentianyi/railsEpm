class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :name
      t.string :path
      t.string :size
      t.string :type
      t.string :pathname
      t.references :attachable, :polymorphic=>true
      
      t.timestamps
    end
    add_index :attachments, :attachable_id
    add_index :attachments, :attachable_type
  end
end
