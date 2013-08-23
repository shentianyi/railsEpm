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
    date_and_datetime.unit_them_at_begin(target,interval_target);
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
    })
}
function analytic_control_condition_visible() {
    var open_state = $("#analytic-control-condition-visible").attr("open");
    if (open_state) {
        $("#analytics-condition").css("top", "48px");
        $("#chart-body").css("top", "23px");
        $("#analytics-condition-invisible-mark").css("display", "block");
        $("#analytic-control-condition-visible").attr("open", false).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
    else {
        $("#analytics-condition").css("top", "135px");
        $("#chart-body").css("top", "110px");
        $("#analytics-condition-invisible-mark").css("display", "none");
        $("#analytic-control-condition-visible").attr("open", true).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
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
function form_chart(){
    var kpi=$("#chart-kpi :selected").text();
    var view=$("#chart-view :selected").text();
    var method=$("input[name='chartRadios']:checked").attr("value");
    var interval=$("#chart-view :selected").attr("interval");
    var begin_time=$("#analy-begin-time").val(),end_time=$("#analy-end-time").val();
    if(kpi,begin_time){
        if(end_time){
            var compare_result=compare_time(begin_time,end_time);
            begin_time=compare_result.begin;
            end_time=compare_result.end;
        }
        else{
            end_time=begin_time
        }
        console.log(begin_time,end_time)
        $.post('/kpi_entries/analyse', {
            kpi : kpi,
            average:method=="0",
            entity_group: view,
            startTime : begin_time,
            endTime : end_time
        }, function(msg) {
            if(msg.result){
                var data=msg.object;
                console.log(startTime,endTime)
                form_chart(data.current,data.target,data.unit,interval,startTime,endTime,timeBeginChart);
                $(".control-chart-btn").each(function(){
                    $(this).removeClass('active');
                });
                $(".control-chart-btn[data-type='"+interval+"']").addClass("active");
            }
        });
    }
    else{
        MessageBox("u need to fill the blank with *","top","warning")
    }
}

