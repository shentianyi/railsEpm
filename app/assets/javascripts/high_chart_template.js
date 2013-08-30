function high_chart(option) {
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
                d = new Date(timestamp);
                return  d.monthToQuarter();
            },
            YW: function (timestamp) {
                var d = new Date(timestamp);
                d.setHours(0, 0, 0);
                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                return d.getFullYear();
            }
        }
        this.chart = {
            zoomType: 'xy',
            spacingLeft: 5,
            spacingRight: 10,
            renderTo: option.target
        },
        this.title = {
            text: null
        },
        this.tooltip = {
            enabled: false,
            xDateFormat: option.interval_template.tooltip.xDateFormat,
            formatter: option.interval_template.tooltip.formatter
        },
        this.credits = {
            enabled: false
        },
        this.colors = [
            'rgba(245,161,51,0.7)',
            'rgba(52,152,219,0.7)',
            'rgba(205,208,164,0.7)',
            'rgba(231,76,60,0.7)',
            'rgba(26,188,156,0.7)',
            'rgba(241,196,15,0.7)',
            'rgba(149,165,166,0.7)',
            'rgba(103,116,210,0.7)',
            'rgba(219,88,168,0.7)',
            'rgba(53,200,209,0.7)'
        ],
        this.legend = {
            enabled: true,
            borderRadius: 2,
            borderColor: "rgba(0,0,0,0.15)",
            itemStyle: {
                color: 'rgba(0,0,0,0.25)'
            },
            animation: true,
            maxHeight: 40
        },
        this.plotOptions = {
            series: {
                marker: {
                    enabled: true,
                    fillColor: null,
                    lineColor: "white"
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
            scatter: {
                marker: {
                    radius: 4,
                    symbol: "circle"
                }
            }
        },
        this.xAxis = {
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
//            startOfWeek: option.interval_week_special.xAxis.startOfWeek,
            maxZoom: option.interval_template.xAxis.maxZoom,
            type: option.interval_template.xAxis.type,
            dateTimeLabelFormats: option.interval_template.xAxis.dateTimeLabelFormats,
            tickInterval: option.interval_template.xAxis.tickInterval,
            categories: option.interval_template.xAxis.categories
        },
        this.yAxis = {
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
var interval_template = {
    _90: {
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                hour: '%H:%M' + "<br />" + '%e/%b'
            },
            tickInterval: 3600 * 1000
        }

    },
    _100: {
        tooltip: {
            xDateFormat: '%Y-%m-%d'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e' + "<br />" + "%b"
            },
            tickInterval: 24 * 3600 * 1000,
            maxZoom:  3600 * 1000
        }
    },
    _200: {
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    "数值 " + this.y + '<br />' + this.x;
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                week: '%e/%b' + "<br />" + "W" + "%W"
            },
            tickInterval: 7 * 24 * 3600 * 1000,
            maxZoom:  3600 * 1000
        }

    },
    _300: {
        tooltip: {
            xDateFormat: '%YW-week %W'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%b' + '<br />' + '%Y'
            },
            tickInterval: 2628000000,
            maxZoom:  24 * 3600 * 1000
        }
    },
    _400: {

        tooltip: {
            xDateFormat: '%Y-quarter %Q'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: "quarter " + '%Q' + '<br />' + '%Y'
            },
            tickInterval: 2628000000 * 3,
            maxZoom:  24 * 3600 * 1000
        }
    },
    _500: {

        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    "数值 " + this.y + '<br />' + this.x;
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                year: '%Y'
            },
            tickInterval: 365 * 24 * 3600 * 1000,
            maxZoom:  24 * 3600 * 1000
        }
    }
}

function data_template(option) {
    this.date = (standardParse(option.begin_time)).date,
    this.template = (standardParse(option.begin_time)).template,
    this.data = option.data;
    var secondSeries = this.template[4];
    var hourSeries = this.template[3];
    var daySeries = this.template[2];
    var monthSeries = this.template[1];
    var yearSeries = this.template[0];
    var chart = $("#" + option.target).highcharts();
    var data;
    this._90 = function () {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].name = new Date(this.template[0], this.template[1], this.template[2], parseInt(this.template[3]) + i).toWayneString().hour;
        }
        data = this.data;
        chart.addSeries({
            name:option.kpi,
            id:option.kpi,
            type: option.type,
            pointStart: Date.UTC(yearSeries, monthSeries, daySeries, hourSeries, secondSeries),
            pointInterval: 3600 * 1000   ,
            data: data
        });

    },
        this._100 = function () {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + i).toWayneString().day;
            }
            data = this.data;
            chart.addSeries({
                name:option.kpi,
                id:option.kpi,
                type: option.type,
                pointStart: Date.UTC(yearSeries, monthSeries, daySeries),
                pointInterval: 24 * 3600 * 1000,
                data: data
            });
        },
        this._200 = function () {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].x = Date.UTC(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i);
                this.data[i].name = new Date(this.template[0], this.template[1], parseInt(this.template[2]) + 7 * i).toWayneString().day;
            }
            data = this.data;

            chart.addSeries({
                name:option.kpi,
                id:option.kpi,
                type: option.type,
//                pointStart: Date.UTC(yearSeries, monthSeries, daySeries),
//                pointInterval: 7 * 24 * 3600 * 1000,
                data: data
            });

        },
        this._300 = function () {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].x = Date.UTC(this.template[0], parseInt(this.template[1]) + i);
                this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + i).toWayneString().month;
            }
            data = this.data;

            chart.addSeries({
                name:option.kpi,
                id:option.kpi,
                type: option.type,
                data: data
            });

        },
        this._400 = function () {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].name = new Date(this.template[0], parseInt(this.template[1]) + 3 * i).toWayneString().month;
            }
            data = this.data;

            var first_month_in_quarter = Math.floor(parseInt(this.template[1]) / 3) * 3
            chart.addSeries({
                name:option.kpi,
                id:option.kpi,
                type: option.type,
                pointStart: Date.UTC(yearSeries, first_month_in_quarter),
                pointInterval: 2628000000 * 3,
                data: data
            });

        },
        this._500 = function () {
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].name = new Date(parseInt(this.template[0]) + i, 0).toWayneString().year;
            }
            data = this.data;

            chart.addSeries({
                name:option.kpi,
                id:option.kpi,
                type: option.type,
                pointStart: Date.UTC(yearSeries, 0),
                pointInterval: 365 * 24 * 3600 * 1000,
                data: data
            });

        }

}





