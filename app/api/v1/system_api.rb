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

        JSON.parse(File.read("data/cities_#{locale}.json"))
      end
    end
  end
end