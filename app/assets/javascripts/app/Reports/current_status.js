define(["jquery","dhtmlx.dataview","./share","../../func-module/format_time","svgLoader","./current_status_data"],function($,Dataview,Share,format_time){
      var template={};
      Dataview.init(template);

//    function show_extra_section(tag){
//        btn_loader_show();
//        if(tag==="target"){
//            setTimeout(function(){
//                $("#current-status-normal").css("display","none");
//                $("#current-status-target").css("display","block");
//                loader_hide();
//                Data.refresh_color();
//            },700);
//        }
//        else if(tag==="all_defects"){
//            setTimeout(function(){
//                $("#current-status-normal").css("display","none");
//                $("#current-status-all-defects").css("display","block");
//                loader_hide();
//            },700);
//        }
//        else if(tag==="key_defects"){
//            setTimeout(function(){
//                $("#current-status-normal").css("display","none");
//                $("#current-status-key-defects").css("display","block");
//                loader_hide();
//            },700);
//        }
//    }
//    function btn_loader_show(){
//        current_status_loader = new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
//        var left = document.getElementById("report-menu").getBoundingClientRect().right,
//            top = document.getElementsByTagName("header")[0].getBoundingClientRect().bottom >= 0 ? document.getElementsByTagName("header")[0].getBoundingClientRect().bottom : 0,
//            height=$("#report-content").height();
//        $(".current-status-pageload-overlay svg").css('left', left);
//        $(".current-status-pageload-overlay svg").css('top', top);
//        $(".current-status-pageload-overlay svg").css("height",height+"px");
//        current_status_loader.show();
//    }
//    function loader_hide(){
//        current_status_loader.hide();
//    }
//    function self_init(){
//        //set the date
//        $("#current-date").text(format_time.current_time());
//        $("#current-clock").text(format_time.current_time_clock());
//        window.setInterval(function(){
//            $("#current-clock").text(format_time.current_time_clock());
//        },1000);
//
//        $("body")
//            .on("click",".extra_func_btn",function(){
//                var tag=$(this).attr("tag") ;
//                show_extra_section(tag);
//                if(tag==="target"){
//                    var a = ["higher","equal","lower"];
//                    $("#footer-right").find(".color-group").remove();
//                    var color_html,color_type;
//                    for(var i=0;i<3;i++){
//                        color_html='<div idx='+a[i]+' class="color-group">'+
//                            '<span class="color-item" style="background:#19cf22" ></span>'+
//                            '<span class="color-item" style="background:#eb4848" ></span>'+
//                            '<span class="color-item" style="background:#f3d02e" ></span>'+
//                            '<span class="color-item" style="background:#0fd9bf" ></span>'+
//                            '<span class="color-item" style="background:#c222ea" ></span>'+
//                            '<span class="color-item" style="background:#3a6be7" ></span>'+
//                            '<span class="color-item" style="background:#f56c22" ></span>'+
//                            '</div>';
//                        color_type=Report.color.ftq[a[i]];
//                        $("#footer-right").append(color_html);
//                        $("div[idx="+a[i]+"]").find(".color-item").each(function(index,value){
//                            if($(value).css("backgroundColor")===color_type){
//                                $(value).addClass("active");
//                            }
//                        });
//                    }
//                }
//            })
//            .on("click",".current-status-target-back-btn",function(){
//                current_status.btn_loader_show();
//                var $target=$(this).parents(".current-status-wrapper").eq(0);
//                setTimeout(function(){
//                    $target.css("display","none");
//                    $("#current-status-normal").css("display","block");
//                    $("#footer-right div.color-group").remove();
//                    current_status.loader_hide();
//                    Report.refresh();
//                },700);
//            })
//            .on("click","#target-setting-footer .color-item",function(){
//                $(this).siblings().removeClass("active");
//                $(this).addClass("active");
//
//                var col = $(this).parent().attr("idx");
//                var color = $(this).css("backgroundColor");
//                Report.color.ftq[col]=color;
//
//                /*refresh data*/
//                models = ["CF11","CF14","CF16"];
//                for(var j = 0;j<models.length;j++){
//                    var model = models[j];
//                    for(var i = 0;i<d_current_status[model].length;i++){
//                        var old = parseInt(d_current_status[model][i]["Defects"]);
//                        d_current_status[model][i]["Defects"] = (old+RAND.rate(1,20,0)).toString();
//
//                        old = parseInt(d_current_status[model][i]["Pass"])
//                        d_current_status[model][i]["Pass"] = (old + RAND.rate(1,80,0)).toString();
//
//                        var rate = Math.floor(Math.random()*3-1);
//                        old = parseInt(d_current_status[model][i]["FTQ"])
//                        if(old+rate<100){
//                            d_current_status[model][i]["FTQ"] = (old+rate).toString();
//                        }
//                    }
//                }
//                Report.refresh();
//            });
//    }
//    var current_status_loader="";

    return {
        init:function(){
//            get_dhtmlx();
//            configure();
//            self_init();

//            this.json_parse(this.get_json());
//            this.prepare();
        }
    }
})