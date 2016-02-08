module Query
  module Parameter
    class Parameter<CZ::BaseClass
      attr_accessor :kpi_subscribe, :kpi, :department, :entity_ids, :frequency, :method, :from_time, :end_time, :time_zone
      attr_accessor :attributes, :upper_boundary, :lower_boundary
      attr_accessor :map_group

      def initialize(params)
        self.kpi_subscribe =params[:kpi_subscribe]
        self.kpi = params[:kpi]
        self.department = params[:department]
        self.entity_ids=self.department.entities.pluck(:id)
        self.frequency =params[:frequency]
        self.method=params[:method]
        self.from_time=params[:from_time]
        self.end_time=params[:end_time]
        self.time_zone=params[:time_zone]||'Beijing'

        if self.kpi_subscribe
          self.upper_boundary=self.kpi_subscribe.upper_boundary
          self.lower_boundary=self.kpi_subscribe.lower_boundary
        else
          self.upper_boundary =self.kpi.target_max
          self.lower_boundary=self.kpi.target_min
        end

        if params[:attributes].present?
          self.attributes=[]
          params[:attributes].each do |p|
            self.attributes<<Attribute.new(id: p[:attribute_id], values: p[:values])
          end
        end
      end

    end

    class Attribute<CZ::BaseClass
      attr_accessor :id, :name, :values
    end
  end
end