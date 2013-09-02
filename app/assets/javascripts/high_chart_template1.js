var high_chart={
    chart : {
        zoomType: 'xy',
        spacingLeft: 5,
        spacingRight: 10
    },
    title : {
        text: null
    },
    credits : {
        enabled: false
    },
    colors : [
        'rgba(245,161,51,0.7)',
        'rgba(52,152,219,0.7)',
        'rgba(205,208,164,0.7)',
        'rgba(231,76,60,0.7)',
        'rgba(26,188,156,0.7)',
        'rgba(241,196,15,0.7)',
        'rgba(149,165,166,0.7)',
        'rgba(103,116,210,0.7)',
        'rgba(205,123,173,0.7)',
        'rgba(53,200,209,0.7)'
    ],
    legend : {
        enabled: true,
        borderRadius: 2,
        borderColor: "rgba(0,0,0,0.15)",
        itemStyle: {
            color: 'rgba(0,0,0,0.25)'
        },
        animation: true,
        maxHeight: 40
    },
    plotOptions : {
        series: {
            marker: {
                enabled: true,
                fillColor: null,
                lineColor: "white",
                states: {
                    select: {
                        fillColor: null,
                        lineColor: "white"
                    }
                }
            },
            states: {
                select: {
                    color:null,
                    borderColor:null
                }
            }
        },
        line: {
            marker: {
                lineWidth: 2,
                radius: 4,
                symbol: "diamond"
            },
            events: {
                mouseOver: function () {
                    this.graph.attr('zIndex', 99);
                },
                mouseOut: function () {
                    this.graph.attr('zIndex', this.index);
                }
            }
        },
        pie: {
            size: '70%',
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: 'rgba(0,0,0,0.25)',
                connectorColor: 'rgba(0,0,0,0.15)',
                connectorWidth:1,
                format: '<b>{point.name}</b><br />{point.percentage:.1f} %'
            }
        },
        scatter: {
            marker: {
                radius: 4,
                symbol: "circle"
            }
        }
    },
    xAxis : {
        lineWidth: 0,
        tickWidth: 0,
        offset: 10,
        ordinal: true,
        labels: {
            style: {
                color: "rgba(0,0,0,0.4)"
            }
        },
        minPadding: 0.02,
        maxPadding: 0.02,
        minRange:36e5,
        type: 'datetime',
        dateTimeLabelFormats:{
            millisecond: "quarter " + '%Q' + '<br />' + '%Y',
            hour: '%H:%M' + "<br />" + '%e/%b',
            day: '%e' + "<br />" + "%b",
            week: '%e/%b' + "<br />" + "W" + "%W",
            month: '%b' + '<br />' + '%Y',
            year: '%Y'
        }

    },
    yAxis : {
        gridLineColor: '#ddd',
        gridLineDashStyle: 'Dot',
        offset: -25,
        showFirstLabel: false,
        title: {
            enabled: false
        },
        labels: {
            style: {
                color: "rgba(0,0,0,0.25)"
            },
            y: -2
        }
    }
}

function render_to(option){
    this.high_chart=high_chart;
    this.high_chart.chart.renderTo=option.target;
}


function add_series(option){
     this.series_name=option.kpi;
     this.series_id=option.id;
     this.chart_container=option.target;
     this.type=option.type;
     this.add_new_series=function(){
         $("#"+this.chart_container).highcharts().addSeries({
             name:this.series_name,
             id:this.series_id,
             type:this.type
         })
     }
}




function chart_type(){};
chart_type.prototype={
    "line":"line",
    "column":"column",
    "pie":"pie",
    "scatter":"scatter"
}
chart_type.prototype.constructor=chart_type;

function set_data(option){
    this.date = standardParse(option.begin_time).date,
    this.template = standardParse(option.begin_time).template,
    this.secondSeries = this.template[4];
    this.hourSeries = this.template[3];
    this.daySeries = this.template[2];
    this.monthSeries = this.template[1];
    this.yearSeries = this.template[0];
    this.data=option.data;
    this.chart_container=option.target;
    this.series_id=option.id;
    this.option_type=option.type
}
set_data.prototype=new chart_type();
set_data.prototype.constructor=set_data;


