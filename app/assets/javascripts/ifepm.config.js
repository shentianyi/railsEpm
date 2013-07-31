/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-19
 * Time: 下午4:29
 * To change this template use File | Settings | File Templates.
 */
var ifepm=ifepm||{};

ifepm.config={

    update_sequence_url:{url:"http://localhost:3000/DashboardItems/update_sequence.json",crossDomain:false,dataType:"json"},


    get_dashboard_items_url:{url:"http://localhost:3000/DashboardItems/items_by_dashboard_id.json",crossDomain:false,dataType:"json"},


    get_item_data_url:{url:"http://localhost:3000/DashboardItems/get_data.json",crossDomain:false,dataType:"json"},


    dashboard_create_url:{url:"http://localhost:3000/Dashboards/create.json",crossDomain:false,dataType:"json"},


    dashboard_delete_url:{url:"http://localhost:3000/Dashboards/destroy.json",crossDomain:false,dataType:"json"},


    dashboard_item_delete_url:{url:"http://localhost:3000/DashboardItems/destroy.json",crossDomain:false,dataType:"json"},


    dashboard_item_create_url:{url:"http://localhost:3000/DashboardItems/create.json",crossDomain:false,dataType:"json"},


    container:"dashBoard-show",


    container_selector:"#dashBoard-show",


    graph_indicator:"id",


    graph_container_tag:"li",

    remove_view_function: "db_view_delete(!id!)"
};
