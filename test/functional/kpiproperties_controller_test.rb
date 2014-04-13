require 'test_helper'

class KpipropertiesControllerTest < ActionController::TestCase
  setup do
    @kpiproperty = kpiproperties(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:kpiproperties)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create kpiproperty" do
    assert_difference('Kpiproperty.count') do
      post :create, kpiproperty: {  }
    end

    assert_redirected_to kpiproperty_path(assigns(:kpiproperty))
  end

  test "should show kpiproperty" do
    get :show, id: @kpiproperty
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @kpiproperty
    assert_response :success
  end

  test "should update kpiproperty" do
    put :update, id: @kpiproperty, kpiproperty: {  }
    assert_redirected_to kpiproperty_path(assigns(:kpiproperty))
  end

  test "should destroy kpiproperty" do
    assert_difference('Kpiproperty.count', -1) do
      delete :destroy, id: @kpiproperty
    end

    assert_redirected_to kpiproperties_path
  end
end
