module V1
  class Base < ApplicationAPI

    version 'v1', :using => :path

    mount KpiEntryAPI
    mount SystemAPI
    mount UserAPI
    mount CustomAPI
    mount TemplateAPI
  end
end
