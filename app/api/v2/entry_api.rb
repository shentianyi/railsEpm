module V2
  class EntryAPI<Base
    guard_all!
    namespace :entries do

      params do
        optional :task_item_id, type: Integer, desc: 'task item id'
      end
      post do
        EntryService.entry(params, current_user)
      end

    end
  end
end