require 'test_helper'
require 'rails/performance_test_help'

class DashboardTest < ActionDispatch::PerformanceTest
  # Refer to the documentation for all available options
  # self.profile_options = { :runs => 5, :metrics => [:wall_time, :memory]
  #                          :output => 'tmp/performance', :formats => [:flat] }

  def get_dashboards
    get '/dashboards'
  end

  def create_dashboard
  	post '/dashboards',:data=>{:name=>'test'}
  end
end
