/**
 * User: tesla
 * Date: 9/27/13
 * Time: 4:42 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 * define the grid view model and functions
 * @gridster represents the normal size Grdster
 * @gridster_full represents the full size Gridster
 * @ifepm.dashboard_widge.config represent the config of grid
 */

/*
* Gridster extention
* */
var RESIZE=RESIZE||{};

(function ($) {

    $.Gridster.resize_widget_dimensions = function(options) {
        if (options.widget_margins) {
            this.options.widget_margins = options.widget_margins;
        }

        if (options.widget_base_dimensions) {
            this.options.widget_base_dimensions = options.widget_base_dimensions;
        }

        this.min_widget_width  = (this.options.widget_margins[0] * 2)
            + this.options.widget_base_dimensions[0];
        this.min_widget_height = (this.options.widget_margins[1] * 2)
            + this.options.widget_base_dimensions[1];

        var serializedGrid = this.serialize();

        if(arguments[1]=="dashboard"){
            this.$widgets.each($.proxy(function(i, widget) {
                var $widget = $(widget);
                var data = serializedGrid[i];
                this.resize_widget($widget, data.size_x, data.size_y,null,null,true);
//                window.setTimeout(function(){
//
//                        var id = $widget.attr("id");
//                        var container = "#container_"+id;
//                        var chart = $(container).highcharts();
//                        if(chart){
//                            chart.setSize($(container).width(),$(container).height(),false);
//                        }
//
//                },100)
            }, this));
        }
        else{
            this.$widgets.each($.proxy(function(i, widget) {
                var $widget = $(widget);
                var data = serializedGrid[i];
                this.resize_widget($widget, data.size_x, data.size_y);
            }, this));
        }

        this.generate_grid_and_stylesheet();
        this.get_widgets_from_DOM();
        this.set_dom_grid_height();

//        if(arguments[1]=="dashboard"){
//            var $this=this;
//            window.setTimeout(function(){
//                for(var i in $this.$widgets){
//                    var id = $this.$widgets.eq(i).attr("id");
//                    var container = "#container_"+id;
//                    var chart = $(container).highcharts();
//                    if(chart){
//                        chart.setSize($(container).width(),$(container).height(),false);
//                    }
//                }
//            },200)
//
//        }
        return false;
    };
})(jQuery);
/*
* base variable
* */
var ifepm = ifepm || {};

ifepm.dashboard_widget = ifepm.dashboard_widget || {};

ifepm.dashboard_widget.config = {
    normal:{
        height:0,
        width:0,
        max_col:5,
        max_row:3,
    },
    full:{
        height:0,
        width:0,
        max_col:5,
        max_row:3,
    }
};

/*
* @gridster,normal size Gridster
* @gridster_full,full size Gridster
* */
var gridster;
var gridster_full;
var current_gridster;
/*
* initialize the grid size
* */
ifepm.dashboard_widget.height = 0,ifepm.dashboard_widget.width = 0;

/*
* @function init
* --init gridster
* @params option
* option = {
* normal:{height,width,max_col,max_row},
* full:{height,width,max_col,max_row}}
* */
ifepm.dashboard_widget.init = function(option){

    ifepm.dashboard_widget.setconfig(option);
    //====log====//
    //console.log(ifepm.dashboard_widget.config);

    gridster = $("#dash-normalsize ul").gridster({
        namespace: '#dash-normalsize',
        widget_margins: [10, 10],
        widget_base_dimensions: [ifepm.dashboard_widget.config.normal.width, ifepm.dashboard_widget.config.normal.height]

        //draggable:{
        //    stop: ifepm.dashboard_widget.drag_stop,
        //},
    }).data('gridster');
    current_gridster = gridster;
    /*
    gridster_full = $("#dash-fullsize ul").gridster({
        namespace:'#dash-fullsize',
        widget_margins: [10,10],
        widget_base_dimensions: [200,200],
    }).data('gridster');
    */
};

/*
* @function init full size gridster
* */
var isinit_fullsize = true;

ifepm.dashboard_widget.init_fullsize = function(){
     if(isinit_fullsize){
         var width = ifepm.dashboard_widget.config.full.width;
         var height = ifepm.dashboard_widget.config.full.height;
         gridster_full = $("#dash-fullsize ul").gridster({
             namespace:'#dash-fullsize',
             widget_margins: [10,10],
             widget_base_dimensions: [width,height] ,
             draggable:{
                 stop: ifepm.dashboard_widget.drag_stop,
             },
         }).data('gridster');
         isinit_fullsize = false;
     }
}

