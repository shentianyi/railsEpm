module V1
  class CustomAPI < Base
    guard_all!

    namespace :custom do
      get :task_ids do
        JSON.parse(File.read("data/tasks_en.json"))
      end

      get :working_types do
        JSON.parse(File.read("data/working_types_en.json"))
      end

      get :user_info do
        puts params[:user_id]
        {
            user_id: current_user.email,
            name: current_user.first_name.to_s, #+ " " + current_user.last_name.to_s,
            stuff_id: current_user.stuff_id,
            project_id: current_user.current_project_id,
            current_location: current_user.current_location,
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
