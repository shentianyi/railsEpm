var url = 'http://42.121.111.38:9002/HighChartsFileService/';

var high_chart = {
    chart: {
        zoomType: 'xy',
        spacingLeft: 5,
        spacingRight: 10,
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
    tooltip:{
        enabled: false
    },
    legend: {
        enabled: true,
        borderRadius: 2,
        borderColor: "rgba(0,0,0,0.15)",
        itemStyle: {
            color: 'rgba(0,0,0,0.25)'
        },
        animation: true,
        maxHeight: 40,
        itemMarginBottom: -2
    },
    exporting : {
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
            states: {
                select: {
                    color: null,
                    borderColor: null
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
                connectorWidth: 1,
                format: '<b>{point.name}</b><br />{point.percentage:.1f} %'
            },
            colors:[
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
            ]
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
        offset: 10,
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
//            week: '%e/%b' + "<br />" + "W" + "%W",
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
    }
}

var series_colors=[
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
]
function add_series(option) {
    var series_name = option.kpi;
    var series_id = option.id;
    var chart_container = option.target;
    var type = option.type;
    var data = deal_data(option);
    var color=series_colors[series_id % series_colors.length];
    $("#" + chart_container).highcharts().addSeries({
        name: series_name,
        id: series_id,
        color:color,
        data: data
    })
}


function set_data(option) {
    this.date = option.begin_time ? standardParse(option.begin_time).date : null,
    this.template = option.begin_time ? standardParse(option.begin_time).template : null,
    this.data = option.data;
    this.chart_container = option.target;
    this.chart = $("#" + option.target).highcharts();
    this.series_id = option.id;
    this.type = option.type;
    this.interval = option.interval;
    this.id=option.id;
    this.count=option.count;
}

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
//                this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i);
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
                this.data[i].name = "quarter " + new Date(this.template[0], parseInt(this.template[1]) + 3 * i).monthToQuarter();
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
}
function create_environment_for_data() {
    set_data.apply(this, arguments);
    var i,j;
    switch (this.interval) {
        case "90":
            high_chart.xAxis.tickPositioner = function () {
                var extreme = [];
                for( i=0;i<this.chart.series.length;i++){
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
                for( i=0;i<this.chart.series.length;i++){
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
                for( i=0;i<this.chart.series.length;i++){
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
                for( i=0;i<this.chart.series.length;i++){
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
                for( i=0;i<this.chart.series.length;i++){
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
                for( i=0;i<this.chart.series.length;i++){
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
}




function proper_type_for_chart(){
    set_data.apply(this,arguments);
    if(this.type=="pie"){
        if(this.chart.get('pie_extra_series')){
            this.chart.get('pie_extra_series').remove();
            for(var k=0;k<this.chart.series.length;k++){
                this.chart.series[k].update({
                    showInLegend:true
                },false)
            }
            this.chart.legend.group.show();
            this.chart.legend.box.show();
            this.chart.legend.display = true;
        }
        var data=[],dataItem,dataItemValue,dataItemTarget,chart_name;
        if(this.count==1){
            for(var i=0;i<this.chart.series[0].processedYData.length;i++){
                dataItem={};
                dataItem.name=this.chart.series[0].data[i].name;
                dataItem.y=this.chart.series[0].processedYData[i];
                dataItem.target=this.chart.series[0].data[i].target;
                dataItem.unit=this.chart.series[0].data[i].unit;
                data.push(dataItem);
            }
            chart_name=this.chart.series[0].name;
            this.chart.series[0].hide();
        }
        else{
            chart_name=[];
            for(var i=0;i<this.count;i++){
                this.chart.series[i].show();
                dataItem={};
                dataItemValue=0;
                dataItemTarget=0;
                dataItem.name=this.chart.series[i].name+"<br />S:"+this.chart.series[i].data[0].name+"<br />F:"+this.chart.series[i].data[this.chart.series[i].data.length-1].name;
                for(var j=0;j<this.chart.series[i].processedYData.length;j++){
                    dataItemValue+=this.chart.series[i].processedYData[j];
                    dataItemTarget+=parseFloat(this.chart.series[i].data[j].target);
                }
                dataItem.y=dataItemValue;
                dataItem.seriesId=i;
                chart_name.push(this.chart.series[i].name);
                dataItem.average_y=(dataItemValue/this.chart.series[i].processedYData.length).toFixed(2);
                dataItem.target=dataItemTarget.toFixed(2);
                dataItem.average_target=(dataItemTarget/this.chart.series[i].processedYData.length).toFixed(2);
                dataItem.time_from=this.chart.series[i].data[0].name;
                dataItem.time_to=this.chart.series[i].data[this.chart.series[i].data.length-1].name;
                dataItem.unit=this.chart.series[i].data[0].unit;
                data.push(dataItem);
                this.chart.series[i].hide();
            };
        }

        this.chart.addSeries({
            name:chart_name,
            id:'pie_extra_series',
            data:data,
            type:"pie"
        },true);
        this.chart.redraw();
        this.chart.legend.group.hide();
        this.chart.legend.box.hide();
        this.chart.legend.display = false;
    }

    else{
        if(this.chart.get('pie_extra_series')){
            this.chart.get('pie_extra_series').remove();
            for(var k=0;k<this.chart.series.length;k++){
                this.chart.series[k].update({
                    showInLegend:true
                },false)
            }
            this.chart.legend.group.show();
            this.chart.legend.box.show();
            this.chart.legend.display = true;
        }
        var p={
              name: this.chart.get(this.id).options.name,
              id: this.chart.get(this.id).options.id,
              color:this.chart.get(this.id).color,
              data: this.chart.get(this.id).options.data
        },c;
        var new_series=deepCopy(p,c);
        new_series.type=this.type;
        this.chart.get(this.id).remove(false);
        this.chart.addSeries(new_series,false)
        this.chart.redraw();
    }
}



function limit_pointer_number(){
    set_data.apply(this,arguments);
    var maxDate=this.chart.xAxis[0].getExtremes().max;
    var minDate=this.chart.xAxis[0].getExtremes().min;
    if( Math.ceil((maxDate-minDate)/this.chart.xAxis[0].closestPointRange) >= limit_pointer_condition["_"+this.interval].limit ){
        limit_pointer_condition["_"+this.interval].limitAction(this.chart)
    }
}

var limit_pointer_condition={
    _90:{
        limit:36,
        limitAction:function(chart){
            chart.xAxis[0].update({
                tickPositioner:function(){
                    var extreme=[];
                    for(var i=0;i<chart.series.length;i++){
                        extreme.push(chart.series[i].processedXData[0]);
                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
                    }
                    extreme.info={
                        unitName:"hour",
                        higherRanks:{}
                    }
                    return extreme
                }
            });
        }
    },
    _100:{
        limit:50,
        limitAction:function(chart){
            chart.xAxis[0].update({
                tickPositioner:function(){
                    var extreme=[];
                    for(var i=0;i<chart.series.length;i++){
                        extreme.push(chart.series[i].processedXData[0]);
                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
                    }
                    extreme.info={
                        unitName:"day",
                        higherRanks:{}
                    }
                    return extreme
                }
            });
        }
    },
    _200:{
        limit:33,
        limitAction:function(chart){
            chart.xAxis[0].update({
                tickPositioner:function(){
                    var extreme=[];
                    for(var i=0;i<chart.series.length;i++){
                        extreme.push(chart.series[i].processedXData[0]);
                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
                    }
                    extreme.info={
                        unitName:"week",
                        higherRanks:{}
                    }
                    return extreme
                }
            });
        }
    },
    _300:{
        limit:26,
        limitAction:function(chart){
            chart.xAxis[0].update({
                tickPositioner:function(){
                    var extreme=[];
                    for(var i=0;i<chart.series.length;i++){
                        extreme.push(chart.series[i].processedXData[0]);
                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
                    }
                    extreme.info={
                        unitName:"month",
                        higherRanks:{}
                    }
                    return extreme
                }
            });
        }
    },
    _400:{
        limit:25,
        limitAction:function(chart){
            chart.xAxis[0].update({
                tickPositioner:function(){
                    var extreme=[];
                    for(var i=0;i<chart.series.length;i++){
                        extreme.push(chart.series[i].processedXData[0]);
                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
                    }
                    extreme.info={
                        unitName:"millisecond",
                        higherRanks:{}
                    }
                    return extreme
                }
            });
        }
    },
    _500:{
        limit:32,
        limitAction:function(chart){
            chart.xAxis[0].update({
                tickPositioner:function(){
                    var extreme=[];
                    for(var i=0;i<chart.series.length;i++){
                        extreme.push(chart.series[i].processedXData[0]);
                        extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
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
}



