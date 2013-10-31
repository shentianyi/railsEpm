var DASHBOARD=DASHBOARD||{};
DASHBOARD.special_type={};

DASHBOARD.special_type={
    top_hide:function(){
        $("#chart-container-top").css("display","none");
        $("#chart-container").css("top","0px")
    },
    right_hide:function(){
        $("#chart-container-right").css("display","none");
        $("#chart-container").css("right","0px");
    },
    bottom_hide:function(){
        $("#chart-container-bottom").css("display","none");
        $("#chart-container").css("bottom","0px");
    },
    line:function(){
       this.top_hide();
       this.right_hide();
    },
    column:function(){
       this.right_hide();
       this.bottom_hide();
    },
    pie:function(){
       this.top_hide();
       this.bottom_hide();
    },
    scatter:function(){
       this.top_hide();
       this.bottom_hide();
    }
}
DASHBOARD.special_template={
    line:function(){
        high_chart.legend.enabled=false;
        high_chart.plotOptions.series.point.events={};
        high_chart.plotOptions.line.marker.enabled=false;
        high_chart.plotOptions.series.marker.enabled=false;
        high_chart.yAxis.labels.enabled=false;
        high_chart.xAxis.offset=0;
    }
}



