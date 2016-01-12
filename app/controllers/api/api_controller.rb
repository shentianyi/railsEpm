#encoding: utf-8
module Api
  class ApiController<ApplicationController
    skip_before_filter :verify_authenticity_token
    before_filter :require_user
  end
end