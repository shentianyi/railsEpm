
/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-12
 * Time: 下午3:34
 * To change this template use File | Settings | File Templates.
 * need jQuery,jQuery UI Sortable
 */


  /*
    Usage: include all the dependancy and this lib, do the configure in ifepm.config.js,
    customize the theme in ifepm.dashboard.template.js
    and use ifepm.dashboard.init(dashboard_id) to load all the sortable dashboard view in
     the specified container
     */

//include jquery-1.9.1.js - basic framework
//include jquery-ui-1.10.3.custom.js - need sortable module in this framework
//include hightchart.js
//include ifepm.config.js which contains the configuration of the lib
//include ifepm.dashboard.template.js which contains the theme of the dashboard view
//include ifepm.text.js which contains the text message used in this lib


if (!Date.prototype.toArray) {
    Date.prototype.toArray = function() {
         return [this.getFullYear(),this.getMonth()+1,
             this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds(),
             this.getMilliseconds()];
    };
};




//load or initialize the ifepm object
var ifepm = ifepm || {};


ifepm.dashboard = ifepm.dashboard || {};

ifepm.active_selector = ifepm.active_selector || new ActiveSelect();

//function to generate a chart-form dashboard view . Depands on highchart.js
/*
=============
@Deprecated
=============
*/
ifepm.dashboard.form_chart=function(datas){

}

//container of the current dashboard's item.
ifepm.dashboard.graphs=ifepm.dashboard.graphs || {};

ifepm.dashboard.graph_sequence =[];

//
var db_chartSeries = {
    count: 0,
    id_count:0,
    series: [],
    getCount: function () {
        return this.count
    },
    addCount: function () {
        this.count += 1
    },
    minusCount: function () {
        this.count -= 1
    },
    getSeries: function () {
        return this.series
    },
    addSeries: function (series) {
        this.series.push(series)
    }
};
/*
* @ function form_graph a new function to render chart
* @ params data
* */
var isformchart = false;

ifepm.dashboard.form_graph = function(datas,id){
    var container = ifepm.dashboard.make_item_container_id(id);
    var type = ifepm.dashboard.graphs[id].chart_type;
    var chart = null;

    for(var i = 0;i<datas.length;++i){
        var data = [];
        for(var j = 0;j<datas[i].current.length;++j){

            data[j] = {};
            data[j].y = datas[i].current[j];
            data[j].target = datas[i].target[j];
            data[j].unit = datas[i].unit[j];
        }
        option = {
            kpi:datas[i].kpi_id,
            id:datas[i].id,
            target:container,
            begin_time:datas[i].startTime,
            type:type,
            interval:datas[i].interval,
            data:data,
            count:datas[i].count
        };
        if(i==0){
            if(option.type=="pie"){
                high_chart.tooltip={
                    formatter:function(){
                        var key = '<b>'+ this.key +'</b><br />';
                        if(datas.length==1){
                            key+="Value: "+this.y+this.series.data[0].unit+
                                "<br />Percentage: "+(this.percentage).toFixed(1)+"%";
                            return key;
                        }
                        else{
                            key+=(this.percentage).toFixed(1)+"%";
                            return key;
                        }
                    }
                };
                high_chart.plotOptions.pie.dataLabels={
                    enabled: false
                };
                high_chart.plotOptions.pie.size="110%";
            }
            render_to(option);
            create_environment_for_data(option);
            chart = new Highcharts.Chart(high_chart);
        }


        add_series(option);
        proper_type_for_chart(option);
    }

    if(chart){
        //targen line
        if(datas.length == 1 && type !="pie"){
            var data = [];
            for(var j = 0;j<datas[0].target.length;++j){
                data[j] = {};
                data[j].y = datas[0].target[j];
            }

            option = {
                kpi:"target",
                id:"target",
                target:container,
                begin_time:datas[0].startTime,
                type:type,
                interval:datas[0].interval,
                data:data,
                count:datas[0].count,
            }

            add_series(option);
            proper_type_for_chart(option);
        }
        var defsize = ifepm.dashboard_widget.initsize(type);
        chart.setSize(ifepm.dashboard_widget.width*defsize.sizex,ifepm.dashboard_widget.height*defsize.sizey -40);
        if(type == "pie"){
            for(var i = 0;i<chart.series.length;++i){
                chart.series[i].update({showInLegend:false});
            }
        }
    }
}


