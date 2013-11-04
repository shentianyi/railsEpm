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
    $("body").on("click","#db-add-show",function(){
        var dashboard_id=$("#manage-left-menu>.active").attr("number");
        if(dashboard_id){
            $("#dashboard-add-page").css("display","block");
            $("#dashboard-add-left-menu>.select-div>div").css("width","120px");
        }else{
            MessageBox("Please Select One Dashboard","top","warning");
        }

    });
    $("body").on("click",".dashboard-moreDetail>i",function(){
        var id=$(this).attr("effect_on");
        db_view_delete(id);
        //$("#dashBoard-show").find("#"+id).remove();
    });
    $("body").on("click","#dashboard-full-size",function(){
        $("#content-right-nav").css("display","none");
        $("#content-left-main").css("display","table-cell");
        $("#dashboard-content").css("position","relative").css("z-index",99);
        $(".gridster").css("top","10px");
    });
    $("body").on("keyup",function(event){
       var e=adapt_event(event).event;
       if(e.keyCode==27 && $("#content-left-main").css("display")=="table-cell"){
           $("#content-right-nav").css("display","table-cell");
           $("#content-left-main").css("display","block");
           $("#dashboard-content").css("position","static").css("z-index",0);
           $(".gridster").css("top","120px");
       }
    });
    DASHBOARD.highchart_template_init();
}

