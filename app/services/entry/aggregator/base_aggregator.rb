module Entry
  module Aggregator
    class BaseAggregator
      attr_accessor :parameter, :data_module,:data

      def initialize(parameter)
        self.parameter=parameter
      end
    end
  end
end