module V1
  class KpiEntryAPI < Base
    namespace 'kpi_entry'
    guard_all!
    include KpiEntryGuard

    get "secret" do
      {:secret => "only smart guys can see this ;)"}
    end

    post :entry do
      guard_entry! &do_entry
    end

    post :entries do
      guard_entries! &do_entry
    end

    helpers do
      def do_entry
        Proc.new { |entry_p|
          validator=KpiEntryValidator.new(entry_p)
          validator.validate
          validator.valid ? validator.entry : (raise ArgumentError, validator.content.join(';'))
        }
      end
    end
  end
end
