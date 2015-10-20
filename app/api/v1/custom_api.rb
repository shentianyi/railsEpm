module V1
  class CustomAPI < Base
    guard_all!

    namespace :custom do
      get :task_ids do
        JSON.parse(File.read("data/tasks_#{locale}.json"))
      end

      get :working_types do
        JSON.parse(File.read("data/working_types_#{locale}.json"))
      end

      get :user_info do
        puts params[:user_id]
        {
            user_id: 'solulab@demo.com',
            name: 'Dev Demo',
            stuff_id: '00232',
            project_id: '24231',
            current_location: 'bbac',
            exception: 'YES'
        }
      end

      desc 'get greeting'
      params do
        requires :user_id, type: String, desc: 'user id, same as login email'
        optional :location, type: String, desc: 'current location(city) of user'
        optional :page, type: String, desc: 'page to show greeting'
      end
      get :greetings do
        greetings= JSON.parse(File.read("data/greetings_#{locale}.json"))
        {
            greeting: greetings[rand(greetings.length)]
        }
      end
    end
  end
end
