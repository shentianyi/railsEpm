////////////////////////////////////////////////////////////////////////////////init select
var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {allow_single_deselect: true},
    '.chosen-select-no-single': {disable_search_threshold: 10},
    '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
    '.chosen-select-width': {width: "95%"}
}

function init_analytics() {
    var target = "#analy-begin-time,#analy-end-time";
    var interval_target = "#chart-kpi";
    date_and_datetime.unit_them_at_begin(target, interval_target);
    $(".chosen-select").chosen({
        disable_search_threshold: 7
    });
    $("#chart-kpi").change(function () {
        var interval = $(this).find(":selected").attr("interval");
        form_date_or_time_picker(interval, target);
    });
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
    resize_chart.body();
    resize_chart.container();
}
function analytic_control_condition_visible() {
    var open_state = $("#analytic-control-condition-visible").attr("open");
    var validate = false, chart;
    if (open_state) {
        $("#analytics-condition").css("top", "48px");
        $("#chart-body").css("top", "23px").height(parseInt($("#chart-body").height()) + 87);
        $("#analytics-condition-invisible-mark").css("display", "block");
        $("#analytic-control-condition-visible").attr("open", false).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
    else {
        $("#analytics-condition").css("top", "135px");
        $("#chart-body").css("top", "110px").height(parseInt($("#chart-body").height()) - 87);
        $("#analytics-condition-invisible-mark").css("display", "none");
        $("#analytic-control-condition-visible").attr("open", true).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    resize_chart.container();
}
function form_date_or_time_picker(interval, target) {
    $(target).val("");
    $(".index-date-extra-info").text("");
    date_and_datetime.remove_date_picker_model(target);
    switch (interval) {
        case "90":
            date_and_datetime.dateTimepickerPicker(target, spec_option['hour']);
            break;
        case "100":
            date_and_datetime.datePicker(target, spec_option['day']);
            break;
        case "200":
            date_and_datetime.datePicker(target, spec_option['week']);
            date_and_datetime.week_picker_decorate(target);
            break;
        case "300":
            date_and_datetime.datePicker(target, spec_option['month']);
            break;
        case "400":
            date_and_datetime.datePicker(target, spec_option['quarter']);
            break;
        case "500":
            date_and_datetime.datePicker(target, spec_option['year']);
            break;
        default:
            return false
    }
}
function prepare_form_chart() {
    var kpi = $("#chart-kpi :selected").text();
    var view = $("#chart-view :selected").text();
    var method = $("input[name='chartRadios']:checked").attr("value");
    var interval,type,chart_body_close_validate
    if($("#chart-body").css("display")=="block"){
        chart_body_close_validate=false;
        interval=$("#chart-interval-alternate").find(".active").attr("interval");
        type=$("#chart-type-alternate").find(".active").attr("type");
    }
    else{
        chart_body_close_validate=true;
        interval = $("#chart-kpi :selected").attr("interval");
        type="line";
    }
    var begin_time = $("#analy-begin-time").val(), end_time = $("#analy-end-time").val();
    if (kpi, begin_time) {
        if (end_time) {
            var compare_result = compare_time(begin_time, end_time);
            begin_time = compare_result.begin;
            end_time = compare_result.end;
        }
        else {
            end_time = begin_time
        }
        chart.series.push({
            kpi:kpi,
            view:view,
            method:method,
            begin_time:standardParse(begin_time).date.toISOString(),
            end_time:standardParse(end_time).date.toISOString()
        });
        chart.count++;
        $("#chart-body").css("display","block");
        form_chart("chart-container",begin_time,type,interval,[{y:2},{y:3},{y:21},{y:3},{y:10},{y:7},{y:3},{y:1},{y:17},{y:13}]);
        ;
        if(chart_body_close_validate){
            show_chart_body(interval);
        }
        clear_chart_condition();
    }
    else {
        MessageBox("u fuckin' blind  ???  fill those * blank" , "top", "warning")
    }
}
function form_chart(target,begin_time,type,interval,data){
    var wzx=new interval_template(begin_time,data);
    var btt=new high_chart(target, type_template[type], wzx['_'+interval]());
    new Highcharts.Chart(btt);

}
function show_chart_body(interval){
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
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    });
    $("#chart-interval-alternate").find("li").each(function(){
        $(this).removeClass("active");
    }).find("li[interval='"+interval+"']").addClass("active");
}
var resize_chart={
    body:function(){
        $("#chart-body").height(parseInt($(window).height()) - parseInt($("#analytics-condition").height())-parseInt($("#analytics-condition").css("top")) - 1 >= 0 ?
            parseInt($(window).height()) - parseInt($("#analytics-condition").height())-parseInt($("#analytics-condition").css("top")) - 1: 0);
    },
    container:function(){
        $("#chart-container").height(parseInt($("#chart-body").height()) - parseInt($("#chart-interval-alternate").attr("my_height")) - parseInt($("#chart-type-alternate").attr("my_height")) - 15);
        if($("#chart-container").highcharts()){
            var chart = $("#chart-container").highcharts();
            chart.setSize(
                $("#wrap-main").width(),
                parseInt($("#chart-body").height()) - parseInt($("#chart-interval-alternate").attr("my_height")) - parseInt($("#chart-type-alternate").attr("my_height"))  - 15,
                false
            );
        }
    }
}
function clear_chart_condition(){
    $("#analytics-condition").find("input[type='text']").each(function(){
            $(this).val("");
    });
    $("#chart-view").val('').trigger('chosen:updated');
    $(".index-date-extra-info").text("");
}
//where to record series
var chart={
    count:0,
    series:[]
}


