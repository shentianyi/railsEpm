////////////////////////////////////////////////////////////////////////////////init select
var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {allow_single_deselect: true},
    '.chosen-select-no-single': {disable_search_threshold: 10},
    '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
    '.chosen-select-width': {width: "95%"}
}

function init_analytics() {
    $(".chosen-select").chosen({
        disable_search_threshold: 7
    });
    $("#chart-kpi").change(function () {
        var interval = $(this).find(":selected").attr("interval");
        var target = "#analy-begin-time,#analy-end-time";
        //interval 只接受90，100等数字，target接收字符串id\class
        form_date_or_time_picker(interval, target);
    });
    $("#analy-begin-time,#analy-end-time").datepicker().on("show", function () {
        // 美化datepicker的prev，next图标
        $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
        $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        if (interval == "200") {
            $(".datepicker tbody tr").hover(function () {
                $(this).addClass("week-tr-highlight");
            }, function () {
                $(this).removeClass("week-tr-highlight");
            });
            $(".datepicker").find(".active").parent().addClass("week-tr-active");
        }
        else if(!interval){
            $(this).datepicker("remove");
            $(this).datetimepicker("remove");
        }
    });
    $("#analy-begin-time,#analy-end-time").datepicker().on("changeDate", function () {
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        if (interval == "200") {
             var week=$(".datepicker").find(".active").prevAll(".cw").text();
             $(this).next().text("week "+week);
        }
        else if(interval=="400"){
             var quarter=new Date($(this).val()).monthToQuarter();
            $(this).next().text("quarter "+quarter);
        }
    });
}
function analytic_control_condition_visible(){
    var open_state=$("#analytic-control-condition-visible").attr("open");
    if(open_state){
        $("#analytics-condition").css("top","48px");
        $("#chart-body").css("top","23px");
        $("#analytics-condition-invisible-mark").css("display","block");
        $("#analytic-control-condition-visible").attr("open",false).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
    else{
        $("#analytics-condition").css("top","135px");
        $("#chart-body").css("top","110px");
        $("#analytics-condition-invisible-mark").css("display","none");
        $("#analytic-control-condition-visible").attr("open",true).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
}

