var DASHBOARD=DASHBOARD||{};
DASHBOARD.special_type={};

DASHBOARD.special_type={
    line:function(id){
        $("#"+id+" "+".dashboard-item-extra-info").empty().css("height","50px");
        $("#"+id+" "+".db-chart-container").css("top","50px");
        $table=$("#"+id+" "+".dashboard-item-extra-info");
        $table
            .append($("<tr />")
                .append($("<td rowspan='2' style='width:40%;min-width:40%;max-width:40%'/>")
                    .append($("<span style='padding-left:5px'/>").addClass("out-target primary-value"))
                    .append($("<span />").text(I18n.t('chart.line.out_of_target')))
                )
                .append($("<td />")
                    .append($("<span style='display:inline-block;width:59px'/>").text(I18n.t('chart.line.kpi_name')+":"))
                    .append($("<span style='color:rgba(245, 161, 51, 0.9)'/>").addClass("kpi-name primary-value"))
                )
                .append($("<td />")
                    .append($("<span style='display:inline-block;width:51px'/>").text(I18n.t('chart.line.record')+": "))
                    .append($("<span />").addClass("total-amount"))
                )
            )
            .append($("<tr />")
                .append($("<td />")
                    .append($("<span style='display:inline-block;width:59px'/>").text(I18n.t('chart.line.total')+": "))
                    .append($("<span />").addClass("total-value"))
                )
                .append($("<td />")
                    .append($("<span style='display:inline-block;width:51px'/>").text(I18n.t('chart.line.average')+": "))
                    .append($("<span />").addClass("average-value"))
                )
            )

    },
    column:function(id){
        $("#"+id+" "+".dashboard-item-extra-info").empty().css("height","50px");
        $("#"+id+" "+".db-chart-container").css("top","50px");
        $table=$("#"+id+" "+".dashboard-item-extra-info");
        $table
            .append(
                $("<tr />")
                    .append($("<td style='text-align:center;max-width:50%;min-width:50%;width:50%;'/>")
                        .append($("<span />").addClass("max-value primary-value"))
                        .append($("<span />").text(I18n.t('chart.column.max')))
                    )
                    .append($("<td style='text-align:center'/>")
                        .append($("<span />").addClass("min-value secondary-value"))
                        .append($("<span />").text(I18n.t('chart.column.min')))
                    )
            )

    },
    pie:function(id){
        $("#"+id+" "+".dashboard-item-extra-info").empty().css("height","50px");
        $("#"+id+" "+".db-chart-container").css("top","50px");
        $table=$("#"+id+" "+".dashboard-item-extra-info");
        $table
            .append(
                $("<tr />")
                    .append($("<td rowspan='2' style='text-align:center;max-width:60%;min-width:60%;width:60%;'/>")
                        .append($("<span />").addClass("percentage primary-value"))
                        .append($("<span />").addClass("pie-selected-name"))
                    )
                    .append($("<td style='text-align:left;'/>")
                        .append($("<span style='display:inline-block;width:60px;text-align:left;'/>").text(I18n.t('chart.pie.select')+": "))
                        .append($("<span />").addClass("selected-value"))
                    )
            )
            .append(
                $("<tr />")
                    .append($("<td style='text-align:left;'/>")
                        .append($("<span style='display:inline-block;width:60px;text-align:left;'/>").text(I18n.t('chart.pie.total')+": "))
                        .append($("<span />").addClass("pie-total-value"))
                    )
            )
    },
    scatter:function(id){
        $("#"+id+" "+".dashboard-item-extra-info").css("height","0px");
        $("#"+id+" "+".db-chart-container").css("top","0px");

    }
}
DASHBOARD.special_grab={
    line:function(option){
        var data=option.special_data,
            $table=$("#"+option.outer_target+" "+".dashboard-item-extra-info");
        $table.find(".out-target").text(data.out_of_target).attr("title",data.out_of_target);
        $table.find(".total-amount").text(data.total_record).attr("title",data.total_record);
        $table.find(".total-value").text(data.total_value).attr("title",data.total_value);
        $table.find(".average-value").text(data.average_value).attr("title",data.average_value);
        $table.find(".kpi-name").text(option.kpi).attr("title",option.kpi);
        $table.find("tr td span").each(function(){
            $(this).tipsy({gravity: 'se'});
        });
    },
    column:function(option){
        var max=$("#"+option.target).highcharts().yAxis[0].getExtremes().dataMax,
            min,series=$("#"+option.target).highcharts().series,min_template,i,
            $table=$("#"+option.outer_target+" "+".dashboard-item-extra-info");
        for(i=0;i<series.length;i++){
            if(i==0){
                min_template=[];
                min_template=deepCopy($("#"+option.target).highcharts().series[i].yData,min_template);
                min=min_template.sort(sortNumber)[0]
            }
            else{
                min_template=[];
                min_template=deepCopy($("#"+option.target).highcharts().series[i].yData,min_template);
                min=min_template.sort(sortNumber)[0]<min?min_template.sort(sortNumber)[0]:min;
            }
        }
        $table.find(".max-value").text(max).attr("title",max);
        $table.find(".min-value").text(min).attr("title",min);
        $table.find("tr td span").each(function(){
            $(this).tipsy({gravity: 'se'});
        });
    },
    pie:function(option){
        var pie_data=$("#"+option.target).highcharts().get("pie_extra_series").data, i,max,percent,name,total=0;
        for(i=0;i<pie_data.length;i++){
            total+=pie_data[i].y;
            if(pie_data[i].selected==true){
                max=pie_data[i].y;
                percent=(pie_data[i].percentage).toFixed(1);
                name=parseInt(option.count)>1?pie_data[i].kpi_name:pie_data[i].name;
            }
        }
        $table=$("#"+option.outer_target+" "+".dashboard-item-extra-info");
        $table.find(".percentage").text(percent+"%");
        $table.find(".pie-selected-name").text(name).attr("title",name);
        $table.find(".selected-value").text(max).attr("title",max);
        $table.find(".pie-total-value").text(total).attr("title",total);
        $table.find("tr td span").each(function(){
            $(this).tipsy({gravity: 'se'});
        });
    },
    scatter:function(option){

    }
}
function sortNumber(a, b)
{
    return a - b
}
DASHBOARD.add=DASHBOARD.add || {};
DASHBOARD.add.generate=function(option){
    var type=option.type,
        target=option.target,
        outer_target=option.outer_target;
    DASHBOARD.special_type[type](outer_target);
    var out_of_target= 0, i,total_value= 0;
    for(i=0;i<option.data.length;i++){
        var data=option.data[i];
        if(data.y<data.low || data.y>data.high){
            out_of_target++
        }
        total_value+=data.y
    }
    var special_data={
        out_of_target:out_of_target,
        total_record:option.data.length,
        total_value:total_value+option.data[0].unit,
        average_value:(total_value/option.data.length).toFixed(1)+option.data[0].unit
    }
    option.special_data=special_data;
    DASHBOARD.special_grab[type](option);
    if(option.theme!=null){
        var $target=$("#"+outer_target);
        $target.find(".dashboard-item-extra-info").css("backgroundColor","rgba(96,96,96,1)");
        $target.find(".dashboard-item-extra-info td").css("color","white");
        $target.find(".dashboard-item-extra-info .primary-value").css("color","#DDDF0D");
        $target.find(".dashboard-item-extra-info .secondary-value").css("color","#7798BF");
    }
}
