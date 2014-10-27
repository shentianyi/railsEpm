define(["jquery","dhtmlx.dataview","format_time","./snap"],function($,dhtmlXDataView,Formattime){
    function get_dhtmlx(){
        var container = "data_container";
        Share.r=new dhtmlXDataView(container);
    }
    function configure(){
        var dhtmlxobj = Share.r;
        dhtmlxobj.define("type", {
            template: "<div class='dv-header'>" +
                "<p>#INQA#</p>" +
                "</div>" +
                "<div class='dv-body'>" +
                "<div class='left'>" +
                "<p id='ftq' style='color:" + "#STYLE_COLOR#" + "'>#FTQ#%</p>" +
                "</div>" +
                "<div class='right'>" +
                "<p>#Defects#</p>" +
                "<p>OPEN DEFECTS</p>" +
                "<p>#Pass#</p>" +
                "<p>VEHICLE PASS</p>" +
                "</div>" +
                "</div>",
            css: "dv-item",
            height: 150,
            width: 230,
            margin: 5,
            padding: 8
        });
    }
    function flexible(){
        var total_height=$("#wrap-main").height()-$("header").height()-1;
        var height=total_height-$("#current-status-header").height()-$("#snap-groups").height()-2;
        $("#data_container").height(height);
        var target_height=total_height-$("#target-wrapper-header").height()-$("#target-setting-footer").height()-2;
        $("#target_setting").height(target_height);
    }
    function loader_show(){
        current_status.loader = new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
        var left = document.getElementById("report-menu").getBoundingClientRect().right,
            top = document.getElementById("current-status-header").getBoundingClientRect().bottom >= 0 ? document.getElementById("current-status-header").getBoundingClientRect().bottom : 0,
            height=$("#data_container").height();
        $(".current-status-pageload-overlay svg").css('left', left);
        $(".current-status-pageload-overlay svg").css('top', top);
        $(".current-status-pageload-overlay svg").css("height",height+"px");
        current_status.loader.show();
    }
    function loader_hide(){
        current_status.loader.hide();
    }
    function btn_loader_show(){
        current_status.loader = new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
        var left = document.getElementById("report-menu").getBoundingClientRect().right,
            top = document.getElementsByTagName("header")[0].getBoundingClientRect().bottom >= 0 ? document.getElementsByTagName("header")[0].getBoundingClientRect().bottom : 0,
            height=$("#report-content").height();
        $(".current-status-pageload-overlay svg").css('left', left);
        $(".current-status-pageload-overlay svg").css('top', top);
        $(".current-status-pageload-overlay svg").css("height",height+"px");
        current_status.loader.show();
    }
    function show_extra_section(tag){
        btn_loader_show();
        if(tag==="target"){
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-target").css("display","block");
                loader_hide();
                defects.refresh_color();
            },700);
        }
        else if(tag==="all_defects"){
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-all-defects").css("display","block");
                loader_hide();
            },700);
        }
        else if(tag==="key_defects"){
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-key-defects").css("display","block");
                loader_hide();
            },700);
        }
    }
    function self_init(){
        $("#current-date").text(Formattime.current_time());
        $("#current-clock").text(Formattime.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(Formattime.current_time_clock());
        },700);
        flexible();
        $(window).resize(function(){
            flexible();
        });
        $("body")
            .on("click",".extra_func_btn",function(){
                var tag=$(this).attr("tag") ;
                show_extra_section(tag);
                flexible();
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

    return {
        init:function(){
            get_dhtmlx();
            configure();
            self_init();

            this.json_parse(this.get_json());
            this.prepare();
        }
    }
})