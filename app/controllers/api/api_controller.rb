#encoding: utf-8
module Api
  class ApiController<ApplicationController
    before_filter :require_user_as_director

    def test_parent
      puts '----------------------------------------'
end
  end
end