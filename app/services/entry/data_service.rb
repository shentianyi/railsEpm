module Entry
  class DataService
    WEB_HIGHSTOCK=1
    IOS_TABLE=2
    WEB_HIGHSTOCK_IOS_TABLE=3
    DETAIL_TABLE=4
    MAPREDUCE_DETAIL_TABLE=5

    attr_accessor :aggregator

    def initialize(parameter)
      case parameter
        when Entry::Parameter::AnalyseParameter
          if DataService.base_data_module_types.include?(parameter.data_module)
            self.aggregator = Entry::Aggregator::BaseAnalyseAggregator.new(parameter)
          elsif DataService.detail_table_types.include?(parameter.data_module)
            self.aggregator=Entry::Aggregator::DataDetailAggregator.new(parameter)
          elsif DataService.map_reduce_detail_table.include?(parameter.data_module)
            self.aggregator=Entry::Aggregator::MapReduceAggregator.new(parameter)
          end
      end
    end

    def aggregate
      self.aggregator.aggregate
    end

    private
    def self.base_data_module_types
      [WEB_HIGHSTOCK, IOS_TABLE, WEB_HIGHSTOCK_IOS_TABLE]
    end

    def self.detail_table_types
      [DETAIL_TABLE]
    end

    def self.map_reduce_detail_table
      [MAPREDUCE_DETAIL_TABLE]
    end
  end
end