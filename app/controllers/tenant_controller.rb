#encoding: utf-8
class TenantController < ApplicationController
 skip_before_filter :authorize,:only=>:create

 # create a tenant
 def create
   
 end
end
