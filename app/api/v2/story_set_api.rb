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

    end


  end
end

