#encoding: utf-8
#RESTFUL api
module Api
  class KpiPropertiesController<ApiController
    def property_value
      item = KpiPropertyItem.where(kpi_id: params[:kpi_id], kpi_property_id: params[:kpi_property_id]).first
      @kpi_property_value = KpiPropertyValue.where(item.id) if item
      render :json => @kpi_property_value.pluck(:value)
    end
  end
end