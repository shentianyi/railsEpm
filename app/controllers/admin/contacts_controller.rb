class Admin::ContactsController < Admin::ApplicationController
  def index
    @contacts=Contact.joins(:tenant).select('contacts.*,tenants.company_name').paginate(page: params[:page], per_page: 20)
    respond_to do |format|
      format.html
    end
  end

  def show
    @contact=Contact.find(params[:id])
  end

  def edit
    @contact=Contact.find(params[:id])
  end

  def update
    @contact=Contact.find(params[:id])
    respond_to do |format|
      if @contact.update_attributes(params[:contact])
        format.html { redirect_to [:admin, @contact], notice: 'Contact was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def import
  end

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to admin_contacts_path, notice: 'Contact was destroyed.' }
    end
  end
end
