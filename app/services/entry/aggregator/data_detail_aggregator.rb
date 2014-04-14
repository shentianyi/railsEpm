module Entry
  module Aggregator
    class DataDetailAggregator<BaseAggregator

      def aggregate
        query_condition=Entry::ConditionService.new(self.parameter).build_base_query_condition
        entries=Entry::QueryService.new.base_query(KpiEntry, query_condition[:base], query_condition[:property]).where(entry_type: 0).all
        return entries
      end
    end
  end
end