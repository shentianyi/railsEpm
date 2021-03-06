module Entry
  class QueryService
    # function: sum, avg, min, max
    # base_condition: required conditions, *entry_type*
    # property_condition: property of kpi
    def base_query(model, base_conditions, property_conditions=nil)
      query_cmd=model
      # build base query
      base_conditions.each do |k, v|
        query_cmd=query_key_word(query_cmd, k, v)
      end
      #build property query
      property_conditions.each do |k, v|
        query_cmd=query_key_word(query_cmd, k, v)
      end if property_conditions

      query_cmd
    end

    def query_key_word(query_cmd, k, v)
      query_cmd=query_cmd.where(Hash[k, v]) if v.is_a?(Fixnum) || v.is_a?(String)
      if v.is_a?(Array)
        query_cmd= v.size==1 ? query_cmd.where(Hash[k, v[0]]) : query_cmd.in(Hash[k, v])
      end
      query_cmd=query_cmd.between(Hash[k, v]) if v.is_a?(Range)
      return query_cmd
    end

    def map_reduce(query, group)
      map=%Q{
           function(){
                  #{Mongo::Date.date_format}
                  emit({#{group}},{sum:parseFloat(this.value),count:1});
              };
        }
       reduce=%Q{
           function(key,values){
             var a=values[0];
             for(var i=1;i<values.length;i++){
                var b=values[i];
                a.sum+=b.sum;
                a.count+=b.count;
             }
            return a;
          };
        }
      finalize=%Q{
           function(key,value){
           value.avg=value.sum/value.count;
           return value;
         }
        }
      query.map_reduce(map, reduce).finalize(finalize).out(inline: true)
    end
  end
end