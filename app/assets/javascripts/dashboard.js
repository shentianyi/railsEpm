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

function system_error(){
    alert("我们遇到了点小麻烦，管理员已经开始工作了，请耐心等待片刻后重试！");
}
var config={
    //Container of the dashboards
  db_container_selector:'#sty-dashboards',
    //a selector to select a dashboard node from the container
  db_item_filter:".sty-db-node",
  db_single_item_filter:function(id){
      return "li[obj_id~=\"" + id + "\"]";
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

var menu_selector = menu_selector || new ActiveSelect(config.selected_class)

var dashboards=[];

var current_dashboard_id = null;

function page_load(){
    var first_node =  menu_selector.select_first_node(config.db_container_selector,config.db_item_filter,true)
    current_dashboard_id = first_node.filter(config.db_id_carrier_selector).attr(config.id_field)
}

function select_dashboard(id){
    current_dashboard_id=id;

    menu_selector.select_single_node(config.db_container_selector,
        config.db_item_filter,
        config.db_single_item_filter(id));

    ifepm.dashboard.init(id)
}

var dashboard_list_item_template =
    '<li obj_id="!id!" class="sty-db-node">' +
        '<i class="icon-remove hide pull-left"  onclick="dashboard_delete(!id!)"></i>' +
        '<a href="#" onclick="select_dashboard(!id!)">!name!</a>' +
        '</li>';


function prepare_to_create_db_view(){
    var dashboard_item = {};
    dashboard_item.entity_group = get_entity_group();
    dashboard_item.kpi_id= get_kpi_id();
    dashboard_item.calculate_type = get_calculate_type();
    dashboard_item.time_string= get_time_string();
    dashboard_item.interval = get_interval();
    dashboard_item.name = get_name();
    dashboard_item.title = get_title();
    dashboard_item.type = get_type();
    dashboard_item.dashboard_id= get_dashboard_id();
    return dashboard_item;
}

function get_name(){
    return $("#view_name_input").val()
}

function get_title(){
    return $("#view_title_input").val()
}

function get_type(){
    return menu_selector.get_first_in_container("#",'div[class~="active"]>label').val();
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

function get_dashboard_id(){
    return current_dashboard_id;
}

function get_time_string(){
    var from = $("#from").datepicker("getDate")
    var fromTime = $.timePicker("#fromTime").getTime();
    if (fromTime){
        from.setHours(fromTime.getHours());
        from.setMinutes(fromTime.getMinutes());
        from.setSeconds(fromTime.getSeconds());
    }

    var to =$( "#to" ).datepicker("getDate");
    var toTime = $.timePicker("#toTime").getTime();
    if (toTime){
        to.setHours(toTime.getHours());
        to.setMinutes(toTime.getMinutes());
        to.setSeconds(toTime.getSeconds());
        to.setMilliseconds(toTime.getMilliseconds());
    }
    else {
        to.setHours(23);
        to.setMinutes(59);
        to.setSeconds(59);
        to.setMilliseconds(999);
    }

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
    if(data.result){
        slide_box("添加成功",true);
        close_dash();
        if(current_dashboard_id){
            ifepm.dashboard.init(current_dashboard_id)
        }
    }
    else{
        slide_box("新建视图时发生错误，请选择一个仪表盘后再新建视图",false)
    }

}

function db_view_delete(id){
    if (confirm('You are about to delete a view from your dashboard,are you sure?')){
    ifepm.dashboard.delete_item(id,{success:db_view_delete_callback})
    }
}

function db_view_delete_callback(data){
    var to_delete_view = menu_selector.get_first_in_container(
        ifepm.config.container_selector,
        config.view_id_filter(data.id));
    if(to_delete_view){
        to_delete_view.remove();
    }
}

function db_view_delete_error_callback(jqXhr){
  system_error();
}


function dashboard_delete(id){
    if (confirm("you will delete a dashboard,are you sure?"))
    {
        ifepm.dashboard.delete(id,{success:dashboard_delete_callback})
    }
}

function dashboard_delete_callback(data){
    slide_box("仪表盘已经删除",true);
      var item_obj =menu_selector.get_first_in_container(
          config.db_container_selector,
          config.db_single_item_filter(data.id)) ;

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
        slide_box("添加成功",true)
        var new_node = dashboard_list_item_template.replace(/!id!/g,data.object["id"]).replace(/!name!/,data.object["name"])
        $(config.db_container_selector).append(new_node);
        close_createEntity();
        select_dashboard(data.id);
    }
    else {
        slide_box("添加仪表盘时出错了",false)
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


function init_time_picker(){
    $("#fromTime,#toTime").timePicker({
        step:60
    });
}

function init_date_picker(){
    $("#from").datepicker(
        date_picker_option
    );

    $("#to").datepicker(
        date_picker_option
    );
}

function init_component(){
    init_time_picker();
    init_date_picker();
}











