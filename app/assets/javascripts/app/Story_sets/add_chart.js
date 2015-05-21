define(["jquery","datepicker","../../highchart/chart-util","base","chosen","highcharts","jquery.tipsy"],function($,Datepicker,ChartUtil,Base,Chosen,Highcharts){
    function choseInit(){
        Chosen.init_with_width(["#type","#kpi","#view"],[270,270,270]);
        Chosen.change("#type",function(){
            var type_id=$("#type :selected").attr("value");
            ChartUtil.get_kpi_via_type(type_id,function(data){
                $("#kpi").empty().trigger('chosen:updated');
                for (var i = 0; i < data.length; i++) {
                    $("#kpi").append($("<option />").attr("value", data[i].id).text(data[i].name));
                }
                $("#kpi").prepend($("<option />").attr("value", ""));
                $("#kpi").val("").trigger('chosen:updated');
            });
        })
    }
    function clear_conditions(){
        $("#kpi").empty();
        Chosen.all_update();
    }
    function datePickerInit(){
        Datepicker.datepicker("#date-range");
        $("#switch-btn").tipsy({gravity:"s"});
        $("input[type='number']").on("keyup",function(event){
            var target=Base.adapt_event(event).target;
            Base.inputOnlyPositiveNumber(target);
        })
    }
    function bindEvent(){
        $("#switch-btn").on("click",function(){
            var type=$(this).attr("current_type");
            if(!type || type==="range"){
                //switch to precise
                $(this).attr("current_type","precise");
                $("#date-precise").addClass("appear").removeClass("disappear");
                $("#date-range").addClass("disappear").removeClass("appear");
            }
            else{
                //switch to range
                $(this).attr("current_type","range");
                $("#date-range").addClass("appear").removeClass("disappear");
                $("#date-precise").addClass("disappear").removeClass("appear");
            }
        });
        $("#add-chart").on("click",function(){
            //这里只写了day range，没有写如果取得是最近几周什么的如何去生成
            var option={
                kpi_id:$("#kpi :selected").attr("value"),
                view_id:$("#view :selected").attr("value"),
                //beginDate:new Date($("#date-range").find("input[name='start']").val()).toISOString(),
                //endDate:new Date($("#date-range").find("input[name='end']").val()).toISOString()
            };
            ChartUtil.analytics(option,function(object){
                 addChart(object);
            });
        });
        $("#clear-all").on("click",function(){
            clearAll();
        });
        $("#chart-type").on("click",function(event){
            var $target=$(Base.adapt_event(event).target),
                type=$target.attr("name");
            if(!$target.hasClass("active")){
                if(judge_pie_only_one(type)){
                    $("#chart-type").find("li").removeClass("active");
                    $target.addClass("active");
                    Highcharts.changeType(ChartUtil.current_chart,type);
                }
            }
        })
    }
    function addChart(object){
        var category=object.date,
            data=object.data;
        var option={
            type:"line",
            categories:category,
            container:"chart-container"
        }
        if(!ChartUtil.current_chart){
            $("#add-chart-right").css("display","block");
            $("#chart-type").find("[name='line']").addClass("active");
            ChartUtil.current_chart=Highcharts.Chart(option,data);
        }
        else{
            var type=$("#chart-type").find(".active").attr("name");
            if(judge_pie_only_one(type)){
                Highcharts.addSeries(ChartUtil.current_chart,object.data,type);
            }
        }

    }
    function clearAll(){
       ChartUtil.current_chart.destroy();
       ChartUtil.current_chart=null;
       $("#add-chart-right").css("display","none");
    }
    function judge_pie_only_one(type){
        if(ChartUtil.current_chart){
            var count=ChartUtil.current_chart.series.length,
                type=type?type:$("#chart-type").find(".active").attr("name");
            if(type==="pie" && count>1){
                Base.MessageBox("pie special","top","warning");
                return false;
            }
        }
        return true;
    }
    return{
        init:function(){
            choseInit();
            datePickerInit();
            bindEvent();
        }
    }
})