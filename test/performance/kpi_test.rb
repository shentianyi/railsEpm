require 'test_helper'
require 'rails/performance_test_help'

class KpiTest < ActionDispatch::PerformanceTest
  # Refer to the documentation for all available options
  # self.profile_options = { :runs => 5, :metrics => [:wall_time, :memory]
  #                          :output => 'tmp/performance', :formats => [:flat] }
  self.profile_options={:output=>"/home/#{ENV["USER"]}/log/epm/tmp/performance"}

  def test_index
    get '/kpis'
  end
end
