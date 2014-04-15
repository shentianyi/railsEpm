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

    private
    def call_data_service
      parameter=Entry::Parameter::AnalyseParameter.new(self.params)
      Entry::DataService.new(parameter).aggregate
    end
  end
end