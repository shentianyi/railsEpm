module V2
  class Base < ApplicationAPI

    version 'v2', :using => :path


    mount PlanAPI
    mount PlcAPI
  end
end
