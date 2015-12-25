module Query
  module Data
    class ChartData<CZ::BaseClass
      attr_accessor :date_time,
                    :value, :value_text,
                    :upper_boundary, :lower_boundary,
                    :upper_boundary_text, :lower_boundary_text,
                    :over_upper_boundary, :over_lower_boundary

      def value=(v)
        @value=v
        unless v.nil?
          self.over_upper_boundary= v>self.upper_boundary
          self.over_lower_boundary=v<lower_boundary
        end
      end
    end
  end
end