require 'test_helper'

class ProductionPlansControllerTest < ActionController::TestCase
  setup do
    @production_plan = production_plans(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:production_plans)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create production_plan" do
    assert_difference('ProductionPlan.count') do
      post :create, production_plan: { assembly: @production_plan.assembly, date: @production_plan.date, planned: @production_plan.planned, produced: @production_plan.produced, product_line: @production_plan.product_line }
    end

    assert_redirected_to production_plan_path(assigns(:production_plan))
  end

  test "should show production_plan" do
    get :show, id: @production_plan
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @production_plan
    assert_response :success
  end

  test "should update production_plan" do
    put :update, id: @production_plan, production_plan: { assembly: @production_plan.assembly, date: @production_plan.date, planned: @production_plan.planned, produced: @production_plan.produced, product_line: @production_plan.product_line }
    assert_redirected_to production_plan_path(assigns(:production_plan))
  end

  test "should destroy production_plan" do
    assert_difference('ProductionPlan.count', -1) do
      delete :destroy, id: @production_plan
    end

    assert_redirected_to production_plans_path
  end
end
