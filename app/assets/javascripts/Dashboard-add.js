/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-10-9
 * Time: 下午12:10
 * To change this template use File | Settings | File Templates.
 */
var DASHBOARD=DASHBOARD || {} ;
DASHBOARD.add={};


var db_chartSeries = {
    count: 0,
    id_count:0,
    series: [],
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
        this.series.push(series)
    }
};



DASHBOARD.add.init=function(){
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
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
            url: '/kpis/get_by_category',
            dataType: "json",
            data: {
                id: id
            },
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


    $("body").on("click","#dashboard-name",function(){
            $("#dashboard-name-edit").css("display","inline-block").val($(this).find("p:first-of-type").text());
            $(this).css("display","none");
    });
    $("body").on("keyup","#dashboard-name-edit",function(event){
        var e=adapt_event(event).event;
        if(e.keyCode==13){
            $("#dashboard-name").css("display","inline-block").find("p:first-of-type").text($("#dashboard-name-edit").val());
            $("#dashboard-name-edit").val("").css("display","none");
        }
        else if(e.keyCode==27){
            $("#dashboard-name").css("display","inline-block");
            $("#dashboard-name-edit").val("").css("display","none");
        }
    });




    $("body").on("click","#db-add-chart",DASHBOARD.add.prepare_form_chart);
    $("body").on("click","#add-dashboard",function(){
        if($("#dashboard-name p:first-of-type").text().length>0){
            var post={},i;
            post.dashboard_name=$("#dashboard-name p:first-of-type").text();
            post.type=$("#db-chart-type-alternate li.active").attr("type");
            post.interval=$("#db-chart-interval-alternate li.active").attr("interval");
            post.dashboard_id = $("#manage-left-menu>.active").attr("number");
            post.series=[];
            for(i=0;i<db_chartSeries.series.length;i++){
                post.series[i]={};
                post.series[i].kpi=db_chartSeries.series[i].kpi_id;
                post.series[i].view=db_chartSeries.series[i].view;
                post.series[i].average=db_chartSeries.series[i].method;
                post.series[i].begin_time=db_chartSeries.series[i].begin_time ;
                post.series[i].end_time=db_chartSeries.series[i].end_time ;
                post.series[i].count=i+1;
            }
            console.log(post)
            prepare_to_create_db_view(post)
            /*
            $.post(
                "",
                {

                },
                function(data){

                }
            )
            */
            DASHBOARD.init_high_chart();
        }
        else{
            MessageBox("please give the dashboard a name (edit in up left)" , "top", "warning") ;
            $("#dashboard-name>i").css("color","#f5a133");
            $("#dashboard-name>i~p").css("color","#f5a133");
            setTimeout(function(){
               $("#dashboard-name>i").css("color","rgba(0,0,0,0.5)");
                $("#dashboard-name>i~p").css("color","rgba(0,0,0,0.5)");
            },3000);
        }
    });

    $("body").on("click","#add-back-db",function(){
        DASHBOARD.init_high_chart();
        $("#dashboard-add-page").css("display","none");
    });
};


