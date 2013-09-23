////////////////////////////////////////////////////////////////////////////////init select

//where to record series
var chartSeries = {
    count: 0,
    series: [],
    getCount: function () {
        return this.count
    },
    addCount: function () {
        this.count += 1
    },
    getSeries: function () {
        return this.series
    },
    addSeries: function (series) {
        this.series.push(series)
    }
}
function init_analytics() {
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    $("#chart-kpi").chosen().change(function(){
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        var target="#analy-begin-time,#analy-end-time";
        $(target).val("");
        $(".index-date-extra-info").text("");
        $("#analy-begin-time,#analy-end-time").datepicker().on("changeDate", function () {
            var interval = $("#chart-kpi").find(":selected").attr("interval");
            if (interval == "200") {
                var week = $(".datepicker").find(".active").prevAll(".cw").text();
                $(this).next().text("week " + week);
            }
            else if (interval == "400") {
                var quarter = new Date($(this).val()).monthToQuarter();
                $(this).next().text("quarter " + quarter);
            }
        });
        new DATE_PICKER[interval](target,true).datePicker();
    });
    resize_chart.body();
    resize_chart.container();
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
    })
}

function analytic_control_condition_visible() {
    var open_state = $("#analytic-control-condition-visible").attr("open");
    if (open_state) {
        $("#analytics-condition").css("top", "48px");
        $("#chart-body").css("top", "23px").height(parseInt($("#chart-body").height()) + 87);
        $("#analytics-condition-invisible-mark").css("display", "block");
        $("#analytic-control-condition-visible").attr("open", false).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        if ($("#loading").length > 0) {
            $("#loading").css("top", parseInt($("#analytics-condition").height()) + 48);
        }
    }
    else {
        $("#analytics-condition").css("top", "135px");
        $("#chart-body").css("top", "110px").height(parseInt($("#chart-body").height()) - 87);
        $("#analytics-condition-invisible-mark").css("display", "none");
        $("#analytic-control-condition-visible").attr("open", true).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        if ($("#loading").length > 0) {
            $("#loading").css("top", parseInt($("#analytics-condition").height()) + 135);
        }
    }

    resize_chart.container();
}
function prepare_form_chart() {
    var kpi = $("#chart-kpi :selected").attr("value");
    var view = $("#chart-view :selected").attr("value");
    var method = $("input[name='chartRadios']:checked").attr("value");
    var interval, type, chart_body_close_validate
    if ($("#chart-body").css("display") == "block") {
        chart_body_close_validate = false;
        interval = $("#chart-interval-alternate").find(".active").attr("interval");
        type = $("#chart-type-alternate").find(".active").attr("type");
    }
    else {
        chart_body_close_validate = true;
        interval = $("#chart-kpi :selected").attr("interval");
        type = "line";
    }
    var begin_time = $("#analy-begin-time").val(), end_time = $("#analy-end-time").val();
    if (kpi && begin_time && view) {
        if (end_time) {
            var compare_result = compare_time(begin_time, end_time);
            begin_time = compare_result.begin;
            end_time = compare_result.end;
        }
        else {
            end_time = begin_time
        }
        var top = parseInt($("#analytics-condition").height()) + parseInt($("#analytics-condition").css("top"));


        show_loading(top,0,0,0);
        $.post('/kpi_entries/analyse',{
            kpi : kpi,
            average:method=="0",
            entity_group: view,
            startTime : HIGH_CHART.postPrepare(begin_time,interval) ,
            endTime : HIGH_CHART.postPrepare(end_time,interval),
            interval:interval
        },function(msg){
            remove_loading()
            if(msg.result){
                var option={
                    kpi:$("#chart-kpi :selected").text(),
                    id:chartSeries.getCount(),
                    target:"chart-container",
                    begin_time:begin_time,
                    type:type,
                    interval:interval,
                    count:chartSeries.getCount()+1
                }
                var addSeriesOption={
                    kpi:$("#chart-kpi :selected").text(),
                    kpi_id:kpi,
                    id:chartSeries.getCount(),
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
                    chartSeries.addSeries(addSeriesOption);
                    show_chart_body(option);


                    render_to(option);
                    create_environment_for_data(option);
                    new Highcharts.Chart(high_chart);
                    add_series(option);
                    proper_type_for_chart(option);

                    chartSeries.addCount();
                }
                else{
                    option.data=data_array;
                    addSeriesOption[interval]=data_array;
                    chartSeries.addSeries(addSeriesOption);

                    add_series(option);
                    proper_type_for_chart(option);

                    chartSeries.addCount();
                }
                limit_pointer_number(option);
                clear_chart_condition();
            }
            else{
                MessageBox("sorry , something wrong" , "top", "warning") ;
            }
        });




//        var option = {
//            kpi: $("#chart-kpi :selected").text(),
//            id: chartSeries.getCount(),
//            target: "chart-container",
//            begin_time: begin_time,
//            type: type,
//            interval: interval,
//            count: chartSeries.getCount() + 1
//        }
//        var addSeriesOption = {
//            kpi: $("#chart-kpi :selected").text(),
//            kpi_id: kpi,
//            id: chartSeries.getCount(),
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
//            chartSeries.addSeries(addSeriesOption);
//            show_chart_body(option);
//
//
//            render_to(option);
//            create_environment_for_data(option);
//            new Highcharts.Chart(high_chart);
//            add_series(option);
//            proper_type_for_chart(option);
//
//            chartSeries.addCount();
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
//            chartSeries.addSeries(addSeriesOption);
//
//            add_series(option);
//            proper_type_for_chart(option);
//
//            chartSeries.addCount();
//        }
//        limit_pointer_number(option);
//        clear_chart_condition();





    }
    else {
        MessageBox("please fill all blanks in *", "top", "warning")
    }
}
function show_chart_body(option) {
    $("#chart-body").css("display", "block");
    $("#chart-type-alternate td").hover(function () {
        $("#chart-type-alternate td").each(function () {
            $(this).css("width", '10%').removeClass("image").find("p").css("display", "block");
        });
        $(this).css("width", "70%").addClass("image").find("p").css("display", "none");
    }, function () {
        $("#chart-type-alternate td").each(function () {
            $(this).css("width", '10%').removeClass("image").find("p").css("display", "block");
        });
        $("#chart-type-alternate td.active").css("width", "70%").addClass("image").find("p").css("display", "none");
    });
    $("body").on("click", "#chart-type-alternate td", function () {
        $("#chart-type-alternate td").each(function () {
            $(this).removeClass("active image").find("p").css("display", "block");
        });
        $(this).addClass("active image").find("p").css("display", "none");
    });
    $("#chart-type-alternate td").each(function () {
        $(this).css("width", '10%').removeClass("image").find("p").css("display", "block");
    });
    $("#chart-type-alternate td[type='" + option.type + "']").css("width", "70%").addClass("image active").find("p").css("display", "none");
    $("#chart-type-alternate").find("td").each(function () {
        $(this).bind("click", alternate_chart_type)
    });

    $("#chart-interval-alternate").find("li").each(function () {
        $(this).bind("click", function (event) {
            var target = adapt_event(event).target;
            if (!$(target).hasClass("active")) {
                var option = {
                    interval: $(target).attr("interval"),
                    target: 'chart-container',
                    type: $("#chart-type-alternate").find(".active").attr("type")
                }
                change_interval(option);
                $("#chart-interval-alternate").find("li").removeClass("active");
                $(target).addClass("active");
            }
        });
    });
    $("#chart-interval-alternate").find("li[interval='" + option.interval + "']").addClass("active");
}
function alternate_chart_type(event) {
    var target = adapt_event(event).target;
    if (!$(target).hasClass("active")) {
        var option = {
            target: "chart-container",
            type: $(target).attr("type"),
            count: chartSeries.getCount(),
            interval: $("#chart-interval-alternate li.active").attr("interval")
        }
        for (var i = 0; i < chartSeries.series.length; i++) {
            option.id = chartSeries.series[i].id;
            proper_type_for_chart(option)
        }
        limit_pointer_number(option);
    }
}

