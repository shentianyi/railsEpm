#encoding: utf-8
require 'base_class'

class Setting<CZ::BaseClass
  attr_accessor :ios_app_version

  def self.find
    if $redis.exists(key)
      cache=self.new($redis.hgetall key)
      return cache
    end
  end

  def self.ios_app_version_is_old version
    if $redis.exists(key)
      version<self.new($redis.hgetall(key)).ios_app_version
    end
    true
  end

  def self.key
    'epm:admin:setting'
  end
end