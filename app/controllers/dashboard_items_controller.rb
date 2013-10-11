#encoding: utf-8

require 'time'
class DashboardItemsController < ApplicationController

  def new
    @new_item = DashboardItem.new

    get_ability_category

    get_kpis_by_category

    get_user_entity_groups

  end

  def create
    @new_item = DashboardItem.new(params[:dashboard_item])
    msg = new_message
    puts params[:dashboard_item]
    if @new_item.save
      msg[:result]=true
      #
      # add condition to store serials
      #
      @conditions = params[:conditions]
      id = @new_item.id
      @conditions.each{|condition|
        puts condition[1]
        @new_condition = DashboardCondition.new(condition[1])
        @new_condition.dashboard_item_id = id

        if @new_condition.save
        else
          msg[:result]=false
        end
      }

    else
      msg[:errors]= @new_item.errors.full_messages
    end

    respond_to do |t|
      t.json {render :json=> @new_item }
      t.js {render :js=> jsonp_str(msg)}
    end
  end


  def destroy
    DashboardItem.destroy(params[:id])
    respond_to do |t|
      t.json {render :json=>{:result=>true,:id=>params[:id]}}
      t.js {render :js=> jsonp_str({:result=>true,id=>params[:id]})}
    end
  end

  def save_grid
    @sequence = params[:sequence]

    @sequence.each {|data|
      @item = DashboardItem.find(data[1][:id])
      puts data[1]

      @item.update_attributes(data[1])

      @item.save
    }

    respond_to do |t|
      t.json {render :json=>{:result=>true}}
      t.js {render :js=> jsonp_str({:result=>true})}
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
    datas = DashboardCondition::get_item_formatted_data(params[:id])
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

