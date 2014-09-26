require 'test_helper'

class KpiSubscribesControllerTest < ActionController::TestCase
  setup do
    @kpi_subscribe = kpi_subscribes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:kpi_subscribes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create kpi_subscribe" do
    assert_difference('KpiSubscribe.count') do
      post :create, kpi_subscribe: {  }
    end

    assert_redirected_to kpi_subscribe_path(assigns(:kpi_subscribe))
  end

  test "should show kpi_subscribe" do
    get :show, id: @kpi_subscribe
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @kpi_subscribe
    assert_response :success
  end

  test "should update kpi_subscribe" do
    put :update, id: @kpi_subscribe, kpi_subscribe: {  }
    assert_redirected_to kpi_subscribe_path(assigns(:kpi_subscribe))
  end

  test "should destroy kpi_subscribe" do
    assert_difference('KpiSubscribe.count', -1) do
      delete :destroy, id: @kpi_subscribe
    end

    assert_redirected_to kpi_subscribes_path
  end
end
