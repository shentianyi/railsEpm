class Admin::ContactsController < Admin::ApplicationController
  def index
    @contacts=User.joins(:tenant).select("#{User.contact_attrs},tenants.company_name").paginate(page: params[:page], per_page: 20)
    respond_to do |format|
      format.html
    end
  end

  def show
    @contact=User.find(params[:id])
  end

  def edit
    @contact=User.find(params[:id])
  end

  def update
    @contact=User.find(params[:id])
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

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to admin_contacts_path, notice: 'Contact was destroyed.' }
    end
  end

  def updata
    super { |data, query, row, row_line, path, create_default|
      raise(ArgumentError, "line:#{row_line}, Name/Email cannot be blank!") if row['Email'].blank?  or row['Name'].blank?
      #raise(ArgumentError, "line:#{row_line},TenantID is wrong!") unless (tenant=Tenant.find(row['TenantID']))
      data[:first_name]=row['Name']
      #data[:email]=row['Email']
      data[:title]=row['Title']
      data[:tel]=row['Tel']
      data[:phone]=row['Phone']
      #data[:tenant_id]=tenant.id
      create_default=false
      puts path
      if !row['Avatar'].blank? && File.exist?(File.join(path,'avatar', row['Avatar']))
        puts '***************'+row['Avatar']
        data[:image_url]=save_photo(File.join(path, 'avatar', row['Avatar']), row['Avatar'])
      end
      query[:email]=row['Email'] if query
    }
  end

  def model
    User
  end

  private
  def save_photo photo_src, photo_name
    uuid_name=SecureRandom.uuid+File.extname(photo_name)
    return AliyunOssService.store_avatar(uuid_name, photo_src,false)
  end

end
