module V1
  class KpiEntryAPI < Base
    namespace 'kpi_entry'
    # guard_all!
    include KpiEntryGuard

    post :entry do
      puts '----------------------'
      puts params
      puts params[:entry]
      puts params[:entry].class
      puts '------------------------'
      guard_entry! &do_entry
    end

    post :entries do
      batch_insert=params[:in_batch].nil? ? false : params[:in_batch]=='true'
      guard_entries!(batch_insert, &do_entry)
    end

    helpers do
      def do_entry
        Proc.new { |validator_collection|
          puts '---------------------------------sdfsdf'
          validator_collection.entry
        }
      end
    end
  end
end