DASHBOARD.add.prepare_form_chart=function() {
    var kpi = $("#chart-kpi :selected").attr("value");
    var view = $("#chart-view :selected").attr("value");
    var method = $("input[name='chartRadios']:checked").attr("value");
    var interval, type, chart_body_close_validate;

    if ($("#db-chart-body").css("display") == "block") {
        chart_body_close_validate = false;
        interval = $("#db-chart-interval-alternate").find(".active").attr("interval");
        type = $("#db-chart-type-alternate").find(".active").attr("type");
    }
    else {
        chart_body_close_validate = true;
        interval = $("#chart-kpi :selected").attr("interval");
        type = "line";
    }
    var begin_time = $("#analy-begin-time").attr("hide_value"), end_time = $("#analy-end-time").attr("hide_value");
    if (kpi && begin_time && view) {
        if (end_time) {
            var compare_result = compare_time(begin_time, end_time);
            begin_time = compare_result.begin;
            end_time = compare_result.end;
        }
        else {
            end_time = begin_time
        }


       show_loading(185,0,0,150);
       $.post('/kpi_entries/analyse',{
           kpi : kpi,
           average:method=="0",
           entity_group: view,
           startTime : standardParse(begin_time).date.toISOString() ,
           endTime : standardParse(end_time).date.toISOString(),
           interval:interval
       },function(msg){
           remove_loading()
           if(msg.result){
               var option={
                   kpi:$("#chart-kpi :selected").text(),
                   id:db_chartSeries.id_count,
                   target:"chart-container",
                   begin_time:begin_time,
                   type:type,
                   interval:interval,
                   count:db_chartSeries.getCount()+1
               }
               var addSeriesOption={
                   kpi:$("#chart-kpi :selected").text(),
                   kpi_id:kpi,
                   id:db_chartSeries.id_count,
                   interval:interval,
                   view:view,
                   method:method,
                   begin_time:begin_time,
                   end_time:end_time
               }
               var length=msg.object.current.length;
               var data_array=[];
               for(var i=0;i<length;i++){
                   data_array[i]={};
                   data_array[i].y=msg.object.current[i];
                   data_array[i].target=msg.object.target[i];
                   data_array[i].unit=msg.object.unit[i];
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

                   db_chartSeries.addCount();
                   db_chartSeries.id_count++;
               }
               else{
                   option.data=data_array;
                   addSeriesOption[interval]=data_array;
                   db_chartSeries.addSeries(addSeriesOption);

                   add_series(option);
                   proper_type_for_chart(option);

                   db_chartSeries.addCount();
                   db_chartSeries.id_count++;
               }
               limit_pointer_number(option);
//               clear_chart_condition();
           }
           else{
               MessageBox("sorry , something wrong" , "top", "warning") ;
           }
       });




//        var option = {
//            kpi: $("#chart-kpi :selected").text(),
//            id: db_chartSeries.id_count,
//            target: "chart-container",
//            begin_time: begin_time,
//            type: type,
//            interval: interval,
//            count: db_chartSeries.getCount() + 1
//        }
//        var addSeriesOption = {
//            kpi: $("#chart-kpi :selected").text(),
//            kpi_id: kpi,
//            id: db_chartSeries.id_count,
//            interval: interval,
//            view: view,
//            method: method,
//            begin_time: begin_time,
//            end_time: end_time
//        }
//        if (chart_body_close_validate) {
//
//            option.data = [
//                {y: 2, target: 10, unit: "$"},
//                {y: 3, target: 10, unit: "$"},
//                {y: 21, target: 10, unit: "$"},
//                {y: 3, target: 10, unit: "$"},
//                {y: 10, target: 10, unit: "$"},
//                {y: 7, target: 10, unit: "$"}
//            ];
//            addSeriesOption[interval] = [
//                {y: 2, target: 10, unit: "$"},
//                {y: 3, target: 10, unit: "$"},
//                {y: 21, target: 10, unit: "$"},
//                {y: 3, target: 10, unit: "$"},
//                {y: 10, target: 10, unit: "$"},
//                {y: 7, target: 10, unit: "$"}
//            ];
//            db_chartSeries.addSeries(addSeriesOption);
//            DASHBOARD.add.show_chart_body(option);
//
//
//            render_to(option);
//            create_environment_for_data(option);
//            new Highcharts.Chart(high_chart);
//            add_series(option);
//            proper_type_for_chart(option);
//
//            db_chartSeries.addCount();
//            db_chartSeries.id_count++;
//        }
//        else {
//            option.data = [
//                {y: 12, target: 15, unit: "$"},
//                {y: 3, target: 15, unit: "$"},
//                {y: 1, target: 15, unit: "$"},
//                {y: 13, target: 15, unit: "$"},
//                {y: 10, target: 15, unit: "$"},
//                {y: 17, target: 15, unit: "$"}
//            ];
//            addSeriesOption[interval] = [
//                {y: 12, target: 15, unit: "$"},
//                {y: 3, target: 15, unit: "$"},
//                {y: 1, target: 15, unit: "$"},
//                {y: 13, target: 15, unit: "$"},
//                {y: 10, target: 15, unit: "$"},
//                {y: 17, target: 15, unit: "$"}
//            ];
//            db_chartSeries.addSeries(addSeriesOption);
//
//            add_series(option);
//            proper_type_for_chart(option);
//
//            db_chartSeries.addCount();
//            db_chartSeries.id_count++;
//        }
//        limit_pointer_number(option);
////        clear_chart_condition();








    }
    else {
        MessageBox("please fill all blanks in *", "top", "warning")
    }

};
DASHBOARD.add.show_chart_body=function(option){
    $("#db-chart-body").css("display","block");
    $("#add-dashboard").css("display","block");
    $("#db-chart-type-alternate").css("display","block");
//    $("#dashboard-name").css("display","inline-block");


    $("#db-chart-type-alternate li[type='" + option.type + "']").addClass("active");
    $("#db-chart-type-alternate").find("li").each(function () {
        $(this).bind("click", DASHBOARD.add.alternate_chart_type)
    });
    $("body").on("click", "#db-chart-type-alternate li", function () {
        $("#db-chart-type-alternate li").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    });

    $("#db-chart-interval-alternate").find("li").each(function () {
        $(this).bind("click", function (event) {
            var target = adapt_event(event).target;
            if (!$(target).hasClass("active")) {
                var option = {
                    interval: $(target).attr("interval"),
                    target: 'chart-container',
                    type: $("#db-chart-type-alternate").find(".active").attr("type")
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
    var target = adapt_event(event).target;
    if (!$(target).hasClass("active")) {
        var option = {
            target: "chart-container",
            type: $(target).attr("type"),
            count: db_chartSeries.getCount(),
            interval: $("#db-chart-interval-alternate li.active").attr("interval")
        }
        for (var i = 0; i < db_chartSeries.series.length; i++) {
            option.id = db_chartSeries.series[i].id;
            proper_type_for_chart(option)
        }
        limit_pointer_number(option);
    }
}

DASHBOARD.add.change_interval=function(option) {
    var series_object, new_data_wrapper = [];
    var chart = $("#" + option.target).highcharts();
    for (var i = 0; i < db_chartSeries.getCount(); i++) {
        series_object = db_chartSeries.getSeries()[i];
        if (series_object[option.interval]) {
            new_data_wrapper.push(series_object[option.interval])
        }
        else {


            show_loading(185,0,0,150);;
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
                            data_array[i].target=msg.object.target[i];
                            data_array[i].unit=msg.object.unit[i];
                        }
                        new_data_wrapper.push(data_array);
                        series_object[option.interval] = data_array;
                    }
                    else{
                        MessageBox("sorry , something wrong" , "top", "warning");
                    }
                }});


//            var data_array=[{y:10,target:20,unit:"$"},{y:15,target:20,unit:"$"},{y:20,target:11,unit:"$"},{y:30,target:12,unit:"$"},{y:25,target:5,unit:"$"}];
//            new_data_wrapper.push(data_array);
//            series_object[option.interval] = data_array;


        }
    }
    if (new_data_wrapper.length == db_chartSeries.getCount()) {
        chart.destroy();
        var option = {
            target: "chart-container",
            type: option.type,
            interval: option.interval,
            count: db_chartSeries.getCount()
        };
        if (option.type == "pie") {
            for (var j = 0; j < db_chartSeries.getCount(); j++) {
                option.kpi = db_chartSeries.getSeries()[j]["kpi"];
                option.id = db_chartSeries.getSeries()[j]["id"];
                option.begin_time = db_chartSeries.getSeries()[j]["begin_time"];
                option.data = new_data_wrapper[j];
                if (j == 0) {
                    render_to(option);
                    create_environment_for_data(option);
                    new Highcharts.Chart(high_chart);
                }
                add_series(option);
            }
            proper_type_for_chart(option);
        }
        else {
            for (var j = 0; j < db_chartSeries.getCount(); j++) {
                option.kpi = db_chartSeries.getSeries()[j]["kpi"];
                option.id = db_chartSeries.getSeries()[j]["id"];
                option.begin_time = db_chartSeries.getSeries()[j]["begin_time"];
                option.data = new_data_wrapper[j];
                if (j == 0) {
                    render_to(option);
                    create_environment_for_data(option);
                    new Highcharts.Chart(high_chart);
                }
                add_series(option);
                proper_type_for_chart(option);
            }
        }
        limit_pointer_number(option);

    }
}

