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
    $("body").on("click","#kpi-add-show",function(){
        $("#dashboard-add-page").css("display","block");
        $("#dashboard-add-left-menu>.select-div>div").css("width","120px");
        var dashboard_id=$("#manage-left-menu>.active").attr("number");
    });
}
