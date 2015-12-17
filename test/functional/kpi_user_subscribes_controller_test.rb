require 'test_helper'

class KpiUserSubscribesControllerTest < ActionController::TestCase
  setup do
    @kpi_user_subscribe = kpi_user_subscribes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:kpi_user_subscribes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create kpi_user_subscribe" do
    assert_difference('KpiUserSubscribe.count') do
      post :create, kpi_user_subscribe: { follow_flag: @kpi_user_subscribe.follow_flag }
    end

    assert_redirected_to kpi_user_subscribe_path(assigns(:kpi_user_subscribe))
  end

  test "should show kpi_user_subscribe" do
    get :show, id: @kpi_user_subscribe
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @kpi_user_subscribe
    assert_response :success
  end

  test "should update kpi_user_subscribe" do
    put :update, id: @kpi_user_subscribe, kpi_user_subscribe: { follow_flag: @kpi_user_subscribe.follow_flag }
    assert_redirected_to kpi_user_subscribe_path(assigns(:kpi_user_subscribe))
  end

  test "should destroy kpi_user_subscribe" do
    assert_difference('KpiUserSubscribe.count', -1) do
      delete :destroy, id: @kpi_user_subscribe
    end

    assert_redirected_to kpi_user_subscribes_path
  end
end
