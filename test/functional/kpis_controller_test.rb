require 'test_helper'

class KpisControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get assign" do
    get :assign
    assert_response :success
  end

end
