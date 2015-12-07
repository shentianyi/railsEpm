class CreateUserInvites < ActiveRecord::Migration
  def change
    create_table :user_invites do |t|
      t.string :email
      t.boolean :sign_uped, default: false
      t.references :user

      t.timestamps
    end
    add_index :user_invites, :user_id
    add_index :user_invites, :email
  end
end
