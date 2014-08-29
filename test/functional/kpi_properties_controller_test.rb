require 'test_helper'

class KpiPropertiesControllerTest < ActionController::TestCase
  setup do
    @kpi_property = kpi_properties(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:kpi_properties)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create kpi_property" do
    assert_difference('KpiProperty.count') do
      post :create, kpi_property: {  }
    end

    assert_redirected_to kpi_property_path(assigns(:kpi_property))
  end

  test "should show kpi_property" do
    get :show, id: @kpi_property
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @kpi_property
    assert_response :success
  end

  test "should update kpi_property" do
    put :update, id: @kpi_property, kpi_property: {  }
    assert_redirected_to kpi_property_path(assigns(:kpi_property))
  end

  test "should destroy kpi_property" do
    assert_difference('KpiProperty.count', -1) do
      delete :destroy, id: @kpi_property
    end

    assert_redirected_to kpi_properties_path
  end
end
