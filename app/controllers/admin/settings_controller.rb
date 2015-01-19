class Admin::SettingsController < Admin::ApplicationController

	def version_save
		#save version
    msg = Message.new
    Setting.new(:ios_app_version => params[:version],:ios_app_update_is_option=> params[:optional]).save
    msg.result = true
    render :json=>msg
	end

	def version
		#get version
    @setting = Setting.find
	end
end