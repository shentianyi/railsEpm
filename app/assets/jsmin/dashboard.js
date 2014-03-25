function page_load(){var first_node=menu_selector.select_first_node(config.db_container_selector,config.db_item_filter,!0);current_dashboard_id=first_node.filter(config.db_id_carrier_selector).attr(config.id_field)}function select_dashboard(id,callback){current_dashboard_id=id;var selector="#content-right-nav-group>li[number="+id+"] a";current_dashboard_name=$(selector).text(),menu_selector.select_single_node(config.db_container_selector,config.db_item_filter,config.db_single_item_filter(id)),right_nav_main.initial.name(),callback||(callback=on_finish_init),ifepm.dashboard.init(id,callback)}function on_finish_init(){ifepm.dashboard.create_dashboard()}function is_datetime_outrange(start,end,interval){var starttime=Date.parse(start),endtime=Date.parse(end),count=0;switch(interval){case"90":count=(endtime-starttime)/36e5;break;case"100":count=(endtime-starttime)/864e5;break;case"200":count=(endtime-starttime)/6048e5;break;case"300":count=(endtime-starttime)/2592e6;break;case"400":count=(endtime-starttime)/10368e6;break;case"500":count=(endtime-starttime)/31536e6}return count>150?!0:!1}function prepare_to_create_db_view(post){console.log(post);var dashboard_item={};dashboard_item.conditions=[],dashboard_item.db={},dashboard_item.db.interval=post.interval,dashboard_item.db.title=post.dashboard_name,dashboard_item.db.chart_type=post.type,dashboard_item.db.dashboard_id=post.dashboard_id,dashboard_item.db.last_update=(new Date).toWayneString().second;for(var i in post.series){var condition={};condition.entity_group=post.series[i].view,condition.kpi_id=post.series[i].kpi,condition.calculate_type=get_cal_type(post.series[i].average),condition.time_string=get_time_string_by_twocar(post.series[i].begin_time,post.series[i].end_time),condition.dashboard_item_id=null,condition.count=post.series[i].count,dashboard_item.conditions.push(condition)}db_view_create(dashboard_item)}function get_name(){return $("#view_name_input").val()}function get_title(){return $("#view_title_input").val()}function get_type(){return menu_selector.get_first_in_container("#view-chart-type",'div>label[class~="active"]').val()}function get_entity_group(){return $("#chart-view :selected").attr("value")}function get_kpi_id(){return $("#chart-kpi :selected").attr("value")}function get_calculate_type(){return"0"==$("input:radio[name='chartRadios']:checked").val()?"AVERAGE":"ACCUMULATE"}function get_cal_type(method){switch(method){case"1":return"ACCUNULATE";case"0":return"AVERAGE";default:return null}}function get_dashboard_id(){return current_dashboard_id}function get_time_string_by_twocar(start,end){var pattern=new RegExp("^[0-9)]");return pattern.test(start)?start+"|"+end:start}function get_time_string(){var from=$("#from").datepicker("getDate"),to=$("#to").datepicker("getDate");return connect_time_str(from,to)}function connect_time_str(date1,date2){return date1.toISOString()+"|"+date2.toISOString()}function get_interval(){return null}function db_view_create(view){ifepm.dashboard.add_item(view,{success:db_view_create_callback})}function db_view_create_callback(data){data.result?(DASHBOARD.add.close(),MessageBox("Create dashboard item success","top","success"),current_dashboard_id==data.content.dashboard_id&&ifepm.dashboard.on_view_added(data.content)):MessageBox(data.errors,"top","warning")}function db_view_delete(id){confirm("You are about to delete a view from your dashboard,are you sure?")&&ifepm.dashboard.delete_item(id,{success:db_view_delete_callback})}function db_view_delete_callback(data){MessageBox("Delete dashboard item success","top","success"),ifepm.dashboard.on_view_deleted(data.id)}function db_view_delete_error_callback(){system_error()}function dashboard_delete(id){ifepm.dashboard.delete(id,{success:dashboard_delete_callback})}function dashboard_delete_callback(data){MessageBox("Delete dashboard success","top","success");var item_obj=menu_selector.get_first_in_container(config.db_container_selector,config.db_single_item_filter(data.id));ifepm.dashboard.on_dashboard_deleted(current_dashboard_id),item_obj&&(item_obj.remove(),current_dashboard_id=null)}function dashboard_create(dashboard){ifepm.dashboard.add(dashboard,{success:dashboard_create_callback,error:dashboard_create_error_callback})}function dashboard_create_callback(data){if(data.result){MessageBox("Add dashboard success","top","success");var new_node=dashboard_list_item_template.replace(/!id!/g,data.object.id).replace(/!name!/,data.object.name);$(config.db_container_selector).append(new_node),close_createEntity(),select_dashboard(data.id)}else MessageBox("Delete dashboard failed","top","warning")}function dashboard_create_error_callback(){system_error()}function init_date_picker(){new DATE_PICKER[90]("#from").datePicker(),new DATE_PICKER[90]("#to").datePicker()}function init_grid(){var option={};option.normal={},option.normal.width=$("div#dash-normalsize").width(),option.normal.height=$(window).height()-$("header").height()-$("#left-content-title").height()-1,option.normal.max_col=2,option.normal.max_row=2,option.full={},option.full.width=$("div#dashboard-content-full").width(),option.full.height=$(window).height()-60,option.full.max_col=2,option.full.max_row=3,ifepm.dashboard_widget.init(option)}function init_component(){init_grid();var lenght=$("ul#content-right-nav-group").children().length;if(lenght>0){var id=$("ul#content-right-nav-group").children("[number]:first").attr("number");select_dashboard(id)}$(window).resize(function(){on_resize_window()})}function on_full_size(){$("#full-size-title p").text(current_dashboard_name),ifepm.dashboard_widget.full_size(!0),ifepm.dashboard.full_size({fullsize:!0,id:current_dashboard_id})}function on_restore_size(){ifepm.dashboard_widget.full_size(!1),ifepm.dashboard.full_size({fullsize:!1,id:current_dashboard_id})}function on_resize_window(){var option={};option.normal={},option.normal.width=$("div#dash-normalsize").width(),option.normal.height=$(window).height()-$("header").height()-$("#left-content-title").height()-1,option.normal.max_col=2,option.normal.max_row=2,option.full={},option.full.width=$("div#dashboard-content-full").width(),option.full.height=$(window).height()-60,option.full.max_col=2,option.full.max_row=3;ifepm.dashboard_widget.resize_window(option,"dashboard")}Date.prototype.toISOString||(Date.prototype.toISOString=function(){function pad(n){return 10>n?"0"+n:n}return this.getUTCFullYear()+"-"+pad(this.getUTCMonth()+1)+"-"+pad(this.getUTCDate())+"T"+pad(this.getUTCHours())+":"+pad(this.getUTCMinutes())+":"+pad(this.getUTCSeconds())+"Z"});var config1={db_container_selector:"#content-right-nav-group",db_item_filter:".sty-db-node",db_single_item_filter:function(id){return'li[number~="'+id+'"]'},selected_class:"active",view_container_selector:"",view_item_filter:"",db_id_carrier_selector:"",item_id_filter:function(id){return""+id},view_id_filter:function(id){return"#"+id},db_id_field:"",view_id_field:""};$.extend(config,config1);var menu_selector=menu_selector||new ActiveSelect(config.selected_class),dashboards=[],current_dashboard_id=null,current_dashboard_name="",dashboard_list_item_template='<li obj_id="!id!" class="sty-db-node"><i class="icon-remove hide pull-left"  onclick="dashboard_delete(!id!)"></i><a href="#" onclick="select_dashboard(!id!)">!name!</a></li>',date_picker_option={showOtherMonths:!0,selectOtherMonths:!0,firstDay:1,changeMonth:!0,changeYear:!0,dateFormat:"yy-mm-dd",showWeek:!0};