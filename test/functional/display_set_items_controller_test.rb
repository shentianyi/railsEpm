require 'test_helper'

class DisplaySetItemsControllerTest < ActionController::TestCase
  setup do
    @display_set_item = display_set_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:display_set_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create display_set_item" do
    assert_difference('DisplaySetItem.count') do
      post :create, display_set_item: {  }
    end

    assert_redirected_to display_set_item_path(assigns(:display_set_item))
  end

  test "should show display_set_item" do
    get :show, id: @display_set_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @display_set_item
    assert_response :success
  end

  test "should update display_set_item" do
    put :update, id: @display_set_item, display_set_item: {  }
    assert_redirected_to display_set_item_path(assigns(:display_set_item))
  end

  test "should destroy display_set_item" do
    assert_difference('DisplaySetItem.count', -1) do
      delete :destroy, id: @display_set_item
    end

    assert_redirected_to display_set_items_path
  end
end
