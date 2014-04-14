module Entry
  module Aggregator
    class MapReduceAggregator<BaseAggregator
      def aggregate
        c=Entry::ConditionService.new(self.parameter)
        query_condition=c.build_base_query_condition
        mr_condition=c.build_map_reduce_condition
        query=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0)
        map=%Q{
           function(){emit(#{mr_condition[:map_group]},parseFloat(this.value));};
        }
        reduce=%Q{
           function(key,values){return Array.sum(values);};
        }
        query.map_reduce(map, reduce).out(inline: true)
      end
    end
  end
end