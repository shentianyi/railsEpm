ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'directory/performance_test_helper'
class ActiveSupport::TestCase
  # include Authlogic::TestCase
  # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  # fixtures :all
  # def setup
  # load "#{Rails.root}/db/seeds.rb"
  # end
  # Add more helper methods to be used by all tests here...
  def setup
   # login('admin@leoni.com','1111')
  end

  def login(email=nil,password=nil)
    post '/user_sessions', :user_session => {:email => email, :password =>password}
  end
end
