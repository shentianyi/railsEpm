module V2
  class TestAPI < Base
    namespace :tests do
      params do
        optional :name, type: String, desc: 'image name'
        optional :image, type: Rack::Multipart::UploadedFile, desc: 'file'
      end
      post :image do
        AttachService.test(params)
      end
    end
  end
end