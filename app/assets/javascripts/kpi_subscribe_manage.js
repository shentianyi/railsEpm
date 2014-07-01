var MANAGE = MANAGE || {};
MANAGE.kpi_subscribe = MANAGE.kpi_subscribe || {};

MANAGE.kpi_subscribe.init_new = function () {
    $("#kpi-category").on("change", function (event) {
        var id = $(adapt_event(event).target).attr("value");
        $.ajax({
            url: '/kpis/categoried/' + id,
            dataType: "json",
            success: function (data) {
                $("#kpis").empty().trigger('chosen:updated');
                for (var i = 0; i < data.length; i++) {
                    $("#kpis").append($("<option />").attr("value", data[i].id).attr("interval", data[i].frequency).text(data[i].name));
                }
                //$("#kpis").prepend($("<option />").attr("value", ""));
                $("#kpis").val('').trigger('chosen:updated');
            }
        });
    });
}

MANAGE.kpi_subscribe.create = function(){
    var chart_condition = {};
    chart_condition.entity_group_id = $("#entity-groups option:selected").attr("value");
    chart_condition.kpi_id = $("#kpis option:selected").attr("value");
    chart_condition.calculate_type = "AVERAGE";
    chart_condition.time_string = $("#start_time").val()+"|"+$("#end_time").val()
    chart_condition.interval = 100;
    chart_condition.chart_type = "NULL";

    var kpi_subscribe = {}
    kpi_subscribe.kpi_id = chart_condition.kpi_id;

    var subscribe_alerts = []
    var alert = {}
    alert.alert_type = "MAX"
    alert.value = 100
    subscribe_alerts.push(alert)

    $.ajax({
        url:'/kpi_subscribes',
        type:'POST',
        dataType:'json',
        data:{
            kpi_subscribe:kpi_subscribe,
            chart_condition:chart_condition,
            subscribe_alerts:subscribe_alerts
        },
        success:function(data){
            console.log(data)
        }
    })
}