
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
ifepm.dashboard.form_chart=function(option_args){
    var options = {
        chart : {
            renderTo : option_args['container'],
            type : 'line'
        },
        credits : {
            enabled : false
        },
        title : {
            text : ""
        },
        tooltip : {
            ////       formatter: function() {
////           return '<b>'+ this.series.name +'</b><br/>'+
////                  "数值"+this.y +'<br />'+this.x;
////        },
//          xDateFormat: '%Y-%m-%d'
        },
        xAxis : {
            //                categories:[],
//            type : 'datetime',
//            dateTimeLabelFormats : {
//                day : '%e/%b'
//            },
//            tickInterval : 24 * 3600 * 1000 * ticket, // one day
            labels : {
                style : {
                    fontWeight : 800
                }
            }
        },
        yAxis : {
            title : {
                enabled : false
            },
            tickWidth : 1,
            offset : 10,
//                          labels:{
//                                format:'{value}m'
//                          },
            lineWidth : 1
        },
        series : [
            {
                type:"area",
                name: "实际值"
            },
            {
                type:"line",
                name: "目标值"
            }
        ]
    };
    options.yAxis.labels = {
        format : '{value}' +option_args["unit"][0]
    };
    var start=new Date(option_args['startTime']).toArray();
    var end=new Date(option_args['endTime']).toArray();
    if(start[1] && end[1]){

            var startWQ=start[1];


            var endWQ=end[1];

    }
    switch (option_args["interval"].toString()){
        case "90":
            options.tooltip.xDateFormat='%Y-%m-%d %H:%M';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                hour: '%H:%M'+"<br />"+'%e/%b'
            };
            options.xAxis.tickInterval=3600 * 1000;
            options.series[0].pointStart=Date.UTC(start[0],start[1]-1,start[2],start[3]);
            options.series[0].pointInterval=3600 * 1000;
            options.series[1].pointStart=Date.UTC(start[0],start[1]-1,start[2],start[3]);
            options.series[1].pointInterval=3600 * 1000;
            break;
        case "100":
            options.tooltip.xDateFormat='%Y-%m-%d';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                day : '%e/%b'+"<br />"+"%Y"
            };
            options.xAxis.tickInterval=24 * 3600 * 1000;
            options.series[0].pointStart=Date.UTC(start[0],start[1]-1,start[2]);
            options.series[0].pointInterval=24 * 3600 * 1000;
            options.series[1].pointStart=Date.UTC(start[0],start[1]-1,start[2]);
            options.series[1].pointInterval=24 * 3600 * 1000;
            break;
        case "200":
            options.tooltip.formatter=function(){
                return '<b>'+ this.series.name +'</b><br/>'+
                    "数值"+this.y +'<br />'+this.x;
            };
            options.xAxis.categories=[];
            var yearInterval=parseInt(end[0])-parseInt(start[0]);
            var xItem;
            var year;
            var lastWeek=52*(yearInterval)+parseInt(end[1]);
            for(var i=0;i<=yearInterval;i++){
                if(i==0){
                    year=parseInt(start[0]);
                    for(var a=parseInt(startWQ);a<=((lastWeek-52*(i+1))>=0?52:parseInt(endWQ));a++){
                        xItem=year+"<br />"+"第"+a+"周";
                        options.xAxis.categories.push(xItem);
                    }
                }
                else{
                    year=parseInt(start[0])+i;
                    for(var b=1;b<=((lastWeek-52*(i+1))>=0?52:parseInt(endWQ));b++){
                        xItem=year+"<br />"+"第"+b+"周";
                        options.xAxis.categories.push(xItem);
                    }
                }
            };
            break;
        case "300":
            options.tooltip.xDateFormat='%Y-%m';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                month : '%b'+"<br />"+'%Y'
            };
            options.xAxis.tickInterval=24 * 3600 * 1000 * 31;
            options.series[0].pointStart=Date.UTC(start[0],start[1]-1,1);
            options.series[0].pointInterval=24 * 3600 * 1000 *31;
            options.series[1].pointStart=Date.UTC(start[0],start[1]-1,1);
            options.series[1].pointInterval=24 * 3600 * 1000 *31;
            break;
        case "400":
            options.tooltip.formatter=function(){
                return '<b>'+ this.series.name +'</b><br/>'+
                    "数值 "+this.y +'<br />'+this.x;
            };
            options.xAxis.categories=[];
            var yearInterval=parseInt(end[0])-parseInt(start[0]);
            var xItem;
            var year;
            var lastQuarter=4*(yearInterval)+parseInt(endWQ)
            for(var i=0;i<=yearInterval;i++){
                if(i==0){
                    year=parseInt(start[0]);
                    for(var a=parseInt(startWQ);a<=((lastQuarter-4*(i+1))>=0?4:parseInt(endWQ));a++){
                        xItem=year+"<br />"+"第"+a+"季度";
                        options.xAxis.categories.push(xItem);
                    }
                }
                else{
                    year=parseInt(start[0])+i;
                    for(var b=1;b<=((lastQuarter-4*(i+1))>=0?4:parseInt(endWQ));b++){
                        xItem=year+"<br />"+"第"+b+"季度";
                        options.xAxis.categories.push(xItem);
                    }
                }
            };
            break;
        case "500":
            options.tooltip.xDateFormat='%Y';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                year : '%Y'
            };
            options.xAxis.tickInterval=24 * 3600 * 1000 * 365;
            options.series[0].pointStart=Date.UTC(start[0],0,1);
            options.series[0].pointInterval=24 * 3600 * 1000*365;
            options.series[1].pointStart=Date.UTC(start[0],0,1);
            options.series[1].pointInterval=24 * 3600 * 1000*365;
            break;
    };
    options.series[0].data=option_args["current"];
    options.series[1].data=option_args["target"];
    var chart = new Highcharts.Chart(options);
}

