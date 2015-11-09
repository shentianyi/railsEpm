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

	  #desc 'validate kpi'
	 # params do
	#	  requries :id,type: Integer,desc:'kpi id'
	 # end
	  post :validate_kpi do
		  status 200
        if Kpi.find_by_id(params[:id])
			{
				result:1,
			    msg:['kpi valid']
			}
		else
			{
			 result:0,
			 msg:['kpi invalid']
			}
		end
	  end
    end
  end
end
