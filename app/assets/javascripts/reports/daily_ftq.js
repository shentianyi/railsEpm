var daily_ftq = {};

daily_ftq.chart = {};

daily_ftq.init = function(){
    var option={
        target:"chart_container",
        xArray:["Jan","Feb","Mar","Jan","Feb","Mar","Jan","Feb","Mar","Jan","Feb","Mar"],
        height:"300",
        title:"Quality Buyoff station Vehicle status",
        data:{
            nok:{
                name:"NOK Vehicle",
                data:[0,0,0,7,8,0,0,0,0,6,11,11,14,6,0,4,0]
            },
            ok:{
                name:"OK Vehicle",
                data:[0,0,10,1,0,0,9,2,8,6,0,0,1,4,6,1,1]
            },
            ftq:{
                name:"FTQ",
                data:[0,0,100,13,0,0,100,100,100,50,0,0,7,40,100,20,100]
            }
        }
    }
    var chart=new Highchart_generator(option);
    chart.init_daily_ftq();
    daily_ftq.chart = chart;
    /*
    setInterval(function(){
        var option={
            xArray:["Jan","Feb","Mar","Jan","Feb","Mar","Jan","Feb","Mar","Jan","Feb","Mar"],
            data:{
                nok:{
                    data:[0,0,0,7,8,0,0,0,0,6,11,11,14,6,0,4,0]
                },
                ok:{
                    data:[0,0,10,1,0,0,9,2,8,6,0,0,1,4,6,1,1]
                },
                ftq:{
                    data:[0,0,100,13,0,0,100,100,100,50,0,0,7,40,100,20,100]
                }
            }
        }
        chart.reload_daily_ftq(option);
    },5000);
    */
};