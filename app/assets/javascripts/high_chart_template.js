function high_chart(target,type_template,interval_template){
    this.chart={
        zoomType:'xy',
        renderTo:target,
        type:type_template.type
    },
    this.title={
        text:null
    },
    this.tooltip={
        xDateFormat:interval_template.tooltip.xDateFormat,
        formatter:interval_template.tooltip.formatter
    },
    this.credits={
        enabled:false
    },
    this.colors= type_template.colors,
        this.legend={
        enabled:false
    },
    this.plotOptions= {
        series: {
            marker: {
                enabled: true,
                fillColor: null,
                lineWidth: type_template.plotOptions.series.marker.lineWidth,
                lineColor: "white",
                radius:type_template.plotOptions.series.marker.radius,
                symbol:type_template.plotOptions.series.marker.symbol
            }
        }
    },
    this.xAxis= {
        lineWidth:0,
        type:interval_template.xAxis.type,
        dateTimeLabelFormats:interval_template.xAxis.dateTimeLabelFormats,
        tickInterval:interval_template.xAxis.tickInterval,
        categories:interval_template.xAxis.categories
    },
    this.yAxis= {
        gridLineColor: '#ddd',
        gridLineDashStyle:'Dot',
        offset: -20,
        title:{
            enabled:false
        }
    },
    this.series={
        pointStart:interval_template.series.pointStart,
        pointInterval:interval_template.series.pointInterval
    }
}


var type_template={
    line:{
        type:"line",
        colors:[
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
        plotOptions:{
            series:{
                marker:{
                    lineWidth: 2,
                    radius:4,
                    symbol:"diamond"
                }
            }
        }
    },
    column:{
        type:"column",
        colors:[
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
        plotOptions:{
            series:{
                marker:{
                    lineWidth: 2,
                    radius:4,
                    symbol:"diamond"
                }
            }

        }
    },
    pie:{
        type:"pie",
        colors:[
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
        plotOptions:{
            series:{
                marker:{
                    lineWidth: 2,
                    radius:4,
                    symbol:"diamond"
                }
            }

        }
    },
    scatter:{
        type:"scatter",
        colors:[
            'rgba(245,161,51,0.4)',
            'rgba(52,152,219,0.4)',
            'rgba(205,208,164,0.4)',
            'rgba(231,76,60,0.4)',
            'rgba(26,188,156,0.4)',
            'rgba(241,196,15,0.4)',
            'rgba(149,165,166,0.4)',
            'rgba(103,116,210,0.4)',
            'rgba(219,88,168,0.4)',
            'rgba(53,200,209,0.4)'
        ],
        plotOptions:{
            series:{
                marker:{
                    lineWidth: 2,
                    radius:5,
                    symbol:"circle"
                }
            }

        }
    }
}


var interval_template={
    "90":{

    },
    "100":{

    },
    "200":{

    },
    "300":{

    },
    "400":{

    },
    "500":{

    }
}