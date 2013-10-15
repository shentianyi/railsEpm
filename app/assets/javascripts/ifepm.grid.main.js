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
ifepm.dashboard_widget.height = 0,ifepm.dashboard_widget.width = 0;
//minimum size of grid
var min_width = (1024 - 150) / 4 - 20;
var min_height =  min_width;
//init
ifepm.dashboard_widget.init = function(){
    var div_width = $("div .dashboard-block").width();
    var div_height = $("div .manage-right-content").height();
    ifepm.dashboard_widget.width = (div_width - 50)/4 - 20;
    ifepm.dashboard_widget.height = (div_height - 40)/2 - 30;

    ifepm.dashboard_widget.width = ifepm.dashboard_widget.width < min_width ? min_width:ifepm.dashboard_widget.width;
    ifepm.dashboard_widget.height = ifepm.dashboard_widget.height < min_height ? min_height:ifepm.dashboard_widget.height;

    gridster = $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [ifepm.dashboard_widget.width, ifepm.dashboard_widget.height],
        draggable:{
            stop: on_dragstop,
        },
        /*
        collision:{
            on_overlap:function(){console.log("on_overlap")},
            on_overlap_start:function(){console.log("on_overlap_start")},
            on_overlap_stop:function(){console.log("on_overlap_stop")},
        },
        */
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
    graph_item.chart_type = data.chart_type
    graph_item.entity_group = data.entity_group
    graph_item.kpi_id = data.kpi_id
    graph_item.kpi_name = data.kpi_name
    graph_item.interval = data.interval
    graph_item.sequence = data.sequence
    graph_item.dashboard_id = data.dashboard_id

    //
    var defsize = ifepm.dashboard_widget.initsize(data.chart_type);
    graph_item.sizex = defsize.sizex;
    graph_item.sizey = defsize.sizey;

    ifepm.dashboard.graphs[graph_item.id] = graph_item;
    //.dashboard.setTimer(graph_item);
    ifepm.dashboard.graph_sequence.push(graph_item.id);

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
    var pos={};
    pos = gridster.serialize($("#"+graph_item.id));

    pos[0].col = pos[0].col == NaN ? 1:pos[0].col;
    pos[0].row = pos[0].col == NaN ? 1:pos[0].row;

    ifepm.dashboard.graphs[graph_item.id].col = pos[0].col;
    ifepm.dashboard.graphs[graph_item.id].row = pos[0].row;
    option.col = pos[0].col;
    option.row = pos[0].row;
    var options = [];
    options.push(option);
    //save grid pos and size
    ifepm.dashboard.save_grid_pos(options,{success:function(){}});
};

//get widget size and position by type
ifepm.dashboard_widget.initsize = function(type){
    var defsize = {
        sizex:2,
        sizey:2,
    };
    switch (type)
    {
        case "line":
            defsize.sizex = 2;
            defsize.sizey = 1;
            break;
        case "pie":
            defsize.sizex = 1;
            defsize.sizey = 1;
            break;
        case "column":
            defsize.sizex = 2;
            defsize.sizey = 1;
            break;
        case "scatter":
            defsize.sizex = 2;
            defsize.sizey = 1;
            break;
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

    //for test
    //$(container_selector+" li#"+option.id).css("background-color","#f5bea5");
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
        if(id == null){continue;}
        var opt={};
        pos = gridster.serialize($("#"+id));
        if((ifepm.dashboard.graphs[id].row == pos[0].row )&&( ifepm.dashboard.graphs[id].col == pos[0].col) ){
            continue;
        }
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
    if(options.length > 0){
        ifepm.dashboard.save_grid_pos(options,{success:function(){}});
    }
};

//
ifepm.dashboard_widget.remove_widget = function(filter){
    //gridster.remove_widget(filter);
    if(gridster){
        gridster.remove_widget($(filter));
        $(filter).remove();
        ifepm.dashboard_widget.drag_stop();
    }
}
