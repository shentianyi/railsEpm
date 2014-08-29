/**
 * User: tianyi
 * Date: 13-7-18
 * Time: 下午3:31
 * Control the dashboard page. Relay on ifepm.dashboard.js
 */


/**
  * define three components model:
 * Level 1:container who is the direct parent of the items
 * level 2:item who is the direct child of the container
 * level 3:id carrier who is the child of a item and carry the identifier of the object in the DOM
 * a item may be the id carrier as well
 *
 * we use the filters in the config to find the objects from the three levels
 *  *_container_selector is the selector to find the container
 *  *_item_filter is a selector or function to find out the item node in a container
 *  *_carrier_filter is a selector or function to find out the identifier carrier node in a container
 */



//need to be moved to base lib
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
        function pad(n) { return n < 10 ? '0' + n : n }
        return this.getUTCFullYear() + '-'
            + pad(this.getUTCMonth() + 1) + '-'
            + pad(this.getUTCDate()) + 'T'
            + pad(this.getUTCHours()) + ':'
            + pad(this.getUTCMinutes()) + ':'
            + pad(this.getUTCSeconds()) + 'Z';
    };
};



var config1={
    //Container of the dashboards
  db_container_selector:'#content-right-nav-group',
    //a selector to select a dashboard node from the container
  db_item_filter:".sty-db-node",
  db_single_item_filter:function(id){
      return "li[number~=\"" + id + "\"]";
  },
    //a class represents the element has been selected
  selected_class:'active',
    // the container for graphs(dashboard items)
  view_container_selector:'',
    //a selector to select graphs from the graph container
  view_item_filter:'',
    //a selector to select an id carrier from the graph container
   db_id_carrier_selector:'',

    //a page specified ID combined with the object(dashboard_id) id
  item_id_filter:function(id){return ''+ id },
    //a page specified ID combined with the graph(dashboard_item_id) id
  view_id_filter:function(id){return '#' + id},
    //the attribute name which hold the actual id of the object
    db_id_field:'',
    view_id_field:''
};

$.extend(config,config1);

var menu_selector = menu_selector || new ActiveSelect(config.selected_class)

var dashboards=[];

var current_dashboard_id = null;
var current_dashboard_name = "";

function page_load(){
    var first_node =  menu_selector.select_first_node(config.db_container_selector,config.db_item_filter,true)
    current_dashboard_id = first_node.filter(config.db_id_carrier_selector).attr(config.id_field)
}

function select_dashboard(id,callback){
    current_dashboard_id=id;
    var selector =  "#content-right-nav-group>li[number="+id+"] a";
    current_dashboard_name = $(selector).text();
    menu_selector.select_single_node(config.db_container_selector,
        config.db_item_filter,
        config.db_single_item_filter(id));

    //MANAGE.left.manage_left_edit_init();
    right_nav_main.initial.name();
    if(!callback){
        callback =on_finish_init;
    }
    ifepm.dashboard.init(id,callback);
}

function on_finish_init(){
    ifepm.dashboard.create_dashboard();
}

var dashboard_list_item_template =
    '<li obj_id="!id!" class="sty-db-node">' +
        '<i class="icon-remove hide pull-left"  onclick="dashboard_delete(!id!)"></i>' +
        '<a href="#" onclick="select_dashboard(!id!)">!name!</a>' +
        '</li>';


/*
* @function count_time_range
* @params start,end,interval
* */
function is_datetime_outrange(start,end,interval){
    var starttime = Date.parse(start);
    var endtime = Date.parse(end);
    var count = 0;
    switch(interval){
        case "90":
            count = (endtime - starttime)/(1000*60*60)
            break;  
        case "100":
            count = (endtime - starttime)/(1000*60*60*24)
            break;
        case "200":
            count = (endtime - starttime)/(1000*60*60*24*7)
            break;
        case "300":
            count = (endtime - starttime)/(1000*60*60*24*30)
            break;
        case "400":
            count = (endtime - starttime)/(1000*60*60*24*30*4)
            break;
        case "500":
            count = (endtime - starttime)/(1000*60*60*24*365)
            break;
        default:
            break;
    }
    if(count > 150){
        return true;
    }
    else{
        return false;
    }
}

