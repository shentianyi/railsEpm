require 'test_helper'

class ReportSnapsControllerTest < ActionController::TestCase
  setup do
    @report_snap = report_snaps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:report_snaps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create report_snap" do
    assert_difference('ReportSnap.count') do
      post :create, report_snap: { data: @report_snap.data, desc: @report_snap.desc, type: @report_snap.type, type_string: @report_snap.type_string }
    end

    assert_redirected_to report_snap_path(assigns(:report_snap))
  end

  test "should show report_snap" do
    get :show, id: @report_snap
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @report_snap
    assert_response :success
  end

  test "should update report_snap" do
    put :update, id: @report_snap, report_snap: { data: @report_snap.data, desc: @report_snap.desc, type: @report_snap.type, type_string: @report_snap.type_string }
    assert_redirected_to report_snap_path(assigns(:report_snap))
  end

  test "should destroy report_snap" do
    assert_difference('ReportSnap.count', -1) do
      delete :destroy, id: @report_snap
    end

    assert_redirected_to report_snaps_path
  end
end
