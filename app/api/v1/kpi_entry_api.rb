module V1
  class KpiEntryAPI < Base

    guard_all!
    include KpiEntryGuard

    namespace :kpi_entry do
      post :entry do
        status 200
        if guard_entry! &do_entry

          {result_code: '1'}
        else
          {
              result_code: '0',
              msg: [I18n.t('entry.failure.system')]
          }
        end
      end

      get :entry do
        status 200

        params[:page] = 0 if params[:page].nil?
        params[:size] = 30 if params[:size].nil?
        msg = KpiEntry.do_search params
        if msg.result
          {
              result_code: '1',
              msg: msg.content
          }
        else
          {
              result_code: '0',
              msg: [I18n.t('there is no data in the request')]
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
