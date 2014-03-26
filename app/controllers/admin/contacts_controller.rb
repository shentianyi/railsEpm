class Admin::ContactsController < Admin::ApplicationController
  def index
    @contacts=Contact.joins(:tenant).select('*,tenants.company_name').paginate(page: params[:page], per_page: 20)
    respond_to do |format|
      format.html
    end
  end

  def import
  end
end
