/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-6
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */
function MANAGE_INIT(){
    manage_left_add_init();
    manage_left_delete_init();
    manage_left_edit_init();
    iCheck_init();
    sort_init();
    resize_sort_table();
    $("#manage-sort-list li").on("resize",function(){
        resize_sort_table()
    });
    $("body").on("click","#manage-item-remove",manage_item_remove).on("click","#manage-item-edit",manage_item_edit);
}


function iCheck_init(){
    $("input[type='checkbox']").iCheck({
        checkboxClass: 'icheckbox_minimal-aero'
    });
    $("input[type='checkbox']").iCheck('uncheck');
    $("#manage-sort-list").on("ifChanged","input[type='checkbox']",function(){
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

function sort_init(){
    $('#manage-sort-list').sortable({
        handle: '.sort-handle'
    });
    $.event.props.push("dataTransfer");
    $("#manage-sort-list").on("dragstart","li",function(event){
        var e=adapt_event(event).event;
        e.dataTransfer.setData("id", $(this).attr("id"));
    });
    $("#manage-left-menu").on("dragover","li[number]:not('.active')",function(event){
        this.style.color="rgba(242,196,84,0.7)";
        event.preventDefault();
    }).on("dragleave","li[number]:not('.active')",function(){
        this.style.color="rgba(0, 0, 0, 0.2)";
    }).on("drop","li[number]:not('.active')",function(event){
        this.style.color="rgba(0, 0, 0, 0.2)";
        var e=adapt_event(event).event;
        var id = e.dataTransfer.getData("id");
        var belong = $(this).find("a").text();
        MANAGE[MANAGE.type].item_drag.drag_complete_post(id,belong);
        adapt_event(event).event.preventDefault();
        stop_propagation(event);
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
function resize_sort_table(){
    var table_size=$("#manage-sort-list li").width()-70;
    $("#manage-sort-list table").width(table_size)
}
