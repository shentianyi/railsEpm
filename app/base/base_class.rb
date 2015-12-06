#encoding: utf-8
module CZ
  class BaseClass
    def initialize args={}
      if self.respond_to?(:default)
        self.default.each do |k, v|
          instance_variable_set "@#{k}", v
        end
      end

      args.each do |k, v|
        instance_variable_set "@#{k}", v
      end if args
    end

  end
end