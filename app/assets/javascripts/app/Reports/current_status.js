define(["jquery","dhtmlx.dataview","./share","../../func-module/format_time","reportsData","svgLoader"],function($,Dataview,Share,format_time,MyData,SVGLoader){
    var current_status_loader=new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
    var left = document.getElementById("report-menu").getBoundingClientRect().right,
        top = document.getElementsByTagName("header")[0].getBoundingClientRect().bottom >= 0 ? document.getElementsByTagName("header")[0].getBoundingClientRect().bottom : 0,
        height=$("#report-content").height();
    $(".current-status-pageload-overlay svg").css('left', left);
    $(".current-status-pageload-overlay svg").css('top', top);
    $(".current-status-pageload-overlay svg").css("height",height+"px");
    $(window).resize(function(){
        var left = document.getElementById("report-menu").getBoundingClientRect().right,
            top = document.getElementsByTagName("header")[0].getBoundingClientRect().bottom >= 0 ? document.getElementsByTagName("header")[0].getBoundingClientRect().bottom : 0,
            height=$("#report-content").height();
        $(".current-status-pageload-overlay svg").css('left', left);
        $(".current-status-pageload-overlay svg").css('top', top);
        $(".current-status-pageload-overlay svg").css("height",height+"px");
    });
    function show_extra_section(tag){
        current_status_loader.show();
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
//                color_type=Report.color.ftq[a[i]];
                $("#footer-right").append(color_html);
                $("div[idx="+a[i]+"]").find(".color-item").each(function(index,value){
                    if($(value).css("backgroundColor")===color_type){
                        $(value).addClass("active");
                    }
                });
            }
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-target").css("display","block");
                current_status_loader.hide();
            },700);
        }
        else if(tag==="all_defects"){
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-all-defects").css("display","block");
                current_status_loader.hide();
            },700);
        }
        else if(tag==="key_defects"){
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-key-defects").css("display","block");
                current_status_loader.hide();
            },700);
        }
    }
    function self_init(){
        var template={},
            data=MyData.current_status();
        Dataview.render(data["CF11"],template);
        function dataview_click_event(id, ev, html){
                window.location="kpi_entries/analyse?view="+this.get(id).INQA;
                return true;
        }
        Dataview.itemClick(dataview_click_event);

        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        $("#vehicle-select").change(function () {
            Dataview.clear();
            Dataview.render(data[$("#vehicle-select option:selected").text()],template);
            Dataview.itemClick(dataview_click_event);
        });
        $("body")
            .on("click","#quick-print",function(){
//                html2canvas($("#data_container"), {
//                    onrendered: function (canvas) {
//                        // Convert and download as image
//                        Canvas2Image.saveAsPNG(canvas);
//                    }
//                });
            })
            .on("click","#refresh",function(){
                current_status_loader.show();
                setTimeout(function () {
                    Dataview.clear();
                    Dataview.render(data[$("#vehicle-select option:selected").text()],template);
                    Dataview.itemClick(dataview_click_event);
                    current_status_loader.hide();
                }, 1500);
            })
            .on("click",".extra_func_btn",function(){
                var tag=$(this).attr("tag") ;
                show_extra_section(tag);
            })
            .on("click",".current-status-target-back-btn",function(){
                current_status_loader.show();
                var $target=$(this).parents(".current-status-wrapper").eq(0);
                setTimeout(function(){
                    $target.css("display","none");
                    $("#current-status-normal").css("display","block");
                    $("#footer-right div.color-group").remove();
                    current_status_loader.hide();
                },700);
            })
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
    }


    return {
        init:function(){
            self_init();
        }
    }
})