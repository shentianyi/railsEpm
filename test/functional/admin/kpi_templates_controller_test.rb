require 'test_helper'

class Admin::KpiTemplatesControllerTest < ActionController::TestCase
  setup do
    @admin_kpi_template = admin_kpi_templates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_kpi_templates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_kpi_template" do
    assert_difference('Admin::KpiTemplate.count') do
      post :create, admin_kpi_template: { description: @admin_kpi_template.description, direction: @admin_kpi_template.direction, formula: @admin_kpi_template.formula, formula_string: @admin_kpi_template.formula_string, frequency: @admin_kpi_template.frequency, is_calculated: @admin_kpi_template.is_calculated, name: @admin_kpi_template.name, period: @admin_kpi_template.period, target: @admin_kpi_template.target, unit: @admin_kpi_template.unit }
    end

    assert_redirected_to admin_kpi_template_path(assigns(:admin_kpi_template))
  end

  test "should show admin_kpi_template" do
    get :show, id: @admin_kpi_template
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_kpi_template
    assert_response :success
  end

  test "should update admin_kpi_template" do
    put :update, id: @admin_kpi_template, admin_kpi_template: { description: @admin_kpi_template.description, direction: @admin_kpi_template.direction, formula: @admin_kpi_template.formula, formula_string: @admin_kpi_template.formula_string, frequency: @admin_kpi_template.frequency, is_calculated: @admin_kpi_template.is_calculated, name: @admin_kpi_template.name, period: @admin_kpi_template.period, target: @admin_kpi_template.target, unit: @admin_kpi_template.unit }
    assert_redirected_to admin_kpi_template_path(assigns(:admin_kpi_template))
  end

  test "should destroy admin_kpi_template" do
    assert_difference('Admin::KpiTemplate.count', -1) do
      delete :destroy, id: @admin_kpi_template
    end

    assert_redirected_to admin_kpi_templates_path
  end
end