/*
* @function setconfig
* @params option
* option = {
* normal:{height,width,max_col,max_row},
* full:{height,width,max_col,max_row}}
* */
ifepm.dashboard_widget.setconfig = function(option){
    //normal size config
    ifepm.dashboard_widget.config.normal.max_col = option.normal.max_col;
    ifepm.dashboard_widget.config.normal.max_row = option.normal.max_row;
    ifepm.dashboard_widget.config.normal.height = option.normal.height / option.normal.max_row - 26;
    ifepm.dashboard_widget.config.normal.width = option.normal.width / option.normal.max_col - 26;

    //full size config
    ifepm.dashboard_widget.config.full.max_col = option.full.max_col;
    ifepm.dashboard_widget.config.full.max_row = option.full.max_row;
    ifepm.dashboard_widget.config.full.height = option.full.height / option.full.max_row;
    ifepm.dashboard_widget.config.full.width = option.full.width / option.full.max_col - 50;
}
/*
* @function enable(bool)
* */
ifepm.dashboard_widget.enable = function(enable){
    if(enable){
        gridster.enable();
    }
    else{
        gridster.disable();
    }
}

/*
* @function full_size
* */
var isfullsize = false;

ifepm.dashboard_widget.resize_window = function(option){
    ifepm.dashboard_widget.setconfig(option);
    var dashboard=arguments.length>1?true:false;
    var option = {};
    if(isfullsize){
        option.widget_base_dimensions = [ifepm.dashboard_widget.config.full.width,ifepm.dashboard_widget.config.full.height];
        if(dashboard){
            current_gridster.resize_widget_dimensions(option,"dashboard");
        }
        else{
            current_gridster.resize_widget_dimensions(option);
        }
    }
    else{
        option.widget_base_dimensions = [ifepm.dashboard_widget.config.normal.width,ifepm.dashboard_widget.config.normal.height];
        if(dashboard){
            current_gridster.resize_widget_dimensions(option,"dashboard");
        }
        else{
            current_gridster.resize_widget_dimensions(option);
        }
    }

    return current_gridster;
}

 ifepm.dashboard_widget.full_size = function(option){
    if(option){
        isfullsize = true;
        current_gridster = gridster_full;
    }else{
        isfullsize = false;
        current_gridster = gridster;
    }
}

/*
* @function add_w
* @params option = {id,container_selector,chart_type}
* */
ifepm.dashboard_widget.add_w = function(option){

    var selector = "";
    if(isfullsize){
        selector =" li#full_"+option.id ;
    }
    else{
        selector=" li#"+option.id;
    }

    if(isfullsize && option.chart_type == "pie" ){
        option.sizex = 2;
        option.sizey = 2;
        option.isnew = false;
    }

    if(option.isnew){
        var default_size = ifepm.dashboard_widget.initsize(option.chart_type);
        current_gridster.add_widget(option.container_selector+selector,default_size.sizex,default_size.sizey)
    }else{
        current_gridster.add_widget(option.container_selector+selector,option.sizex,option.sizey,option.col,option.row)
    }

    var pos={};
    pos = current_gridster.serialize($(selector));

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
ifepm.dashboard_widget.remove_w = function(filter,fullsize){
    var grid;
    if(fullsize){
        grid = gridster_full;
    }
    else{
        grid = gridster;
    }
    if(grid){
        grid.remove_widget($(filter));
        $(filter).remove();
        if(!isfullsize){
            ifepm.dashboard_widget.drag_stop();
        }
    }
}

/*
* @function get_pos
* return the gridster position depend on the html filter
* */
ifepm.dashboard_widget.get_pos = function(filter){
    var pos = {};
    pos = current_gridster.serialize($(filter));

    pos[0].col = pos[0].col == NaN ? 1:pos[0].col;
    pos[0].row = pos[0].col == NaN ? 1:pos[0].row;


    var result = {};
    result.col = pos[0].col;
    result.row = pos[0].row;
    return result;
}

/*
* @function initsize
* return the default size from specific chart type
* */
ifepm.dashboard_widget.initsize = function(type){
    var defsize = {
        sizex:1,
        sizey:1,
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

/*
* @function remove_all_widgets
* remove all the grids
* */
ifepm.dashboard_widget.remove_all_widgets =function(fullsize){
    var grid;
    if(fullsize){
         grid = gridster_full;
    }
    else{
        grid = gridster;
    }

    grid.remove_all_widgets();
};

/*
* @function drag_stop
* callback after drag stop
* */
ifepm.dashboard_widget.drag_stop = function(event,ui){
    //if(isfullsize){
    //    return;
    //}
    if($("#dash-fullsize").height()>$("#dashboard-content-full").height()){
        $("#dashboard-content-full").height($("#dash-fullsize").height());
    }
    else{
        $("#dashboard-content-full").height($(document).height());
    }
    ifepm.dashboard.on_drag_stop();
};
