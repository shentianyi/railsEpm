module V1
  class KpiEntryAPI < Base
    namespace 'kpi_entry'
    guard_all!

    include KpiEntryGuard


    get "secret" do
      {:secret => "only smart guys can see this ;)"}
    end

    post :entry do
      guard_entry!

    end

    post :entries do

    end
  end
end
