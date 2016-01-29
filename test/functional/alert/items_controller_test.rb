require 'test_helper'

class Alert::ItemsControllerTest < ActionController::TestCase
  setup do
    @alert_item = alert_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:alert_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create alert_item" do
    assert_difference('Alert::Item.count') do
      post :create, alert_item: { alertable_id: @alert_item.alertable_id, alertable_type: @alert_item.alertable_type, status: @alert_item.status, type: @alert_item.type }
    end

    assert_redirected_to alert_item_path(assigns(:alert_item))
  end

  test "should show alert_item" do
    get :show, id: @alert_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @alert_item
    assert_response :success
  end

  test "should update alert_item" do
    put :update, id: @alert_item, alert_item: { alertable_id: @alert_item.alertable_id, alertable_type: @alert_item.alertable_type, status: @alert_item.status, type: @alert_item.type }
    assert_redirected_to alert_item_path(assigns(:alert_item))
  end

  test "should destroy alert_item" do
    assert_difference('Alert::Item.count', -1) do
      delete :destroy, id: @alert_item
    end

    assert_redirected_to alert_items_path
  end
end
