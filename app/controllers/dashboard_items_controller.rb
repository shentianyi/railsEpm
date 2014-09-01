#encoding: utf-8

require 'time'
class DashboardItemsController < ApplicationController

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
    @conditions.each{|condition|
    @new_condition = DashboardCondition.new(condition[1])
    if @new_condition.time_string.nil?
      next
    end
    ##check if time out of range
    time_span = DashboardItem.time_string_to_time_span @new_condition.time_string
    count = DashboardCondition.time_range_count(time_span[:start].iso8601.to_s,time_span[:end].iso8601.to_s,@new_item.interval)
    if count > 150
      cansave = false
      break
    end
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
      t.json {render :json=> msg }
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

    @item = DashboardItem.find(params[:id])
    if @item
      @item.update_attribute("last_update",params[:last_update])
    end

    respond_to do |t|
      t.json {render :json=>datas.to_json}
      t.js {render :js=>jsonp_str(datas)}
    end
  end
  # GET /dashboard_items/fake_data_time
  def fake_data_time
    #kpi
    kpi_name = params[:kpi]
    target_name = kpi_name+"_Target"
    kpi = Kpi.find_by_name(kpi_name)
    kpi_target = Kpi.find_by_name(target_name)
    kpi_target = kpi_target.nil? ? kpi : kpi_target
    #department
    department = params[:department]
    #interval
    interval = params[:interval]
    #time range
    time_range = params[:time_range]

    time_span = DashboardItem.time_string_to_time_span time_range
    start_time = time_span[:start].iso8601.to_s
    end_time = time_span[:end].iso8601.to_s

    cal = "AVERAGE"
    title = 'test'



    e = EntityGroup.find_by_name(department)
    data = Entry::Analyzer.new(
        kpi_id: kpi.id,
        entity_group_id: e.id,
        start_time: start_time,
        end_time: end_time,
        average: cal,
        frequency: interval).analyse
    current = data[:current]

    data_target = Entry::Analyzer.new(
        kpi_id: kpi_target.id,
        entity_group_id: e.id,
        start_time: start_time,
        end_time: end_time,
        average: cal,
        frequency: interval).analyse

    target = data_target[:current]

    date = []

    case interval
      when '90'
        title = 'Hourly'
        date = data[:date].collect{|d| d.strftime("%H:%M")}
      when '100'
        title =  'Daily'
        date = data[:date].collect { |d| d.strftime("%m-%d") }
      when '200'
        title = 'Weekly'
        date = data[:date].collect { |d| d.strftime("Week %V") }
      when '300'
        title = 'Monthly'
        date = data[:date].collect { |d| d.strftime("%b") }
      when '400'
        title = 'Yearly'
        date = data[:date].collect { |d| d.strftime("%y") }
    end

    result = {}
    result[:time] = time_span[:start].strftime("%m-%d")+"~"+(time_span[:end]-24.hours).strftime("%m-%d")
    result[:title] = "Kpi Name: #{kpi.name.gsub('_L','')}"+" "+department+" "+title+" BU Performance"
    result[:department] = department
    result[:value] = current
    result[:target] = target
    axis = date
    result[:axis]=axis

    render :json=>result
  end

  # GET /dashboard_items/fake_data
  # Params kpi
  # Param departments
  def fake_data
    #kpi
    kpi_name = params[:kpi]
    target_name = kpi_name+"_Target"
    kpi = Kpi.find_by_name(kpi_name)
    kpi_target = Kpi.find_by_name(target_name)
    kpi_target = kpi_target.nil? ? kpi : kpi_target
    #departments
    deps = params[:department]
    #interval
    interval = params[:interval]
    #time range

    time_string = 'LAST1DAY'
    title = 'Test'
    case interval
      when '90'
        time_string = 'LAST1HOUR'
        title = 'Hourly'
      when '100'
        time_string = 'LAST2DAY'
        title =  'Daily'
      when '200'
        time_string = 'LAST1WEEK'
        title = 'Weekly'
      when '300'
        time_string = 'LAST1MONTH'
        title = 'Monthly'
      when '400'
        time_string = 'LAST1YEAR'
        title = 'Yearly'
    end
    time_span = DashboardItem.time_string_to_time_span time_string
    start_time = time_span[:start].iso8601.to_s
    end_time = time_span[:end].iso8601.to_s

    #
    cal = "AVERAGE"

    departments = []
    value = []
    target = []

    deps.each do |dep|
      e = EntityGroup.find_by_name(dep)
      data = Entry::Analyzer.new(
          kpi_id: kpi.id,
          entity_group_id: e.id,
          start_time: start_time,
          end_time: end_time,
          average: cal,
          frequency: interval).analyse
      data_target = Entry::Analyzer.new(
          kpi_id: kpi_target.id,
          entity_group_id: e.id,
          start_time: start_time,
          end_time: end_time,
          average: cal,
          frequency: interval).analyse
      departments << e.name.gsub('BU-','')
      value<<data[:current][0]
      target<<data_target[:current][0]
    end
    result = {}
    result[:time] = time_span[:start].strftime("%m-%d")+"~"+(time_span[:end]-24.hours).strftime("%m-%d")
    result[:title] = "Kpi Name: #{kpi.name.gsub('_L','')}"+" "+title+" BU Performance"
    result[:departments] = departments
    result[:value] = value
    result[:target] = target
    render :json=>result
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

