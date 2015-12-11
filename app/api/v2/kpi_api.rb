module V2
  class KpiAPI<Base
    guard_all!

    namespace :kpis do
      get :unit_of_measurements do
        KpiService.unit_select
      end

      get :calculate_methods do
        KpiService.calculate_select
      end

      get :timing_frequencies do
        KpiService.frequency_select
      end
    end
  end
end