require 'clear_insight'
require 'clear_insight/clear_insight_service_types'
module ClearInsight
  class Service
    META_FAMILY='data'

    def base_query(condition, group_keys, kpi)
      self.parse_condition_to_filter(condition)
      self.parse_group_keys(group_keys)
      request=ClearInsight::Thrift::BaseQueryRequest.new(
          equalFilters: @equal_filters,
          inFilters: @in_filters,
          rangeFilters: @range_filters,
          groupColumns: @group_columns,
          zoomType: kpi.frequency,
          aggreType: ClearInsight::Thrift::AggreType::SUM_GROUP
      )

      response=$ci.Ping
      puts '------------------------------------------thrift response'
      puts response
      puts '------------------------------------------thrift response end'
    end

    def parse_condition_to_filter(condition)
      @equal_filters=[]
      @in_filters=[]
      @range_filters=[]
      condition.each do |k, v|
        if v.is_a?(Fixnum) || v.is_a?(String)
          @equal_filters<< ClearInsight::Thrift::EqualFilter.new(family: META_FAMILY, qualifier: k, value: v)
        elsif v.is_a?(Array)
          @in_filters<<ClearInsight::Thrift::InFilter.new(family: META_FAMILY, qualifier: k, values: v)
        elsif v.is_a?(Range)
          @range_filters<<ClearInsight::Thrift::RangeFilter.new(family: META_FAMILY, qualifier: k, values: v)
        end
      end
    end

    def parse_group_keys(group_keys)
      @group_columns=[]
      group_keys.each do |k|
        @group_columns<<ClearInsight::Thrift::HBaseColumn.new(family: META_FAMILY, qualifier: k)
      end
    end
  end
end