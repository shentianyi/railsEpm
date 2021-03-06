/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-6
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {} ;
MANAGE.left_count;
MANAGE.left_count_observable=function(){
    if(MANAGE.left_count==0){
        $("#manage-right-content").children().css("display","none");
    }
    else{
        $("#manage-right-content #manage-btn-group").css("display","inline-block");
        $("#manage-right-content .manage-right-list").css("display","block");
    }
};
MANAGE.init=function(){
    MANAGE.left_count=$("#manage-left-menu").children().length-2;
    MANAGE.type=$("#content-right-nav").attr("name") || $("#manage-left-menu").attr("type");
    MANAGE.left.manage_left_add_init();
    MANAGE.left.manage_left_delete_init();
    MANAGE.left.manage_left_edit_init();
    MANAGE.judge_kpi_count();
    MANAGE.left_count_observable();
    MANAGE.widget_init();
    $("body").on("click","#manage-item-remove",manage_item_remove).on("click","#manage-item-edit",manage_item_edit);
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    if($("#manage-item-edit").length>0){
        $("body").on("keydown","#manage-sort-list li table input[type='text']",function(event){
            var e = adapt_event(event).event;
            if(e.keyCode==13 ){
                if($(e.target).val().length==0){
                    MessageBox("Give it a Value , please",'top',"warning");
                }
                else{
                    var id=$(e.target).attr("effect_on");
                    var option={
                        id:id,
                        belong:$("#manage-left-menu li.active").attr("number"),
                        target_max:$("#"+id+" .manage-kpi-target").eq(0).find("input").val()?$("#"+id+" .manage-kpi-target").eq(0).find("input").val():$("#"+id+" .manage-kpi-target").eq(0).find(".can-change").text(),
                        target_min:$("#"+id+" .manage-kpi-target").eq(1).find("input").val()?$("#"+id+" .manage-kpi-target").eq(1).find("input").val():$("#"+id+" .manage-kpi-target").eq(1).find(".can-change").text(),
                        edit_input:$(e.target)
                    }

                    MANAGE[MANAGE.type].item_edit.complete(option);
                }
            }
            else if(e.keyCode==27){
                var id=$(e.target).attr("effect_on");
                $("#manage-sort-list>#"+id).find(".manage-kpi-target input").css("left","-999em");

//                var id=$(e.target).attr("effect_on");
//                var index=MANAGE.edit_array.indexOf(id);
//                MANAGE.edit_array.splice(index,1);
//                var targetId=MANAGE.edit_array.length==0?false:MANAGE.edit_array[0];
//                if(targetId){
//                    $("#manage-sort-list>#"+targetId).find("table input[type='text']").focus();
//                }
            }
        }).on("keyup","#manage-sort-list li table input[type='text']",function(event){
                var e = adapt_event(event).event;
                if(MANAGE[MANAGE.type].item_edit.edit_check){
                    MANAGE[MANAGE.type].item_edit.edit_check(e.target);
                }
        });
    }
    MANAGE.manage_left_height();

}
MANAGE.widget_init=function(){
    MANAGE.iCheck_init();
    MANAGE.sort_init();
    MANAGE.resize_sort_table();
    $("#manage-sort-list li").on("resize",function(){
        MANAGE.resize_sort_table()
    });
    $("#manage-sort-list li").each(function() {
        $(this).find("table tr td").tipsy({
            gravity : 'se'
        });
    });
};
MANAGE.manage_left_height=function(){
    var height=$(document).height()-$("header").height()-$("#left-content-title").height()-1;
    $("#manage-left-content").height(height);
    $("body").on("resize",function(){
        height=$(document).height()-$("header").height()-$("#left-content-title").height()-1;
        $("#manage-left-content").height(height);
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
    console.log("here")
    var table_size=$("#manage-sort-list li").width()-70;
    $("#manage-sort-list table").width(table_size)
    if(".attribute-position"){
        $("#manage-sort-list .attribute-position").width(table_size+40)
        $("#manage-sort-list .attribute-position>p").width(table_size-180)
    }
}
MANAGE.judge_kpi_count=function(){
    if($("#manage-sort-list").children().length>0){
        $("#right-list-top-control").css("display","inherit");
    }
    else{
        $("#right-list-top-control").css("display","none");
    }
}
