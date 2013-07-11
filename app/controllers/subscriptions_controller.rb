class SubscriptionsController < ApplicationController
  skip_before_filter :require_user,:only=>[:new,:create]
  skip_before_filter :require_active_user,:only=>[:new,:create]
  skip_before_filter :check_tenant_status
  before_filter :require_no_user, :only => [:new, :create]

  def new
     render
  end


  def create
    begin
      @user=User.new

      @user = @user.create_tenant_user!(params[:email],
                                        params[:password],
                                        params[:password_confirmation],
                                        params[:company_name])

      @user.deliver_user_confirmation!
      flash[:notice] = 'Your account has been created.Please finish the process with the mail confirmation'

      redirect_to new_user_confirmations_url
    rescue ActiveRecord::RecordInvalid => invalid
      flash[:notice]='Account create failed'
      render :action=>:new

    end
  end



end
