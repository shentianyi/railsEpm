#encoding: utf-8
class FilesController < ApplicationController
  skip_load_and_authorize_resource

  def template
    send_file File.join($TEMPLATEPATH, params[:id]+'.'+params[:format])
  end

  def upload
    @msg = Message.new
    begin
      @msg.content=[]
      params[:files].each do |file|
        f=FileData.new(data: file, oriName: file.original_filename, path: $AttachTmpPath, pathName: "#{Time.now.strftime('%Y%m%d%H%M%S')}-#{file.original_filename}")
        f.saveFile
        @msg.content<<f
      end
      @msg.result=true
    rescue Exception => e
      @msg.content= e.message
    end
    render json: @msg
  end

  def attach
    send_file  params[:f]
  end

  def avatar
    send_file  params[:f]
  end
end
