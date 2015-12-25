module Query
  module Data
    class ChartAggregateData<CZ::BaseClass
      attr_accessor :attributes,
                    :value, :value_text,
                    :percentage, :percentage_text


      def percentage=(v)
        @percentage=v
        unless v.nil?
          self.percentage_text="#{@percentage}%"
        end
      end


    end


  end
end