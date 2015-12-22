module V2
  class Base < ApplicationAPI

    version 'v2', :using => :path

    mount UserAPI
    mount DepartmentAPI
    mount KpiAPI
    mount SearchAPI
    mount UserGroupAPI

    mount TestAPI
  end
end
