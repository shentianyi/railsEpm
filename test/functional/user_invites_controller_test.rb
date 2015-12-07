require 'test_helper'

class UserInvitesControllerTest < ActionController::TestCase
  setup do
    @user_invite = user_invites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_invites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_invite" do
    assert_difference('UserInvite.count') do
      post :create, user_invite: { email: @user_invite.email, sign_uped: @user_invite.sign_uped }
    end

    assert_redirected_to user_invite_path(assigns(:user_invite))
  end

  test "should show user_invite" do
    get :show, id: @user_invite
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_invite
    assert_response :success
  end

  test "should update user_invite" do
    put :update, id: @user_invite, user_invite: { email: @user_invite.email, sign_uped: @user_invite.sign_uped }
    assert_redirected_to user_invite_path(assigns(:user_invite))
  end

  test "should destroy user_invite" do
    assert_difference('UserInvite.count', -1) do
      delete :destroy, id: @user_invite
    end

    assert_redirected_to user_invites_path
  end
end
