module V1
  class Base < ApplicationAPI
    version 'v1', :using => :path

    mount KpiEntryAPI
    mount SystemAPI
    #mount TestAPI
  end
end
