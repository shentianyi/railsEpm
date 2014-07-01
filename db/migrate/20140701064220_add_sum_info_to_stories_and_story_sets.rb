class AddSumInfoToStoriesAndStorySets < ActiveRecord::Migration
  def change
    add_column :stories, :comment_count, :integer, default: 0
    add_column :stories, :chart_count, :integer, default: 0
    add_column :story_sets, :story_count, :integer, default: 0
    add_column :story_sets, :comment_count, :integer, default: 0
    add_column :story_sets, :chart_count, :integer, default: 0
    add_column :story_sets, :user_count, :integer, default: 0
  end
end
