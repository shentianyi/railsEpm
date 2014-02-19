#encoding: utf-8
class FilesController < ApplicationController
    skip_load_and_authorize_resource
   def template
     send_file File.join($TEMPLATEPATH,params[:id]+'.'+params[:format])
   end
end
