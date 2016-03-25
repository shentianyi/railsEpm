module V2
  class PlcAPI < Base
    # guard_all!

    namespace :plcs do


      desc 'upload plc data'
      # params do
      #   requires :codes, type: String, desc: 'codes'
      #   requires :values,types: String,desc:'values'
      # end
      post :upload do
        Rails.logger.debug '**************** plc logger'
        Rails.logger.debug params
        Rails.logger.debug '**************** plc logger'
        PlcService.post_data(params)
      end


      desc 'get warehouse plan'
      params do
        requires :date, type: Time, desc: 'date'
        requires :product_line, type: String, desc: 'product line'
      end
      get :plans do
        Rails.logger.debug '**************** plc logger'
        Rails.logger.debug params
        Rails.logger.debug '**************** plc logger'
        PlcService.get_plan params
      end

      desc 'confirm plan'
      post :confirm_plan do
        PlcService.confirm_plan params
      end
    end
  end
end