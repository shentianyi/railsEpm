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

//config
ifepm.dashboard_widget.widget_config = {
    height:0,
    width:0,
    max_col:4,
    max_row:2,
    min_width:(1024 - 150)/4 -20 ,
    min_height:(800 - 150)/2 -20
};

var gridster;
ifepm.dashboard_widget.height = 0,ifepm.dashboard_widget.width = 0;
//minimum size of grid
var min_width = (1024 - 150) / 4 - 20;
var min_height =  min_width;
//init
ifepm.dashboard_widget.init = function(option){
    ifepm.dashboard_widget.widget_config.max_col = option.max_col;
    ifepm.dashboard_widget.widget_config.max_row = option.max_row;
    ifepm.dashboard_widget.widget_config.min_width = (1024 - 150)/option.max_col - 20;
    ifepm.dashboard_widget.widget_config.min_height = (800 - 150)/option.max_row - 20;
    ifepm.dashboard_widget.widget_config.width = (option.width - 50)/option.max_col - 20;
    ifepm.dashboard_widget.widget_config.height = (option.height - 40)/option.max_row - 30;

    ifepm.dashboard_widget.widget_config.width =
        ifepm.dashboard_widget.widget_config.width < ifepm.dashboard_widget.widget_config.min_width ? ifepm.dashboard_widget.widget_config.min_width:ifepm.dashboard_widget.widget_config.width;
    ifepm.dashboard_widget.widget_config.height =
        ifepm.dashboard_widget.widget_config.height < ifepm.dashboard_widget.widget_config.min_height ? ifepm.dashboard_widget.widget_config.min_height:ifepm.dashboard_widget.widget_config.height;

    gridster = $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [ifepm.dashboard_widget.widget_config.width, ifepm.dashboard_widget.widget_config.height],
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
            defsize.sizex = ifepm.dashboard_widget.widget_config.max_col;
            defsize.sizey = 1;
            break;
        case "pie":
            defsize.sizex = 3;
            defsize.sizey = 3;
            break;
        case "column":
            defsize.sizex = ifepm.dashboard_widget.widget_config.max_col-1;
            defsize.sizey = 1;
            break;
        case "scatter":
            defsize.sizex = ifepm.dashboard_widget.widget_config.max_col-1;
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

/*
* @function ifepm.dashboard_widget.windowresize
* */
ifepm.dashboard_widget.windowresize = function(option){
    var width = (option.width - 50)/ifepm.dashboard_widget.widget_config.max_col - 30;
    var height = (option.height - 40)/ifepm.dashboard_widget.widget_config.max_row - 20;

    var opt = {widget_base_dimensions:[height,width]};
    gridster.resize_widget_dimensions(opt);
};

/*
* patch from github OwlyCode/gridster.resize-patch.js
* @function resize_widget_dimensions()
* @params options = {widget_margins:[x,y],widget_base_dimensions:[x,y]}
* **resize base_dimensions for screen size changed
*/
(function($) {
    $.Gridster.resize_widget_dimensions = function(options) {
        if (options.widget_margins) {
            this.options.widget_margins = options.widget_margins;
        }

        if (options.widget_base_dimensions) {
             this.options.widget_base_dimensions = options.widget_base_dimensions;
        }

        this.min_widget_width  = (this.options.widget_margins[0] * 2) + this.options.widget_base_dimensions[0];
        this.min_widget_height = (this.options.widget_margins[1] * 2) + this.options.widget_base_dimensions[1];

        var serializedGrid = this.serialize();
        this.$widgets.each($.proxy(function(i, widget) {
            var $widget = $(widget);
            this.resize_widget($widget);
        }, this));

        this.generate_grid_and_stylesheet();
        this.get_widgets_from_DOM();
        this.set_dom_grid_height();

        return false;
    };
})(jQuery);