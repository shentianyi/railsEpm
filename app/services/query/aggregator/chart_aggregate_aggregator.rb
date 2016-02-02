module Query
  module Aggregator
    class ChartAggregateAggregator<BaseAggregator

      def initialize(params)
        self.data={}
        self.parameter=Query::Parameter::AggregateParameter.new(params)
      end


      def clean_data
        return if self.parameter.attributes.blank?
        ids=self.parameter.attributes.map { |attr| attr.id }
        p "ids.................... #{ids}"
        property_values=KpiPropertyValue.by_property_id(self.parameter.kpi.id, ids).all
        return if property_values.size==0

        properties={}
        puts "##ids...............#{ids}"
        puts "#values............#{property_values}"

        ids.each do |id|
          property_values.select { |vv| vv.kpi_property_id==id }.each do |v|
            properties[id]||=[]
            properties[id]<< v.value
          end
          unless self.parameter.attribute_hash[id].blank?
            properties[id]=self.parameter.attribute_hash[id]
          end
        end


        p '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
        p properties
        p '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
        size=properties.size
        if size==1
          matrix=properties.values[0].product
        else
          matrix=properties.values[0].product(*properties.values[1...size])
        end

        puts '********************'
        p matrix
        puts '********************'
        matrix.each_with_index do |m, i|
          attribute_data=[]
          m.each_with_index do |mm, ii|
            attribute_data<<Query::Data::AttributeData.new(attribute_id: ids[ii],
                                                           attribute_value: mm,
                                                           attribute_name:KpiProperty.find_by_id(ids[ii]).name)
          end
          p '***^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
          p m
          self.data[m]= Query::Data::ChartAggregateData.new(
              attributes: attribute_data,
              value: KpiUnit.parse_entry_value(self.parameter.kpi.unit, 0),
              value_text: KpiUnit.get_value_display(self.parameter.kpi.unit, 0),
              percentage: 0,
              percentage_text: '0%'
          )
        end

        total= self.query_data.sum { |v| v['value'] }
        total=1.0 if total==0
        puts "##############{total}"
        self.query_data.each do |d|
          keys=[]

          ids.each do |id|
            keys<<d['_id'][id.to_s]
          end

          p '**%%*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
          p d
          p keys
          p '**%%*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'

          v=d['value']
          if self.data[keys]
            self.data[keys].value=KpiUnit.parse_entry_value(self.parameter.kpi.unit, v)
            self.data[keys].value_text=KpiUnit.get_value_display(self.parameter.kpi.unit, v)
            self.data[keys].percentage= ((v/total)*100).round(2)
          else
            return if keys.uniq.first==nil?
            attribute_data=[]
            d['_id'].each { |id, value| attribute_data<<Query::Data::AttributeData.new(attribute_id: id.to_i, attribute_value: value) }
            self.data[keys]=Query::Data::ChartAggregateData.new(
                attributes: attribute_data,
                value: KpiUnit.parse_entry_value(self.parameter.kpi.unit, v),
                value_text: KpiUnit.get_value_display(self.parameter.kpi.unit, v),
                percentage: ((v/total)*100).round(2),
                percentage_text: "#{((v/total)*100).round(2)}%"
            )
          end
        end

        self.data= self.data.values
      end

      def map
        mr=self.parameter.map_group
        %Q{
           function(){
                  emit({#{mr}},parseFloat(this.value));
              };
        }
      end

    end
  end
end