var intervals = [];
/*
* @function setTimer
* set a timer for one graph to request kpi entries
* @params graph
* */
ifepm.dashboard.setTimer = function(graph){
    var interval= null;
    var intv = ifepm.dashboard.getInteral(graph.sequence);
    interval = setInterval(reload(graph.id),intv);
    intervals.push(interval);
}
function reload(id){
    return function(){
        if(!ifepm.dashboard.graphs[id]){
            return;
        }
        var current_graph = ifepm.dashboard.graphs[id];
        $.ajax(
            {
                before_send: function(){},
                url:ifepm.config.get_item_data_url.url,
                data:{"id":id},
                dataType:ifepm.config.get_item_data_url.dataType,
                crossDomain:ifepm.config.get_item_data_url.crossDomain,
                success: function(data){
                    if(data){
                        ifepm.dashboard.update_graph(data,id);
                    }
                }
            }
        );
    };
}

/*
* @function clearAllTimer
* clear all the timer
* */
ifepm.dashboard.clear_all_timer = function(){
    for(var i = 0;i<intervals.length;i++){
        clearTimeout(intervals[i]);
    }
    intervals = [];
}

/*
* @function getInterval
* get the interval for timer
* @params interval:interval of chart
* */
ifepm.dashboard.getInteral = function(interval){
    var intvl = null;

    var sec = 1000;
    var min = 1000*60;
    var hour = 1000*60*60;

    switch (interval){
        case "90":
            intvl = sec * 60;
            break;
        case "100":
            intvl = min * 60;
            break;
        case "200":
            intvl = hour * 24;
            break;
        case "300":
            intvl = hour * 24;
            break;
        case "400":
            intvl = hour * 24;
            break;
        case "500":
            intvl = hour * 24;
            break;
        default :
            intvl = hour;
            break;
    }
    return intvl;
}

/*
* @function reloadGraph
* @param id id of the dashboard item
* */
ifepm.dashboard.reload_graph = function(id){
    if(!ifepm.dashboard.graphs[id]){
        return;
    }
    var current_graph = ifepm.dashboard.graphs[id];
    $.ajax(
        {
            before_send: function(){},
            url:ifepm.config.get_item_data_url.url,
            data:{"id":id},
            dataType:ifepm.config.get_item_data_url.dataType,
            crossDomain:ifepm.config.get_item_data_url.crossDomain,
            success: function(data){
                if(data){
                    ifepm.dashboard.update_graph(data,id);
                }
            }
        }
    );
}

/*
* @function update_graph
* reload data and update series of high_charts
* @param data
* @param id
* */
 ifepm.dashboard.update_graph = function(datas,id){
    var container = ifepm.dashboard.make_item_container_id(id);
    var type = ifepm.dashboard.graphs[id].chart_type;
    var chart = $('#'+container).highcharts();
    if(chart){
        for(var i = 0;i<datas.length;i++){
            var series = chart.get(datas[i].id);
            if(!series){
                continue;
            }
            for(var j=0;j<datas[i].current.length;j++){
                var point = series.data[j];
                //point.update(Math.random()*(200+1));
                series.data[j].update(datas[i].current[j],false);
            }
        }
        if(type=="pie"){
            pie_for_dashboard(container);
        }
        else{
            chart.redraw();
        }
    }
}

ifepm.dashboard.load_graph=function(id){
    if (!ifepm.dashboard.graphs[id])
    {
       return;
    }

    var current_graph = ifepm.dashboard.graphs[id];
    $.ajax(
        {
          before_send: function(){},
          url:ifepm.config.get_item_data_url.url,
          data:{"id":id},
          dataType:ifepm.config.get_item_data_url.dataType,
          crossDomain:ifepm.config.get_item_data_url.crossDomain,
          success: function(data){
              //condition array
              if(data){
                  ifepm.dashboard.form_graph(data,id);
              }
          }
        }
    );
};

ifepm.dashboard.make_item_container_id=function(item_id){
  return "container_" + item_id;
};

/*
* @class 代表一个图标的搜索条件
*
* */

