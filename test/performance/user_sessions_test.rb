require 'test_helper'
require 'rails/performance_test_help'

class UserSessionsTest < ActionDispatch::PerformanceTest
  # Refer to the documentation for all available options
  # self.profile_options = { :runs => 5, :metrics => [:wall_time, :memory]
  #                          :output => 'tmp/performance', :formats => [:flat] }

  def test_homepage
    get '/'
  end

  def test_user_session
  	assert ! UserSession.new(nil)
  	assert ! UserSession.new("")
  end	
end
