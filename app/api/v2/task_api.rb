module V2
  class TaskAPI<Base
    guard_all!
    namespace :tasks do

      #params do
      #   requires :task_id, type: Integer, desc: 'task id'
      # end
      # get do
      #   UserKpiItemService.details(current_user, params[:task_id])
      # end


      namespace :entries do
        params do
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :list do
          UserKpiItemService.get_list(current_user, params[:page], params[:size])
        end

        params do
          requires :task_id, type: Integer, desc: 'task id'
          optional :status, type: Array, default: [Task::Status::PLANED], desc: 'task status'
          optional :page, type: Integer, default: 0, desc: 'page index start from 0'
          optional :size, type: Integer, default: 20, desc: 'page size'
        end
        get :items do
          UserKpiItemService.get_task_items(current_user, params[:task_id], params[:page], params[:size],
                                            {
                                                status: params[:status]
                                            })
        end

        params do
          requires :task_item_id, type: Integer, desc: 'task_item id'
        end
        get :item do
          UserKpiItemService.item_detail(user,id)
        end
      end

    end
  end
end