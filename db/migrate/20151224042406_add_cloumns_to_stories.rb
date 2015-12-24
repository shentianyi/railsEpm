class AddCloumnsToStories < ActiveRecord::Migration
  def change
    add_column :stories, :closed_at, :datetime
    add_column :stories, :status, :integer
  end
end