function prepare_to_create_db_view(post){
    console.log(post);
    var dashboard_item = {};
    dashboard_item.conditions = [];

    /*
    dashboard_item.entity_group = get_entity_group();
    dashboard_item.kpi_id= get_kpi_id();
    dashboard_item.calculate_type = get_calculate_type();
    dashboard_item.time_string= get_time_string();
    */
    dashboard_item.db = {};
    dashboard_item.db.interval = post.interval;
    //dashboard_item.db.name = null;
    dashboard_item.db.title = post.dashboard_name;
    dashboard_item.db.chart_type = post.type;
    dashboard_item.db.dashboard_id= post.dashboard_id;
    dashboard_item.db.last_update = new Date().toWayneString().second;
    /*
    * Test
    * */
    for(var i in post.series){
        var condition = {};
        condition.entity_group = post.series[i].view;
        condition.kpi_id = post.series[i].kpi;
        condition.calculate_type = get_cal_type(post.series[i].average);
        //condition.time_string = post.series[i].begin_time +"|" + post.series[i].end_time;
        condition.time_string = get_time_string_by_twocar(post.series[i].begin_time,post.series[i].end_time);
        condition.dashboard_item_id = null;
        condition.count = post.series[i].count;
        dashboard_item.conditions.push(condition);
    }
    //return dashboard_item;
    db_view_create(dashboard_item);
}

function get_name(){
    return $("#view_name_input").val()
}

function get_title(){
    return $("#view_title_input").val()
}

function get_type(){
    return menu_selector.get_first_in_container("#view-chart-type",'div>label[class~="active"]').val();
}

function get_entity_group(){
    return $("#chart-view :selected").attr("value")
}
function get_kpi_id(){
    return $("#chart-kpi :selected").attr("value")
}
function get_calculate_type(){
    return $("input:radio[name='chartRadios']:checked").val()=="0"?"AVERAGE":"ACCUMULATE";
}

function get_cal_type(method){
    switch (method){
        case "1":
            return "ACCUNULATE";
            break;
        case "0":
            return "AVERAGE";
            break;
        default :
            return null
            break;
    }
}

function get_dashboard_id(){
    return current_dashboard_id;
}

function get_time_string_by_twocar(start,end){
    var pattern=new RegExp("^[0-9)]");
    if(pattern.test(start)){
        return start + "|" + end;
    }else{
        return start;
    }

    //return connect_time_str(start,end);
}

function get_time_string(){
    var from = $("#from").datepicker("getDate")
    //var fromTime = $.timePicker("#fromTime").getTime();
    /*if (fromTime){
        from.setHours(fromTime.getHours());
        from.setMinutes(fromTime.getMinutes());
        from.setSeconds(fromTime.getSeconds());
    }*/

    var to =$( "#to" ).datepicker("getDate");
    /*var toTime = $.timePicker("#toTime").getTime();
    if (toTime){
        to.setHours(toTime.getHours());
        to.setMinutes(toTime.getMinutes());
        to.setSeconds(toTime.getSeconds());
        to.setMilliseconds(toTime.getMilliseconds());
    }
    else {*/
    //to.setHours(23);
    //to.setMinutes(59);
    //to.setSeconds(59);
    //to.setMilliseconds(999);
    //}

    return connect_time_str(from ,to);
}


function connect_time_str(date1,date2){
   return date1.toISOString() + "|" + date2.toISOString();
}

function get_interval(){
    return null;
}






function db_view_create(view){
    ifepm.dashboard.add_item(view,{success:db_view_create_callback})
}

function db_view_create_callback(data){
    /*if(data.result){
        slide_box("添加成功",true);
        close_dash();
        if(data.id){
            //ifepm.dashboard.init(current_dashboard_id)
        }
    }*/
    if(data.result){
       // $("#dashboard-add-page").css("display","none");
        DASHBOARD.add.close();
        MessageBox("Create dashboard item success","top","success");
        //close_dash();
        if(current_dashboard_id == data.content.dashboard_id){
            ifepm.dashboard.on_view_added(data.content);
        }
    }
    else{
        MessageBox(data.errors,"top","warning");
    }

}

function db_view_delete(id){
    if (confirm('You are about to delete a view from your dashboard,are you sure?')){
    ifepm.dashboard.delete_item(id,{success:db_view_delete_callback})
    }
}

