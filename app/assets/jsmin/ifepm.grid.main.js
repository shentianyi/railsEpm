var RESIZE=RESIZE||{};!function($){$.Gridster.resize_widget_dimensions=function(options){options.widget_margins&&(this.options.widget_margins=options.widget_margins),options.widget_base_dimensions&&(this.options.widget_base_dimensions=options.widget_base_dimensions),this.min_widget_width=2*this.options.widget_margins[0]+this.options.widget_base_dimensions[0],this.min_widget_height=2*this.options.widget_margins[1]+this.options.widget_base_dimensions[1];var serializedGrid=this.serialize();return this.$widgets.each("dashboard"==arguments[1]?$.proxy(function(i,widget){var $widget=$(widget),data=serializedGrid[i];this.resize_widget($widget,data.size_x,data.size_y,null,null,!0)},this):$.proxy(function(i,widget){var $widget=$(widget),data=serializedGrid[i];this.resize_widget($widget,data.size_x,data.size_y)},this)),this.generate_grid_and_stylesheet(),this.get_widgets_from_DOM(),this.set_dom_grid_height(),!1}}(jQuery);var ifepm=ifepm||{};ifepm.dashboard_widget=ifepm.dashboard_widget||{},ifepm.dashboard_widget.config={normal:{height:0,width:0,max_col:5,max_row:3},full:{height:0,width:0,max_col:5,max_row:3}};var gridster,gridster_full,current_gridster;ifepm.dashboard_widget.height=0,ifepm.dashboard_widget.width=0,ifepm.dashboard_widget.init=function(option){ifepm.dashboard_widget.setconfig(option),gridster=$("#dash-normalsize ul").gridster({namespace:"#dash-normalsize",widget_margins:[10,10],widget_base_dimensions:[ifepm.dashboard_widget.config.normal.width,ifepm.dashboard_widget.config.normal.height]}).data("gridster"),current_gridster=gridster};var isinit_fullsize=!0;ifepm.dashboard_widget.init_fullsize=function(){if(isinit_fullsize){var width=ifepm.dashboard_widget.config.full.width,height=ifepm.dashboard_widget.config.full.height;gridster_full=$("#dash-fullsize ul").gridster({namespace:"#dash-fullsize",widget_margins:[10,10],widget_base_dimensions:[width,height],draggable:{stop:ifepm.dashboard_widget.drag_stop}}).data("gridster"),isinit_fullsize=!1}},ifepm.dashboard_widget.setconfig=function(option){ifepm.dashboard_widget.config.normal.max_col=option.normal.max_col,ifepm.dashboard_widget.config.normal.max_row=option.normal.max_row,ifepm.dashboard_widget.config.normal.height=option.normal.height/option.normal.max_row-26,ifepm.dashboard_widget.config.normal.width=option.normal.width/option.normal.max_col-26,ifepm.dashboard_widget.config.full.max_col=option.full.max_col,ifepm.dashboard_widget.config.full.max_row=option.full.max_row,ifepm.dashboard_widget.config.full.height=option.full.height/option.full.max_row,ifepm.dashboard_widget.config.full.width=option.full.width/option.full.max_col-50},ifepm.dashboard_widget.enable=function(enable){enable?gridster.enable():gridster.disable()};var isfullsize=!1;ifepm.dashboard_widget.resize_window=function(option){ifepm.dashboard_widget.setconfig(option);var dashboard=arguments.length>1?!0:!1,option={};return isfullsize?(option.widget_base_dimensions=[ifepm.dashboard_widget.config.full.width,ifepm.dashboard_widget.config.full.height],dashboard?current_gridster.resize_widget_dimensions(option,"dashboard"):current_gridster.resize_widget_dimensions(option)):(option.widget_base_dimensions=[ifepm.dashboard_widget.config.normal.width,ifepm.dashboard_widget.config.normal.height],dashboard?current_gridster.resize_widget_dimensions(option,"dashboard"):current_gridster.resize_widget_dimensions(option)),current_gridster},ifepm.dashboard_widget.full_size=function(option){option?(isfullsize=!0,current_gridster=gridster_full):(isfullsize=!1,current_gridster=gridster)},ifepm.dashboard_widget.add_w=function(option){var selector="";if(selector=isfullsize?" li#full_"+option.id:" li#"+option.id,isfullsize&&"pie"==option.chart_type&&(option.sizex=2,option.sizey=2,option.isnew=!1),option.isnew){var default_size=ifepm.dashboard_widget.initsize(option.chart_type);current_gridster.add_widget(option.container_selector+selector,default_size.sizex,default_size.sizey)}else current_gridster.add_widget(option.container_selector+selector,option.sizex,option.sizey,option.col,option.row);var pos={};pos=current_gridster.serialize($(selector)),pos[0].col=0/0==pos[0].col?1:pos[0].col,pos[0].row=0/0==pos[0].col?1:pos[0].row;var result={};return result.sizex=pos[0].size_x,result.sizey=pos[0].size_y,result.col=pos[0].col,result.row=pos[0].row,result},ifepm.dashboard_widget.remove_w=function(filter,fullsize){var grid;grid=fullsize?gridster_full:gridster,grid&&(grid.remove_widget($(filter)),$(filter).remove(),isfullsize||ifepm.dashboard_widget.drag_stop())},ifepm.dashboard_widget.get_pos=function(filter){var pos={};pos=current_gridster.serialize($(filter)),pos[0].col=0/0==pos[0].col?1:pos[0].col,pos[0].row=0/0==pos[0].col?1:pos[0].row;var result={};return result.col=pos[0].col,result.row=pos[0].row,result},ifepm.dashboard_widget.initsize=function(type){var defsize={sizex:1,sizey:1};switch(type){case"line":defsize.sizex=2,defsize.sizey=1;break;case"pie":defsize.sizex=1,defsize.sizey=1;break;case"column":defsize.sizex=2,defsize.sizey=1;break;case"scatter":defsize.sizex=2,defsize.sizey=1}return defsize},ifepm.dashboard_widget.remove_all_widgets=function(fullsize){var grid;grid=fullsize?gridster_full:gridster,grid.remove_all_widgets()},ifepm.dashboard_widget.drag_stop=function(){$("#dashboard-content-full").height($("#dash-fullsize").height()>$("#dashboard-content-full").height()?$("#dash-fullsize").height():$(document).height()),ifepm.dashboard.on_drag_stop()};