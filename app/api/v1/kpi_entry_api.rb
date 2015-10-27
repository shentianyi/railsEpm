module V1
  class KpiEntryAPI < Base

    guard_all!
    include KpiEntryGuard

    namespace :kpi_entry do
      post :entry do
        status 200
        if guard_entry! &do_entry
          {
			  result_code: '1',
			  msg: [I18n.t('entry.success.data')]
		  }
        else
          {
              result_code: '0',
              msg: [I18n.t('entry.failure.system')]
          }
        end
      end

      post :entries do
        batch_insert=params[:in_batch].nil? ? false : params[:in_batch]=='true'
        guard_entries!(batch_insert, &do_entry)
      end


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
