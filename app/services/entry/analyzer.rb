module Entry
  class Analyzer
    attr_accessor :params

    def initialize(params)
      #params[:start_time]='1920-05-12T16:00:00Z'
      self.params=params
    end

    # base analyse
    # almost for old apis
    # it would be changed by ui requires
    def analyse
      puts '-----------------------------------analyse params'
      puts self.params
      puts '-----------------------------------*'
       a= call_data_service
      puts a
      puts '-------'
    #  puts analyse_with_table.to_json
    #   puts detail.to_json
      a
    end

    # chart and table data
    def analyse_with_table
      self.params[:data_module]=Entry::DataService::WEB_HIGHSTOCK_IOS_TABLE
      call_data_service
    end

    # detail table
    def detail
      self.params[:data_module]=Entry::DataService::DETAIL_TABLE
      call_data_service
    end

    def period_compare
      ordered={}
      self.params[:property_map_group].each do |p|
        ordered[p]= p
      end
      self.params[:property_map_group]=ordered
      self.params[:data_module]=Entry::DataService::PERIOD_COMPARE_TABLE

      puts '-----------------------------------analyse params'
      puts self.params
      puts '-----------------------------------*'
      a= call_compare_data_service
      puts a.to_json
      puts '-------'
      #  puts analyse_with_table.to_json
      #   puts detail.to_json
      a

    end

    def period_compares
      self.params[:data_module]=Entry::DataService::PERIOD_COMPARE_CHART
      self.params[:compare_size]=self.params[:compare_size] || 10
      self.params.delete(:property_map_group) if self.params.has_key?(:property_map_group)
      # call_compare_data_service
      puts '-----------------------------------analyse params'
      puts self.params
      puts '-----------------------------------*'
      a= call_compare_data_service
      puts a.to_json
      puts '-------'
      #  puts analyse_with_table.to_json
      #   puts detail.to_json
      a
    end


    private
    def call_data_service

      if self.params[:report].blank?
        call_meta_data_service
      else
        if self.params[:property].blank?
          self.params[:property]={}
        end
        if self.params[:report]=='ok'
          return get_ok_result
        elsif self.params[:report]=='nok'
          return get_nok_result
        elsif self.params[:report]=='ftq'
          return get_ftq_result
        end
      end
    end

    def get_ok_result
      self.params[:property]['19']=['success']
      return call_meta_data_service
    end

    def get_nok_result
      self.params[:property]['19']=['fail']
      return call_meta_data_service
    end

    def get_ftq_result
      ok=get_ok_result
      nok=get_nok_result
      percents=[]
      unit=[]
      ok[:current].each_with_index do |v, i|
        total=v+nok[:current][i]
        if total==0
          percents << 0
        else
          percents << ((v*100/total))
        end
        unit << '%'
      end
      ok[:current]=percents
      ok[:unit]=unit
      return ok
    end

    def call_meta_data_service
      parameter=Entry::Parameter::AnalyseParameter.new(self.params)
      return Entry::DataService.new(parameter).aggregate
    end


    def call_compare_data_service
      unless self.params[:base_time].has_key?(:end_time)
        self.params[:base_time][:end_time]=KpiFrequency.get_next_end_date(self.params[:base_time][:start_time], self.params[:frequency].to_i).to_s
      end
      parameter=Entry::Parameter::PeriodCompareParameter.new(self.params)

      Entry::DataService.new(parameter).aggregate
    end
  end
end