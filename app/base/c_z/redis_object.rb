#encoding: utf-8
require "c_z/base_class"
module CZ
  class RedisObject < CZ::BaseClass
    attr_accessor :nature

    def root
      rot = self
      parent = rot.parent_node.first
      while parent
        rot = self.class.find( parent )
        parent = rot.parent_node.first
      end
      rot
    end
    
    def parent_node
      ks = self.gen_parent_set_key
      $redis.smembers( ks )
    end
    
    def son_nodes
      ks = self.gen_son_set_key
      $redis.smembers( ks )
    end
    
    def add_parent( parent )
      ksParent = gen_parent_set_key
      $redis.sadd( ksParent, parent )
      # self.nature=="node" ? update( :nature=>"node" )
    end
    
    def add_son( son )
      ksSon = gen_son_set_key
      $redis.sadd( ksSon, son )
      update( :nature=>"node" )
    end



  # private
    
    def gen_parent_set_key
      "#{self.key}:parent_set"
    end
    
    def gen_son_set_key
      "#{self.key}:son_set"
    end
    
  end
end