function Condition(){
    /*@field 全局唯一的ID*/
    this.id=null;
    /*@field 用户自定义的观察点，观察点是数个KPI输入点的集合 */
    this.entity_group=null;
    /*@field 图中使用的KPI的ID*/
    this.kpi_id=null;
    /*@field 图中使用的KPI的名称*/
    this.kpi_name=null;
    /*
     @field 计算类型, ACCUMULATE or AVERAGE
     ACCUMULATE 将获取到的同类数据做加法合并
     AVERAGE 将获取到的同类数据做除法平均
     * */
    this.calculate_type=null;

    /*@field 监测时间开始*/
    this.from = null;

    /*@field 监测时间结束*/
    this.end = null;
    /**/
    this.count = null;
};
/*
* @class 代表在仪表盘中的一个图表以及其代表的搜索条件和数据
*
* */
function Graph(){
    /*@field 全局唯一的ID号*/
    this.id=null;
    /*@field 用户自定义的观察点，观察点是数个KPI输入点的集合 */
    //this.entity_group=null;
    /*@field 图中使用的KPI的ID*/
    //this.kpi_id=null;
    /*@field 图中使用的KPI的名称*/
    //this.kpi_name=null;
    /*
    @field 计算类型, ACCUMULATE or AVERAGE
    ACCUMULATE 将获取到的同类数据做加法合并
    AVERAGE 将获取到的同类数据做除法平均
    * */
    //this.calculate_type=null;

    /*@field 监测时间开始*/
    //this.from = null;

    /*@field 监测时间结束*/
    //this.end = null;

    /*@field 查看间隔，指数据将在怎么*/
    //this.interval = null;
    //this.name = null;
    this.title = null;
    this.sequence = null;

    /*@field gridview 的位置*/
    this.row = null;
    this.col = null;
    this.sizex = null;
    this.sizey = null;

    /**/
    this.chart_type = null;

    this.placeholder = ifepm.template.view_placeholder;
    this.container=  function(graph_item){
        return ifepm.template.view
            .replace(/custom_handler/g,ifepm.config.remove_view_function)
            .replace(/!id!/g,graph_item.id)
            .replace(/!title!/g,graph_item.title)
            .replace(/!item_container_id!/g,ifepm.dashboard.make_item_container_id(graph_item.id))
            .replace(/!attr!/g,ifepm.config.graph_indicator)
            //.replace(/!name!/g,graph_item.name)
            //.replace(/!kpi_name!/g,graph_item.kpi_name)
            //.replace(/!entity_group!/g,graph_item.entity_group)
            //.replace(/!from!/g,graph_item.from)
            //.replace(/!to!/g,graph_item.end)
            //.replace(/!calculate_type!/g,graph_item.calculate_type)
    };
}

//when user sorts the dashboard layout, the sequence should be updated in the server side
ifepm.dashboard.update_item_sequence= function(container_selector){

    ifepm.dashboard.graph_sequence = [];

  $(container_selector).children().filter(ifepm.config.graph_container_tag)
        .each(function(){
          ifepm.dashboard.graph_sequence.push($(this).attr(ifepm.config.graph_indicator));
    });

    $.ajax({
        url:ifepm.config.update_sequence_url.url,
        dataType:ifepm.config.update_sequence_url.dataType,
        crossDomain:ifepm.config.update_sequence_url.crossDomain,
        data:{sequence:ifepm.dashboard.graph_sequence}
    })
};

//append a new dashboard item to the main dashboard container
ifepm.dashboard.create_dashboard=function(){
    var container_selector=ifepm.config.container_selector;
    ifepm.dashboard_widget.remove_all_widgets();
    $(container_selector).children().remove();
    if (Object.keys(ifepm.dashboard.graphs).length>0){

                for(index in ifepm.dashboard.graph_sequence){
                    var graph_id = ifepm.dashboard.graph_sequence[index];
                    $(container_selector).append(
                        ifepm.dashboard.graphs[graph_id].container(ifepm.dashboard.graphs[graph_id]));

                    var option = {};
                    option.id = graph_id;
                    option.row = ifepm.dashboard.graphs[graph_id].row;
                    option.col = ifepm.dashboard.graphs[graph_id].col;
                    option.sizex = ifepm.dashboard.graphs[graph_id].sizex;
                    option.sizey = ifepm.dashboard.graphs[graph_id].sizey;
                    ifepm.dashboard_widget.setSize(option);
                }
                //configure the sortable
                $(container_selector).sortable(
                    {
                        placeholder: ifepm.template.move_placeholder,
                        //update the sequence when the layout is changed
                        stop:function(){ifepm.dashboard.update_item_sequence(container_selector)}
                    }
                );
                //$(container_selector).disableSelection();
    }
    else {
        $(container_selector).append((new Graph()).placeholder)
    }

    //ifepm.dashboard_widget.init();
};

