require 'test_helper'

class ChartConditionsControllerTest < ActionController::TestCase
  setup do
    @chart_condition = chart_conditions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:chart_conditions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create chart_condition" do
    assert_difference('ChartCondition.count') do
      post :create, chart_condition: {  }
    end

    assert_redirected_to chart_condition_path(assigns(:chart_condition))
  end

  test "should show chart_condition" do
    get :show, id: @chart_condition
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @chart_condition
    assert_response :success
  end

  test "should update chart_condition" do
    put :update, id: @chart_condition, chart_condition: {  }
    assert_redirected_to chart_condition_path(assigns(:chart_condition))
  end

  test "should destroy chart_condition" do
    assert_difference('ChartCondition.count', -1) do
      delete :destroy, id: @chart_condition
    end

    assert_redirected_to chart_conditions_path
  end
end
