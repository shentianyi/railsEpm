define(["jquery","dhtmlx.dataview","./share","../../func-module/format_time"],function($,dhtmlXDataView,Share,format_time){
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
    function self_init(){
        //set the date
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