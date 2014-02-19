#encoding: utf-8
class AvatarsController < ApplicationController
    skip_load_and_authorize_resource
   def show
     send_file File.join($AVATARPATH,params[:id]+'.'+params[:format])
   end
end
