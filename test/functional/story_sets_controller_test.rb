require 'test_helper'

class StorySetsControllerTest < ActionController::TestCase
  setup do
    @story_set = story_sets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:story_sets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create story_set" do
    assert_difference('StorySet.count') do
      post :create, story_set: {  }
    end

    assert_redirected_to story_set_path(assigns(:story_set))
  end

  test "should show story_set" do
    get :show, id: @story_set
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @story_set
    assert_response :success
  end

  test "should update story_set" do
    put :update, id: @story_set, story_set: {  }
    assert_redirected_to story_set_path(assigns(:story_set))
  end

  test "should destroy story_set" do
    assert_difference('StorySet.count', -1) do
      delete :destroy, id: @story_set
    end

    assert_redirected_to story_sets_path
  end
end
