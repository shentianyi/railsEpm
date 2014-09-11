var current_status={};
current_status.init=function(){
    $("#current-date").text(format_time.current_time());
    $("#current-clock").text(format_time.current_time_clock());
    window.setInterval(function(){
        $("#current-clock").text(format_time.current_time_clock());
    },1000);
    current_status.flexible();
    window.onresize=function(){
        current_status.flexible();
    }
    $("body")
        .on("click",".extra_func_btn",function(){
            var tag=$(this).attr("tag") ;
            current_status.show_extra_section(tag);
        })
        .on("click",".current-status-target-back-btn",function(){
            current_status.btn_loader_show();
            var $target=$(this).parents(".current-status-wrapper").eq(0);
            setTimeout(function(){
                $target.css("display","none");
                $("#current-status-normal").css("display","block");
                current_status.loader_hide();
            },1000);
        })
}
current_status.flexible=function(){
    var total_height=$("#wrap-main").height()-$("header").height()-1;
    var height=total_height-$("#current-status-header").height()-$("#snap-groups").height()-2;
    $("#data_container").height(height);

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
current_status.btn_loader_show=function(){
    current_status.loader = new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
    var left = document.getElementById("report-menu").getBoundingClientRect().right,
        top = document.getElementsByTagName("header")[0].getBoundingClientRect().bottom >= 0 ? document.getElementsByTagName("header")[0].getBoundingClientRect().bottom : 0,
        height=$("#report-content").height();
    $(".current-status-pageload-overlay svg").css('left', left);
    $(".current-status-pageload-overlay svg").css('top', top);
    $(".current-status-pageload-overlay svg").css("height",height+"px");
    current_status.loader.show();
}
current_status.show_extra_section=function(tag){
    current_status.btn_loader_show();
     if(tag==="target"){
         setTimeout(function(){
             $("#current-status-normal").css("display","none");
             $("#current-status-target").css("display","block");
             current_status.loader_hide();
         },1000);
     }
    else if(tag==="all_defects"){

     }
    else if(tag==="key_defects"){

     }
}


