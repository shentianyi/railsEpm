#encoding: utf-8
module Cz
  class BaseClass
    attr_accessor :key
    def initialize args={}
      args.each do |k,v|
        instance_variable_set "@#{k}",v
      end
    end

    def save
      return false  if $redis.exists(@key)
      instance_variables.each do |attr|
        $redis.hset @key,attr.to_s.sub(/@/,''),instance_variable_get(attr)
      end
      return true
    end

    def cover
      instance_variables.each do |attr|
        $redis.hset @key,attr.to_s.sub(/@/,''),instance_variable_get(attr)
      end
    end

    def update attrs={}
      return false  unless $redis.exists(@key)
      if attrs.count>0
        attrs.each do |k,v|
          instance_variable_set "@#{k}",v
          $redis.hset @key,k,v
        end
      end
    end

    def self.find key
      if $redis.exists key
      return self.new($redis.hgetall key)
      end
      return nil
    end

    def destroy
      if $redis.exists @key
        $redis.del @key
      return true
      end
      return false
    end

    def id
      ClassKeyHelper::decompose_key self.class.name,self.key
    end

    def self.get_key_by_id id
      ClassKeyHelper::compose_key name,id
    end

  end
end