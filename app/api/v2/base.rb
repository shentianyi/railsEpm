module V2
  class Base < ApplicationAPI

    version 'v2', :using => :path

    mount UserAPI
    mount DepartmentAPI
    mount KpiAPI
    mount KpiSubscribeAPI
    mount SearchAPI
    mount UserGroupAPI
    mount StorySetAPI
    mount TaskAPI
    mount EntryAPI
    mount AlertAPI


    mount TestAPI
  end
end
