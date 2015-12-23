module V2
  class TaskAPI<Base
    guard_all!
    namespace :tasks do

      params do
        optional :page, type: Integer, default: 0, desc: 'page index start from 0'
        optional :size, type: Integer, default: 20, desc: 'page size'
      end
      get :for_entry do
        UserKpiItemService.get_list(current_user, params[:page], params[:size])
      end

    end
  end
end