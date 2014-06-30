class CreateStorySets < ActiveRecord::Migration
  def change
    create_table :story_sets do |t|
      t.string :title
      t.references :user
      t.string :description
      t.boolean :email_alert
      t.boolean :sms_alert
      t.timestamps
    end
    add_index :story_sets,:user_id
  end
end
