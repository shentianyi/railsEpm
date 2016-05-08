require 'test_helper'

class DisplaySetListsControllerTest < ActionController::TestCase
  setup do
    @display_set_list = display_set_lists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:display_set_lists)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create display_set_list" do
    assert_difference('DisplaySetList.count') do
      post :create, display_set_list: { name: @display_set_list.name, remark: @display_set_list.remark }
    end

    assert_redirected_to display_set_list_path(assigns(:display_set_list))
  end

  test "should show display_set_list" do
    get :show, id: @display_set_list
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @display_set_list
    assert_response :success
  end

  test "should update display_set_list" do
    put :update, id: @display_set_list, display_set_list: { name: @display_set_list.name, remark: @display_set_list.remark }
    assert_redirected_to display_set_list_path(assigns(:display_set_list))
  end

  test "should destroy display_set_list" do
    assert_difference('DisplaySetList.count', -1) do
      delete :destroy, id: @display_set_list
    end

    assert_redirected_to display_set_lists_path
  end
end
