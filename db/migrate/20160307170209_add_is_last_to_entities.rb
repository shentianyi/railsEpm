class AddIsLastToEntities < ActiveRecord::Migration
  def change
    add_column :entities, :is_last, :boolean,default: false
  end
end
