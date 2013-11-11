require 'directory/performance_test_helper'

class DashboardsTest < ActionDispatch::PerformanceTest
  # Refer to the documentation for all available options
  # self.profile_options = { :runs => 5, :metrics => [:wall_time, :memory]
  #                          :output => 'tmp/performance', :formats => [:flat] }

  def setup

  end

  def crash_dashboard_select
    post "/dashboards"
  end
end