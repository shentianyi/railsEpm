#encoding: utf-8
module Api
  class ApiController<ApplicationController
    before_filter :require_user_as_director
    private
    def avatar_url
      "http://#{request.host}:#{request.port}/avatars/"
    end
  end
end