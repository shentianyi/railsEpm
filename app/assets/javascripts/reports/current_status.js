var current_status={};
current_status.init=function(){
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
    var height=total_height-$("#current-status-header").height()-$("#snap-groups").height()-2;
    $("#data_container").height(height);
    current_status.example_set_color();
}
current_status.loader_show=function(){
    current_status.loader = new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
    var left = document.getElementById("report-menu").getBoundingClientRect().right,
        top = document.getElementById("current-status-header").getBoundingClientRect().bottom >= 0 ? document.getElementById("current-status-header").getBoundingClientRect().bottom : 0,
        height=$("#data_container").height();
    $(".current-status-pageload-overlay svg").css('left', left);
    $(".current-status-pageload-overlay svg").css('top', top);
    $(".current-status-pageload-overlay svg").css("height",height+"px");
    current_status.loader.show();
}
current_status.loader_hide=function(){
    current_status.loader.hide();
}
current_status.example_set_color=function(){
    var $items=$("#data_container .dhx_dataview_dv-item_item");
    for(var i=0;i<$items.length;i++){
        var number=parseInt($items.eq(i).find(".left p").text());
        if(number>=89){
            $items.eq(i).find(".left p").css("color","#19cf22");
        }
        else{
            $items.eq(i).find(".left p").css("color","#eb4848");
        }
    }
}

