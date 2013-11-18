var HIGH_CHART=HIGH_CHART || {} ;
HIGH_CHART.theme={
    default:function(){
        Highcharts.setOptions({
            legend: {
                itemStyle: {
                    color: 'rgba(0,0,0,0.25)'
                }
            },
            plotOptions:{
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
            xAxis: {
                labels: {
                    style: {
                        color: "rgba(0,0,0,0.3)",
                        fontSize:"10px"
                    }
                }
            },
            yAxis: {
                gridLineColor: "rgba(0,0,0,0.1)",
                lineWidth: 1,
                tickWidth: 1,
                labels: {
                    enabled:false,
                    style: {
                        color: "rgba(0,0,0,0.25)"
                    }
                }
            }
        });
    },
    dark:function(){
        Highcharts.setOptions({
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgb(96, 96, 96)'],
                        [1, 'rgb(16, 16, 16)']
                    ]
                }
            },
            xAxis: {
                gridLineWidth: 0,
                lineColor: '#999',
                tickColor: '#999',
                labels: {
                    style: {
                        color: '#999',
                        fontSize:"10px",
                        fontWeight:"bold"
                    }
                }
            },
            yAxis: {
                alternateGridColor: null,
                minorTickInterval: null,
                gridLineColor: 'rgba(255, 255, 255, .1)',
                minorGridLineColor: 'rgba(255,255,255,0.07)',
                lineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        color: '#999',
                        fontWeight: 'bold'
                    }
                }
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
            labels: {
                style: {
                    color: '#CCC'
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
                line: {
                    dataLabels: {
                        color: '#CCC'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                spline: {
                    marker: {
                        lineColor: '#333'
                    }
                },
                scatter: {
                    marker: {
                        lineColor: '#333'
                    }
                },
                pie:{
                    colors:[
                        "#DDDF0D",
                        "#7798BF",
                        "#55BF3B",
                        "#DF5353",
                        "#aaeeee",
                        "#ff0066",
                        "#eeaaee",
                        "#55BF3B",
                        "#DF5353",
                        "#7798BF",
                        "#aaeeee"
                    ]
                }
            },
            toolbar: {
                itemStyle: {
                    color: '#CCC'
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
        "#DDDF0D",
        "#7798BF",
        "#55BF3B",
        "#DF5353",
        "#aaeeee",
        "#ff0066",
        "#eeaaee",
        "#55BF3B",
        "#DF5353",
        "#7798BF",
        "#aaeeee"
    ]
}