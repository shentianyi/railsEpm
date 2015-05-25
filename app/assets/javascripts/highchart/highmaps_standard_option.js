define({
    setting_option:{
        chart: {

        },
        credits:{
            enabled:false
        },
        title: {
            text:""
        },
        xAxis: {
            lineColor:"rgba(0,0,0,0)",
            tickWidth: 0
        },
        yAxis: {
            title: null,
            gridLineColor:"rgba(0,0,0,0)"
        },
        colorAxis: {
            stops: [
                [0, 'rgb(244,109,67)'],
                [0.5, 'rgb(255,255,191)'],
                [1, 'rgb(102,189,99)']
            ],
            min: 0,
            max:100
        },
        tooltip: {
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            }
        },
        plotOptions:{
            heatmap:{
                borderWidth: 1,
                borderColor:"rgba(0,0,0,0.3)",
                dataLabels: {
                    enabled: true,
                    color: '#222',
                    style: {
                        textShadow: 'none',
                        HcTextStroke: null
                    },
                    formatter:function(){
                        return "<span class='w'>"+this.point.name+"</span><br />"
                            +"<b>"+this.point.value+"</b>"
                    }
                }
            }
        },
        series: [{

        }]
    }
})