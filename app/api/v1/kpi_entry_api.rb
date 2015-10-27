module V1
  class KpiEntryAPI < Base

    guard_all!
    include KpiEntryGuard

    namespace :kpi_entry do
      post :entry do
        status 200
        # if is single kpi entry

        Rails.logger.debug '--------------------------'
        Rails.logger.debug params
        Rails.logger.debug '--------------------------'


        
        if params[0].nil?
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
        else
         if guard_entries!(true, &do_entry)
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
      end


      desc 'get kpi entry api'
      params do
        requires :kpi_id, type: Integer, desc: 'kpi id'
      end
      get :entry do
        status 200

        params[:page] = 0 if params[:page].blank? || params[:page].to_i < 0
        params[:size] = 30 if params[:size].blank? || params[:size].to_i < 0
        params[:from_time]=7.days.ago.utc if params[:from_time].blank?
        params[:to_time]=Time.now.utc if params[:to_time].blank?

        p params

        msg = KpiEntry.do_search params
        if msg.result
          {
              result_code: '1',
              msg: msg.content
          }
        else
          {
              result_code: '0',
              msg: ['there is no data in the request']
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
