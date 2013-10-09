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

var gridster;

//init
ifepm.dashboard_widget.init = function(){
    console.log("grid init");
    gridster = $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [295, 295],
        draggable:{
            start: function(){console.log("drag start");},
            drag: function(){console.log("drag");},
            stop: on_dragstop,
        },
    }).data("gridster");
};

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
    var defsize = ifepm.dashboard_widget.initsize(data.type);
    graph_item.sizex = defsize.sizex;
    graph_item.sizey = defsize.sizey;

    ifepm.dashboard.graphs[graph_item.id] = graph_item;

    //create chart
    var container_selector=ifepm.config.container_selector;
    $(container_selector).append(graph_item.container(graph_item));

    var option = {};
    option.id = graph_item.id;
    option.sizex = defsize.sizex;
    option.sizey = defsize.sizey;
    //add wiget
    ifepm.dashboard_widget.setSize(option);

    //get position
    var opt={};
    pos = gridster.serialize($("#"+graph_item.id));
    ifepm.dashboard.graphs[graph_item.id].col = pos[0].col;
    ifepm.dashboard.graphs[graph_item.id].row = pos[0].row;
    option.col = pos[0].col;
    option.row = pos[0].row;
    //save grid pos and size
    ifepm.dashboard.save_grid_pos(option);
};

//get widget size and position by type
ifepm.dashboard_widget.initsize = function(type){
    var defsize = {
        sizex:2,
        sizey:1,
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

//set widget size
ifepm.dashboard_widget.setSize = function(option){
    var container_selector=ifepm.config.container_selector;
    //set the size of li by the specific id
    //set pos and size attributes
    gridster.add_widget(container_selector+" li#"+option.id,option.sizex,option.sizey,option.col,option.row);
};

//
ifepm.dashboard_widget.add_widget = function(){
    gridster.add_widget('<li style="background-color: #16a085"></li>',2,1);
}

//remove widget
ifepm.dashboard_widget.remove_all_widgets =function(callback){
    gridster.remove_all_widgets(callback);
};


//drag stop
ifepm.dashboard_widget.drag_stop = function(){
    //get all the new position
    var pos = {};
    var options = [];
    for(var i in ifepm.dashboard.graph_sequence){
        var id = ifepm.dashboard.graph_sequence[i];
        var opt={};
        pos = gridster.serialize($("#"+id));
        ifepm.dashboard.graphs[id].row = pos[0].row;
        ifepm.dashboard.graphs[id].col = pos[0].col;
        ifepm.dashboard.graphs[id].sizex = pos[0].size_x;
        ifepm.dashboard.graphs[id].sizey = pos[0].size_y;

        opt.id = id;
        opt.row = pos[0].row;
        opt.col = pos[0].col;
        opt.sizex = pos[0].size_x;
        opt.sizey = pos[0].size_y;
        options.push(opt);
    }
    //
    ifepm.dashboard.save_grid_pos(options,{success:function(){console.log("保存grid成功！")}});
};
