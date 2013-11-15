/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-10-9
 * Time: 下午12:10
 * To change this template use File | Settings | File Templates.
 */
var DASHBOARD=DASHBOARD || {} ;
DASHBOARD.add=DASHBOARD.add || {};


var db_chartSeries = {
    count: 0,
    id_count:0,
    id:0,
    series: [],
    id_array:[],
    id_give:function(){
       if(this.count>this.id_array.length){
           this.id=this.id_count;
           this.id_array.push(this.id_count);
           this.id_count++;
       }
       else{
           var array=this.id_array, i,index;
           for(i=0;i<array.length;i++){
               if(array[i]===undefined){
                   array[i]=i;
                   index=i;
                   break
               }
           }
           this.id=index;
       }
    },
    getCount: function () {
        return this.count
    },
    addCount: function () {
        this.count += 1
    },
    minusCount: function () {
        this.count -= 1
    },
    getSeries: function () {
        return this.series
    },
    addSeries: function (series) {
        if(this.count>this.series.length){
            this.series.push(series)
        }
        else{
            var series_array=this.series,i;
            for(i=0;i<series_array.length;i++){
                if(series_array[i]===undefined){
                    series_array[i]=series;
                    break;
                }
            }
        }

    }
};


DASHBOARD.add.initial={};
DASHBOARD.add.initial.analytic_control_condition_visible=function(){
    var open_state = $("#analytic-control-condition-visible").attr("state");
    if (open_state=="open") {
        $("#left-content-title-add").css("top", "-80px");
        $("#db-chart-body").css("top", "23px");
        $("#analytic-control-condition-visible").attr("state", "close").removeClass("icon-chevron-up").addClass("icon-chevron-down");

    }
    else {
        $("#left-content-title-add").css("top", "0");
        $("#db-chart-body").css("top", "101px");
        $("#analytic-control-condition-visible").attr("state","open").removeClass("icon-chevron-down").addClass("icon-chevron-up");

    }
//
//    resize_chart.container();
}
DASHBOARD.add.close=function(){
    $("#dashboard-name-input").val("");
    $("#db-add-type li").removeClass("active");
    $("#db-add-type li").eq(0).addClass("active");
    $("#db-add-kpi-list").empty();
    $("#dashboard-group-name").val('').trigger('chosen:updated');
    $("#db-chart-body").css("display","none");
    $(".index-condition-group input:not([type='radio'])").val("");
    $(".index-condition-group select").val('').trigger('chosen:updated');
    $("[name='chartRadios']").eq(0).iCheck("check");
    $(".index-date-extra-info").text("");
    DASHBOARD.add.initial.analytic_control_condition_visible();
    if($("#chart-container").highcharts()!=undefined){
        $("#chart-container").highcharts().destroy();
    }
    $("#dashboard-add-wrap").css("display","none");
}
DASHBOARD.add.init=function(){
    $("#add-dashboard-show").on("click",function(){
       $("#dashboard-add-wrap").css("display","block");
       $("#dashboard-group-name+div").css("width","140px");
       $("#chart-group+div").css("width","130px");
       $("#chart-kpi+div").css("width","130px");
       $("#chart-view+div").css("width","130px");
       db_chartSeries = {
            count: 0,
            id_count:0,
            id:0,
            series: [],
            id_array:[],
            id_give:function(){
                if(this.count>this.id_array.length){
                    this.id=this.id_count;
                    this.id_array.push(this.id_count);
                    this.id_count++;
                }
                else{
                    var array=this.id_array, i,index;
                    for(i=0;i<array.length;i++){
                        if(array[i]===undefined){
                            array[i]=i;
                            index=i;
                            break
                        }
                    }
                    this.id=index;
                }
            },
            getCount: function () {
                return this.count
            },
            addCount: function () {
                this.count += 1
            },
            minusCount: function () {
                this.count -= 1
            },
            getSeries: function () {
                return this.series
            },
            addSeries: function (series) {
                if(this.count>this.series.length){
                    this.series.push(series)
                }
                else{
                    var series_array=this.series,i;
                    for(i=0;i<series_array.length;i++){
                        if(series_array[i]===undefined){
                            series_array[i]=series;
                            break;
                        }
                    }
                }

            }
        };
    });
    $("#close-add-dashboard").on("click",function(){
        DASHBOARD.add.close();
    });
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    $("header").css("box-shadow","0 2px 5px rgba(71,71,71,0.3)");

    $("#analytic-control-condition-visible,#add-one-series").on("click",DASHBOARD.add.initial.analytic_control_condition_visible);
    $("#db-add-type>li").on("click",function(event){
        var target=adapt_event(event).target;
        if($(this).hasClass("active")==false){
            if($(target).attr("type")=="line" && db_chartSeries.getCount()>1){
                MessageBox("Line type only support one series","top","warning");
            }
            else{
                $(this).siblings().removeClass("active");
                $(this).addClass('active');
                DASHBOARD.add.alternate_chart_type(event);
            }
        }
    });
    DASHBOARD.highchart_template_init();
    $("body").on("click","#db-add-kpi-list li i",function(){
        var id=parseInt($(this).attr("kpi_id"));
        delete db_chartSeries.id_array[id];
        delete db_chartSeries.series[id];
        db_chartSeries.minusCount();
        $("#chart-container").highcharts().get(id).remove(false);
        $('#chart-container').highcharts().destroy();
        if(db_chartSeries.count==0){
            $("#db-chart-body").css("display","none");
        }
        else{
            var item, i,option, p, c,new_count=0;
            for(i=0;i<db_chartSeries.series.length;i++){
                p=db_chartSeries.series[i];
                if(p!==undefined){
                    new_count++;
                    c={};
                    item=deepCopy(p,c);
                    option = {
                        kpi: item.kpi,
                        id: item.id,
                        target: "chart-container",
                        outer_target:"put-db-chart",
                        begin_time: item.begin_time,
                        type: $("#db-add-type>li.active").attr("type"),
                        interval: $("#db-chart-interval-alternate li.active").attr("interval"),
                        data:item[$("#db-chart-interval-alternate li.active").attr("interval")],
                        count: new_count
                    }
                    if(new_count-1==0){
                        render_to(option);
                        create_environment_for_data(option);
                        new Highcharts.Chart(high_chart);
                    }
                    add_series(option);
                    proper_type_for_chart(option);
                    DASHBOARD.add.generate(option);
                    limit_pointer_number(option);
                }
            }

        }
        $(this).parent().remove();
    });

    $("#chart-kpi").chosen().change(function(){
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        var target="#analy-begin-time,#analy-end-time";
        $(target).val("");
        $(".index-date-extra-info").text("");
        DATE_PICKER.shortcut_count=0;

        new DATE_PICKER[interval](target,"string").datePicker();
    });
    $("#chart-group").chosen().change(function(){
        $("#analy-begin-time,#analy-end-time").datepicker("remove");
        $("#analy-begin-time,#analy-end-time").datetimepicker("remove");
    });
    $("body").on("change","#analy-begin-time",function(){
        var interval = $("#chart-kpi").find(":selected").attr("interval");
            if (interval == "200") {
                var week=standardParse($(this).val()).date.toWeekNumber();
                $(this).next().text("week " + week);
            }
            else if (interval == "400") {
                var quarter=standardParse($(this).val()).date.monthToQuarter();
                $(this).next().text("quarter " + quarter);
            }
    }).on("change","#analy-end-time",function(){
            var interval = $("#chart-kpi").find(":selected").attr("interval");
                if (interval == "200") {
                    var week=standardParse($(this).val()).date.toWeekNumber();
                    $(this).next().text("week " + week);
                }
                else if (interval == "400") {
                    var quarter=standardParse($(this).val()).date.monthToQuarter();
                    $(this).next().text("quarter " + quarter);
                }
    });
    $("#chart-group").prepend($("<option />").attr("value", ""));
    $("#chart-group").val('').trigger('chosen:updated');
    $("#chart-kpi").val('').trigger('chosen:updated');
    $("#chart-view").prepend($("<option />").attr("value", ""));
    $("#chart-view").val('').trigger('chosen:updated');
    $("#chart-group").on("change", function (event) {
        var id = $(adapt_event(event).target).attr("value");
        $.ajax({
            url: '/kpis/categoried/'+id,
            dataType: "json",
            success: function (data) {
                $("#chart-kpi").empty().trigger('chosen:updated');
                for (var i = 0; i < data.length; i++) {
                    $("#chart-kpi").append($("<option />").attr("value", data[i].id).attr("interval", data[i].frequency).text(data[i].name));
                }
                $("#chart-kpi").prepend($("<option />").attr("value", ""));
                $("#chart-kpi").val('').trigger('chosen:updated');
            }
        });
    });
    $("body").on("click","#db-add-chart",DASHBOARD.add.prepare_form_chart);
    $("body").on("click","#add-dashboard",function(){
        if($.trim($("#dashboard-name-input").val()).length>0){
            if($("#db-add-kpi-list").children().length>0){
                if($("#dashboard-group-name :selected").text().length>0){
                    var post={},i;
                    post.dashboard_name=$("#dashboard-name-input").val();
                    post.type=$("#db-add-type li.active").attr("type");
                    post.interval=$("#db-chart-interval-alternate li.active").attr("interval");
                    post.dashboard_id = $("#dashboard-group-name :selected").attr("value");
                    post.series=[];
                    for(i=0;i<db_chartSeries.series.length;i++){
                        post.series[i]={};
                        post.series[i].kpi=db_chartSeries.series[i].kpi_id;
                        post.series[i].view=db_chartSeries.series[i].view;
                        post.series[i].average=db_chartSeries.series[i].method;
                        post.series[i].begin_time=db_chartSeries.series[i].begin_post ;
                        post.series[i].end_time=db_chartSeries.series[i].end_post;
                        post.series[i].count=i+1;
                    }
//                    DASHBOARD.init_high_chart();
                    prepare_to_create_db_view(post);
                }
                else{
                    MessageBox("please choose a dashboard group" , "top", "warning") ;
                }
            }
            else{
                MessageBox("please add one series at least" , "top", "warning") ;
            }
        }
        else{
            MessageBox("please give the dashboard a name " , "top", "warning") ;
            $("#dashboard-name-input").focus();
        }
    });

};
DASHBOARD.highchart_template_init=function(){
    high_chart.borderRadius=0;
    high_chart.chart.marginTop=0;
    high_chart.chart.spacingBottom=1;
    high_chart.legend.margin=0;
    high_chart.plotOptions.series.point.events={};
    high_chart.plotOptions.series.marker.lineColor=null;
    high_chart.plotOptions.line.marker.lineWidth=0;
    high_chart.plotOptions.line.showInLegend=false;
    high_chart.plotOptions.line.marker.radius=1;
    high_chart.xAxis.offset=-30;
    high_chart.xAxis.labels.style.fontSize="10px";
    high_chart.xAxis.labels.style.color="rgba(0,0,0,0.3)";
    high_chart.yAxis.gridLineColor="rgba(0,0,0,0.1)";
    high_chart.yAxis.gridLineDashStyle="dash";
    high_chart.yAxis.labels.enabled=false;
    high_chart.plotOptions.pie.dataLabels.enabled=true;
    high_chart.plotOptions.pie.dataLabels.distance=-1;
    high_chart.plotOptions.pie.dataLabels.color="rgba(0,0,0,0.5)";
    high_chart.plotOptions.pie.dataLabels.connectorColor="rgba(0,0,0,0.1)";
    high_chart.plotOptions.pie.dataLabels.style.fontSize="9px";
    high_chart.plotOptions.pie.point={};
    high_chart.plotOptions.pie.events={};
    high_chart.plotOptions.pie.events.click=function(){
        var $table=$("#"+this.chart.renderTo.id).prev(".dashboard-item-extra-info"), i,data,total=0,validate=true,name;
        for(i=0;i<this.data.length;i++){
            total+=this.data[i].y;
        }
        $table.find(".pie-total-value").text(total+this.data[0].unit);
    };
    high_chart.plotOptions.pie.point.events={};
    high_chart.plotOptions.pie.point.events.select=function(){
        var $table=$("#"+this.series.chart.renderTo.id).prev(".dashboard-item-extra-info"), i,data,total=0,validate=true,name;
        $table.find(".percentage").text((this.percentage).toFixed(1)+"%");
        name=this.series.chart.series.length>2?this.kpi_name:this.name;
        $table.find(".pie-selected-name").text(name);
        $table.find(".selected-value").text(this.y+this.unit);
    }
};

