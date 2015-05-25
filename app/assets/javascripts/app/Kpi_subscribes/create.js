define(["jquery","base","../../highchart/chart-util"],function($,Base,CHARTUTIL){
    function create(){
        var chart_condition = {};
        chart_condition.entity_group_id = $("#entity-groups option:selected").attr("value");
        chart_condition.kpi_id = $("#kpi-id").attr("kpi-id");
        chart_condition.calculate_type = CHARTUTIL.calculate_type($("#calculate-type option:selected").attr("value"));
        chart_condition.time_string = $("#start-time").val()+"|"+$("#end-time").val()
        chart_condition.interval = $("#kpi-id").attr("kpi-interval");
        chart_condition.chart_type = "NULL";

        var kpi_subscribe = {}
        kpi_subscribe.alert_by_sms = $("#alert-sms").attr('checked') === 'checked';
        kpi_subscribe.alert_by_email = $("#alert-email").attr('checked') === 'checked';
        kpi_subscribe.kpi_id = chart_condition.kpi_id;

        var subscribe_alerts = []
        for(var i = 0;i<$("#alert-list li").length;i++){
            var alert = {}
            alert.alert_type = $("#alert-list li").eq(0).attr("type");
            alert.value = $("#alert-list li").eq(0).attr("value");
            subscribe_alerts.push(alert)
        }

        if(subscribe_alerts.length < 1){
            Base.MessageBox("至少选择一项提醒",'top','warning');
            return
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
                if(data.result){
                    window.location.href = "/kpi_subscribes/mine";
                }else{
                    Base.MessageBox(data.content,'top','warning');
                }
            }
        })
    }

    $("#story-create-btn").on("click",create);
    $("#value").on("keypress",function(event){
        if(event.which == 13){
            var value = $("#value").val();
            var type = $("#alert-type option:selected").attr("value");
            var display = $("#alert-type option:selected").text();
            if($("#alert-list li[type='"+type+"']").length > 0){
                base.MessageBox('Cannot set the same alter type','top','warning');
            }
            else{
                $(this).val("");
                $("#alert-list").append("<li type="+type+" value="+value+">"+display + "   " +value+"</li>");
            }
            event.preventDefault();
        }
    })
})