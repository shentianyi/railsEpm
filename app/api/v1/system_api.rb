module V1
  class SystemAPI < Base
    guard_all!

    namespace :system do
      get :utc do
        {date: Time.now.utc.to_s}
      end

      get :cities do
        # params
        puts params[:country_code]
        [
            {
                city_id: 1,
                name: '北京市',
                pro_id: 1,
                city_sort: 1
            },
            {
                city_id: 2,
                name: '天津市',
                pro_id: 2,
                city_sort: 2
            }
        ]
      end
    end
  end
end
