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
        $("#content-right-nav").css("display","none");

        $("#left-content-title").css("display","block");
        $("#dashboard-content").css("display","block").css("position","relative").css("z-index",99).css("background-color","black");
        $(".ggttyyhh").css("top","10px");
        //on_full_size();
    });
    $("body").on("keyup",function(event){
       var e=adapt_event(event).event;
       if(e.keyCode==27 && $("#content-left-main").css("display")=="table-cell"){
           $("#content-right-nav").css("display","table-cell");
           if($("#content-right-nav-group li").length>0){
               $("#dashboard-content").css("position","static").css("z-index",0).css("background-color","white");
           }
           else{
               $("#left-content-title").css("display","none");
               $("#dashboard-content").css("display","none").css("position","static").css("z-index",0).css("background-color","white");
           }
           $(".dash-content").css("top","120px");
           //on_restore_screen();
       }
    });
}

