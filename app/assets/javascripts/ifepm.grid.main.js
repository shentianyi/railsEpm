/**
 * User: tesla
 * Date: 9/27/13
 * Time: 4:42 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 * define the grid view model and functions
 */

//load or initialize the ifepm object
var ifepm = ifepm || {};

//dashboard widget
ifepm.dashboard_widget = ifepm.dashboard_widget || {};

//add widget by a new added dashboard_item
ifepm.dashboard_widget.add = function(data){
    //create chart
    var graph_item = new Graph();
    graph_item.id = data.id
    graph_item.name = data.name
    graph_item.title = data.title
    graph_item.calculate_type = data.calculate_type
    graph_item.from =data.start
    graph_item.end = data.end
    graph_item.type = data.type
    graph_item.entity_group = data.entity_group
    graph_item.kpi_id = data.kpi_id
    graph_item.kpi_name = data.kpi_name
    graph_item.interval = data.interval
    graph_item.sequence = data.sequence
    graph_item.dashboard_id = data.dashboard_id

    //
    var defsize = ifepm.dashboard_widget.init(data.type);
    graph_item.row = defsize.row;
    graph_item.col = defsize.col;
    graph_item.sizex = defsize.sizex;
    graph_item.sizey = defsize.sizey;

    ifepm.dashboard.graphs[graph_item.id] = graph_item;

    //create chart
    var container_selector=ifepm.config.container_selector;
    $(container_selector).append(graph_item.container(graph_item));
};

//init widget by type
ifepm.dashboard_widget.init = function(type){
    var defsize = {
        row:1,
        col:1,
        sizex:2,
        sizey:2,
    };
    switch (type)
    {
        default:
            break;
    }
    return defsize;
};

//create widget form db
ifepm.dashboard_widget.create = function(){

};