#encoding: utf-8

require 'time'
class DashboardItemsController < ApplicationController
  skip_before_filter :require_user, :only => [:get_data, :items_by_dashboard_id]
  skip_before_filter :check_tenant_status, :only => [:get_data, :items_by_dashboard_id]
  skip_before_filter :find_current_user_tenant, :only => [:get_data, :items_by_dashboard_id]
  skip_before_filter :current_ability, :only => [:get_data, :items_by_dashboard_id]

  def new
    #@new_item = DashboardItem.new

    @dashboards = Dashboard.find_all_by_user_id(current_user.id)

    get_ability_category

    get_kpis_by_category

    get_user_entity_groups

  end

  def create
    @new_item = DashboardItem.new(params[:dashboard_item])
    msg = new_message
    cansave = true
    @conditions = params[:conditions]
    @conditions.each { |condition|
      puts condition.to_json
      puts condition[1].to_json

      @new_condition = DashboardCondition.new(condition[1])

      puts @new_condition.kpi_property.class

      puts @new_condition.kpi_property
      puts @new_condition.kpi_property.is_a?(Hash)
      puts '-------------'
      if @new_condition.time_string.nil?
        next
      end

      @new_item.interval=KpiFrequency::Daily if @new_item.interval.blank?


      ##check if time out of range
      time_span = DashboardItem.time_string_to_time_span @new_condition.time_string
      # count = DashboardCondition.time_range_count(time_span[:start].iso8601.to_s, time_span[:end].iso8601.to_s, @new_item.interval)
      # puts "=================="
      # puts count
      # if count > 150
      #   cansave = false
      #   break
      # end
      ##

      @new_item.dashboard_conditions<<@new_condition
    }
    if cansave
      if @new_item.save
        msg[:result] = true
        msg[:content] = @new_item.as_json
      else
        msg[:result] =false
        msg[:errors] =@new_item.errors.full_messages
      end
    else
      msg[:result] = false
      msg[:errors] = I18n.t "fix.zone_too_large"
    end

    respond_to do |t|
      t.json { render :json => msg }
      t.js { render :js => jsonp_str(msg) }
    end
  end


  def destroy
    DashboardItem.destroy(params[:id])
    respond_to do |t|
      t.json { render :json => {:result => true, :id => params[:id]} }
      t.js { render :js => jsonp_str({:result => true, id => params[:id]}) }
    end
  end

  def save_grid
    @sequence = params[:sequence]
    @sequence.each { |data|
      @item = DashboardItem.find(data[1][:id])
      @item.update_attributes(data[1])

      @item.save
    }

    respond_to do |t|
      t.json { render :json => {:result => true} }
      t.js { render :js => jsonp_str({:result => true}) }
    end
  end

  def items_by_dashboard_id
    formatted_items = DashboardItem::get_formatted_items_by_dashboard_id(params[:id])
    respond_to do |t|
      t.json { render :json => formatted_items }
      t.js { render :js => jsonp_str(formatted_items) }
    end
  end


  def get_data
    datas = DashboardCondition::get_item_formatted_data(params[:id])

    @item = DashboardItem.find(params[:id])
    if @item
      @item.update_attribute("last_update", params[:last_update])
    end

    respond_to do |t|
      t.json { render :json => datas.to_json }
      t.js { render :js => jsonp_str(datas) }
    end
  end


  def update_sequence
    seq_arr=params[:sequence]
    if seq_arr && seq_arr.kind_of?(Array)
      for i in 0..seq_arr.length-1
        DashboardItem.find(seq_arr[i].to_i).update_attributes(:sequence => i)
      end
    end
    respond_to do |t|
      t.json { render :json => true }
      t.js { render :js => jsonp_str(true) }
    end
  end
end