DASHBOARD.add.prepare_form_chart=function() {
    var kpi = $("#chart-kpi :selected").attr("value");
    var view = $("#chart-view :selected").attr("value");
    var method = $("input[name='chartRadios']:checked").attr("value");
    var type=$("#db-add-type>.active").attr("type");
    var interval, chart_body_close_validate;

    if ($("#db-chart-body").css("display") == "block") {
        chart_body_close_validate = false;
        interval=$("#db-chart-interval-alternate li.active").attr("interval")
    }
    else {
        chart_body_close_validate = true;
        interval =  $("#analy-begin-time").attr("interval")==undefined || $("#analy-begin-time").attr("interval").length==0?
            $("#chart-kpi :selected").attr("interval"):$("#analy-begin-time").attr("interval");
    }
    var begin_time = $("#analy-begin-time").attr("hide_value"), end_time = $("#analy-end-time").attr("hide_value"),
        begin_post, end_post;
    if (kpi && begin_time && view) {
        if(type=="line"&&db_chartSeries.getCount()>=1){
            MessageBox("Line type only support one series","top","warning")
        }
        else{

            if (end_time) {
                var compare_result = compare_time(begin_time, end_time);
                begin_time = compare_result.begin;
                end_time = compare_result.end;
            }
            else {
                end_time = begin_time
            }
            if( $("#analy-begin-time").attr("hide_post").indexOf("LAST")!=-1){
                begin_post=$("#analy-begin-time").attr("hide_post");
                end_post=begin_post;
            }
            else{
                begin_post=standardParse(begin_time).date.toISOString();
                end_post=standardParse(end_time).date.toISOString();
            }





       dashboard_show_loading("dashboard-add-inner","40px","0px","0px","200px");
       $.post('/kpi_entries/analyse',{
           kpi : kpi,
           average:method=="0",
           entity_group: view,
           startTime : standardParse(begin_time).date.toISOString() ,
           endTime : standardParse(end_time).date.toISOString(),
           interval:interval
       },function(msg){
           dashboard_remove_loading("dashboard-add-inner");
           if(msg.result){
               var option={
                   kpi:$("#chart-kpi :selected").text(),
                   target: "chart-container",
                   outer_target:"put-db-chart",
                   begin_time:begin_time,
                   type:type,
                   interval:interval,
                   count:db_chartSeries.getCount()+1
               }
               var addSeriesOption={
                   kpi:$("#chart-kpi :selected").text(),
                   kpi_id:kpi,
                   target: "chart-container",
                   outer_target:"put-db-chart",
                   interval:interval,
                   view:view,
                   method:method,
                   begin_time:begin_time,
                   end_time:end_time,
                   begin_post:begin_post,
                   end_post:end_post
               }

               db_chartSeries.addCount();
               db_chartSeries.id_give();
               option.id=db_chartSeries.id;
               addSeriesOption.id=db_chartSeries.id;
               var color=series_colors[option.id% series_colors.length];
               $("#db-add-kpi-list").append(
                    $("<li />")
                        .append($("<span />").css("backgroundColor",color))
                        .append($("<p />").text(option.kpi))
                        .append($("<i />").addClass("icon-remove").attr("kpi_id",option.id))
               );

               var length=msg.object.current.length;
               var data_array=[];
               for(var i=0;i<length;i++){
                   data_array[i]={};
                   data_array[i].y=msg.object.current[i];
                   data_array[i].low=msg.object.target_min[i];
                   data_array[i].high=msg.object.target_max[i];
                   data_array[i].unit=msg.object.unit[i];
                   data_array[i].id=option.id
               }

               if(chart_body_close_validate){
                   option.data=data_array;
                   addSeriesOption[interval]=data_array;
                   db_chartSeries.addSeries(addSeriesOption);

                   DASHBOARD.add.show_chart_body(option);
                   render_to(option);
                   create_environment_for_data(option);
                   new Highcharts.Chart(high_chart);
                   add_series(option);
                   proper_type_for_chart(option);

                   if(option.type=="line"&&db_chartSeries.getCount()==1){
                        var option_area={};
                        option_area=deepCopy(option,option_area);
                        option_area.type="arearange";
                        option_area.id="line-target";
                        option_area.count=db_chartSeries.getCount() + 1;
                        add_series(option_area);
                        proper_type_for_chart(option_area);
                    }
               }
               else{
                   option.data=data_array;
                   addSeriesOption[interval]=data_array;
                   db_chartSeries.addSeries(addSeriesOption);
                   add_series(option);
                   proper_type_for_chart(option);
               }
               limit_pointer_number(option);
               DASHBOARD.add.generate(option);
           }
           else{
               MessageBox("sorry , something wrong" , "top", "warning") ;
           }
       });
        $("#chart-container").resize(function(){
            if ($("#db-chart-type-alternate li.active").attr("type") == "pie") {
                for (var k = 0; k < $("#chart-container").highcharts().series.length; k++) {
                    $("#chart-container").highcharts().series[k].update({
                        showInLegend: false
                    })
                }
            }
        });





//            var option = {
//                kpi: $("#chart-kpi :selected").text(),
//                target: "chart-container",
//                outer_target:"put-db-chart",
//                begin_time: begin_time,
//                type: type,
//                interval: interval,
//                count: db_chartSeries.getCount() + 1
//            }
//            var addSeriesOption = {
//                kpi: $("#chart-kpi :selected").text(),
//                target: "chart-container",
//                outer_target:"put-db-chart",
//                kpi_id: kpi,
//                interval: interval,
//                view: view,
//                method: method,
//                begin_time: begin_time,
//                end_time: end_time,
//                begin_post: begin_post,
//                end_post: end_post
//            }
//
//            db_chartSeries.addCount();
//            db_chartSeries.id_give();
//            option.id=db_chartSeries.id;
//            addSeriesOption.id=db_chartSeries.id;
//            var color=series_colors[option.id% series_colors.length];
//            $("#db-add-kpi-list").append(
//                $("<li />")
//                    .append($("<span />").css("backgroundColor",color))
//                    .append($("<p />").text(kpi))
//                    .append($("<i />").addClass("icon-remove").attr("kpi_id",option.id))
//            );
//
//            if (chart_body_close_validate) {
//                option.data = [
//                    {y: 2,low:0,high:3, target: 10, unit: "$",id:option.id},
//                    {y: 3,low:2,high:20,  target: 10, unit: "$"},
//                    {y: 21,low:33,high:54 ,target: 10, unit: "$"},
//                    {y: 0,low:0,high:32, target: 10, unit: "$"},
//                    {y: 10, low: 2,high:43, target: 10, unit: "$"},
//                    {y: 7,low:1,high:43,  target: 10, unit: "$"}
//                ];
//                addSeriesOption[interval] = [
//                    {y: 2,low:1,high:3, target: 10, unit: "$",id:option.id},
//                    {y: 3,low:2,high:20,  target: 10, unit: "$"},
//                    {y: 21,low:33,high:54 ,target: 10, unit: "$"},
//                    {y: 3,low:2,high:32, target: 10, unit: "$"},
//                    {y: 10, low: 2,high:43, target: 10, unit: "$"},
//                    {y: 7,low:1,high:43,  target: 10, unit: "$"}
//                ];
//                db_chartSeries.addSeries(addSeriesOption);
//
//                DASHBOARD.add.show_chart_body(option);
//                render_to(option);
//                create_environment_for_data(option);
//                new Highcharts.Chart(high_chart);
//                add_series(option);
//                proper_type_for_chart(option);
//
//                if(option.type=="line"&&db_chartSeries.getCount()==1){
//                    var option_area={};
//                    option_area=deepCopy(option,option_area);
//                    option_area.type="arearange";
//                    option_area.id="line-target";
//                    option_area.count=db_chartSeries.getCount() + 1;
//                    add_series(option_area);
//                    proper_type_for_chart(option_area);
//                }
//            }
//            else {
//                option.data = [
//                    {y: 22,low:1,high:30, target: 10, unit: "$",id:option.id},
//                    {y: 23,low:2,high:200,  target: 10, unit: "$"},
//                    {y: 21,low: 33,high:54 ,target: 10, unit: "$"},
//                    {y: 23,low:2,high:320, target: 10, unit: "$"},
//                    {y: 20, low:2,high:423, target: 10, unit: "$"},
//                    {y: 27,low:1,high:403,  target: 10, unit: "$"}
//                ];
//                addSeriesOption[interval] = [
//                    {y: 22,low:1,high:30, target: 10, unit: "$",id:option.id},
//                    {y: 23,low:2,high:200,  target: 10, unit: "$"},
//                    {y: 21,low: 33,high:54 ,target: 10, unit: "$"},
//                    {y: 23,low:2,high:320, target: 10, unit: "$"},
//                    {y: 20, low:2,high:423, target: 10, unit: "$"},
//                    {y: 27,low:1,high:403,  target: 10, unit: "$"}
//                ];
//                db_chartSeries.addSeries(addSeriesOption);
//
//                add_series(option);
//                proper_type_for_chart(option);
//            }
//            limit_pointer_number(option);
////          new function
//            DASHBOARD.add.generate(option);
//
//            $("#chart-container").resize(function(){
//                if ($("#db-chart-type-alternate li.active").attr("type") == "pie") {
//                    for (var k = 0; k < $("#chart-container").highcharts().series.length; k++) {
//                        $("#chart-container").highcharts().series[k].update({
//                            showInLegend: false
//                        })
//                    }
//                }
//            });



        }
    }
    else {
        MessageBox("please fill all blanks in *", "top", "warning")
    }

};
DASHBOARD.add.show_chart_body=function(option){
    $("#db-chart-body").css("display","block");
    $("#add-dashboard").css("display","block");
    $("#dashboard-name-input").css("display","inline-block");
    $("#db-chart-type-alternate li[type='" + option.type + "']").addClass("active");
    $("#db-chart-interval-alternate").find("li").each(function () {
        $(this).bind("click", function (event) {
            var target = adapt_event(event).target;
            if (!$(target).hasClass("active")) {
                var option = {
                    interval: $(target).attr("interval"),
                    target: 'chart-container',
                    type: $("#db-add-type").find(".active").attr("type")
                }
                DASHBOARD.add.change_interval(option);
                $("#db-chart-interval-alternate").find("li").removeClass("active");
                $(target).addClass("active");
            }
        });
    });
    $("#db-chart-interval-alternate").find("li[interval='" + option.interval + "']").addClass("active");
}
DASHBOARD.add.alternate_chart_type=function(event) {
    if($("#db-chart-body:visible").length>0){
        var target = adapt_event(event).target;
            var option = {
                target: "chart-container",
                outer_target:"put-db-chart",
                type: $(target).attr("type"),
                count: db_chartSeries.getCount(),
                interval: $("#db-chart-interval-alternate li.active").attr("interval")
            }

            if($("#"+option.target).highcharts().get("line-target")!=undefined){
                $("#"+option.target).highcharts().get("line-target").remove();
            }
            for (var i = 0; i < db_chartSeries.series.length; i++) {
                if(db_chartSeries.series[i]===undefined){
                    continue;
                }
                else{
                    option.id = db_chartSeries.series[i].id;
                    option.kpi = db_chartSeries.series[i].kpi;
                    option.data=db_chartSeries.series[i][option.interval];
                    proper_type_for_chart(option);
                    DASHBOARD.add.generate(option);
                }
            }
            if(option.type=="line"&&db_chartSeries.getCount()==1){
                var id=$("#chart-container").highcharts().series[0].data[0].id;
                option.type="arearange";
                option.id="line-target";
                option.begin_time=db_chartSeries.series[id].begin_time;
                option.data=db_chartSeries.series[id][option.interval];
                add_series(option);
                proper_type_for_chart(option);
            }
            limit_pointer_number(option);
    }
}

