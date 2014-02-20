module Api
  class FilesController < ApiController
     skip_load_and_authorize_resource
     def upload
       #params[:data]=Base64.encode64(open('http://www.cisco-source.com/lmiglobal/wp-content/uploads/2009/04/logo-new.png'){|io| io.read})
       #params[:name]='a.png'
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