define(["jquery","./manage_share_control","base","icheck","jquery.icheck","jquery.sortable"],function($,MANAGE,Base){
//    var MANAGE=MANAGE||{
//        totalChecked:0
//    };
    $("#manage-total-check")
        .on("ifChecked",function(){
            $("#right-list-top-control>a").css("display","inline-block")
        })
        .on("ifUnchecked",function(){
            $("#right-list-top-control>a").css("display","none")
        })
        .on("ifClicked",function(){
            if(!$(this).parent().hasClass("checked")){
                $("#manage-sort-list input[type='checkbox']").not(":checked").iCheck("check");
            }
            else{
                $("#manage-sort-list input[type='checkbox']").filter(":checked").iCheck("uncheck")
            }
        })
    ;
    $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
        if(!$(this).parent().hasClass("checked")){
            MANAGE.totalChecked+=1;
            total_check_listener();
        }
        else{
            MANAGE.totalChecked-=1;
            total_check_listener();
        }
    });
    $('#manage-sort-list').sortable({
        handle: '.sort-handle'
    });
    $.event.props.push("dataTransfer");
    $("#manage-sort-list").on("dragstart","li",function(event){
        var e=Base.adapt_event(event).event;
        e.dataTransfer.setData("id", $(this).attr("id"));
    });
    $("#manage-left-menu").on("dragover","li[number]:not('.active')",function(event){
        this.style.color="rgba(0,0,0,0.4)";
        this.style.backgroundColor="rgba(242,196,84,0.7)";
        event.preventDefault();
    }).on("dragleave","li[number]:not('.active')",function(){
            this.style.color="rgba(0, 0, 0, 0.2)";
            this.style.backgroundColor=null;
        }).on("drop","li[number]:not('.active')",function(event){
            this.style.color="rgba(0, 0, 0, 0.2)";
            this.style.backgroundColor=null;
            var e=Base.adapt_event(event).event;
            var id = e.dataTransfer.getData("id");
            var belong = $(this).attr("number");
            MANAGE[MANAGE.type].item_drag.drag_complete_post(id,belong);
            Base.adapt_event(event).event.preventDefault();
            Base.stop_propagation(event);
        });
    $("#manage-sort-list li table input[type='text']").on("focus",function(){
        $('#manage-sort-list').sortable("disable");
    }).on("blur",function(){
            $('#manage-sort-list').sortable("enable");
        });

    function total_check_listener(){
        if(MANAGE.totalChecked >= 1){
            if(!$("#manage-total-check").parent().hasClass("checked")){
                $("#manage-total-check").iCheck("check");
            }
        }
        else{
            $("#manage-total-check").iCheck("uncheck");
        }
    }
    function judge_kpi_count(){
        if($("#manage-sort-list").children().length>0){
            $("#right-list-top-control").css("display","inherit");
        }
        else{
            $("#right-list-top-control").css("display","none");
        }
    }
})