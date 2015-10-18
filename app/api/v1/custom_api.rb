module V1
  class CustomAPI < Base
    guard_all!

    namespace :custom do
      get :task_ids do
        [
            {
                code: 'CO',
                name: 'CO Task'
            },
            {
                code: 'INS',
                name: 'INS Task'
            },
            {
                code: 'INS 10A',
                name: 'INS 10A Task'
            }
        ]
      end


      get :working_types do
        [
            {
                code: 'A',
                check_in_validate: 'BLE',
                validate_content: 'LOCATION',
                check_out_validate: 'BLE',
                name: 'Working Time'
            },
            {
                code: 'R',
                check_in_validate: 'GPS',
                validate_content: 'LOCATION',
                check_out_validate: 'GPS',
                name: 'Travel Time'
            },
            {
                code: 'P',
                check_in_validate: 'NON',
                validate_content: '',
                check_out_validate: 'NON',
                name: 'Break time'
            }
        ]

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
	  optional :page, type: String, desc: 'page to shou greeting'
	  end
	  get :greetings do
	   {
		   greeting: '天气真好啊，不是吗？'
	   }
	  end
    end
  end
end
