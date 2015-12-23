class AddCloumnsToStorySets < ActiveRecord::Migration
  def change
    add_column :story_sets, :kpi_id, :string
    add_column :story_sets, :department_id, :string
    add_column :story_sets, :closed_at, :datetime
    add_column :story_sets, :status, :integer
  end
end
