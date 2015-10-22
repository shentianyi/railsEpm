#encoding: utf-8
require 'base_class'

class UrlMessage<Message
  attr_accessor :url_result

  def default
    {:result => false, :url_result => false}
  end
end