ifepm.dashboard.init=function(id){
    ifepm.dashboard.graphs = {};
    ifepm.dashboard.graph_sequence = [];
    $.ajax(
        {
            crossDomain:ifepm.config.get_dashboard_items_url.crossDomain,
            dataType:ifepm.config.get_dashboard_items_url.dataType,
            url:ifepm.config.get_dashboard_items_url.url,
            data:{id:id},
            success:function(data){
                //ifepm.dashboard.clear_all_timer();
                for(var i in data){
                    var graph_item = new Graph();
                    graph_item.id = data[i].id
                    //graph_item.name = data[i].name
                    graph_item.title = data[i].title
                    //graph_item.calculate_type = data[i].calculate_type
                    //graph_item.from =data[i].start
                    //graph_item.end = data[i].end
                    graph_item.chart_type = data[i].chart_type
                    //graph_item.entity_group = data[i].entity_group
                    //graph_item.kpi_id = data[i].kpi_id
                    //graph_item.kpi_name = data[i].kpi_name
                    //graph_item.interval = data[i].interval
                    graph_item.sequence = data[i].sequence
                    graph_item.dashboard_id = data[i].dashboard_id
                    graph_item.row = data[i].row;
                    graph_item.col = data[i].col;
                    graph_item.sizex = data[i].sizex;
                    graph_item.sizey = data[i].sizey;
                    ifepm.dashboard.graphs[data[i].id]=graph_item;
                    //ifepm.dashboard.setTimer(ifepm.dashboard.graphs[data[i].id]);
                    ifepm.dashboard.graph_sequence.push(data[i].id)

                }
                ifepm.dashboard.create_dashboard();
            },
            error:function(jqXHR,textStatus,errorThrown){alert("Oops, something went wrong, please try again");}}

    );
};

ifepm.dashboard.on_view_added = function(graph){
    ifepm.dashboard.graphs[graph.id] = graph;
    ifepm.dashboard.graph_sequence.push(graph.id);
}

ifepm.dashboard.on_view_deleted = function(id){
    delete ifepm.dashboard.graphs[id];

    var value = Number(id);
    var index = ifepm.dashboard.graph_sequence.indexOf(value);
    if(index >= 0){
        ifepm.dashboard.graph_sequence.splice(index,1);
    }
}

ifepm.dashboard.delete=function(id,options){
    $.ajax({
       url:ifepm.config.dashboard_delete_url.url,
       crossDomain:ifepm.config.dashboard_delete_url.crossDomain,
       dataType:ifepm.config.dashboard_delete_url.dataType,
        data: {"id":id},
        success:options.success,
        error:options.error,
        complete:options.complete
    })
};

ifepm.dashboard.add=function(dashboard,options){
    $.ajax({
        url:ifepm.config.dashboard_create_url.url,
        crossDomain:ifepm.config.dashboard_create_url.crossDomain,
        dataType:ifepm.config.dashboard_create_url.dataType,
        data:{
        "data":dashboard},
        success:options.success,
        error:options.error,
        complete:options.complete
    })
};

ifepm.dashboard.delete_item=function(item_id,options){
    $.ajax({
        url:ifepm.config.dashboard_item_delete_url.url,
        crossDomain:ifepm.config.dashboard_item_delete_url.crossDomain,
        data:{"id":item_id},
        dataType:ifepm.config.dashboard_item_delete_url.dataType,
        success:options.success,
        error:options.error,
        complete:options.complete
    })
};


ifepm.dashboard.add_item=function(dashboard_item,options){
    $.ajax({
        url:ifepm.config.dashboard_item_create_url.url,
        data:{
            dashboard_item: dashboard_item.db,
            conditions: dashboard_item.conditions
        },
        crossDomain:ifepm.config.dashboard_item_create_url.crossDomain,
        dataType:ifepm.config.dashboard_item_create_url.dataType,
        success:options.success,
        error:options.error,
        complete:options.complete
    })
};

ifepm.dashboard.save_grid_pos=function(sequence,options){
    $.ajax({
        url:ifepm.config.dashboard_item_save_grid_url.url,
        data:{sequence: sequence},
        crossDomain:ifepm.config.dashboard_item_save_grid_url.crossDomain,
        dataType:ifepm.config.dashboard_item_save_grid_url.dataType,
        success:options.success,
        error:options.error,
        complete:options.complete
    })
}













