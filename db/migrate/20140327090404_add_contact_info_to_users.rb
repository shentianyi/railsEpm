class AddContactInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tel, :string
    add_column :users, :phone, :string
    add_column :users, :image_url, :string
  end
end
