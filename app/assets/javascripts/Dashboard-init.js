/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-10-9
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */
var DASHBOARD=DASHBOARD || {} ;
var MANAGE=MANAGE || {} ;
DASHBOARD.init=function(){
    MANAGE.type=MANAGE.type || $("#manage-left-menu").attr("type");
    MANAGE.left.manage_left_add_init();
    MANAGE.left.manage_left_delete_init();
    MANAGE.left.manage_left_edit_init();
    DASHBOARD.init_high_chart();
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    $("body").on("click","#kpi-add-show",function(){
        var dashboard_id=$("#manage-left-menu>.active").attr("number");
        if(dashboard_id){
            $("#dashboard-add-page").css("display","block");
            $("#dashboard-add-left-menu>.select-div>div").css("width","120px");
        }else{
            MessageBox("Please Select One Dashboard","top","warning");
        }

        high_chart.plotOptions.series.events.legendItemClick=function(){
            var index=this.index;
            db_chartSeries.series.splice(index,1);
            this.remove(false);
            db_chartSeries.minusCount();
            $('#chart-container').highcharts().destroy();
            if(db_chartSeries.count==0){
                $("#db-chart-body").css("display","none");
                $("#add-dashboard").css("display","none");
                $("#db-chart-type-alternate").css("display","none");
//            $("#dashboard-name").css("display","none");
//            $("#dashboard-name-edit").css("display","none");
                $("#db-chart-type-alternate li").removeClass("active");
                $("#db-chart-interval-alternate li").removeClass("active");
                return;
            }
            else{
                var item, i,option, p,c;
                for(i=0;i<db_chartSeries.count;i++){
                    p=db_chartSeries.series[i];
                    c={};
                    item=deepCopy(p,c);
                    option = {
                        kpi: item.kpi,
                        id: item.id,
                        target: "chart-container",
                        begin_time: item.begin_time,
                        type: $("#db-chart-type-alternate li.active").attr("type"),
                        interval: $("#db-chart-interval-alternate li.active").attr("interval"),
                        data:item[$("#db-chart-interval-alternate li.active").attr("interval")],
                        count: i
                    }

                    if(i==0){
                        render_to(option);
                        create_environment_for_data(option);
                        new Highcharts.Chart(high_chart);
                    }

                    add_series(option);
                    proper_type_for_chart(option);
                }

            }
        };
        high_chart.chart.zoomType="xy";
    });
    $("body").on("click","dashboard-moreDetail>i",function(){
        var id=$(this).attr("effect_on");
        $("#dashBoard-show").find("#"+id).remove();
    });
}
DASHBOARD.init_high_chart=function(){
    high_chart.plotOptions.series.events.legendItemClick=function(event){};
    high_chart.chart.zoomType=null;
}