function interval_90(){
    set_data.apply(this,arguments);
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x = Date.UTC(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i);
        this.data[i].name = new Date(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i).toWayneString().hour;
    }
    this.set_new_data=function(){
        var chart=$("#"+this.chart_container).highcharts();
        var series_id=this.series_id;
        var type=this[this.option_type];
        chart.get(series_id).setData(this.data);
        chart.xAxis[0].update({
            tickPositioner:function(){
                var extreme=[];
                for(var i=0;i<chart.get(series_id).processedXData.length;i++){
                    extreme.push(chart.get(series_id).processedXData[i]);
                }
                extreme.info={
                    unitName:"hour",
                    higherRanks:{}
                }
                return extreme
            }
        });
    }
}
interval_90.prototype=set_data.prototype;
interval_90.prototype.constructor=interval_90;

function interval_100(){
    set_data.apply(this,arguments);
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + i);
        this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + i).toWayneString().day;;
    }
    this.set_new_data=function(){
        var chart=$("#"+this.chart_container).highcharts();
        var series_id=this.series_id;
        var type=this[this.option_type];
        chart.get(series_id).setData(this.data);
        chart.xAxis[0].update({
            tickPositioner:function(){
                var extreme=[];
                for(var i=0;i<chart.get(series_id).processedXData.length;i++){
                    extreme.push(chart.get(series_id).processedXData[i]);
                }
                extreme.info={
                    unitName:"day",
                    higherRanks:{}
                }
                return extreme
            }
        });
    }
}
interval_100.prototype=set_data.prototype;
interval_100.prototype.constructor=interval_100;

function interval_200(){
    set_data.apply(this,arguments);
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i);
        this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWayneString().day
                          +" week"+new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWeekNumber();
    }
    this.set_new_data=function(){
        var chart=$("#"+this.chart_container).highcharts();
        var series_id=this.series_id;
        var type=this[this.option_type];
        chart.get(series_id).setData(this.data);
        chart.xAxis[0].update({
            tickPositioner:function(){
                var extreme=[];
                for(var i=0;i<chart.get(series_id).processedXData.length;i++){
                    extreme.push(chart.get(series_id).processedXData[i]);
                }
                extreme.info={
                    unitName:"week",
                    higherRanks:{}
                }
                return extreme
            }
        });
    }
}
interval_200.prototype=set_data.prototype;
interval_200.prototype.constructor=interval_200;

function interval_300(){
    set_data.apply(this,arguments);
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x = Date.UTC(this.template[0], parseInt(this.template[1]) + i);
        this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + i).toWayneString().month;
    }
    this.set_new_data=function(){
        var chart=$("#"+this.chart_container).highcharts();
        var series_id=this.series_id;
        var type=this[this.option_type];
        chart.get(series_id).setData(this.data);
        chart.xAxis[0].update({
            tickPositioner:function(){
                var extreme=[];
                for(var i=0;i<chart.get(series_id).processedXData.length;i++){
                    extreme.push(chart.get(series_id).processedXData[i]);
                }
                extreme.info={
                    unitName:"month",
                    higherRanks:{}
                }
                return extreme
            }
        });
    }
}
interval_300.prototype=set_data.prototype;
interval_300.prototype.constructor=interval_300;

function interval_400(){
    set_data.apply(this,arguments);
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x = Date.UTC(this.template[0], parseInt(this.template[1]) + 3 * i);
        this.data[i].name ="quarter "+new Date(this.template[0], parseInt(this.template[1]) + 3 * i).monthToQuarter();
    }
    this.set_new_data=function(){
        var chart=$("#"+this.chart_container).highcharts();
        var series_id=this.series_id;
        var type=this[this.option_type];
        chart.get(series_id).setData(this.data);
        chart.xAxis[0].update({
            tickPositioner:function(){
                var extreme=[];
                for(var i=0;i<chart.get(series_id).processedXData.length;i++){
                    extreme.push(chart.get(series_id).processedXData[i]);
                }
                extreme.info={
                    unitName:"millisecond",
                    higherRanks:{}
                }
                return extreme
            }
        });
    }
}
interval_400.prototype=set_data.prototype;
interval_400.prototype.constructor=interval_400;