//container of the current dashboard's item.
ifepm.dashboard.graphs=ifepm.dashboard.graphs || {};

ifepm.dashboard.graph_sequence =[];

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
              if(data){
                  ifepm.dashboard.form_chart({current:data.current,
                      target:data.target,
                      unit:data.unit,
                      interval:data.interval,
                      startTime:data.startTime,
                      endTime:data.endTime,
                      timeBeginChart:data.startTime,
                      container:ifepm.dashboard.make_item_container_id(id)});
              }
          }
        }
    );
};

ifepm.dashboard.make_item_container_id=function(item_id){
  return "container_" + item_id;
};


/*
* @class 代表在仪表盘中的一个图表以及其代表的搜索条件和数据
*
* */
function Graph(){
    /*@field 全局唯一的ID号*/
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

    /*@field 查看间隔，指数据将在怎么*/
    this.interval = null;
    this.name = null;
    this.title = null;
    this.sequence = null;

    /*@field gridview 的位置*/
    this.row = null;
    this.col = null;
    this.sizex = null;
    this.sizey = null;

    this.placeholder = ifepm.template.view_placeholder;
    this.container=  function(graph_item){
        return ifepm.template.view
            .replace(/custom_handler/g,ifepm.config.remove_view_function)
            .replace(/!id!/g,graph_item.id)
            .replace(/!title!/g,graph_item.title)
            .replace(/!item_container_id!/g,ifepm.dashboard.make_item_container_id(graph_item.id))
            .replace(/!attr!/g,ifepm.config.graph_indicator)
            .replace(/!name!/g,graph_item.name)
            .replace(/!kpi_name!/g,graph_item.kpi_name)
            .replace(/!entity_group!/g,graph_item.entity_group)
            .replace(/!from!/g,graph_item.from)
            .replace(/!to!/g,graph_item.end)
            .replace(/!calculate_type!/g,graph_item.calculate_type)
            .replace(/!row/g,graph_item.row)
            .replace(/!col/g,graph_item.col)
            .replace(/!sizex!/g,graph_item.sizex)
            .replace(/!sizey!/g,graph_item.sizey)
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

    ifepm.dashboard_widget.init();
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

                for(var i in data){
                    var graph_item = new Graph();
                    graph_item.id = data[i].id
                    graph_item.name = data[i].name
                    graph_item.title = data[i].title
                    graph_item.calculate_type = data[i].calculate_type
                    graph_item.from =data[i].start
                    graph_item.end = data[i].end
                    graph_item.type = data[i].type
                    graph_item.entity_group = data[i].entity_group
                    graph_item.kpi_id = data[i].kpi_id
                    graph_item.kpi_name = data[i].kpi_name
                    graph_item.interval = data[i].interval
                    graph_item.sequence = data[i].sequence
                    graph_item.dashboard_id = data[i].dashboard_id
                    graph_item.row = data[i].row;
                    graph_item.col = data[i].col;
                    graph_item.sizex = data[i].sizex;
                    graph_item.sizey = data[i].sizey;
                    ifepm.dashboard.graphs[data[i].id]=graph_item;
                    ifepm.dashboard.graph_sequence.push(data[i].id)

                }
                ifepm.dashboard.create_dashboard();
            },
            error:function(jqXHR,textStatus,errorThrown){alert("Oops, something went wrong, please try again");}}

    );
};



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
        data:{dashboard_item:dashboard_item},
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












