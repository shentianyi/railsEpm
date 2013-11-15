var ANALYTICS=ANALYTICS||{};
ANALYTICS.form_chart=function(option){
    var url = 'http://42.121.111.38:9002/HighChartsFileService/';
    var high_chart = {
        chart: {
            spacingLeft: 5,
            spacingRight: 5,
            marginTop: 30,
            animation: {
                duration: 800
            }
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        rangeSelector:{
            enabled:false
        },
        tooltip:{
//            formatter: function() {
//                console.log(this)
//                    if(this.series.type=="column"){
//                        return '<b>'+this.point.name+'</b>'
//                            +'<br />Value: '+this.y
//                            +"<br />Target Range: "+this.point.target_min+"-"+this.point.high
//                    }
//                    else{
//                        return '<b>'+this.point.name+'</b>'
//                            +'<br />Value: '+this.y
//                            +"<br />Target Range: "+this.point.low+"-"+this.point.high
//                    }

//            }
        },
        legend: {
            enabled: true,
            borderRadius: 2,
            borderColor: "rgba(0,0,0,0)",
            itemStyle: {
                color: 'rgba(0,0,0,0.25)'
            },
            animation: true,
            maxHeight: 40,
            itemMarginBottom: -2
        },
        exporting : {
            buttons:{
                contextButton:{
//               symbol:'url(images/down.png)'
                    symbol:'url(/assets/down.png)'
                }
            },
            url : url,
            filename : 'MyChart',
            width : 700, // chart width
            exportTypes : ['chart', 'png', 'jpeg', 'pdf', 'svg', 'doc', 'docx', 'pptx', 'xls', 'xlsx'] // set download file type
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 1000
                },
                cursor:'pointer',
                point:{
                    events:{
                        click:function(){
                            chart_point_click(this);
                        }
                    }
                },
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
                }

            },
            scatter: {
                marker: {
                    radius: 4,
                    symbol: "circle"
                }
            }
        },
        xAxis: {
            lineWidth: 0,
            tickWidth: 0,
            offset: 5,
            ordinal: true,
            labels: {
                style: {
                    color: "rgba(0,0,0,0.4)"
                }
            },
            minPadding: 0.02,
            maxPadding: 0.02,
            minRange: 36e5,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: "quarter " + '%Q' + '<br />' + '%Y',
                hour: '%H:%M' + "<br />" + '%e/%b',
                day: '%e' + "<br />" + "%b",
                week: "Week" + '<br />' + "%W",
                month: '%b' + '<br />' + '%Y',
                year: '%Y'
            }

        },
        yAxis: {
            gridLineColor: '#ddd',
            gridLineDashStyle: 'Dot',
            offset: -25,
            showFirstLabel: false,
            min:0,
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
    };
    var series_colors=[
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
    ];
    function set_data(option) {
        this.date = option.begin_time ? standardParse(option.begin_time).date : null;
        this.template = option.begin_time ? standardParse(option.begin_time).template : null;
        this.data = option.data ? option.data:null;
        this.chart_container = option.target ? option.target:null;
        this.chart = option.target ? $("#" + option.target).highcharts() : null;
        this.series_id = option.id!==null ? option.id:null;
        this.type = option.type ? option.type:null;
        this.interval = option.interval ? option.interval:null;
        this.id=option.id!==null ? option.id : null;
        this.count=option.count ? option.count:null;
    };
    function render_to(option) {
        high_chart.chart.renderTo = option.target;
        Highcharts.dateFormats = {
            W: function (timestamp) {
                var d = new Date(timestamp);
                d.setHours(0, 0, 0);
                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                var yearStart = new Date(d.getFullYear(), 0, 1);
                var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
                return  weekNo;
            },
            Q: function (timestamp) {
                var d = new Date(timestamp);
                return  d.monthToQuarter();
            },
            YW: function (timestamp) {
                var d = new Date(timestamp);
                d.setHours(0, 0, 0);
                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                return d.getFullYear();
            }
        };
    };
    function create_environment_for_data() {
        set_data.apply(this, arguments);
        var i,j;
        switch (this.interval) {
            case "90":
                high_chart.xAxis.tickPositioner = function () {
                    var extreme = [];
                    for( i=0;i<this.chart.series.length-1;i++){
                        for( j=0;j<this.chart.series[i].processedXData.length;j++){
                            extreme.push(this.chart.series[i].processedXData[j]);
                        }
                    }
                    extreme.info = {
                        unitName: "hour",
                        higherRanks: {}
                    };
                    return extreme
                }
                break;
            case "100":
                high_chart.xAxis.tickPositioner = function () {
                    var extreme = [];
                    for( i=0;i<this.chart.series.length-1;i++){
                        for( j=0;j<this.chart.series[i].processedXData.length;j++){
                            extreme.push(this.chart.series[i].processedXData[j]);
                        }
                    }
                    extreme.info = {
                        unitName: "day",
                        higherRanks: {}
                    };
                    return extreme
                }
                break;
            case "200":
                high_chart.xAxis.tickPositioner = function () {
                    var extreme = [];
                    for( i=0;i<this.chart.series.length-1;i++){
                        for( j=0;j<this.chart.series[i].processedXData.length;j++){
                            extreme.push(this.chart.series[i].processedXData[j]);
                        }
                    }
                    extreme.info = {
                        unitName: "week",
                        higherRanks: {}
                    };
                    return extreme
                }
                break;
            case "300":
                high_chart.xAxis.tickPositioner = function () {
                    var extreme = [];
                    for( i=0;i<this.chart.series.length-1;i++){
                        for( j=0;j<this.chart.series[i].processedXData.length;j++){
                            extreme.push(this.chart.series[i].processedXData[j]);
                        }
                    }
                    extreme.info = {
                        unitName: "month",
                        higherRanks: {}
                    };
                    return extreme
                }
                break;
            case "400":
                high_chart.xAxis.tickPositioner = function () {
                    var extreme = [];
                    for( i=0;i<this.chart.series.length-1;i++){
                        for( j=0;j<this.chart.series[i].processedXData.length;j++){
                            extreme.push(this.chart.series[i].processedXData[j]);
                        }
                    }
                    extreme.info = {
                        unitName: "millisecond",
                        higherRanks: {}
                    };
                    return extreme
                }
                break;
            case "500":
                high_chart.xAxis.tickPositioner = function () {
                    var extreme = [];
                    for( i=0;i<this.chart.series.length-1;i++){
                        for( j=0;j<this.chart.series[i].processedXData.length;j++){
                            extreme.push(this.chart.series[i].processedXData[j]);
                        }
                    }
                    extreme.info = {
                        unitName: "year",
                        higherRanks: {}
                    };
                    return extreme
                }
                break;
        }
    };
    function add_series(option) {
        var series_name = option.kpi;
        var series_id = option.id;
        var chart_container = option.target;
        var data = deal_data(option);
        var color=option.color?option.color:series_colors[series_id % series_colors.length];
        $("#" + chart_container).highcharts().addSeries({
            name: series_name,
            id: series_id,
            color:color,
            data: data
        })
    };
    function deal_data() {
        set_data.apply(this, arguments);
        var i;
        var data = this.data;
        switch (this.interval) {
            case "90":
                for (i = 0; i < data.length; i++) {
                    data[i].x = Date.UTC(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i);
                    data[i].name = new Date(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i).toWayneString().hour;
                }
                return data;
                break;
            case "100":
                for (i = 0; i < this.data.length; i++) {
                    this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + i);
                    this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + i).toWayneString().day;
                    ;
                }
                return data;
                break;
            case "200":
                for (i = 0; i < this.data.length; i++) {
                    var week_template=standardParse(last_date_of_week(Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i)).date.toWayneString().day).template;
                    this.data[i].x = Date.UTC(week_template[0], week_template[1], week_template[2]);
                    this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWayneString().day
                        + " week" + new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWeekNumber();
                }
                return data;
                break;
            case "300":
                for (i = 0; i < this.data.length; i++) {
                    this.data[i].x = Date.UTC(this.template[0], parseInt(this.template[1]) + i);
                    this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + i).toWayneString().month;
                }
                return data;
                break;
            case "400":
                for (i = 0; i < this.data.length; i++) {
                    var first_month_of_quarter=Math.floor(parseInt(this.template[1])/3)*3
                    this.data[i].x = Date.UTC(this.template[0], first_month_of_quarter + 3 * i);
                    this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + 3 * i).getFullYear()+" quarter " + new Date(this.template[0], parseInt(this.template[1]) + 3 * i).monthToQuarter();
                }
                return data;
                break;
            case "500":
                for (i = 0; i < this.data.length; i++) {
                    this.data[i].x = Date.UTC(parseInt(this.template[0]) + i, 0);
                    this.data[i].name = new Date(parseInt(this.template[0]) + i, 0).toWayneString().year;
                }
                return data;
                break;
        }
    };
    function proper_type_for_chart(){
        set_data.apply(this,arguments);
            var p={
                name: this.chart.get(this.id).options.name,
                id: this.chart.get(this.id).options.id,
                color:this.chart.get(this.id).color,
                data: this.chart.get(this.id).options.data
            },c;
            var new_series=deepCopy(p,c);
            if(this.type=="column"){
                for(var i=0;i<new_series.data.length;i++){
                    new_series.data[i].target_min=new_series.data[i].low;
                    new_series.data[i].low=0
                }
            }
            else{
                if(new_series.data[0].target_min!==undefined){
                    for(var i=0;i<new_series.data.length;i++){
                        new_series.data[i].low=new_series.data[i].target_min;
                    }
                }
            }
            new_series.type=this.type;
            this.chart.get(this.id).remove(false);
            this.chart.addSeries(new_series,false);
            this.chart.redraw();
    };
    if(option.chart_body_close_validate){
        show_chart_body(option);
        render_to(option);
//        create_environment_for_data(option);
        new Highcharts.StockChart(high_chart);
    }
    add_series(option);
    proper_type_for_chart(option);
}
ANALYTICS.chartSeries = {
    count: 0,
    id_count:0,
    id:0,
    series: [],
    id_array:[],
    id_give:function(){
        if(this.count>this.id_array.length){
            this.id=this.id_count;
            this.id_array.push(this.id_count);
            this.id_count++;
        }
        else{
            var array=this.id_array, i,index;
            for(i=0;i<array.length;i++){
                if(array[i]===undefined){
                    array[i]=i;
                    index=i;
                    break
                }
            }
            this.id=index;
        }
    },
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
        if(this.count>this.series.length){
            this.series.push(series)
        }
        else{
            var series_array=this.series,i;
            for(i=0;i<series_array.length;i++){
                if(series_array[i]===undefined){
                    series_array[i]=series;
                    break;
                }
            }
        }

    }
};

