require 'test_helper'

class Task::ItemsControllerTest < ActionController::TestCase
  setup do
    @task_item = task_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:task_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create task_item" do
    assert_difference('Task::Item.count') do
      post :create, task_item: { assignor_id: @task_item.assignor_id, content: @task_item.content, dued_at: @task_item.dued_at, generate_type: @task_item.generate_type, status: @task_item.status, taskable_id: @task_item.taskable_id, taskable_type: @task_item.taskable_type, title: @task_item.title, to_due_at: @task_item.to_due_at, type: @task_item.type, user_id: @task_item.user_id }
    end

    assert_redirected_to task_item_path(assigns(:task_item))
  end

  test "should show task_item" do
    get :show, id: @task_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @task_item
    assert_response :success
  end

  test "should update task_item" do
    put :update, id: @task_item, task_item: { assignor_id: @task_item.assignor_id, content: @task_item.content, dued_at: @task_item.dued_at, generate_type: @task_item.generate_type, status: @task_item.status, taskable_id: @task_item.taskable_id, taskable_type: @task_item.taskable_type, title: @task_item.title, to_due_at: @task_item.to_due_at, type: @task_item.type, user_id: @task_item.user_id }
    assert_redirected_to task_item_path(assigns(:task_item))
  end

  test "should destroy task_item" do
    assert_difference('Task::Item.count', -1) do
      delete :destroy, id: @task_item
    end

    assert_redirected_to task_items_path
  end
end
