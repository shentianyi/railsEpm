require 'time'
class DashboardItemsController < ApplicationController


    def create

      @new_item = DashboardItem.new(params[:dashboard_item])
      msg = new_message
      if @new_item.save
        msg[:result]=true
      else
        msg[:errors]= @new_item.errors.full_messages
      end
      respond_to do |t|
        t.json {render :json=>{:result=>false,:errors=>@new_item.errors.full_messages}}
        t.js {render :js=> jsonp_str({:result=>false,:errors=>@new_item.errors.full_messages})}
      end
    end


  def destroy
    DashboardItem.destroy(params[:id])
    respond_to do |t|
      t.json {render :json=>{:result=>true,:id=>params[:id]}}
      t.js {render :js=> jsonp_str({:result=>true,id=>params[:id]})}
    end
  end



  def items_by_dashboard_id
      formatted_items = DashboardItem::get_formatted_items_by_dashboard_id(params[:id])
    respond_to do |t|
      t.json {render :json=>formatted_items}
      t.js {render :js => jsonp_str(formatted_items)}
    end
  end



  def get_data
   data = DashboardItem::get_item_formatted_data(params[:id])
      respond_to do |t|
        t.json {render :json=>data.to_json}
        t.js {render :js=>jsonp_str(data)}
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