//function interval_week_special(date_time,interval){
//    if(interval=="200"){
//        this.date = (standardParse(date_time)).date;
//        this.xAxis={
//            startOfWeek:this.date.getDay()
//        }
//    }
//    else{
//        this.xAxis={
//            startOfWeek:undefined
//        }
//    }
//}






var limit_pointer_condition={
    _90:{
        limit:36,
        limitAction:function(chart){
            var extreme=[];
            for(var i=0;i<chart.series.length;i++){
                extreme.push(chart.series[i].processedXData[0]);
                extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
            }
            chart.xAxis[0].update({
                labels: {
                    formatter: function() {
                        for(var j=0;j<extreme.length;j++){
                            if(this.value==extreme[j]){
                                return Highcharts.dateFormat('%H:%M' + "<br />" + '%e/%b', this.value)
                            }
                        }
                    }
                }
            });
        }
    },
    _100:{
        limit:50,
        limitAction:function(chart){
            var extreme=[];
            for(var i=0;i<chart.series.length;i++){
                extreme.push(chart.series[i].processedXData[0]);
                extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
            }
            chart.xAxis[0].update({
                labels: {
                    formatter: function() {
                        for(var j=0;j<extreme.length;j++){
                            if(this.value==extreme[j]){
                                return Highcharts.dateFormat('%e' + "<br />" + "%b", this.value)
                            }
                        }
                    }
                }
            });
        }
    },
    _200:{
        limit:33,
        limitAction:function(chart){
            var extreme=[];
            for(var i=0;i<chart.series.length;i++){
                extreme.push(chart.series[i].processedXData[0]);
                extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
            }
            console.log(extreme)
            chart.xAxis[0].update({
                labels: {
                    formatter: function() {
                        console.log(this.value)
                        for(var j=0;j<extreme.length;j++){
                            if(this.value==extreme[j]){
                                return Highcharts.dateFormat('%e/%b' + "<br />" + "W" + "%W", this.value)
                            }

                        }
                    }
                }
            });
        }
    },
    _300:{
        limit:26,
        limitAction:function(chart){
            var extreme=[];
            for(var i=0;i<chart.series.length;i++){
                extreme.push(chart.series[i].processedXData[0]);
                extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
            }
            chart.xAxis[0].update({
                labels: {
                    formatter: function() {
                        for(var j=0;j<extreme.length;j++){
                            if(this.value==extreme[j]){
                                return Highcharts.dateFormat('%b' + '<br />' + '%Y', this.value)
                            }
                        }
                    }
                }
            });
        }
    },
    _400:{
        limit:25,
        limitAction:function(chart){
            var extreme=[];
            for(var i=0;i<chart.series.length;i++){
                extreme.push(chart.series[i].processedXData[0]);
                extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
            }
            chart.xAxis[0].update({
                labels: {
                    formatter: function() {
                        for(var j=0;j<extreme.length;j++){
                            if(this.value==extreme[j]){
                                return Highcharts.dateFormat("quarter " + '%Q' + '<br />' + '%Y', this.value)
                            }
                        }
                    }
                }
            });
        }
    },
    _500:{
        limit:32,
        limitAction:function(chart){
            var extreme=[];
            for(var i=0;i<chart.series.length;i++){
                extreme.push(chart.series[i].processedXData[0]);
                extreme.push(chart.series[i].processedXData[chart.series[i].processedXData.length-1]);
            }
            chart.xAxis[0].update({
                labels: {
                    formatter: function() {
                        for(var j=0;j<extreme.length;j++){
                            if(this.value==extreme[j]){
                                return Highcharts.dateFormat('%Y', this.value)
                            }
                        }
                    }
                }
            });
        }
    }
}