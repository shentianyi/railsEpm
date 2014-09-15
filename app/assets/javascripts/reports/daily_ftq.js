var daily_ftq = {};

daily_ftq.chart = {};

daily_ftq.init = function(){
    var option={
        target:"chart_container",
        xArray:["Jan","Feb","Mar","Jan","Feb","Mar","Jan","Feb","Mar","Jan","Feb","Mar"],
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
    daily_ftq.flexible_init();
    $(window).resize(function(){
        daily_ftq.flexible();
    });
    init_snap();
};
daily_ftq.flexible_init=function(){
    if($("#report-menu").visible){
        var total_height = $("#wrap-main").height() - $("header").height() - 1,
            leaving_height=total_height-$("#snap-groups").height()-$("#daily-ftq-header").height()- 2,
            part_height=Math.floor(leaving_height/2-6),
            width=$("#wrap-main").width()-$("#report-menu").width()-1;
        $("#chart_container").height(part_height).width(width);
        $("#chart_container").highcharts().setSize(width, part_height);
        $("#chart_container").highcharts().setSize(width, part_height);
        $("#data_container").height(part_height);
        $("#data_container").width(width);
    }
    else{
        var width=$("#story-partial").width();
        $("#data_container").width(width);
    }
}
daily_ftq.flexible=function(){
    if($("#report-menu").visible){
        var total_height = $("#wrap-main").height() - $("header").height() - 1,
            leaving_height=total_height-$("#snap-groups").height()-$("#daily-ftq-header").height()- 2,
            part_height=Math.floor(leaving_height/2-6),
            width=$("#wrap-main").width()-$("#report-menu").width()-1;
        $("#chart_container").height(part_height).width(width);
        daily_ftq.chart.ftq_resize(width, part_height);
        $("#data_container").height(part_height);
        $("#data_container").width(width);
    }
    else{
        var width=$("#story-partial").width();
        $("#data_container").width(width);
    }
}