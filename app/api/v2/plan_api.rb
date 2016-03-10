module V2
  class PlanAPI < Base

    guard_all!

    namespace :plans do
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
        Rails.logger.debug params[:template_id]
        Rails.logger.debug '**************** excel logger'


        message={}

        ProductionPlan.transaction do

          params[:data].each do |k, v|
            if v[:assembly].blank? || v[:product_line].blank? || v[:planned].blank? || v[:date].blank?
              message[k]='请填写全部列数据,不可为空'
            else
              if pp=ProductionPlan.where(assembly: v[:assembly],
                                         product_line: v[:product_line],
                                         date: v[:date]).first
                pp.update_attributes(planned: v[:planned])
              else
                ProductionPlan.create(assembly: v[:assembly],
                                      product_line: v[:product_line],
                                      planned: v[:planned],
                                      date: v[:date])
              end
            end
          end

          if message.count==0
            {
                result_code: '1',
                msg: [I18n.t('entry.success.data')]
            }
          else
            {
                result_code: '0',
                msg: @error
            }
          end


        end

      end
    end
  end
end
