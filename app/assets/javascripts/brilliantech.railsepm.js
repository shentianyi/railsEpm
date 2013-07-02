/////////////////////////////////////////////////////////////////////////  Analytics   //////////////////////////////////
function init_analytics() {
    $("#container").highcharts(
        {
            chart: {
                type: 'areaspline'
            },
            credits:{
                text:"this is mine！"
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [
                {
                    name: 'wayne',
                    data: [1, 0, 4,2,3,4,10,9,2,0,1]
                }
            ]
        }
    );
}