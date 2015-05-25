class AddContentTo < ActiveRecord::Migration
  def up
  end

  def down
  end

  def change
    add_column :emails,:content,:string
    add_column :emails,:title,:string
  end
end
