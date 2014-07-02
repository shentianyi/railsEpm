class CreateStorySets < ActiveRecord::Migration
  def change
    create_table :story_sets do |t|
      t.string :title
      t.references :user
      t.references :tenant
      t.string :description
      t.boolean :email_alert, default: true
      t.boolean :sms_alert, default: false
      t.timestamps
    end
    add_index :story_sets, :user_id
    add_index :story_sets, :tenant_id
  end
end