function db_view_delete_callback(data){
    MessageBox("Delete dashboard item success","top","success");
    ifepm.dashboard.on_view_deleted(data.id);
    //ifepm.dashboard_widget.remove_w(ifepm.config.container_selector + " "+config.view_id_filter(data.id));
    /*
    var to_delete_view = menu_selector.get_first_in_container(
        ifepm.config.container_selector,
        config.view_id_filter(data.id));
    if(to_delete_view){
        to_delete_view.remove();
    }
    */
}

function db_view_delete_error_callback(jqXhr){
  system_error();
}


function dashboard_delete(id){
    ifepm.dashboard.delete(id,{success:dashboard_delete_callback});
}

function dashboard_delete_callback(data){
    MessageBox("Delete dashboard success","top","success");
      var item_obj =menu_selector.get_first_in_container(
          config.db_container_selector,
          config.db_single_item_filter(data.id)) ;

    ifepm.dashboard.on_dashboard_deleted(current_dashboard_id);
      if ( item_obj){
          item_obj.remove();
         current_dashboard_id=null;
      }
}


function dashboard_create(dashboard){
    ifepm.dashboard.add(dashboard,{success:dashboard_create_callback,error:dashboard_create_error_callback});
}

function dashboard_create_callback(data){
    //insert a new node in the dashboard column
    //select it
    if(data.result){
        MessageBox("Add dashboard success","top","success");
        var new_node = dashboard_list_item_template.replace(/!id!/g,data.object["id"]).replace(/!name!/,data.object["name"])
        $(config.db_container_selector).append(new_node);
        close_createEntity();
        select_dashboard(data.id);
    }
    else {
        MessageBox("Delete dashboard failed","top","warning");
    }
}

function dashboard_create_error_callback(jqXhr){
    system_error()
}



//Main
var date_picker_option =  {
    showOtherMonths : true,
    selectOtherMonths : true,
    firstDay : 1,
    changeMonth:true,
    changeYear:true,
    dateFormat : 'yy-mm-dd',
    showWeek : true
    };


/*function init_time_picker(){
    $("#fromTime,#toTime").datepicker({
        step:60       x
    });
}*/

function init_date_picker(){
    /*$("#from").datepicker(
        date_picker_option
    );

    $("#to").datepicker(
        date_picker_option
    );*/

    new DATE_PICKER["90"]("#from").datePicker();
    new DATE_PICKER["90"]("#to").datePicker();
}

//grid view
function init_grid(){
    var option = {};
    option.normal = {};
    option.normal.width = $("div#dash-normalsize").width();
    option.normal.height = $(window).height()-$("header").height()-$("#left-content-title").height()-1;
    option.normal.max_col = 2;
    option.normal.max_row = 2;

    option.full = {};
    option.full.width = $("div#dashboard-content-full").width();
    option.full.height = $(window).height() -60;
    option.full.max_col = 2;
    option.full.max_row = 2;

    ifepm.dashboard_widget.init(option);
}

function init_component(){
    init_grid();
    var lenght = $("ul#content-right-nav-group").children().length;
    if(lenght > 0){
        //$("ul.manage-left-menu").children("[number]:first").addClass("active");
        var id = $("ul#content-right-nav-group").children("[number]:first").attr("number");
        select_dashboard(id);
    }
    $(window).resize(function(){
        //on_resize_window();
    });
}
/*
* @function on_full_size
* */
function on_full_size(){
    $("#full-size-title p").text('Daily BU Performance');
    //$("#full-size-title p").text(current_dashboard_name);
    ifepm.dashboard_widget.full_size(true);
    //ifepm.dashboard.full_size({fullsize:true,id:current_dashboard_id});
};

/*
* @function on_restore_size
* */
function on_restore_size(){
    ifepm.dashboard_widget.full_size(false);
    ifepm.dashboard.full_size({fullsize:false,id:current_dashboard_id});
}

function on_resize_window(){
    var option = {};
    option.normal = {};
    option.normal.width = $("div#dash-normalsize").width();
    option.normal.height = $(window).height()-$("header").height()-$("#left-content-title").height()-1;
    option.normal.max_col = 2;
    option.normal.max_row = 2;

    option.full = {};
    option.full.width = $("div#dashboard-content-full").width();
    option.full.height = $(window).height() -60;
    option.full.max_col = 4;
    option.full.max_row = 2;

    var grid = ifepm.dashboard_widget.resize_window(option,"dashboard");


}
