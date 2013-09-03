////////////////////////////////////////////////////////////////////////////////init select
var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {allow_single_deselect: true},
    '.chosen-select-no-single': {disable_search_threshold: 10},
    '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
    '.chosen-select-width': {width: "95%"}
}
//where to record series
var chartSeries={
    count: 0,
    series:[],
    getCount:function(){
        return this.count
    },
    addCount:function(){
        this.count+=1
    },
    getSeries:function(){
        return this.series
    },
    addSeries:function(series){
        this.series.push(series)
    }
}
function init_analytics() {
    $(".chosen-select").chosen({
        disable_search_threshold: 7
    });

    var date_picker_option={
        target:"#analy-begin-time,#analy-end-time",
        interval_source:"#chart-kpi",
        have_shortcut:true
    }
    date_picker_init(date_picker_option);

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
function date_picker_init(option){
    date_and_datetime.unit_them_at_begin(option.target,option.interval_source,option.have_shortcut);
    $(option.interval_source).change(function () {
        var interval = $(this).find(":selected").attr("interval");
        form_date_or_time_picker(interval, option.target);
    });
};
function analytic_control_condition_visible() {
    var open_state = $("#analytic-control-condition-visible").attr("open");
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




//        post






        var option={
            kpi:kpi,
            id:chartSeries.getCount(),
            target:"chart-container",
            begin_time:begin_time,
            type:type,
            interval:interval,
            count:chartSeries.getCount()+1
        }
        var addSeriesOption={
            kpi:kpi,
            id:chartSeries.getCount(),
            interval:interval,
            view:view,
            method:method,
            begin_time:begin_time,
            end_time:end_time
        }
        if(chart_body_close_validate){

            option.data=[{y:2},{y:3},{y:21},{y:3},{y:10},{y:7},{y:3},{y:1},{y:17},{y:13}];
            addSeriesOption[interval]=[{y:2},{y:3},{y:21},{y:3},{y:10},{y:7},{y:3},{y:1},{y:17},{y:13}];
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
            option.data=[{y:12},{y:3},{y:1},{y:13},{y:10},{y:17},{y:3},{y:2},{y:12},{y:5}];
            addSeriesOption[interval]=[{y:12},{y:3},{y:1},{y:13},{y:10},{y:17},{y:3},{y:2},{y:12},{y:5}];
            chartSeries.addSeries(addSeriesOption);

            add_series(option);
            proper_type_for_chart(option);

            chartSeries.addCount();
        }
        limit_pointer_number(option);
        clear_chart_condition();
    }
    else {
        MessageBox("please fill all blanks in *" , "top", "warning")
    }
}
function show_chart_body(option){
    $("#chart-body").css("display","block");
    $("#chart-type-alternate td").hover(function () {
        $("#chart-type-alternate td").each(function () {
            $(this).css("width", '10%').removeClass("image").find("p").css("display","block");
        });
        $(this).css("width", "70%").addClass("image").find("p").css("display","none");
    }, function () {
        $("#chart-type-alternate td").each(function () {
            $(this).css("width", '10%').removeClass("image").find("p").css("display","block");
        });
        $("#chart-type-alternate td.active").css("width", "70%").addClass("image").find("p").css("display","none");
    });
    $("body").on("click", "#chart-type-alternate td", function () {
        $("#chart-type-alternate td").each(function () {
            $(this).removeClass("active image").find("p").css("display","block");
        });
        $(this).addClass("active image").find("p").css("display","none");
    });
    $("#chart-type-alternate td").each(function () {
        $(this).css("width", '10%').removeClass("image").find("p").css("display", "block");
    });
    $("#chart-type-alternate td[type='"+option.type+"']").css("width", "70%").addClass("image active").find("p").css("display","none");
    $("#chart-type-alternate").find("td").each(function(){
        $(this).bind("click",alternate_chart_type)
    });

    $("#chart-interval-alternate").find("li").each(function(){
        $(this).bind("click",function(event){
            var target=adapt_event(event).target;
            if(!$(target).hasClass("active")){
                var option={
                    interval:$(target).attr("interval"),
                    target:'chart-container',
                    type:$("#chart-type-alternate").find(".active").attr("type")
                }
                change_interval(option);
                $("#chart-interval-alternate").find("li").removeClass("active");
                $(target).addClass("active");
            }
        });
    });
    $("#chart-interval-alternate").find("li[interval='"+option.interval+"']").addClass("active");
}
function alternate_chart_type(event){
    var target=adapt_event(event).target;
    if(!$(target).hasClass("active")){
        var option={
            target:"chart-container",
            type:$(target).attr("type"),
            count:chartSeries.getCount()
        }
        for(var i=0;i<chartSeries.series.length;i++){
            option.id=chartSeries.series[i].id;
            proper_type_for_chart(option)
        }
    }
}

