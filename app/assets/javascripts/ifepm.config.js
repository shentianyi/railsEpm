/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-19
 * Time: 下午4:29
 * To change this template use File | Settings | File Templates.
 */
var ifepm=ifepm||{};

ifepm.config={

    update_sequence_url:{url:"http://localhost:3000/Dashboard/update_sequence.js",crossDomain:true,dataType:"jsonp"},


    get_dashboard_items_url:{url:"http://localhost:3000/DashboardItems/item_by_dashboard_id.json",crossDomain:false,dataType:"json"},


    get_item_data_url:{url:"http://localhost:3000/Dashboard/get_item_data.js",crossDomain:true,dataType:"jsonp"},


    dashboard_create_url:{url:"http://localhost:3000/Dashboards/create.json",crossDomain:false,dataType:"json"},


    dashboard_delete_url:{url:"http://localhost:3000/Dashboards/destroy.json",crossDomain:false,dataType:"json"},


    dashboard_item_delete_url:{url:"http://localhost:3000/Dashboard/get_item_data.js",crossDomain:true,dataType:"jsonp"},


    dashboard_item_create_url:{url:"http://localhost:3000/Dashboard/get_item_data.js",crossDomain:true,dataType:"jsonp"},


    container:"dashboard_container",


    container_selector:"#dashboard_container",


    graph_indicator:"id",


    graph_container_tag:"li",

    remove_view_function: "db_view_delete(!id!)"
};
