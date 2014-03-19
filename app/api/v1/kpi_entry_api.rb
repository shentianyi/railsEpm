module V1
  class KpiEntryAPI < Base
    namespace 'kpi_entry'
    guard_all!
    include KpiEntryGuard

    post :entry do
      guard_entry! &do_entry

    end

    post :entries do
      puts params[:in_batch]
      puts params[:in_batch]=='true'
      batch_insert=params[:in_batch].nil? ? false : params[:in_batch]=='true'
      puts batch_insert
      guard_entries!(batch_insert, &do_entry)
    end

    helpers do
      def do_entry
        Proc.new { |validator_collection|
          validator_collection.entry
        }
      end
    end
  end
end
