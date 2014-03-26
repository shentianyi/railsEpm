class Admin::EntityContactsController < Admin::ApplicationController
  def index
    @contacts=EntityContact.contact_detail.paginate(page: params[:page], per_page: 20)
    respond_to do |format|
      format.html
    end
  end

  def destroy
    @contact = EntityContact.find(params[:id])
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to admin_entity_contacts_path, notice: 'Entity Contact was destroyed.' }
    end
  end
end
