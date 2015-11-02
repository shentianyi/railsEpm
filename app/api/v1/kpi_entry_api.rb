module V1
  class KpiEntryAPI < Base
    HEADS = ['working_type', 'task_id']

    guard_all!
    include KpiEntryGuard

    namespace :kpi_entry do
      post :entry do
        status 200

        puts '000000000000'.blue
        p request.env['api.request.body'].class
        puts '---------------------------------------'

        Rails.logger.debug 'log entry data.................'
        Rails.logger.debug params
        Rails.logger.debug 'log entry data.................'
        if request.env['api.request.body'].nil? || request.env['api.request.body'].is_a?(Hash)

          # HEADS.each do |case_value|
          #   unless params[:kpi_properties][case_value].blank?
          #     params[:kpi_properties][case_value] = ParseLanguage.parse_code(params[:kpi_properties][case_value], case_value)
          #   end if params[:kpi_properties].present?
          # end

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
            puts '1......'
            params[:entries]=request.env['api.request.body']
            params[:entries].each do |p|

              if p.is_a?(Hash)
                puts '8*8*****************'
                p p[:kpi_properties]
                p p[:kpi_properties].class
                p p['kpi_properties']
                p p['kpi_properties'].class

                puts '8*8*****************'
                # HEADS.each do |case_value|
                #
                #   unless p[:kpi_properties][case_value].blank?
                #     puts '_______________'.blue
                #     p[:kpi_properties][case_value] = ParseLanguage.parse_code(p[:kpi_properties][case_value], case_value)
                #   end if p[:kpi_properties].present?
                # end
              end
            end
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
        if params[:from_time].blank? || params[:to_time].blank?
          params[:from_time]=7.days.ago.utc
          params[:to_time]=Time.now.utc
        end
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
