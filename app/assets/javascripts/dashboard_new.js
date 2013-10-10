/**
 * Created with JetBrains RubyMine.
 * User: tesla
 * Date: 10/10/13
 * Time: 2:49 PM
 * To change this template use File | Settings | File Templates.
 */


/**
 *
 * */
//need to be moved to base lib
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
        function pad(n) { return n < 10 ? '0' + n : n }
        return this.getUTCFullYear() + '-'
            + pad(this.getUTCMonth() + 1) + '-'
            + pad(this.getUTCDate()) + 'T'
            + pad(this.getUTCHours()) + ':'
            + pad(this.getUTCMinutes()) + ':'
            + pad(this.getUTCSeconds()) + 'Z';
    };
};

var dashboard_item ={};

function system_error(){
    alert("我们遇到了点小麻烦，管理员已经开始工作了，请耐心等待片刻后重试！");
}

dashboard_item.init_component = function(){
    var target="#analy-begin-time,#analy-end-time";
    $("#chart-kpi").chosen().change(function(){
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        $(target).val("");
        $(".index-date-extra-info").text("");
        new DATE_PICKER[interval](target,"date").datePicker();
    });
    $("chart_group").chosen().change(function(){
        $(target).datepicker("remove");
        $(target).datetimepicker("remove");
    });

    $("body").on("change","#analy-begin-time",function(){
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        if (interval == "200") {
            var week=standardParse($(this).val()).date.toWeekNumber();
            $(this).next().text("week " + week);
        }
        else if (interval == "400") {
            var quarter=standardParse($(this).val()).date.monthToQuarter();
            $(this).next().text("quarter " + quarter);
        }
    }).on("change","#toTime",function(){
            var interval = $("#chart-kpi").find(":selected").attr("interval");
            if (interval == "200") {
                var week=standardParse($(this).val()).date.toWeekNumber();
                $(this).next().text("week " + week);
            }
            else if (interval == "400") {
                var quarter=standardParse($(this).val()).date.monthToQuarter();
                $(this).next().text("quarter " + quarter);
            }
        });

    resize_chart.body();
    resize_chart.container();
    $("#chart-group").prepend($("<option />").attr("value", ""));
    $("#chart-group").val('').trigger('chosen:updated');
    $("#chart-kpi").val('').trigger('chosen:updated');
    $("#chart-view").prepend($("<option />").attr("value", ""));
    $("#chart-view").val('').trigger('chosen:updated');
    $("#chart-group").on("change", function (event) {
        var id = $(adapt_event(event).target).attr("value");
        $.ajax({
            url: '/kpis/get_by_category',
            dataType: "json",
            data: {
                id: id
            },
            success: function (data) {
                $("#chart-kpi").empty().trigger('chosen:updated');
                for (var i = 0; i < data.length; i++) {
                    $("#chart-kpi").append($("<option />").attr("value", data[i].id).attr("interval", data[i].frequency).text(data[i].name));
                }
                $("#chart-kpi").prepend($("<option />").attr("value", ""));
                $("#chart-kpi").val('').trigger('chosen:updated');
            }
        });
    })
}

dashboard_item.test = function(){
    console.log("Test!");
}