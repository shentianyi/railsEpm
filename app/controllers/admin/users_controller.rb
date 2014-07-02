class Admin::UsersController < Admin::ApplicationController
  def index
    @users=User.joins(:tenant).select("#{User.contact_attrs},tenants.company_name").paginate(page: params[:page], per_page: 20)
    respond_to do |format|
      format.html
    end
  end

  def show
    @user=User.find(params[:id])
  end

  def edit
    @user=User.find(params[:id])
  end

  def update
    @user=User.find(params[:id])
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to [:admin, @user], notice: 'user was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user = user.find(params[:id])
    @user.destroy
    respond_to do |format|
      format.html { redirect_to admin_users_path, notice: 'user was destroyed.' }
    end
  end

  def updata
    super { |data, query, row, row_line, path, create_default|
      raise(ArgumentError, "line:#{row_line}, Name/Email cannot be blank!") if row['Email'].blank? or row['Name'].blank?
      #raise(ArgumentError, "line:#{row_line},TenantID is wrong!") unless (tenant=Tenant.find(row['TenantID']))
      data[:first_name]=row['Name']
      #data[:email]=row['Email']
      data[:title]=row['Title']
      data[:tel]=row['Tel']
      data[:phone]=row['Phone']
      #data[:tenant_id]=tenant.id
      create_default=false
      #puts path
      if user=User.find_by_email(row['Email'])
        if eg=EntityGroup.find_by_name(row['EntityGroup'])
          ec=user.entity_contacts.build
          ec.contactable=eg
          ec.tenant=eg.tenant
          ec.save
        end
      end
      if !row['Avatar'].blank? && File.exist?(File.join(path, 'avatar', row['Avatar']))
        puts path
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
    path=File.join($AVATARPATH, uuid_name)
    FileUtils.cp(photo_src, path)
    return path
    #puts    photo_src
    #return AliyunOssService.store_avatar(uuid_name, photo_src, false)
  end

end
