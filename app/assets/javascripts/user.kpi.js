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
MANAGE.kpi.init = function () {
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

