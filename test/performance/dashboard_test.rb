require 'directory/performance_test_helper'

class DashboardTest < ActionDispatch::PerformanceTest
  # Refer to the documentation for all available options
  # self.profile_options = { :runs => 5, :metrics => [:wall_time, :memory]
  #                          :output => 'tmp/performance', :formats => [:flat] }

	def setup

	end

	def test_select_dashboard
		get '/dashboards'
	end

	def test_create_dashboard
		post '/dashboards', :data=>{:name=>'ssh'}
	end	

	def test_get_dashboarditems
		post '/DashboardItems/items_by_dashboard_id', :id=>'2'
	end
end
