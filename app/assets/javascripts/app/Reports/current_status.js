define(["jquery","../../func-module/format_time","./report_url","svgLoader","colorPicker","highmaps","./share"],function($,format_time,MyData,SVGLoader,ColorPicker,Highmaps,Share){
    function show_extra_section(old_tag,new_tag){
        Share.partial_loader.show();
        $("#snap-groups .snap-li").removeClass("active");
        $(".current-status-wrapper[tag='"+old_tag+"']").css("display","none");
        $(".current-status-wrapper[tag='"+new_tag+"']").css("display","block");
        $("#tags").children().removeClass("active");
        $("#tags").find("[tag='"+new_tag+"']").addClass("active");
        if(new_tag==="target"){
            var target_config={
                container:"target_grid_container",
                header:["Stations","FTQ Status","FTQ Target (double click to modify)"],
                colTypes:'ro,ro,ed'
            }
            setTimeout(function(){
//                require(["dhtmlx.grid"],function(Grid){
//                    var data=MyData.currentStatusTarget();
//                    Grid.render(data,target_config);
                    Share.partial_loader.hide();
//                })
            },700);
        }
        else if(new_tag==="all_defects"){
//            setTimeout(function(){
//
//                Share.partial_loader.hide();
//            },700);
        }
        else if(new_tag==="key_defects"){
//            setTimeout(function(){
//
//                Share.partial_loader.hide();
//            },700);
        }
        else if(new_tag==="current_status"){
            setTimeout(function(){
                Share.partial_loader.hide();
            },700);
        }
    }
    function self_init(){
        $("#current-date").text(format_time.current_time());
        $("#current-clock").text(format_time.current_time_clock());
        window.setInterval(function(){
            $("#current-clock").text(format_time.current_time_clock());
        },1000);
        var first_tag=$("#tags .active").attr("tag");
        $(".current-status-wrapper[tag='"+first_tag+"']").css("display","block");
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
                Share.partial_loader.show();
                setTimeout(function () {
//                    Dataview.clear();
//                    Dataview.render(data[$("#vehicle-select option:selected").text()],template);
//                    Dataview.itemClick(dataview_click_event);
                    Share.partial_loader.hide();
                }, 1500);
            })
            //click top menu tag
            .on("click",".tagItem",function(){
                if(!$(this).hasClass("active")){
                    var old_tag=$("#tags .active").attr("tag"),
                        new_tag=$(this).attr("tag") ;
                    show_extra_section(old_tag,new_tag);
                }
            })
//            .on("click","#target-setting-footer .color-item",function(){
//                $(this).siblings().removeClass("active");
//                $(this).addClass("active");
//
//                var col = $(this).parent().attr("idx");
//                var color = $(this).css("backgroundColor");
//                Report.color.ftq[col]=color;
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
        generateChart();
    }
    function generateChart(container,data){
        var data=data?data:MyData.currentStatus();
        Highmaps.heatmap(
            {
                row:6,
                container:container?container:"data_container",
                nameArray:["CF1","CF2","CF3","CF4"],
                special_option:{
                    colorAxis: {
                        stops: [
                            [0, 'rgb(244,109,67)'],
                            [0.5, 'rgb(255,255,191)'],
                            [1, 'rgb(102,189,99)']
                        ]
                    }
                }
            },
            data);
    }

    return {
        init:function(){
            self_init();
        },
        setSnap:function(){
            var tag_index,
                $tags=$("#tags").children(),
                vehicle_index=document.getElementById("vehicle-select").selectedIndex,
                i;
            for(i=0;i<$tags.length;i++){
                if($tags.eq(i).hasClass("active")){
                    tag_index=i;
                    break ;
                }
            }
            return tag_index+"#"+vehicle_index;
        },
        snap:function(snap){
            //需要去存tag，如果是current_status还要存是哪个线
            generateChart(null,snap.data);
            var indexArray=snap.extra_info.split("#"),
                tag_index=indexArray[0],
                vehicle_index=indexArray[1];

        },
        chart:function(container,data){
            generateChart(container,data);
        }
    }
})