DASHBOARD.add.change_interval=function(option) {
    var series_object, new_data_wrapper = [],count= 0,id_array=[];
    var chart = $("#" + option.target).highcharts();
    for (var i = 0; i < db_chartSeries.series.length; i++) {
        if(db_chartSeries.series[i]===undefined){
            continue;
        }
        else{
            var post_id=i;
            count++;
            id_array.push(i);
            series_object = db_chartSeries.series[i];
            if (series_object[option.interval]) {
                new_data_wrapper.push(series_object[option.interval])
            }
            else {

            show_loading(215,0,0,204);;
            $.ajax({url:'/kpi_entries/analyse',
                data:{
                    kpi : series_object.kpi_id,
                    average:series_object.method=="0",
                    entity_group: series_object.view,
                    startTime : standardParse(series_object.begin_time).date.toISOString() ,
                    endTime : standardParse(series_object.end_time).date.toISOString(),
                    interval: option.interval
                },
                type:'POST',
                async:false,
                success:function(msg){
                    remove_loading();
                    if(msg.result){
                        var length=msg.object.current.length;
                        var data_array=[];
                        for(var i=0;i<length;i++){
                            data_array[i]={};
                            data_array[i].y=msg.object.current[i];
                            data_array[i].id=post_id;
                            data_array[i].low=msg.object.target_min[i];
                            data_array[i].high=msg.object.target_max[i];
                            data_array[i].unit=msg.object.unit[i];
                        }
                        new_data_wrapper.push(data_array);
                        series_object[option.interval] = data_array;
                    }
                    else{
                        MessageBox("sorry , something wrong" , "top", "warning");
                    }
                }});

//                var data_array=[
//                    {y: 22,low:1,high:30, target: 10, unit: "$",id:post_id},
//                    {y: 23,low:2,high:200,  target: 10, unit: "$"},
//                    {y: 21,low: 33,high:54 ,target: 10, unit: "$"},
//                    {y: 23,low:2,high:320, target: 10, unit: "$"},
//                    {y: 20, low:2,high:423, target: 10, unit: "$"},
//                    {y: 27,low:1,high:403,  target: 10, unit: "$"}
//                ];
//                new_data_wrapper.push(data_array);
//                series_object[option.interval] = data_array;

            }
        }
    }
    if (new_data_wrapper.length == count) {
        chart.destroy();
        var option = {
            target: "chart-container",
            outer_target:"put-db-chart",
            type: option.type,
            interval: option.interval,
            count: db_chartSeries.getCount()
        };
        if (option.type == "pie") {
            for (var j = 0; j < id_array.length; j++) {
                var index=id_array[j];
                option.kpi = db_chartSeries.getSeries()[index]["kpi"];
                option.id = db_chartSeries.getSeries()[index]["id"];
                option.begin_time = db_chartSeries.getSeries()[index]["begin_time"];
                option.data = new_data_wrapper[j];
                if (j == 0) {
                    render_to(option);
                    create_environment_for_data(option);
                    new Highcharts.Chart(high_chart);
                }
                add_series(option);
                proper_type_for_chart(option);
                DASHBOARD.add.generate(option);
            }

        }
        else {
            for (var j = 0; j < id_array.length; j++) {
                var index=id_array[j];
                option.kpi = db_chartSeries.getSeries()[index]["kpi"];
                option.id = db_chartSeries.getSeries()[index]["id"];
                option.begin_time = db_chartSeries.getSeries()[index]["begin_time"];
                option.data = new_data_wrapper[j];
                if (j == 0) {
                    render_to(option);
                    create_environment_for_data(option);
                    new Highcharts.Chart(high_chart);
                }
                add_series(option);
                proper_type_for_chart(option);
                DASHBOARD.add.generate(option);
                if(option.type=="line"&&db_chartSeries.getCount()==1){
                    var id=$("#chart-container").highcharts().series[0].data[0].id;
                    option.type="arearange";
                    option.id="line-target";
                    option.begin_time=db_chartSeries.series[id].begin_time;
                    option.data=db_chartSeries.series[id][option.interval];
                    add_series(option);
                    proper_type_for_chart(option);
                }
            }
        }
        limit_pointer_number(option);

    }
}

