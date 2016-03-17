/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-10-9
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */
var DASHBOARD=DASHBOARD || {} ;
var MANAGE=MANAGE || {} ;
DASHBOARD.init=function(){
    MANAGE.type=MANAGE.type || $("#manage-left-menu").attr("type");
    MANAGE.left.manage_left_add_init();
    MANAGE.left.manage_left_delete_init();
    MANAGE.left.manage_left_edit_init();
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });

    $("body").on("click",".dashboard-moreDetail>i",function(){
        var id=$(this).attr("effect_on");
        db_view_delete(id);
        //$("#dashBoard-show").find("#"+id).remove();
    });

    $("body").on("click","#dashboard-full-size",function(){
        $("#dashboard-content-full").css("display","block");
        var height=$(document).height();
        $("#dashboard-content-full").css("height",height+"px");
        ifepm.dashboard_widget.init_fullsize();
        on_full_size();
    });


    $("body").on("keyup",function(event){
       var e=adapt_event(event).event;
       if(e.keyCode==27 ){
           $("#dashboard-content-full").css("display","none");
           on_restore_size();
       }
    });
    $("body").on("click","#full-size-btn",function(event){
        stop_propagation(event);
        $("#dashboard-content-full").css("display","none");
        on_restore_size();
    })
}

