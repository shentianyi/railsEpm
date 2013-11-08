require 'test_helper'
require 'rails/performance_test_help'

class DashboardsTest < ActionDispatch::PerformanceTest
  # Refer to the documentation for all available options
  # self.profile_options = { :runs => 5, :metrics => [:wall_time, :memory]
  #                          :output => 'tmp/performance', :formats => [:flat] }

  def setup

  end

  def select_dashboard
    post '/dashboards'
    post '/DashboardItems/items_by_dashboard_id'
  end
end