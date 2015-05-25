class RenameReveiversToReceiversOfEmails < ActiveRecord::Migration
  def up
  end

  def down
  end

  def change
    rename_column :emails,:reveivers,:receivers
  end
end
