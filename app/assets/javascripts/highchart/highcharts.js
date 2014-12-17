define(["base","jquery.highmaps","jquery.highcharts"],function(Base){
    Highcharts.dateFormats = {
        W: function (timestamp) {
            var d = new Date(timestamp);
            d.setHours(0, 0, 0);
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var yearStart = new Date(d.getFullYear(), 0, 1);
            var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
            return  weekNo;
        },
        YW: function (timestamp) {
            var d = new Date(timestamp);
            d.setHours(0, 0, 0);
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            return d.getFullYear();
        }
    };
    var setting_option={
        chart: {
            spacingLeft: 5,
            spacingRight: 5,
            marginTop: 30,
            animation: {
                duration: 800
            }
        },
        title:{},
        credits: {
            enabled: false
        },
        rangeSelector:{
            enabled:false
        },
        scrollbar : {
            liveRedraw : false
        },
        navigator : {
            enabled : true,
            series : {
                id : 'navigator'
            },
            adaptToUpdatedData:true,
            baseSeries:0
        },
        tooltip:{
            enabled: true,
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(96, 96, 96, .8)'],
                    [1, 'rgba(16, 16, 16, .8)']
                ]
            },
            borderWidth: 0,
            style: {
                color: '#FFF'
            },
            formatter: function() {
                return '<b>'+this.x+'</b>'
                    +'<br />Value: <span style="color:'+this.series.color+'">'+this.point.y
                    +'</span>'
            }
        },
        legend: {
            enabled: true,
            borderRadius: 2,
            borderColor: "rgba(0,0,0,0)",
            animation: true,
            maxHeight: 40,
            margin:0,
            itemMarginBottom: -2,
            itemStyle: {
                color: '#777'
            },
            itemHoverStyle: {
                color: '#bbb'
            },
            itemHiddenStyle: {
                color: '#ccc'
            }
        },
        plotOptions: {
            series: {
                shadow: true,
                animation: {
                    duration: 1000
                },
                cursor:'pointer',
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
                turboThreshold:10000,
                states: {
                    select: {
                        color: null,
                        borderColor: null
                    }
                },
                events:{

                }
            },
            column:{
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels:{
                    enabled: false,
                    inside:false,
                    color: "rgba(0,0,0,0.6)",
                    style: {
                        fontWeight: 'bold',
                        fontSize:'11px'
                    }
                }
            },
            arearange:{
                fillOpacity:0.1,
                fillColor:"rgba(177,211,221,0.2)",
                lineColor:"rgba(177,211,221,0.2)",
                color:"rgba(177,211,221,0.2)",
                stickyTracking:false,
                trackByArea:false,
                zIndex:-1,
                tooltip:{
                    tooltip:function(){
                        return false
                    }
                },
                showInLegend: false
            },
            line: {
                lineWidth:3,
                marker: {
                    lineWidth: 2,
                    radius: 4,
                    symbol: "diamond"
                },
                events: {
                    mouseOver: function () {
                        if(this.data.length>1){
                            this.graph.attr('zIndex', 99);
                        }
                    },
                    mouseOut: function () {
                        if(this.data.length>1){
                            this.graph.attr('zIndex', this.index);
                        }
                    }
                },
                dataLabels:{
                    enabled: false,
                    color:"rgba(0,0,0,0.6)",
                    style: {
                        fontWeight: 'bold',
                        fontSize:'11px'
                    },
                    align:"left"
                }
            },
            scatter: {
                marker: {
                    radius: 4,
                    symbol: "circle"
                }
            },
            area:{
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [[0, "rgba(70,174,240,1)"], [1,  "rgba(70,174,240,0.55)"]]
                },
                lineColor:"rgba(70,174,240,1)",
                marker: {
                    lineWidth: 0,
                    radius: 0
                }
            }
        },
        series:{},
        xAxis: {
            lineWidth: 0,
            tickWidth: 1,
            offset: 0,
            labels: {
                style: {
                    color:'rgba(0,0,0,0.4)',
                    fontWeight:"bold"
                }
            },
            minPadding: 0.02,
            maxPadding: 0.02,
//            minRange: 36e5,
//            type: 'datetime',
//            dateTimeLabelFormats: {
//                hour: '%H:%M' + "<br />" + '%e/%b',
//                day: '%e' + "<br />" + "%b",
//                week: "Week" + '<br />' + "%W",
//                month: '%b' + '<br />' + '%Y',
//                year: '%Y'
//            }
        },
        yAxis:[
            { // Primary yAxis
                gridLineColor: 'rgba(0,0,0,0.1)',
                gridLineDashStyle: 'solid',
                offset: -25,
                showFirstLabel: false,
                min:0,
                title: {
                    enabled: false
                },
                labels: {
                    style: {
                        color:'rgba(0,0,0,0.4)',
                        fontWeight: 'bold'
                    },
                    y:-2
                },
                tickInterval:10
            },
            { //Secondary yAxis
                labels: {
                    enabled:false,
                    format: '{value} %',
                    style: {
                        color: 'rgba(0,0,0,0.4)' }
                },
                title:{
                    enabled:false
                },
                tickInterval:10,
                opposite: true
            }
        ]
    }
    var color_template={
        template1:[
            '#97cbe4',
            '#f99c92',
            '#81dfcd',
            '#ffdb6d',
            '#82d9e7',
            '#dabeea',
            '#6485a7',
            '#f9b360',
            '#94cd7b',
            '#69b0bd'
        ],
        blue:["#97cbe4"],
        purple:["#9b65de"],
        green:["#25ad38"],
        red:["#fd0e0e"],
        darkblue:["#3c6fcc"]
    }
    function procedure(config,data,my_setting_option){
        my_setting_option.title.text=config.title?config:null;
        my_setting_option.xAxis.categories=config.categories;
        my_setting_option.colors=config.colors?color_template[config.colors]:color_template["template1"];
        if(data!==undefined){
            //arguments[1] is the data
            my_setting_option.series=data;
        }
        else{
            my_setting_option.series=config.data?config.data:{};
        }
        if(config.twoYAxis){
            my_setting_option.yAxis[1].labels.enabled=true;
            for(var key in config.twoYAxis){
                my_setting_option.yAxis[1].labels[key]=config.twoYAxis[key];
            }
        }
        if(config.column_dataLabels){
            my_setting_option.plotOptions.column.dataLabels.enabled=true;
            for(var key in config.column_dataLabels){
                my_setting_option.plotOptions.column.dataLabels[key]=config.column_dataLabels[key];
            }
        }
        if(config.line_dataLabels){
            my_setting_option.plotOptions.line.dataLabels.enabled=true;
            for(var key in config.line_dataLabels){
                my_setting_option.plotOptions.line.dataLabels[key]=config.line_dataLabels[key];
            }
        }
        if(config.special_option){
            change_attribute(my_setting_option,config.special_option);
        }
        $("#"+config.container).highcharts(my_setting_option);
        return $("#"+config.container).highcharts();
    }
    function change_attribute(original,change){
        for(var key in change){
           if(Object.prototype.toString.apply(change[key])==="[object Object]"){
               change_attribute(original[key],change[key]);
           }
            else{
               original[key]=change[key];
           }
        }
    }

    return{
        addSeries:function(highcharts,data,type,color,secondYaxis){
            if(type){
                if(Object.prototype.toString.apply(data)==="[object Array]"){
                    data={
                        data:data,
                        type:type
                    }
                }
                else{
                    data.type=type;
                }
            }
            if(color){
                if(Object.prototype.toString.apply(data)==="[object Array]"){
                    data={
                        data:data,
                        color:color_template[color][0]
                    }
                }
                else{
                    data.color=color_template[color][0];
                }
            }
            if(secondYaxis){
                if(Object.prototype.toString.apply(data)==="[object Array]"){
                    data={
                        data:data,
                        yAxis:1
                    }
                }
                else{
                    data.yAxis=1;
                }
            }
            highcharts.addSeries(data);
        },
        //for common type of chart , all parameters are optional except container and category
        line:function(config,data){
            var my_setting_option=Base.deepCopy(setting_option,{});
            my_setting_option.chart.type="line";
            var chart=procedure(config,data,my_setting_option);
            return chart;
        },
        column:function(config,data){
            var my_setting_option=Base.deepCopy(setting_option,{});
            my_setting_option.chart.type="column";
            if(config.stacking){
                my_setting_option.plotOptions.column.stacking='normal';
            }
            var chart=procedure(config,data,my_setting_option);
            return chart;
        }
    }
})