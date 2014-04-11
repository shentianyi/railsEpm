module Entry
  class DataService
    def aggregate(analyse_condition)
      data_module=DataModule.new(analyse_condition)
      data_module.aggregate
    end
  end

  class DataModule
    WEB_HIGHSTOCK=1
    IOS_TABLE=2
    WEB_HIGHSTOCK_IOS_TABLE=3

    attr_accessor :aggregator

    def initialize(condition)
      if DataModule.base_data_module_types.include?(condition.data_module)
        self.aggregator = Entry::BaseDataAggregator.new(condition)
      end
    end

    def aggregate
      self.aggregator.aggregate
    end

    private
    def self.base_data_module_types
      [WEB_HIGHSTOCK, IOS_TABLE, WEB_HIGHSTOCK_IOS_TABLE]
    end

  end
end