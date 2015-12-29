module V2
  class TestAPI < Base
    namespace :tests do
      params do
        optional :name, type: String, desc: 'image name'
        optional :image, type: Rack::Multipart::UploadedFile, desc: 'file'
      end
      post :image do
        p '***********************'
        p request.env['api.request.body']
        p '***********************'
        p params
        # AttachService.test(params)

        comment_params={
            id: params[:id],
            comment: {
                content: params[:content],
                attachments: [params[:image]]
            }
        }

        puts comment_params
        user=User.find(93)
        StoryService.add_comment user, comment_params, request.host_with_port
      end


      # params do
      #   optional :name, type: String, desc: 'image name'
      #   optional :images, type:Array, desc: 'file'
      # end
      post :images do
        p '***********************'
        p request.env['api.request.body']
        p '***********************'
        p params

        AttachService.tests(params)
      end

      get do
        p request
        request.host_with_port + Attach::Image.first.path.url
      end
    end
  end
end