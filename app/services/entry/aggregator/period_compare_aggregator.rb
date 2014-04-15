module Entry
  module Aggregator
    class PeriodCompareAggregator<BaseAggregator
      def aggregate
        c=Entry::ConditionService.new(self.parameter)
        query_condition=c.build_base_query_condition
        mr_condition=c.build_map_reduce_condition
        query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0)
        query=query.any_of(c.build_or_condition)

        mr_condition[:map_group]+="date:format(this.parsed_entry_at,'#{self.parameter.date_format}')"
        map=%Q{
        #{Mongo::Date.date_format}
           function(){emit({#{mr_condition[:map_group]}},parseFloat(this.value));};
        }

        func=self.parameter.average ? 'avg' : 'sum'
        reduce=%Q{
           function(key,values){return Array.#{func}(values);};
        }
        query.map_reduce(map, reduce).out(inline: true)
      end
    end
  end
end