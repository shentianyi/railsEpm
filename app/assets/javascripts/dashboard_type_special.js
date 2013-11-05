var DASHBOARD=DASHBOARD||{};
DASHBOARD.special_type={};

DASHBOARD.special_type={
    top_hide:function(id){
        $("#"+id+" "+".chart-container-top").css("display","none");
        $("#"+id+" "+".db-chart-container").css("top","0px");
        $("#"+id+" "+".chart-container-right").css("top","0px");
    },
    right_hide:function(id){
        $("#"+id+" "+".chart-container-right").css("display","none");
        $("#"+id+" "+".db-chart-container").css("right","0px");
    },
    bottom_hide:function(id){
        $("#"+id+" "+".chart-container-bottom").css("display","none");
        $("#"+id+" "+".db-chart-container").css("bottom","0px");
        $("#"+id+" "+".chart-container-right").css("bottom","0px");
    },
    top_show:function(id){
        $("#"+id+" "+".chart-container-top").css("display","block");
        $("#"+id+" "+".db-chart-container").css("top","85px");
        $("#"+id+" "+".chart-container-right").css("top","85px");
    },
    right_show:function(id){
        $("#"+id+" "+".chart-container-right").css("display","block");
        $("#"+id+" "+".db-chart-container").css("right","278px");
    },
    bottom_show:function(id){
        $("#"+id+" "+".chart-container-bottom").css("display","block");
        $("#"+id+" "+".db-chart-container").css("bottom","80px");
        $("#"+id+" "+".chart-container-right").css("bottom","80px");
    },
    line:function(id){
       this.top_hide(id);
       this.right_hide(id);
       this.bottom_show(id);
    },
    column:function(id){
       this.right_hide(id);
       this.bottom_hide(id);
       this.top_show(id);
    },
    pie:function(id){
       this.top_hide(id);
       this.bottom_hide(id);
       this.right_show(id);
       $("#"+id+" "+".chart-container-right-scatter").css("display","none");
    },
    scatter:function(id){
       this.top_hide(id);
       this.bottom_hide(id);
       this.right_hide(id);

    }
}
DASHBOARD.special_grab={
    line:function(option){
        var data=option.special_data,
            $tr=$("#"+option.outer_target+" "+".chart-container-bottom table tr:first-of-type");
        $tr.find("td:nth-of-type(1)").text(data.out_of_target);
        $tr.find("td:nth-of-type(2)").text(data.total_record);
        $tr.find("td:nth-of-type(3)").text(data.total_value);
        $tr.find("td:nth-of-type(4)").text(data.average_value);
        $tr.find("td:nth-of-type(5)").text(option.kpi);
    },
    column:function(option){
        var max=$("#"+option.target).highcharts().yAxis[0].getExtremes().dataMax,
            min,series=$("#"+option.target).highcharts().series,min_template,i,
            $tr=$("#"+option.outer_target+" "+".chart-container-top table tr:first-of-type");
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
        $tr.find("td:nth-of-type(1)").text(max);
        $tr.find("td:nth-of-type(2)").text(min);
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
        $data_target=$("#"+option.outer_target+" "+".chart-container-right");
        $data_target.find("p:first-of-type").text(percent+"%");
        $data_target.find("p:nth-of-type(2)").text(name);
        $data_target.find("table tr:first-of-type td:first-of-type").text(max);
        $data_target.find("table tr:nth-of-type(2) td:first-of-type").text(total);
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

    if(option.outer_target!="put-db-chart"){
        var t=setTimeout(function(){
            var width=parseInt($("#"+target).width());
            var height=parseInt($("#"+target).height());
            $("#"+target).highcharts().setSize(width,height);
        },"1500");
    }


//    alert($("#"+target).height());
//    alert($("#"+target).width());
//    $("#"+target).highcharts()
}