function interval_500(){
    set_data.apply(this,arguments);
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x = Date.UTC(parseInt(this.template[0]) + i, 0);
        this.data[i].name = new Date(parseInt(this.template[0]) + i, 0).toWayneString().year;
    }
    this.set_new_data=function(){
        var chart=$("#"+this.chart_container).highcharts();
        var series_id=this.series_id;
        var type=this[this.option_type];
        chart.get(series_id).setData(this.data);
        chart.xAxis[0].update({
            tickPositioner:function(){
                var extreme=[];
                for(var i=0;i<chart.get(series_id).processedXData.length;i++){
                    extreme.push(chart.get(series_id).processedXData[i]);
                }
                extreme.info={
                    unitName:"year",
                    higherRanks:{}
                }
                return extreme
            }
        });
    }
}
interval_500.prototype=set_data.prototype;
interval_500.prototype.constructor=interval_500;


//function data_template(option) {
//    this.date = (standardParse(option.begin_time)).date,
//        this.template = (standardParse(option.begin_time)).template,
//        this.data = option.data;
//    var secondSeries = this.template[4];
//    var hourSeries = this.template[3];
//    var daySeries = this.template[2];
//    var monthSeries = this.template[1];
//    var yearSeries = this.template[0];
//    var chart = $("#" + option.target).highcharts();
//    var data;
//    this._90 = function () {
//        for (var i = 0; i < this.data.length; i++) {
//            this.data[i].name = new Date(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i).toWayneString().hour;
//        }
//        data = this.data;
//        chart.addSeries({
//            name:option.kpi,
//            id:option.id,
//            type: option.type,
//            pointStart: Date.UTC(yearSeries, monthSeries, daySeries, hourSeries, secondSeries),
//            pointInterval: 3600 * 1000   ,
//            data: data
//        });
//
//    },
//        this._100 = function () {
//            for (var i = 0; i < this.data.length; i++) {
//                this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + i).toWayneString().day;
//            }
//            data = this.data;
//            chart.addSeries({
//                name:option.kpi,
//                id:option.id,
//                type: option.type,
//                pointStart: Date.UTC(yearSeries, monthSeries, daySeries),
//                pointInterval: 24 * 3600 * 1000,
//                data: data
//            });
//        },
//        this._200 = function () {
//            for (var i = 0; i < this.data.length; i++) {
//                this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i);
//                this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWayneString().day
//                    +" week"+new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWeekNumber();
//            }
//            data = this.data;
//            chart.addSeries({
//                name:option.kpi,
//                id:option.id,
//                type: option.type,
////                pointStart: Date.UTC(yearSeries, monthSeries, daySeries),
////                pointInterval: 7 * 24 * 3600 * 1000,
//                data: data
//            });
//
//        },
//        this._300 = function () {
//            for (var i = 0; i < this.data.length; i++) {
//                this.data[i].x = Date.UTC(this.template[0], parseInt(this.template[1]) + i);
//                this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + i).toWayneString().month;
//            }
//            data = this.data;
//
//            chart.addSeries({
//                name:option.kpi,
//                id:option.id,
//                type: option.type,
//                data: data
//            });
//
//        },
//        this._400 = function () {
//            for (var i = 0; i < this.data.length; i++) {
//                this.data[i].name ="quarter "+new Date(this.template[0], parseInt(this.template[1]) + 3 * i).monthToQuarter()   ;
//            }
//            data = this.data;
//
//            var first_month_in_quarter = Math.floor(parseInt(this.template[1]) / 3) * 3
//            chart.addSeries({
//                name:option.kpi,
//                id:option.id,
//                type: option.type,
//                pointStart: Date.UTC(yearSeries, first_month_in_quarter),
//                pointInterval: 2628000000 * 3,
//                data: data
//            });
//
//        },
//        this._500 = function () {
//            for (var i = 0; i < this.data.length; i++) {
//                this.data[i].name = new Date(parseInt(this.template[0]) + i, 0).toWayneString().year;
//            }
//            data = this.data;
//
//            chart.addSeries({
//                name:option.kpi,
//                id:option.id,
//                type: option.type,
//                pointStart: Date.UTC(yearSeries, 0),
//                pointInterval: 365 * 24 * 3600 * 1000,
//                data: data
//            });
//
//        }
//
//}
//
//
//
//
//
//function interval_week_special(option){
//    if(option.interval=="200"){
//        this.xAxis={
//            tickPositioner:function(){
//                var extreme=[];
//                var chart=$("#"+option.target).highcharts();
//                for(var i=0;i<chart.series.length;i++){
//                    for(var j=0;j<chart.series[i].processedXData.length;j++){
//                        extreme.push(chart.series[i].processedXData[j]);
//                    }
//                }
//                extreme.info={
//                    unitName:"week",
//                    higherRanks:{}
//                }
//                return extreme
//            }
//        }
//    }
//    else{
//        this.xAxis={
//            tickPositioner:null
//        }
//    }
//}
//
//
//
//
//
//
//var limit_pointer_condition={
//    _90:{
//        limit:36,
//        limitAction:function(chart){
//            chart.xAxis[0].update({
//                tickPositioner:function(){
//                    var extreme=[];
//                    for(var i=0;i<chart.series.length;i++){
//                        extreme.push(chart.series[i].processedXData[0]);
//                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
//                    }
//                    extreme.info={
//                        unitName:"hour",
//                        higherRanks:{}
//                    }
//                    return extreme
//                }
//            });
//        }
//    },
//    _100:{
//        limit:50,
//        limitAction:function(chart){
//            chart.xAxis[0].update({
//                tickPositioner:function(){
//                    var extreme=[];
//                    for(var i=0;i<chart.series.length;i++){
//                        extreme.push(chart.series[i].processedXData[0]);
//                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
//                    }
//                    extreme.info={
//                        unitName:"day",
//                        higherRanks:{}
//                    }
//                    return extreme
//                }
//            });
//        }
//    },
//    _200:{
//        limit:33,
//        limitAction:function(chart){
//            chart.xAxis[0].update({
//                tickPositioner:function(){
//                    var extreme=[];
//                    for(var i=0;i<chart.series.length;i++){
//                        extreme.push(chart.series[i].processedXData[0]);
//                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
//                    }
//                    extreme.info={
//                        unitName:"week",
//                        higherRanks:{}
//                    }
//                    return extreme
//                }
//            });
//        }
//    },
//    _300:{
//        limit:26,
//        limitAction:function(chart){
//            chart.xAxis[0].update({
//                tickPositioner:function(){
//                    var extreme=[];
//                    for(var i=0;i<chart.series.length;i++){
//                        extreme.push(chart.series[i].processedXData[0]);
//                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
//                    }
//                    extreme.info={
//                        unitName:"month",
//                        higherRanks:{}
//                    }
//                    return extreme
//                }
//            });
//        }
//    },
//    _400:{
//        limit:25,
//        limitAction:function(chart){
//            chart.xAxis[0].update({
//                tickPositioner:function(){
//                    var extreme=[];
//                    for(var i=0;i<chart.series.length;i++){
//                        extreme.push(chart.series[i].processedXData[0]);
//                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
//                    }
//                    extreme.info={
//                        unitName:"month",
//                        higherRanks:{}
//                    }
//                    return extreme
//                }
//            });
//        }
//    },
//    _500:{
//        limit:32,
//        limitAction:function(chart){
//            chart.xAxis[0].update({
//                tickPositioner:function(){
//                    var extreme=[];
//                    for(var i=0;i<chart.series.length;i++){
//                        extreme.push(chart.series[i].processedXData[0]);
//                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
//                    }
//                    extreme.info={
//                        unitName:"year",
//                        higherRanks:{}
//                    }
//                    return extreme
//                }
//            });
//        }
//    }
//}
