module Query
  module Parameter
    class AggregateParameter<Query::Parameter::Parameter

      attr_accessor :attribute_hash

      def initialize(params)
        super
        if self.attributes.present?

          self.map_group = self.attributes.map { |attr| "#{attr.id}:this.a#{attr.id}" }.join(',')
          self.attribute_hash={}
          self.attributes.each do |attribute|
            self.attribute_hash[attribute.id]=attribute.values
          end


        end
      end
    end
  end
end