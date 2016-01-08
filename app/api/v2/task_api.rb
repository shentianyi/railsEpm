module V2
  class TaskAPI<Base
    guard_all!
    namespace :tasks do

      namespace :entries do
        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :list do
          UserKpiItemService.get_list(current_user, params[:page], params[:size])
        end

        params do
           requires :task_id,type:Integer,desc:'task id'
           optional :page, type: Integer, default: 0, desc: 'page index start from 0'
           optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :items do
          UserKpiItemService.get_task_items(current_user, params[:page], params[:size])
          # status 404
          #
          # ApiMessage.new(messages: ['developing....'])

        end
      end


    end
  end
end