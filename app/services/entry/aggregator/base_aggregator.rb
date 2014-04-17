module Entry
  module Aggregator
    class BaseAggregator
      attr_accessor :parameter, :data_module

      def initialize(parameter)
        self.parameter=parameter
      end

    end
  end
end