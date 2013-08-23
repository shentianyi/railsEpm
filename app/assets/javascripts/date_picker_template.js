//需求变更时的注意事项：
//在不变的部分需要更改language以适应多语言


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
    unit_them_at_begin: function (target, interval_target) {
        $(target).datepicker().on("show", function () {
            var interval = $(interval_target).find(":selected").attr("interval");
            if (interval) {
                $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
                $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
                $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                $(".datepicker").on("click",function(){
                    $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                });
            }
            else {
                date_and_datetime.remove_date_picker_model(target);
            }
        });
    },
    week_picker_decorate: function (target) {
        $(target).datepicker().one("show", function () {
            $(".datepicker-days").attr("week", "picker").find(".clear").attr("colspan","8");
        })
    }
}

var spec_option = {
    hour: {
        format: "yyyy-mm-dd hh:ii",
        minuteStep: 60,
        startView: "month",
        minView: "day",
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
