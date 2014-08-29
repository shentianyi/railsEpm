var HIGH_CHART=HIGH_CHART || {} ;
HIGH_CHART.theme={
    default:function(){
        Highcharts.setOptions({
            chart: {
                backgroundColor:"white"
            },
            legend: {
                itemStyle: {
                    color: 'rgba(0,0,0,0.8)'
                },
                itemHoverStyle: {
                    color: 'rgba(0,0,0,1)'
                },
                itemHiddenStyle: {
                    color: 'rgba(0,0,0,0.1)'
                }
            },
            tooltip: {
                backgroundColor:"rgba(255,255,255,0.7)",
                borderWidth: 0.5,
                style: {
                    color: 'rgba(0,0,0,1)'
                }
            },
            plotOptions:{
                series:{
                    shadow:false
                },
                pie:{
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
                    dataLabels:{
                        enabled:true,
                        distance:-1,
                        color:"rgba(0,0,0,0.5)",
                        connectorColor:"rgba(0,0,0,0.1)",
                        style:{
                            fontSize:"9px"
                        }
                    }
                }
            },
            exporting:{
                enabled:true
            },
            xAxis: {
                labels: {
                    style: {
                        color: "rgba(0,0,0,0.4)",
                        fontSize:"10px",
                        fontWeight:"light"
                    }
                },
                offset: -30
            },
            yAxis: {
                labels: {
//                    enabled:false,
                    style: {
                        color: "rgba(0,0,0,0.25)"
                    }
                },
                gridLineDashStyle: 'dash',
                gridLineWidth:1,
                gridLineColor:"#ddd"
            }
        });
    },
    dark:function(){
        Highcharts.setOptions({
            chart: {
                backgroundColor:"rgba(255,255,255,0.0)"
            },
            xAxis: {
                labels: {
                    style: {
                        color:'#eaedec',
                        fontWeight:"bold"
                    }
                },
                offset: -30
            },
            yAxis: {
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
            exporting:{
                enabled:false
            },
            legend: {
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
            tooltip: {
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
                }
            },
            plotOptions: {
                series: {
                    shadow: true
                },
                pie:{
//                    colors:[
//                        "#DDDF0D",
//                        "#7798BF",
//                        "#55BF3B",
//                        "#DF5353",
//                        "#aaeeee",
//                        "#ff0066",
//                        "#eeaaee",
//                        "#55BF3B",
//                        "#DF5353",
//                        "#7798BF",
//                        "#aaeeee"
//                    ],
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
                    dataLabels:{
                        enabled:true,
                        distance:-1,
//                        color:"white",
                        color:"#000",
                        connectorColor:"rgba(0,0,0,0.1)",
                        style:{
                            fontSize:"9px"
                        }
                    }
                }
            }
        });
    }
}
HIGH_CHART.chart_color={
    default:[
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
    dark:[
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
    ]
}