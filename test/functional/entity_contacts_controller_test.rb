require 'test_helper'

class EntityContactsControllerTest < ActionController::TestCase
  setup do
    @entity_contact = entity_contacts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:entity_contacts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create entity_contact" do
    assert_difference('EntityContact.count') do
      post :create, entity_contact: {  }
    end

    assert_redirected_to entity_contact_path(assigns(:entity_contact))
  end

  test "should show entity_contact" do
    get :show, id: @entity_contact
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @entity_contact
    assert_response :success
  end

  test "should update entity_contact" do
    put :update, id: @entity_contact, entity_contact: {  }
    assert_redirected_to entity_contact_path(assigns(:entity_contact))
  end

  test "should destroy entity_contact" do
    assert_difference('EntityContact.count', -1) do
      delete :destroy, id: @entity_contact
    end

    assert_redirected_to entity_contacts_path
  end
end
