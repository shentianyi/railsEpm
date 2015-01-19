require 'thrift_client'
require 'clear_insight'
require 'clear_insight/clear_insight_service_types'
module ClearInsight
  class Service
    META_FAMILY='data'
    GROUP_SPLIT='|'

    def base_query(condition, group_keys, kpi)
      self.parse_condition_to_filter(condition)
      self.parse_group_keys(group_keys)
      request=ClearInsight::Thrift::BaseQueryRequest.new(
          id: kpi.id.to_s,
          equalFilters: @equal_filters,
          inFilters: @in_filters,
          rangeFilters: @range_filters,
          groupColumns: @group_columns,
          zoomType: kpi.frequency,
          aggreType: ClearInsight::Thrift::AggreType::SUM_GROUP
      )

      puts '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
      puts request.to_json
      puts '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'

      response=$ci.GroupAggreQuery(request)

      puts '------------------------------------------thrift response'
      puts response.to_json
      puts '------------------------------------------thrift response end'
      # end
    end

    def parse_condition_to_filter(condition)
      @equal_filters=[]
      @in_filters=[]
      @range_filters=[]
      condition.each do |k, v|
        if v.is_a?(Fixnum) || v.is_a?(String)
          @equal_filters<< ClearInsight::Thrift::EqualFilter.new(family: META_FAMILY, qualifier: k.to_s, value: v.to_s)
        elsif v.is_a?(Array)
          @in_filters<<ClearInsight::Thrift::InFilter.new(family: META_FAMILY, qualifier: k.to_s, values: v.map { |vv| vv.to_s })
        elsif v.is_a?(Range)
          v1=v.first.dup; v2=v.last.dup
          v1= v1.is_a?(Time) ? v1.localtime.strftime('%Y/%m/%d %H:%M:%S.%L') : v1.to_s
          v2= v2.is_a?(Time) ? v2.localtime.strftime('%Y/%m/%d %H:%M:%S.%L') : v2.to_s
          @range_filters<<ClearInsight::Thrift::RangeFilter.new(family: META_FAMILY, qualifier: k.to_s, values: [v1.to_s, v2.to_s])
        end
      end
      @equal_filters<< ClearInsight::Thrift::EqualFilter.new(family: META_FAMILY, qualifier: 'entry_type', value: '1')

    end

    def parse_group_keys(group_keys)
      @group_columns=[]
      group_keys.each do |k|
        @group_columns<<ClearInsight::Thrift::HBaseColumn.new(family: META_FAMILY, qualifier: k)
      end
    end
  end
end