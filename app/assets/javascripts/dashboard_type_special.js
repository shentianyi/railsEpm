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
    pie:function(id,interval){

    },
    scatter:function(id,interval){

    }
}
function sortNumber(a, b)
{
    return a - b
}

DASHBOARD.add.generate=function(option){
    console.log(option);
    var type=option.type,
        outer_target=option.outer_target
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
    DASHBOARD.special_grab[type](option)
}
