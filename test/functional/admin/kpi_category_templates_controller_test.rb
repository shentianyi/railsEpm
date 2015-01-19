require 'test_helper'

class Admin::KpiCategoryTemplatesControllerTest < ActionController::TestCase
  setup do
    @admin_kpi_category_template = admin_kpi_category_templates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_kpi_category_templates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_kpi_category_template" do
    assert_difference('Admin::KpiCategoryTemplate.count') do
      post :create, admin_kpi_category_template: { description: @admin_kpi_category_template.description, kpi_quantity: @admin_kpi_category_template.kpi_quantity, name: @admin_kpi_category_template.name }
    end

    assert_redirected_to admin_kpi_category_template_path(assigns(:admin_kpi_category_template))
  end

  test "should show admin_kpi_category_template" do
    get :show, id: @admin_kpi_category_template
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_kpi_category_template
    assert_response :success
  end

  test "should update admin_kpi_category_template" do
    put :update, id: @admin_kpi_category_template, admin_kpi_category_template: { description: @admin_kpi_category_template.description, kpi_quantity: @admin_kpi_category_template.kpi_quantity, name: @admin_kpi_category_template.name }
    assert_redirected_to admin_kpi_category_template_path(assigns(:admin_kpi_category_template))
  end

  test "should destroy admin_kpi_category_template" do
    assert_difference('Admin::KpiCategoryTemplate.count', -1) do
      delete :destroy, id: @admin_kpi_category_template
    end

    assert_redirected_to admin_kpi_category_templates_path
  end
end
