module V2
  class AttachmentAPI < Base
    guard_all!

    namespace :attachments do
      # params do
      #   requires :id, type: Integer, desc: "story id"
      #   requires :comment, type: Hash do
      #     requires :content, type: String, desc: "comment content"
      #     optional :attachments, type: Array do
      #       requires :type, type: String, desc: "attachment type"
      #       requires :value #, type: [String, Rack::Multipart::UploadedFile], desc: "attachment"
      #       optional :alert_id, type: Integer, desc: 'if type is snapshot requires'
      #       optional :upper_boundary_text, type: String, desc: 'if type is snapshot requires'
      #       optional :lower_boundary_text, type: String, desc: 'if type is snapshot requires'
      #       optional :current_value_text, type: String, desc: 'if type is snapshot requires'
      #     end
      #   end
      # end
      params do
        requires :attachments, type: Array do
          requires :image, type: Rack::Multipart::UploadedFile, desc: "image attachment"
        end
      end
      post :images do
        AttachService.add_images params[:attachments], request.base_url
      end

      params do
        requires :image, type: Rack::Multipart::UploadedFile, desc: "image attachment"
      end
      post :image do
        AttachService.add_image params[:image], request.base_url
      end


      namespace :snapshots do
        params do
          requires :id, type: String, desc: "attachment id"
        end
        get do
          AttachService.snap_details params[:id]
        end

        params do
          requires :snap, type: String, desc: "snap attachment"
          requires :alert_id, type: Integer
          requires :upper_boundary_text, type: String
          requires :lower_boundary_text, type: String
          requires :current_value_text, type: String
        end
        post do
          AttachService.add_snapshot current_user, params, request.base_url
        end
      end


    end
  end
end