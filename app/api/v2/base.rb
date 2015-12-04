module V2
  class Base < ApplicationAPI

    version 'v2', :using => :path

    mount UserAPI
  end
end
