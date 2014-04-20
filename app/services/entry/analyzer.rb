module Entry
  class Analyzer
    attr_accessor :params

    def initialize(params)
      self.params=params
    end

    # base analyse
    # almost for old apis
    # it would be changed by ui requires
    def analyse
      call_data_service
    end

    # chart and table data
    def analyse_with_table
      self.params[:data_module]==Entry::DataService::WEB_HIGHSTOCK_IOS_TABLE
      call_data_service
    end

    # detail table
    def detail
      self.params[:data_module]=Entry::DataService::DETAIL_TABLE
      call_data_service
    end

    def period_compare
      self.params[:data_module]=Entry::DataService::PERIOD_COMPARE_TABLE
      call_compare_data_service
    end

    def period_compares
      self.params[:data_module]=Entry::DataService::PERIOD_COMPARE_CHART
      self.params[:compare_size]=params[:compare_size] || 10
      call_compare_data_service
    end


    private
    def call_data_service
      parameter=Entry::Parameter::AnalyseParameter.new(self.params)
      Entry::DataService.new(parameter).aggregate
    end

    def call_compare_data_service
      parameter=Entry::Parameter::PeriodCompareParameter.new(self.params)
      Entry::DataService.new(parameter).aggregate
    end
  end
end