function change_interval(option) {
    var series_object, new_data_wrapper = [];
    var chart = $("#" + option.target).highcharts();
    for (var i = 0; i < chartSeries.getCount(); i++) {
        series_object = chartSeries.getSeries()[i];
        if (series_object[option.interval]) {
            new_data_wrapper.push(series_object[option.interval])
        }
        else {
            var top = parseInt($("#analytics-condition").height()) + parseInt($("#analytics-condition").css("top"));
            option.start="sadsa"
            console.log(option)
            show_loading(top,0,0,0);
            $.ajax({url:'/kpi_entries/analyse',
            data:{
                kpi : series_object.kpi_id,
                average:series_object.method=="0",
                entity_group: series_object.view,
                startTime : HIGH_CHART.postPrepare(series_object.begin_time,option.interval) ,
                endTime : HIGH_CHART.postPrepare(series_object.end_time,option.interval),
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
        }
    }
    if (new_data_wrapper.length == chartSeries.getCount()) {
        chart.destroy();
        var option = {
            target: "chart-container",
            type: option.type,
            interval: option.interval,
            count: chartSeries.getCount()
        };
        if (option.type == "pie") {
            for (var j = 0; j < chartSeries.getCount(); j++) {
                option.kpi = chartSeries.getSeries()[j]["kpi"];
                option.id = chartSeries.getSeries()[j]["id"];
                option.begin_time = chartSeries.getSeries()[j]["begin_time"];
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
            for (var j = 0; j < chartSeries.getCount(); j++) {
                option.kpi = chartSeries.getSeries()[j]["kpi"];
                option.id = chartSeries.getSeries()[j]["id"];
                option.begin_time = chartSeries.getSeries()[j]["begin_time"];
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
var resize_chart = {
    body: function () {
        $("#chart-body").height(parseInt($(window).height()) - parseInt($("#analytics-condition").height()) - parseInt($("#analytics-condition").css("top")) - 1 >= 0 ?
            parseInt($(window).height()) - parseInt($("#analytics-condition").height()) - parseInt($("#analytics-condition").css("top")) - 1 : 0);
    },
    container: function () {
        $("#chart-main-middle").height(parseInt($("#chart-body").height()) - parseInt($("#chart-interval-alternate").attr("my_height")) - parseInt($("#chart-type-alternate").attr("my_height")) - 1);
        $("#chart-container").height(parseInt($("#chart-main-middle").height()));
        if ($("#chart-container").highcharts()) {
            var chart = $("#chart-container").highcharts();
            chart.setSize(
                $("#chart-main-middle").width(),
                $("#chart-main-middle").height(),
                false
            );
        }
        if ($("#chart-type-alternate td.active").attr("type") == "pie") {
            for (var k = 0; k < $("#chart-container").highcharts().series.length; k++) {
                $("#chart-container").highcharts().series[k].update({
                    showInLegend: false
                })
            }
        }
    }
}

function clear_chart_condition() {
    $("#analytics-condition").find("input[type='text']").each(function () {
        $(this).val("");
    });
//    $("#chart-view").val('').trigger('chosen:updated');
    $(".index-date-extra-info").text("");
}


function chart_point_click(object) {
    $("#chart-point-detail").css("left", "0");
    $("#chart-container").css("left", "320px");
    if (object.series.type == "pie") {
        if (object.time_from != null) {
            $("#chart-detail-kpi").text(object.series.name[object.seriesId]).css("color", object.color);
            $("#chart-detail-date").text(object.time_from).prev().text("From:");
            $("#chart-detail-end-date").text(object.time_to).parent().removeClass("hide");
            $("#chart-detail-target").text(object.target + " " + object.unit).prev().text("Sum Target");
            $("#chart-detail-aver-target").text(object.average_target + " " + object.unit).parent().removeClass("hide");
            $("#chart-detail-value").text(object.y + " " + object.unit).prev().text("Sum Value");
            $("#chart-detail-tcr").text(TCR(object.y, object.target).value);
            tcr_trend(TCR(object.y, object.target).judge);
            $("#chart-detail-aver-date").text(object.average_y + " " + object.unit).parent().removeClass("hide");
            $("#chart-detail-percent").text((object.percentage).toFixed(1) + " %").parent().removeClass("hide");
        }
        else {
            $("#chart-detail-kpi").text(object.series.name).css("color", object.color);
            $("#chart-detail-date").text(object.name).prev().text("Date:");
            $("#chart-detail-target").text(object.target + " " + object.unit).prev().text("Target");
            $("#chart-detail-value").text(object.y + " " + object.unit).prev().text("Value:");
            $("#chart-detail-tcr").text(TCR(object.y, object.target).value);
            tcr_trend(TCR(object.y, object.target).judge);
            $("#chart-detail-end-date").parent().addClass("hide");
            $("#chart-detail-aver-date").parent().addClass("hide");
            $("#chart-detail-aver-target").parent().addClass("hide");
            $("#chart-detail-percent").text((object.percentage).toFixed(1) + " %").parent().removeClass("hide");
        }

    }
    else {
        $("#chart-detail-kpi").text(object.series.name).css("color", object.series.color);
        $("#chart-detail-date").text(object.name).prev().text("Date:");
        $("#chart-detail-target").text(object.target + " " + object.unit).prev().text("Target");
        $("#chart-detail-value").text(object.y + " " + object.unit).prev().text("Value:");
        $("#chart-detail-tcr").text(TCR(object.y, object.target).value);
        tcr_trend(TCR(object.y, object.target).judge);
        $("#chart-detail-end-date").parent().addClass("hide");
        $("#chart-detail-aver-date").parent().addClass("hide");
        $("#chart-detail-percent").parent().addClass("hide");
        $("#chart-detail-aver-target").parent().addClass("hide");
    }
}
function close_chart_detail() {
    $("#chart-point-detail").css("left", "-300px");
    $("#chart-container").css("left", "0px");
}
function tcr_trend(judge) {
    switch (judge) {
        case "low":
            $("#chart-detail-tcr").attr("class", "");
            $("#chart-detail-tcr").addClass("tcr-trend low");
            break;
        case "middle":
            $("#chart-detail-tcr").attr("class", "");
            $("#chart-detail-tcr").addClass("tcr-trend middle");
            break;
        case "high":
            $("#chart-detail-tcr").attr("class", "");
            $("#chart-detail-tcr").addClass("tcr-trend high");
            break;
    }
}










