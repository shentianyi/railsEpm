module V2
  class StoryAPI<Base
    guard_all!

    namespace :discussions do

      params do
        requires :id, type: String, desc: "story id"
      end
      get do
        StoryService.details current_user,params
      end

      params do
        requires :title, type: String, desc: "story set title"
        requires :kpi_id, type: String, desc: "kpi id"
        requires :department_id, type: String, desc: "department id"
        requires :members, type: Array, desc: "story set members ids"
        requires :content, type: String, desc: "story content"
      end
      post do
        StorySetService.create current_user, params
      end

      namespace :users do
        params do
          requires :kpi_id, type: String, desc: "kpi id"
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :accesses do
          StoryService.user_accessable_stories current_user, params[:kpi_id], params[:page], params[:size]
        end

        params do
          requires :kpi_id, type: String, desc: "kpi id"
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :created do
          StoryService.user_created_stories current_user, params[:kpi_id], params[:page], params[:size]
        end

      end

      namespace :members do
        params do
          requires :id, type: String, desc: "story id"
        end
        get do
          StoryService.members current_user, params
        end

        params do
          requires :id, type: String, desc: "story id"
        end
        get :as_select do
          StoryService.as_select_members current_user, params
        end

        params do
          requires :id, type: Integer, desc: "story id"
          requires :user_id, type: Integer, desc: "story set member id"
        end
        post do
          StoryService.add_member current_user, params
        end

        params do
          requires :id, type: Integer, desc: "story id"
          requires :member_id, type: Integer, desc: "story set member id"
        end
        delete do
          StoryService.remove_member current_user, params
        end

      end

      namespace :comments do
        params do
          requires :id, type: String, desc: "story id"
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get do
          StoryService.comments current_user, params, request.host_with_port
        end

        params do
          requires :id, type: Integer, desc: "story id"
          requires :comment, type: Hash do
            requires :content, type: String, desc: "comment content"
            optional :attachments, type: Array do
              requires :type, type: String, desc: "attachment type"
              requires :value #, type: [String, Rack::Multipart::UploadedFile], desc: "attachment"
              optional :alert_id, type: Integer, desc: 'if type is snapshot requires'
              optional :upper_boundary_text, type: String, desc: 'if type is snapshot requires'
              optional :lower_boundary_text, type: String, desc: 'if type is snapshot requires'
              optional :current_value_text, type: String, desc: 'if type is snapshot requires'
            end
          end
        end
        post do
          StoryService.add_comment current_user, params, request.host_with_port
        end

        params do
          requires :id, type: Integer, desc: "comment id"
        end
        delete do
          StoryService.remove_comment current_user, params[:id]
        end

      end

      namespace :snapshots do
        params do
          requires :id, type: String, desc: "attachment id"
        end
        get do
          StoryService.snap_details params[:id]
        end

      end


    end

  end
end

