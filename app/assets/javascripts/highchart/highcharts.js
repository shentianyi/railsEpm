define(["jquery.highcharts"],function(){
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
        title: {
            text: null
        },
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
            enabled: true
//            formatter: function() {
//
//            }
        },
        legend: {
            enabled: false,
            borderRadius: 2,
            borderColor: "rgba(0,0,0,0)",
            itemStyle: {
                color: 'rgba(0,0,0,0.8)'
            },
            animation: true,
            maxHeight: 40,
            itemMarginBottom: -2
        },
        plotOptions: {
            series: {
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
            column:{},
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
    }
    var colors=[
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
    return{
        line:function(config){

        },
        column:function(config){

        }
    }
})