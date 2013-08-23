var high_chart={
    chart: {
        zoomType:'xy'
    },
    title:{
        text:null
    },
    credits:{
        enabled:false
    },
    colors: [
        'rgba(245,161,51,0.7)',
        'rgba(69,159,210,0.7)',
        'rgba(71,230,79,0.7)',
        'rgba(247,55,55,0.7)',
        '#1aadce',
        '#492970',
        '#f28f43',
        '#77a1e5',
        '#c42525',
        '#a6c96a'
    ],
    legend:{
        enabled:false
    },
    plotOptions: {
        series: {
            marker: {
                enabled: true,
                fillColor: null,
                lineWidth: 2,
                lineColor: "white"

            }
        }
    },
    xAxis: {
        lineWidth:0
    },
    yAxis: {
        gridLineColor: '#ddd',
        gridLineDashStyle:'Dot',
        offset: -20,
        title:{
            enabled:false
        }
    },
    high_chart:function(option){
       $(option.target).highcharts({
           chart: {
               zoomType:this.chart.zoomType,
               type:option.chart.type,
               height:option.chart.height
           },
           title:{
               text:this.title.text
           },
           credits:{
               enabled:this.credits.enabled
           },
           colors:this.colors,
           legend:{
               enabled:this.legend.enabled
           },
           plotOptions: {
               series: {
                   marker: {
                       enabled: this.plotOptions.series.marker.enabled,
                       fillColor: this.plotOptions.series.marker.fillColor,
                       lineWidth: this.plotOptions.series.marker.lineWidth,
                       lineColor: this.plotOptions.series.marker.lineColor
                   }
               }
           },
           xAxis: {
               lineWidth:this.xAxis.lineWidth
           },
           yAxis: {
               gridLineColor: this.yAxis.gridLineColor,
               gridLineDashStyle:this.yAxis.gridLineDashStyle,
               offset: this.yAxis.offset,
               title:{
                   enabled:this.yAxis.title.enabled
               }
           }
       })
    }
}