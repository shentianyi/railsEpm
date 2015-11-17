module V1
  class KpiEntryAPI < Base
    HEADS = ['working_type', 'task_id']

    guard_all!
    include KpiEntryGuard

    namespace :kpi_entry do
      post :entry do
        status 200
Rails.logger.log '***********************'
  Rails.logger.log request.env['api.request.body']
Rails.logger.log '***********************'

        if request.env['api.request.body'].nil? || request.env['api.request.body'].is_a?(Hash)
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
        elsif request.env['api.request.body'].is_a?(Array)

          if params[:entries].blank?
            params[:entries]=request.env['api.request.body']
          else
            params[:entries] = JSON.parse(params[:entries])
          end


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
        #params[:page]=params[:page].to_i-1
#        if params[:from_time].blank? || params[:to_time].blank?
 #         params[:from_time]=7.days.ago.utc
  #        params[:to_time]=Time.now.utc
   #     end
        params[:user_id]=current_user.id
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


      desc 'get analyse kpi data'
      get :analyse do
        @kpi_id=params[:kpi_id]
        @kpi_name=params[:kpi_name]
        @entity_group_id=params[:entity_group_id]
        @entity_group_name=params[:entity_group_name]
        @start_time=params[:start_time]
        @end_time=params[:end_time]
        @frequency=params[:frequency].nil? ? nil : params[:frequency].to_i
        @type='area'
        @average= params[:average].nil? ? true : params[:average]=='true'
        @data=Entry::Analyzer.new(params).analyse
      end

    end

    desc 'upload excel add in data'
    params do
      requires :app_id, type: String, desc: 'App Id'
      requires :template_id, type: String, desc: 'Template Id'
      optional :file_name, type: String, desc: 'File name of excel'
      requires :data, type: Hash, desc: 'File Data'
    end
    post :upload do
      Rails.logger.debug '**************** excel logger'
      Rails.logger.debug params
      Rails.logger.debug '**************** excel logger'

      params[:entries]=[]
      params[:has_data_key]=true
      #raise ArgumentError,'App Id Error' if params[:app_id]!=$APP_ID


      params[:data].each do |k,entry|
        entry[:data_key]=k
        params[:entries]<<entry
      end

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



    helpers do
      def do_entry
        Proc.new { |validator_collection|
          validator_collection.entry
        }
      end
    end
  end
end
