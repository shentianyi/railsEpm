module V2
  class StorySetAPI<Base
    guard_all!

    namespace :discussions do

      params do
        requires :id, type: String, desc: "story set id"
      end
      get do
        StorySetService.details current_user, params
      end

      params do
        requires :title, type: String, desc: "story set title"
        requires :kpi_id, type: String, desc: "kpi id"
        requires :department_id, type: String, desc: "department id"
        requires :members, type: Array, desc: "story set members ids"
        requires :description, type: String, desc: "story set first post description"
      end
      post do
        StorySetService.create current_user, params
      end

      namespace :users do
        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :accesses do
          StorySetService.user_accessable_story_set current_user, params[:page], params[:size]
        end

        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :created do
          StorySetService.user_created_story_set current_user, params[:page], params[:size]
        end

      end

      namespace :members do
        params do
          requires :id, type: String, desc: "story set id"
        end
        get do
          StorySetService.members current_user, params
        end

      end

    end

  end
end

