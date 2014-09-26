/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-12
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
var MANAGE = MANAGE || {};
MANAGE.kpi = {};
MANAGE.attribute = {};
MANAGE.kpi.library = {};
MANAGE.kpi_subscribe = {}
MANAGE.kpi.init = function () {

    MANAGE.kpi_subscribe.init();

    $("#manage-left-menu").on("click", "li", function () {
        var li = $(this);
        var id = li.attr('number');
        if (id) {
            $("#manage-left-menu>li").removeClass('active');
            li.addClass('active');
            $.get('/kpis/access_list/' + id, function (data) {
                $("#manage-edit-target").text(li.attr('title'));
                $('#kpi-item-container').html(data);
                window.history.pushState(id, null, "/kpis/access/" + id);
                MANAGE.widget_init();
                MANAGE.kpi.isCalcuCheck();
            });
        }
    });
};

//订阅KPI相关
MANAGE.kpi_subscribe.init = function(){
    $("body")
        .on("click",".subscribe-kpi",function(){
        MANAGE.kpi_subscribe.open(this);
        })
        .on("click","#subscribe-kpi-block-remove",function(){
            MANAGE.kpi_subscribe.close(this);
        })
    ;
}

MANAGE.kpi_subscribe.open = function(obj){
    $("#subscribe-kpi-block").css("display","block");
    $("#subscribe-kpi-block>div").css("display","block");
}

MANAGE.kpi_subscribe.close = function(obj){
    $("#subscribe-kpi-block").css("display","none");
    $("#subscribe-kpi-block>div").css("display","none");
}