function change_interval(option){
    var series_object,new_data_wrapper=[];
    var chart=$("#"+option.target).highcharts();
    for(var i=0;i<chartSeries.getCount();i++){
        series_object=chartSeries.getSeries()[i];
        if(series_object[option.interval]){
            new_data_wrapper.push(series_object[option.interval])
        }
        else{

            // post(use new interval)
            new_data_wrapper.push([{y:1},{y:13},{y:22},{y:4},{y:12},{y:7},{y:31},{y:26},{y:15.3},{y:24}]);
        }
    }
    if(new_data_wrapper.length==chartSeries.getCount()){
        chart.destroy();
        var option={
            target:"chart-container",
            type:option.type,
            interval:option.interval,
            count:chartSeries.getCount()
        };
        if(option.type=="pie"){
            for(var j=0;j<chartSeries.getCount();j++){
                option.kpi=chartSeries.getSeries()[j]["kpi"];
                option.id=chartSeries.getSeries()[j]["id"];
                option.begin_time=chartSeries.getSeries()[j]["begin_time"];
                option.data=new_data_wrapper[j];
                if(j==0){
                    render_to(option);
                    create_environment_for_data(option);
                    new Highcharts.Chart(high_chart);
                }
                add_series(option);
            }
            proper_type_for_chart(option);
        }
        else{
            for(var j=0;j<chartSeries.getCount();j++){
                option.kpi=chartSeries.getSeries()[j]["kpi"];
                option.id=chartSeries.getSeries()[j]["id"];
                option.begin_time=chartSeries.getSeries()[j]["begin_time"];
                option.data=new_data_wrapper[j];
                if(j==0){
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
var resize_chart={
    body:function(){
        $("#chart-body").height(parseInt($(window).height()) - parseInt($("#analytics-condition").height())-parseInt($("#analytics-condition").css("top")) - 1 >= 0 ?
            parseInt($(window).height()) - parseInt($("#analytics-condition").height())-parseInt($("#analytics-condition").css("top")) - 1: 0);
    },
    container:function(){
        $("#chart-main-middle").height(parseInt($("#chart-body").height()) - parseInt($("#chart-interval-alternate").attr("my_height")) - parseInt($("#chart-type-alternate").attr("my_height")) -1);
        if($("#chart-container").highcharts()){
            var chart = $("#chart-container").highcharts();
            chart.setSize(
                $("#chart-main-middle").width(),
                $("#chart-main-middle").height(),
                false
            );
        }
        if($("#chart-type-alternate td.active").attr("type")=="pie"){
            for(var k=0;k<$("#chart-container").highcharts().series.length;k++){
                $("#chart-container").highcharts().series[k].update({
                    showInLegend:false
                })
            }
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




function  chart_point_click(object){
    $("#chart-point-detail").css("left","0");
    $("#chart-container").css("left","320px");
    if(object.series.type=="pie"){
        if(object.time_from!=null){
            $("#chart-detail-kpi").text(object.series.name).css("color",object.color);
            $("#chart-detail-date").text(object.time_from).prev().text("From:");
            $("#chart-detail-end-date").text(object.time_to).parent().removeClass("hide");
            $("#chart-detail-value").text(object.y).prev().text("Sum");
            $("#chart-detail-aver-date").text(object.average_y).parent().removeClass("hide");
            $("#chart-detail-percent").text((object.percentage).toFixed(2)).parent().removeClass("hide");
        }
        else{
            $("#chart-detail-kpi").text(object.series.name).css("color",object.color);
            $("#chart-detail-date").text(object.name).prev().text("Date:");
            $("#chart-detail-value").text(object.y).prev().text("Value:");
            $("#chart-detail-end-date").parent().addClass("hide");
            $("#chart-detail-aver-date").parent().addClass("hide");
            $("#chart-detail-percent").text((object.percentage).toFixed(2)).parent().removeClass("hide");
        }

    }
    else{
        $("#chart-detail-kpi").text(object.series.name).css("color",object.series.color);
        $("#chart-detail-date").text(object.name).prev().text("Date:");
        $("#chart-detail-value").text(object.y).prev().text("Value:");
        $("#chart-detail-end-date").parent().addClass("hide");
        $("#chart-detail-aver-date").parent().addClass("hide");
        $("#chart-detail-percent").parent().addClass("hide");
    }
}
function close_chart_detail(){
    $("#chart-point-detail").css("left","-300px");
    $("#chart-container").css("left","0px");
}










