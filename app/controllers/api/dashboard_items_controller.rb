class Api::DashboardItemsController < ApplicationController

  def items_by_dashboard_id
    formatted_items = DashboardItem::get_formatted_items_by_dashboard_id(params[:id])
    respond_to do |t|
      t.json {render :json=>formatted_items}
      t.js {render :js => jsonp_str(formatted_items)}
    end
  end



  def get_data
    #data = DashboardItem::get_item_formatted_data(params[:id])
    #respond_to do |t|
    #  t.json {render :json=>data.to_json}
    #  t.js {render :js=>jsonp_str(data)}
    #end

    datas = DashboardCondition::get_item_formatted_data(params[:id])

    @item = DashboardItem.find(params[:id])
    if @item
      @item.update_attribute("last_update",params[:last_update])
    end

    respond_to do |t|
      t.json {render :json=>datas.to_json}
      t.js {render :js=>jsonp_str(datas)}
    end
  end




  def update_sequence
    seq_arr=params[:sequence]
    if seq_arr && seq_arr.kind_of?(Array)
      for i in 0..seq_arr.length-1
        DashboardItem.find(seq_arr[i].to_i).update_attributes(:sequence=>i)
      end
    end
    respond_to do |t|
      t.json {render :json=>true}
      t.js {render :js=>jsonp_str(true)}
    end
  end
end
