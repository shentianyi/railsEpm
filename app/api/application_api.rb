class ApplicationAPI < Grape::API
  include APIGuard
  format :json

  mount V1::Base
  mount V2::Base

  get :apps do
    [
        {
            app_id: "clearinsight",
            invoke_address: "http://#{Settings.server.host}/api/v1/",
            app_name: "Beko ClearInsight",
            need_auth: true
        }
    ]
  end

end
