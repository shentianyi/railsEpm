module V2
  class StorySetAPI<Base
    guard_all!

    namespace :discussions do

      params do
        requires :discussion_id, type: Integer, desc: "story set id"
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

    end


  end
end

