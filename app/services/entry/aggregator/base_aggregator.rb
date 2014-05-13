module Entry
  module Aggregator
    class BaseAggregator
      attr_accessor :parameter, :data_module,:data,:value_key

      def initialize(parameter)
        self.parameter=parameter
        self.value_key=self.parameter.average ? 'avg' : 'sum'
      end
    end
  end
end