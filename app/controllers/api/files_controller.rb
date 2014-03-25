module Api
  class FilesController < ApiController
    #skip_before_filter :verify_authenticity_token
    skip_load_and_authorize_resource

    def upload
      #params[:data]=Base64.encode64(open('http://dlc2.pconline.com.cn/filedown_307_6883294/l0LPMgYD/7z920.exe'){|io| io.read})
      #params[:name]='a.exe'
      data=StringIO.new(Base64.decode64(params[:data]))
      data.class.class_eval { attr_accessor :original_filename, :content_type }
      data.original_filename = params[:name]
      data.content_type =FileData.get_content_type(params[:name])
      f=FileData.new(:data => data, :oriName => params[:name], :path => $AttachTmpPath)
      f.saveFile
      render json: {path_name: f.pathName}
    end
  end
end