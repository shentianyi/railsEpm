//需求变更时的注意事项：
//在不变的部分需要更改language以适应多语言
var DATE_PICKER= DATE_PICKER || {};
DATE_PICKER.date_picker_template=function(){};




DATE_PICKER.date_picker_template.prototype={
    constructor: DATE_PICKER.date_picker_template,
    weekStart: 1,
    autoclose: true,
    todayBtn: false,
    clearBtn: false,
    todayHighlight: true,
    language: 'en',
    datePicker: function () {
        $(this.target).datepicker({
            weekStart: this.weekStart,
            autoclose: this.autoclose,
            todayBtn: this.todayBtn,
            clearBtn:this.clearBtn,
            todayHighlight: this.todayHighlight,
            language: this.language,
            format: this.format,
            calendarWeeks: this.calendarWeeks,
            startView: this.startView,
            minViewMode: this.minViewMode
        })
    }
}









var date_and_datetime = {
    weekStart: 1,
    autoclose: true,
    todayBtn: false,
    clearBtn: false,
    todayHighlight: true,
    language: 'en',
    datePicker: function (target, spec_option) {
        $(target).datepicker({
            weekStart: this.weekStart,
            autoclose: this.autoclose,
            todayBtn: this.todayBtn,
            clearBtn:this.clearBtn,
            todayHighlight: this.todayHighlight,
            language: this.language,
            format: spec_option.format,
            calendarWeeks: spec_option.calendarWeeks,
            startView: spec_option.startView,
            minViewMode: spec_option.minViewMode
        })
    },
    dateTimepickerPicker: function (target, spec_option) {
        $(target).datetimepicker({
            weekStart: this.weekStart,
            autoclose: this.autoclose,
            todayBtn: this.todayBtn,
            clearBtn:this.clearBtn,
            todayHighlight: this.todayHighlight,
            language: this.language,
            format: spec_option.format,
            calendarWeeks: spec_option.calendarWeeks,
            startView: spec_option.startView,
            minView: spec_option.minView,
            initialDate: spec_option.initialDate
        });
    },
    remove_date_picker_model: function (target) {
        $(target).datepicker('remove');
        $(target).datetimepicker('remove');
    },
    unit_them_at_begin: function (target, interval_target,have_shortcut) {
        $(target).datepicker().on("show", function () {
            var interval = $(interval_target).find(":selected").attr("interval");
            if (interval) {
                $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
                $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
                $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                $(".datepicker").on("click",function(){
                    $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                });
                if(have_shortcut && $(".table-condensed").attr("already-shorcut")!="yes"){
                    if(interval=="200"){
                        $(".table-condensed").attr("already-shorcut","yes").find("tfoot").append($("<tr />")
                            .append($("<th />").attr("colSpan",8).addClass("date-picker-shortcut").attr("interval",interval).click(function(){
                                date_shortcut(target);
                            })));
                    }
                    else{
                        $(".table-condensed").attr("already-shorcut","yes").find("tfoot").append($("<tr />")
                            .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",interval).click(function(){
                                date_shortcut(target);
                            })));
                    }
                }
            }
            else {
                date_and_datetime.remove_date_picker_model(target);
            }
        });
    },
    week_picker_decorate: function (target) {
        $(target).datepicker().one("show", function () {
            $(".datepicker-days").attr("week", "picker");
        })
    }
}

var spec_option = {
    hour: {
        format: "yyyy-mm-dd hh:ii",
        startView: "month",
        minView: "day",
        calendarWeeks: undefined,
        initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 00)
    },
    day: {
        format: "yyyy-mm-dd",
        calendarWeeks: false,
        startView: "month",
        minViewMode: "days"
    },
    week: {
        format: "yyyy-mm-dd",
        calendarWeeks: true,
        startView: "month",
        minViewMode: "days"
    },
    month: {
        format: "yyyy-mm",
        calendarWeeks: false,
        startView: "year",
        minViewMode: "months"
    },
    quarter: {
        format: "yyyy-mm",
        calendarWeeks: false,
        startView: "year",
        minViewMode: "months"
    },
    year: {
        format: "yyyy",
        calendarWeeks: false,
        startView: "decade",
        minViewMode: "years"
    }
}

function date_shortcut(target){
    var place_to_input=target.split(",");
    var begin_place=place_to_input[0];
    var end_place=place_to_input[1];
    if($(".dropdown-menu").hasClass("datepicker")){
        $(target).datepicker("hide");
    }
    else{
        $(target).datetimepicker("hide");
    }
}
