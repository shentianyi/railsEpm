var current_status={};
current_status.init=function(data){
//    DV.init(container_id);
//    DV.parse(data["Vehicle_1"]);
//    $("#vechile-select").change(function () {
//        DV.clear();
//        var a = $("#vechile-select option:selected").text();
//        DV.parse(vdata[a]);
//    });
    $("#current-date").text(format_time.current_time());
    $("#current-clock").text(format_time.current_time_clock());
    window.setInterval(function(){
        $("#current-clock").text(format_time.current_time_clock());
    },1000);
    current_status.flexible();
    window.onresize=function(){
        current_status.flexible();
    }
}
current_status.flexible=function(){
    var total_height=$("#wrap-main").height()-$("header").height()-1;
    var height=total_height-$("#current-status-header").height()-$("#current-snap-group").height()-2;
    $("#data_container").height(height);
}
