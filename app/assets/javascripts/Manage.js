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
    $('#manage-sort-list').sortable({
        handle: '.sort-handle'
    });
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
