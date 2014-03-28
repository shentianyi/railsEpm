#encoding: utf-8
module Api
  class SubscriptionsController < SubscriptionsController
    skip_authorize_resource
  end
end