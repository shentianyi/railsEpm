module Api
  class FilesController < ApiController
     skip_load_and_authorize_resource
     def upload
       data=StringIO.new(Base64.decode64(params[:data]))
       data.class.class_eval {attr_accessor :original_filename, :content_type}
       data.original_filename = params[:name]
       data.content_type =FileData.get_content_type(params[:name])
       f=FileData.new(:data=>data,:oriName=>params[:name],:path=>$AttachTmpPath)
       f.saveFile
       render json:f.pathName
     end
  end
end