var current_status={};
current_status.init=function(){
    $("#current-date").text(format_time.current_time());
    $("#current-clock").text(format_time.current_time_clock());
    window.setInterval(function(){
        $("#current-clock").text(format_time.current_time_clock());
    },700);
    current_status.flexible();
    $(window).resize(function(){
        current_status.flexible();
    });
    init_snap();
    $("body")
        .on("click",".extra_func_btn",function(){
            var tag=$(this).attr("tag") ;
            current_status.show_extra_section(tag);
            current_status.flexible();
            if(tag==="target"){
                var a = ["higher","equal","lower"];
                $("#footer-right").find(".color-group").remove();
                var color_html,color_type;
                for(var i=0;i<3;i++){
                    color_html='<div idx='+a[i]+' class="color-group">'+
                        '<span class="color-item" style="background:#19cf22" ></span>'+
                        '<span class="color-item" style="background:#eb4848" ></span>'+
                        '<span class="color-item" style="background:#f3d02e" ></span>'+
                        '<span class="color-item" style="background:#0fd9bf" ></span>'+
                        '<span class="color-item" style="background:#c222ea" ></span>'+
                        '<span class="color-item" style="background:#3a6be7" ></span>'+
                        '<span class="color-item" style="background:#f56c22" ></span>'+
                        '</div>';
                    color_type=Report.color.ftq[a[i]];
                    $("#footer-right").append(color_html);
                    $("div[idx="+a[i]+"]").find(".color-item").each(function(index,value){
                        if($(value).css("backgroundColor")===color_type){
                            $(value).addClass("active");
                        }
                    });
                }
            }
        })
        .on("click",".current-status-target-back-btn",function(){
            current_status.btn_loader_show();
            var $target=$(this).parents(".current-status-wrapper").eq(0);
            setTimeout(function(){
                $target.css("display","none");
                $("#current-status-normal").css("display","block");
                $("#footer-right div.color-group").remove();
                current_status.loader_hide();
                Report.refresh();
            },700);
        })
        .on("click","#target-setting-footer .color-item",function(){
            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            var col = $(this).parent().attr("idx");
            var color = $(this).css("backgroundColor");
            Report.color.ftq[col]=color;

            /*refresh data*/
            models = ["CF11","CF14","CF16"];
            for(var j = 0;j<models.length;j++){
                var model = models[j];
                for(var i = 0;i<d_current_status[model].length;i++){
                    var old = parseInt(d_current_status[model][i]["Defects"]);
                    d_current_status[model][i]["Defects"] = (old+RAND.rate(1,20,0)).toString();

                    old = parseInt(d_current_status[model][i]["Pass"])
                    d_current_status[model][i]["Pass"] = (old + RAND.rate(1,80,0)).toString();

                    var rate = Math.floor(Math.random()*3-1);
                    old = parseInt(d_current_status[model][i]["FTQ"])
                    if(old+rate<100){
                        d_current_status[model][i]["FTQ"] = (old+rate).toString();
                    }
                }
            }
            Report.refresh();
        });

}
current_status.flexible=function(){
    var total_height=$("#wrap-main").height()-$("header").height()-1;
    var height=total_height-$("#current-status-header").height()-$("#snap-groups").height()-2;
    $("#data_container").height(height);
    var target_height=total_height-$("#target-wrapper-header").height()-$("#target-setting-footer").height()-2;
    $("#target_setting").height(target_height);

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
             defects.refresh_color();
         },700);
     }
    else if(tag==="all_defects"){
         setTimeout(function(){
             $("#current-status-normal").css("display","none");
             $("#current-status-all-defects").css("display","block");
             current_status.loader_hide();
         },700);
     }
    else if(tag==="key_defects"){
         setTimeout(function(){
             $("#current-status-normal").css("display","none");
             $("#current-status-key-defects").css("display","block");
             current_status.loader_hide();
         },700);
     }
}


