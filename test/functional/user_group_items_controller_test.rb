require 'test_helper'

class UserGroupItemsControllerTest < ActionController::TestCase
  setup do
    @user_group_item = user_group_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_group_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_group_item" do
    assert_difference('UserGroupItem.count') do
      post :create, user_group_item: { user_group_id: @user_group_item.user_group_id, user_id: @user_group_item.user_id }
    end

    assert_redirected_to user_group_item_path(assigns(:user_group_item))
  end

  test "should show user_group_item" do
    get :show, id: @user_group_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_group_item
    assert_response :success
  end

  test "should update user_group_item" do
    put :update, id: @user_group_item, user_group_item: { user_group_id: @user_group_item.user_group_id, user_id: @user_group_item.user_id }
    assert_redirected_to user_group_item_path(assigns(:user_group_item))
  end

  test "should destroy user_group_item" do
    assert_difference('UserGroupItem.count', -1) do
      delete :destroy, id: @user_group_item
    end

    assert_redirected_to user_group_items_path
  end
end
