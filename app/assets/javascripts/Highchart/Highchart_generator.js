var Highchart_generator=function(option){
    this.target=option.target;
    this.init=function(){
        var $target=this.target.indexOf("#")===-1?$("#"+this.target):$(this.target);
        this.basic.title.text=option.kpi?option.kpi:null;
        this.basic.subtitle.text=option.date?option.date:null;
        this.basic.xAxis.categories=option.xArray;
        this.basic.chart.type=option.chart_type?option.chart_type:"line";
        this.basic.series=[{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }];
        if(option.height){
            this.basic.chart.height=option.height
        }
        $target.highcharts(this.basic);
    }
}
Highchart_generator.prototype.basic={
    chart: {
        borderRadius:0,
        animation: {
            duration: 800
        }
    },
    colors:[
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
    title: {
        style:{
            'fontSize':"24px",
            color:'#FFF'
        },
        margin:35,
        align:"left"
    },
    subtitle: {
        style:{
            'fontSize':"17px",
            color:'rgba(255,255,255,0.9)'
        },
        floating:true,
        y:36,
        align:"left"
    },
    credits: {
        enabled: false
    },
    exporting:{
        enabled:false
    },
    tooltip:{
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
            var name=this.series.name==="Target"?"Target":"Current";
            return '<b>'+name+'</b>'
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
            color: '#CCC'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#333'
        }
    },
    xAxis: {
        labels: {
            style: {
                color:'#eaedec',
                fontWeight:"bold"
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            enabled: false
        },
        labels: {
            style: {
                color:'rgba(255,255,255,0.6)',
                fontWeight: 'bold'
            }
        },
        tickPixelInterval: 30,
        gridLineDashStyle: 'solid',
        gridLineWidth:1,
        gridLineColor: 'rgba(255,255,255,0.6)'
    },
    plotOptions: {
        series: {
            shadow: true
        },
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    }
}