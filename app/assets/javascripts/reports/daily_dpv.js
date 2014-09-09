var daily_dpv={};
daily_dpv.init=function(){
    var option_one={
        target:"chart_dpv_one",
        xArray:["iQ1","iQ2","iQ IP","iQ DR","iQ3","iQ4","iQ5","iQ6","iQ7","iQ8","iQ9","iQ10","iQ11","iQ12","iQ13","iQ14","iQ15"],
        height:$("#chart_dpv_one").height(),
        data:[{
            name: 'DPV',
            data: [3.5,0.0,0.1,9.0,0.0,3.1,2.2,0.0,0.0,0.0,4.3,24.8,0.0,1.0,0.2,1.1,0.7]
        }],
        title:"DPV"
    };
    var chart_one=new Highchart_generator(option_one);
    chart_one.init_daily_dpv();

    var option_two={
        target:"chart_dpv_two",
        xArray:["iQ1","iQ2","iQ IP","iQ DR","iQ3","iQ4","iQ5","iQ6","iQ7","iQ8","iQ9","iQ10","iQ11","iQ12","iQ13","iQ14","iQ15"],
        height:$("#chart_dpv_two").height(),
        data:[{
            name: 'SDPV',
            data: [13.5,0.0,0.1,29.0,0.0,8.4,8.2,0.0,0.0,0.0,28.6,75.7,0.0,8.4,1.1,3.6,6.0]
        }],
        color:"purple",
        title:"SDPV"
    };
    var chart_two=new Highchart_generator(option_two);
    chart_two.init_daily_dpv();
    daily_dpv.flexible();
    window.onresize=function(){
        daily_dpv.flexible();
    }
}
daily_dpv.flexible=function(){
    var total_height=$("#wrap-main").height()-$("header").height()-1;
    var height=total_height-$("#chart_dpv_one").height()-$("#chart_dpv_two").height()-2;
    $("#data_container").width($("#report-content .left").width());
    $("#data_container").height(height);
}