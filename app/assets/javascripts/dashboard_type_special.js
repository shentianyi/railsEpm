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
        $("#"+id+" "+".db-chart-container").css("right","200px");
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
    line:function(id,interval,target){
        var data=db_chartSeries.series[id][interval+"_info"],
            $tr=$("#"+target+" "+".chart-container-bottom table tr:first-of-type");
        $tr.find("td:nth-of-type(1)").text(data.out_of_target);
        $tr.find("td:nth-of-type(2)").text(data.total_record);
        $tr.find("td:nth-of-type(3)").text(data.total_value);
        $tr.find("td:nth-of-type(4)").text(data.average_value);
    },
    column:function(id,interval,target){
        var max,min, i,count=0,
            $tr=$("#"+target+" "+".chart-container-top table tr:first-of-type");
        for(i=0;i<db_chartSeries.series.length;i++){
          if(db_chartSeries.series[i]!==undefined){
              count++;
               if(count==1){
                   max=db_chartSeries.series[i][interval+"_info"].max_value;
                   min=db_chartSeries.series[i][interval+"_info"].min_value;
               }
              else{
                  if(db_chartSeries.series[i][interval+"_info"].max_value>max){
                      max=db_chartSeries.series[i][interval+"_info"].max_value;
                  }
                  if(db_chartSeries.series[i][interval+"_info"].min_value<min){
                      min=db_chartSeries.series[i][interval+"_info"].min_value;
                  }
               }
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



