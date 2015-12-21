class ChangeFollowFlagToIntOfKpiUserSubscribes < ActiveRecord::Migration
  def up
    change_column :kpi_user_subscribes, :follow_flag, :integer
  end

  def down
    change_column :kpi_user_subscribes, :follow_flag, :string
  end
end
