module Query
  module Aggregator
    class BaseAggregator<CZ::BaseClass
      attr_accessor :parameter, :data, :query_data

      def aggregate
        self.query_data= query.map_reduce(map, reduce).out(inline: true)
        clean_data
        self.data
      end


      def query
        conditions={
            kpi_id: self.parameter.kpi.id,
            entity_id: self.parameter.entity_ids,
            entry_at: [self.parameter.from_time..self.parameter.end_time]
        }

        if self.parameter.attributes.present?
          self.parameter.attributes.each do |attr|
            conditions["a#{attr.id}".to_sym]=attr.values
          end
        end

        q=KpiEntry
        conditions.each do |k, v|
          q=query_key_word(q, k, v)
        end
        q
      end


      def map
        mr="date:format(this.entry_at,'#{KpiFrequency.date_format(self.parameter.frequency)}')"
        if self.parameter.map_group.present?
          mr = "#{self.parameter.map_group},#{mr}"
        end

        %Q{
           function(){
                  #{Mongo::Date.date_format}
                  emit({#{mr}},parseFloat(this.value));
              };
        }
      end

      def reduce
        %Q{
           function(key,values){
            return Array.#{KpiCalculate.get_operator(self.parameter.method)}(values);};
        }
      end

      def query_key_word(q, k, v)
        q=q.where(Hash[k, v]) if v.is_a?(Fixnum) || v.is_a?(String)
        if v.is_a?(Array)
          q= v.size==1 ? q.where(Hash[k, v[0]]) : q.in(Hash[k, v])
        end
        q=q.between(Hash[k, v]) if v.is_a?(Range)
        q
      end

      def clean_data
        self.data
      end

    end
  end
end