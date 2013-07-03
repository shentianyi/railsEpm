/////////////////////////////////////////////////////////////////////////  Analytics   //////////////////////////////////
function init_analytics() {
    $("#container").highcharts(
        {
            chart: {
                type: 'line'
            },
            credits:{
                text:"this is mine！"
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e  %b'
                }
            },
            yAxis: {
                title: {
                    text: 'amount'
                }
            },
            series: [
                {
                    type:"line",
                    name: 'target',
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    pointStart: Date.UTC(1970, 0, 1),
                    pointInterval: 24 * 3600 * 1000//one day

                },
                {
                    type:"area",
                    name: 'actual',
                    data: [21, 14,15,43,23.4,34,2,67,3],
                    pointStart: Date.UTC(1970, 0, 1),
                    pointInterval: 24 * 3600 * 1000 // one day
                }
            ]
        }
    );
}