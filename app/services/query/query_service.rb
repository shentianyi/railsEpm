
module Query
  class QueryService
    CHART=100
    CHART_AGGREGATE=200

    def self.query(params, type)
      case type
        when CHART
          Query::Aggregator::ChartAggregator.new(params).aggregate
        when CHART_AGGREGATE
          Query::Aggregator::ChartAggregateAggregator.new(params).aggregate
      end
    end

  end
end