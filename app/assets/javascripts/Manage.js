/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-6
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {} ;
MANAGE.init=function(){
    MANAGE.type=MANAGE.type || $("#manage-left-menu").attr("type");
    MANAGE.left.manage_left_add_init();
    MANAGE.left.manage_left_delete_init();
    MANAGE.left.manage_left_edit_init();
    MANAGE.iCheck_init();
    MANAGE.sort_init();
    MANAGE.resize_sort_table();
    MANAGE.judge_kpi_count();
    $("#manage-sort-list li").on("resize",function(){
        MANAGE.resize_sort_table()
    });
    $("body").on("click","#manage-item-remove",manage_item_remove).on("click","#manage-item-edit",manage_item_edit);
    if($("#manage-item-edit").length>0){
        $("#manage-sort-list table").find("input[type='text']").on("keydown",function(event){
            var e = adapt_event(event).event;
            if(e.keyCode==13){
                var option={
                    id:$(e.target).attr("effect_on"),
                    belong:$("#manage-left-menu li.active").attr("number"),
                    target:$(e.target).val(),
                    edit_input:$(e.target)
                }
                MANAGE[MANAGE.type].item_edit.complete(option)
            }
            else if(e.keyCode==27){
                $(e.target).css("display","none");
            }
        }).on("keyup",function(event){
                var e = adapt_event(event).event;
                if(MANAGE[MANAGE.type].item_edit.edit_check){
                    MANAGE[MANAGE.type].item_edit.edit_check(e.target);
                }
         });
    }
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
}


MANAGE.iCheck_init=function(){
    $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_minimal-aero'
    });
    $("input[type='checkbox']").iCheck('uncheck');
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
    $("#manage-total-check").on("ifChecked",function(){
        $("#right-list-top-control>a").css("display","inline-block")
    }).on("ifUnchecked",function(){
            $("#right-list-top-control>a").css("display","none")
        });
    $("#manage-total-check").on("ifClicked",function(){
        if(!$(this).parent().hasClass("checked")){
            $("#manage-sort-list input[type='checkbox']").not(":checked").iCheck("check");
        }
        else{
            $("#manage-sort-list input[type='checkbox']").filter(":checked").iCheck("uncheck")
        }
    });
}

MANAGE.sort_init=function(){
    $('#manage-sort-list').sortable({
        handle: '.sort-handle'
    });
    $.event.props.push("dataTransfer");
    $("#manage-sort-list").on("dragstart","li",function(event){
        var e=adapt_event(event).event;
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
        var e=adapt_event(event).event;
        var id = e.dataTransfer.getData("id");
        var belong = $(this).attr("number");
        MANAGE[MANAGE.type].item_drag.drag_complete_post(id,belong);
        adapt_event(event).event.preventDefault();
        stop_propagation(event);
    });
    $("#manage-sort-list li table input[type='text']").on("focus",function(){
        $('#manage-sort-list').sortable("disable");
    }).on("blur",function(){
        $('#manage-sort-list').sortable("enable");
    });
}

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
MANAGE.resize_sort_table=function(){
    var table_size=$("#manage-sort-list li").width()-70;
    $("#manage-sort-list table").width(table_size)
}
MANAGE.judge_kpi_count=function(){
    if($("#manage-sort-list").children().length>0){
        $("#right-list-top-control").css("display","inherit");
    }
    else{
        $("#right-list-top-control").css("display","none");
    }
}
