#encoding: utf-8
class TenantsController < ApplicationController
 skip_before_filter :authorize,:only=>:create

 # create a tenant
 def create
  if TenantsHelper.init_tenant(params)

  else

  end
 end
end
