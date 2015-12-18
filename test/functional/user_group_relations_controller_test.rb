require 'test_helper'

class UserGroupRelationsControllerTest < ActionController::TestCase
  setup do
    @user_group_relation = user_group_relations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_group_relations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_group_relation" do
    assert_difference('UserGroupRelation.count') do
      post :create, user_group_relation: { user_groupable_id: @user_group_relation.user_groupable_id, user_groupable_type: @user_group_relation.user_groupable_type }
    end

    assert_redirected_to user_group_relation_path(assigns(:user_group_relation))
  end

  test "should show user_group_relation" do
    get :show, id: @user_group_relation
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_group_relation
    assert_response :success
  end

  test "should update user_group_relation" do
    put :update, id: @user_group_relation, user_group_relation: { user_groupable_id: @user_group_relation.user_groupable_id, user_groupable_type: @user_group_relation.user_groupable_type }
    assert_redirected_to user_group_relation_path(assigns(:user_group_relation))
  end

  test "should destroy user_group_relation" do
    assert_difference('UserGroupRelation.count', -1) do
      delete :destroy, id: @user_group_relation
    end

    assert_redirected_to user_group_relations_path
  end
end
