module Entry
  class DataService
    # base aggregator
    WEB_HIGHSTOCK=1
    IOS_TABLE=2
    WEB_HIGHSTOCK_IOS_TABLE=3
    # details table
    DETAIL_TABLE=4
    # period comapre table
    PERIOD_COMPARE_TABLE=5
    PERIOD_COMPARE_CHART=6


    attr_accessor :aggregator

    def initialize(parameter)
      case parameter
        when Entry::Parameter::AnalyseParameter
          if DataService.base_data_module_types.include?(parameter.data_module)
            self.aggregator = Entry::Aggregator::BaseAnalyseAggregator.new(parameter)
          elsif DataService.detail_table_types.include?(parameter.data_module)
            self.aggregator=Entry::Aggregator::DataDetailAggregator.new(parameter)
          elsif DataService.period_compare_types.include?(parameter.data_module)
            self.aggregator=Entry::Aggregator::PeriodCompareAggregator.new(parameter)
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

    def self.period_compare_types
      [PERIOD_COMPARE_TABLE,PERIOD_COMPARE_CHART]
    end
  end
end