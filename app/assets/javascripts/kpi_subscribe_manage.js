var MANAGE = MANAGE || {};
MANAGE.kpi_subscribe = MANAGE.kpi_subscribe || {};

MANAGE.kpi_subscribe.init_new = function () {
    $("#manage-edit-target").text($("li.active").attr('title'));

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

    $("#manage-left-menu").on("click", "li", function () {
        var li = $(this);
        var id = li.attr('number');
        if (id) {
            $("#manage-left-menu>li").removeClass('active');
            li.addClass('active');
            $.get('/kpi_subscribes/my_subscribe/' + id, function (data) {
                $("#manage-edit-target").text(li.attr('title'));
                $('#kpi-item-container').html(data);
                window.history.pushState(id, null, "/kpi_subscribes/mine/" + id);
            });
        }
    });

    $("#value").keypress(function(event){
        if(event.which == 13){
            var value = $("#value").val();
            var type = $("#alert-type option.selected").val();
            $(this).val("");
            $("#alert-list").append("<li type="+type+">"+value+"</li>");
            event.preventDefault();
        }
    })
}

MANAGE.kpi_subscribe.create = function(){
    var chart_condition = {};
    chart_condition.entity_group_id = $("#entity-groups option:selected").attr("value");
    chart_condition.kpi_id = $("#kpi-id").attr("kpi-id");
    chart_condition.calculate_type = "AVERAGE";
    chart_condition.time_string = $("#start-time").val()+"|"+$("#end-time").val()
    chart_condition.interval = 100;
    chart_condition.chart_type = "NULL";

    var kpi_subscribe = {}
    kpi_subscribe.kpi_id = chart_condition.kpi_id;

    var subscribe_alerts = []
    for(var i = 0;i<$("#alert-list li").length;i++){
        var alert = {}
        alert.alert_type = $("#alert-list li").eq(0).attr("type");
        alert.value = $("#alert-list li").eq(0).text();
        subscribe_alerts.push(alert)
    }

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