define(["jquery","./share","../../func-module/format_time","reportsData","svgLoader","colorPicker","highmaps"],function($,Share,format_time,MyData,SVGLoader,ColorPicker,Highmaps){
    function show_extra_section(tag,current_status_loader){
        current_status_loader.show();
        if(tag==="target"){
            var target_config={
                container:"target_grid_container",
                header:["Stations","FTQ Status","FTQ Target (double click to modify)"],
                colTypes:'ro,ro,ed'
            }
            setTimeout(function(){
                $("#current-status-normal").css("display","none");
                $("#current-status-target").css("display","block");
                require(["dhtmlx.grid"],function(Grid){
                    var data=MyData.current_status_target();
                    Grid.render(data,target_config);
                    current_status_loader.hide();
                })
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
        Highmaps.heatmap(
            {
                row:6,
                container:"data_container",
                nameArray:["CF1","CF2","CF3","CF4"],
                special_option:{
                    plotOptions:{
                        heatmap:{
                            dataLabels: {
                                formatter:function(){
                                    return "<span class='w'>"+this.point.name+"</span><br />"
                                            +"<b>"+this.point.value+"</b>"
                                }
                            }
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                                this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                        }
                    }
                }
            },
            data);
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        $("#vehicle-select").change(function () {

        });
        ColorPicker.colorPicker(["#color1","#color2","#color3"],["up","up","up"]);
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
//                    Dataview.clear();
//                    Dataview.render(data[$("#vehicle-select option:selected").text()],template);
//                    Dataview.itemClick(dataview_click_event);
                    current_status_loader.hide();
                }, 1500);
            })
            .on("click",".extra_func_btn",function(){
                var tag=$(this).attr("tag") ;
                show_extra_section(tag,current_status_loader);
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