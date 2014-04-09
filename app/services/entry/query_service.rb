module Entry
  class QueryService
    # model: model to query
    # base_condition: required conditions
    # property_condition: property of kpi
    def query(model,base_conditions, property_condtions=nil)
      query_cmd=model
      # build base query
      base_conditions.each do |k, v|
        query_cmd=query_key_word(query_cmd, k, v)
      end

      #build property query
      property_condtions.each do |k, v|
        query_cmd=query_key_word(query_cmd, "#{model.dynamic_field_name}.#{k}".to_sym, v)
      end if property_condtions

      query_cmd
    end

    def  query_key_word query_cmd, k, v
      query_cmd=query_cmd.where(Hash[k, v]) if v.is_a?(Fixnum) || v.is_a?(String)
      query_cmd=query_cmd.in(Hash[k, v]) if v.is_a?(Array)
      query_cmd=query_cmd.between(Hash[k, v]) if v.is_a?(Range)
      return query_cmd
    end
  end
end