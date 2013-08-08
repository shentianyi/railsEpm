/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-19
 * Time: 下午4:29
 * To change this template use File | Settings | File Templates.
 */
var ifepm=ifepm||{};

ifepm.config={

    update_sequence_url:{url:"/DashboardItems/update_sequence.json",crossDomain:false,dataType:"json"},


    get_dashboard_items_url:{url:"/DashboardItems/items_by_dashboard_id.json",crossDomain:false,dataType:"json"},


    get_item_data_url:{url:"/DashboardItems/get_data.json",crossDomain:false,dataType:"json"},


    dashboard_create_url:{url:"/Dashboards/create.json",crossDomain:false,dataType:"json"},


    dashboard_delete_url:{url:"/Dashboards/destroy.json",crossDomain:false,dataType:"json"},


    dashboard_item_delete_url:{url:"/DashboardItems/destroy.json",crossDomain:false,dataType:"json"},


    dashboard_item_create_url:{url:"/DashboardItems/create.json",crossDomain:false,dataType:"json"},


    container:"dashBoard-show",


    container_selector:"#dashBoard-show",


    graph_indicator:"id",


    graph_container_tag:"li",

    remove_view_function: "db_view_delete(!id!)"
};
