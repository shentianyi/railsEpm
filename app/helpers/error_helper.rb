module ErrorHelper
  def error_page_403
    respond_to do |format|
      format.html { render :file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false }
      format.json { render json: {access: false, errorCode: -4000}, status: 403 }
    end
  end

  def error_page_404
    respond_to do |format|
      format.html { render :file => File.join(Rails.root, 'public/404.html'), :status => 404, :layout => false }
      format.json { render json: {access: false}, status: 404 }
    end
  end
end