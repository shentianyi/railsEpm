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
    }).data("gridster");
};

/*
* @function add_w
* @params option = {id,container_selector,chart_type}
* */
ifepm.dashboard_widget.add_w = function(option){

    if(option.isnew){
        var default_size = ifepm.dashboard_widget.initsize(option.chart_type);
        gridster.add_widget(option.container_selector+" li#"+option.id,default_size.sizex,default_size.sizey);
    }else{
        gridster.add_widget(option.container_selector+" li#"+option.id,option.sizex,option.sizey,option.col,option.row)
    }

    var pos={};
    pos = gridster.serialize($("#"+option.id));

    pos[0].col = pos[0].col == NaN ? 1:pos[0].col;
    pos[0].row = pos[0].col == NaN ? 1:pos[0].row;
    var result = {};
    result.sizex = pos[0].size_x;
    result.sizey = pos[0].size_y;
    result.col = pos[0].col;
    result.row = pos[0].row;

    return result;
}

/*
* @function remove_w
* */
ifepm.dashboard_widget.remove_w = function(filter){
    if(gridster){
        gridster.remove_widget($(filter));
        $(filter).remove();
        ifepm.dashboard_widget.drag_stop();
    }
}

//get dashboard style
ifepm.dashboard_widget.get_pos = function(filter){
    var pos = {};
    pos = gridster.serialize($(filter));

    pos[0].col = pos[0].col == NaN ? 1:pos[0].col;
    pos[0].row = pos[0].col == NaN ? 1:pos[0].row;


    var result = {};
    result.col = pos[0].col;
    result.row = pos[0].row;
    return result;
}

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

//remove widget
ifepm.dashboard_widget.remove_all_widgets =function(callback){
    gridster.remove_all_widgets(callback);
};

//drag stop
ifepm.dashboard_widget.drag_stop = function(){
    ifepm.dashboard.on_drag_stop();
};
