#encoding: utf-8
module Enum
  def initialize(key, value, desc)
    @key = key
    @value = value
    @desc= desc
  end

  def key
    @key
  end

  def value
    @value
  end

  def desc
    @desc
  end

  def self.included(base)
    base.extend(EnumMethods)
  end

  module EnumMethods
    def define(key, value, desc)
      @hash ||= {}
      @hash[key] = self.new(key, value, desc)
    end

    def const_missing(key)
      @hash[key].value if @hash[key]
    end

    def get_by_value value
      @hash.each do |k, v|
        if v.value==value
          return v.key
        end
      end
      return nil
    end

    def get_desc_by_value value
      @hash.each do |k, v|
        if v.value==value
          puts v.class
          return v.desc
        end
      end
      return nil
    end

    def all
      @hash.values
    end

    def values
      @hash.map{|k,v| v.value}
    end

    def as_select
      all.map { |a| SelectItem.new(id: a.value, name: a.desc) }
    end

    def include?(value)
      @hash.each do |k, v|
        if v.value==value
          return true
        end
      end
      return false
    end
  end
end
