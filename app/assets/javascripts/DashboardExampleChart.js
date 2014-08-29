var DashBoardExampleChart=function(option){
    this.target=option.target;
    this.init=function(){
        var $target=$("#"+this.target);
        console.log(this.basic);
        $target.highcharts(this.basic);
    }
}
DashBoardExampleChart.prototype.basic={
    chart: {
        type: 'column',
        borderRadius:0,
        animation: {
            duration: 800
        },
        backgroundColor:"rgba(255,255,255,0.0)"
    },
    colors:[
        "#9cdd00",
        "#fe7005",
        "#f6d742",
        "#00e3fe",
        "#eb68fb",
        "#f86c80",
        "#5a6d8f",
        "#51d69f",
        "#dca96c",
        "#298eed",
        "#ac1010"
    ],
    title: {
        text: 'E1',
        style:{
            'fontSize':"24px"
        },
        align:"left"
    },
    subtitle: {
        text: '2014.8.7 - 2014.8.9',
        style:{
            'fontSize':"18px"
        },
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
            return '<b>'+this.point.name+'</b>'
                +'<br />KPI: <span style="color:'+this.series.color+'">'+this.series.name
                +'</span>'
                +'<br />'+'chart.view'+': '+this.point.view
                +'<br />'+'chart.value'+' : '+this.y+" "+this.point.unit
                +"<br />"+'chart.target_range'+": "+this.point.target_min+"-"+this.point.high

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
        categories: [
            'MB',
            'VW',
            'Local',
            'Caps'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        },
        title: {
            enabled: false
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Target',
        data: [{y:300,color:"#f86c80"},200,300,200]

    }, {
        name: 'Current',
        data: [400,250,315,300]

    }]
}