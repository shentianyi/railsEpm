class AddDescriptionToEntitis < ActiveRecord::Migration
  def change
      add_column :entities,:description,:string
  end
end
