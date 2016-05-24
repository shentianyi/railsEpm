class AddTypeToEntities < ActiveRecord::Migration
  def change
    add_column :entities, :type, :integer,default: 100
  end
end
