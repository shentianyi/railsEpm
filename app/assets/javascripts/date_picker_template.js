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
    forceParse:false,
    datePicker: function () {
        $(this.target).datepicker('remove');
        $(this.target).datetimepicker('remove');
        if(this.name=="hour"){
            $(this.target).datetimepicker({
                weekStart: this.weekStart,
                autoclose: this.autoclose,
                todayBtn: this.todayBtn,
                clearBtn:this.clearBtn,
                todayHighlight: this.todayHighlight,
                language: this.language,
                forceParse: this.forceParse,
                format: this.format,
                calendarWeeks: this.calendarWeeks,
                startView: this.startView,
                minViewMode: this.minViewMode,
                minView:this.minView,
                initialDate:this.initialDate,
            });
        }
        else{
            $(this.target).datepicker({
                weekStart: this.weekStart,
                autoclose: this.autoclose,
                todayBtn: this.todayBtn,
                clearBtn:this.clearBtn,
                todayHighlight: this.todayHighlight,
                language: this.language,
                forceParse: this.forceParse,
                format: this.format,
                calendarWeeks: this.calendarWeeks,
                startView: this.startView,
                minViewMode: this.minViewMode,
                minView:this.minView,
                initialDate:this.initialDate
            });
        }
        this.init_company(this.target,this.name,this.shortcut);
    },
    init_company: function (target,name,shortcut) {
        if(name=="hour"){
            $(target).datetimepicker().one("show", function(){
                if( shortcut!=undefined && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                    $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                        .append($("<tr />")
                          .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",name)).bind("click",function(){date_shortcut(name,target)})
                    );
                }

            });
        }
        else{
            $(target).datepicker().one("show", function(){
                $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
                $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
                $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                $(".datepicker").on("click",function(){
                    $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                });
                if( shortcut!=undefined && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                    if(name =="week"){
                        $(".datepicker-days").attr("week", "picker");
                        $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                            .append($("<tr />")
                                .append($("<th />").attr("colSpan",8).addClass("date-picker-shortcut").attr("interval",name)).bind("click",function(){date_shortcut(name,target)})
                        );
                    }
                    else{
                        $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                            .append($("<tr />")
                                .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",name)).bind("click",function(){date_shortcut(name,target)})
                        );
                    }
                }
            });
        }
    }
}

DATE_PICKER["90"]=function(target){
    this.target = target;
    this.name = "hour";
    this.shortcut = arguments[1];
    this.format = "yyyy-mm-dd hh:ii";
    this.calendarWeeks = undefined;
    this.startView = "month";
    this.minViewMode = undefined;
    this.minView = "day";
    this.initialDate = new Date(new Date().setMinutes(0));
};
DATE_PICKER["90"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["90"].prototype.constructor=DATE_PICKER["90"];

DATE_PICKER["100"]=function(target){
    this.target = target;
    this.name = "day";
    this.shortcut = arguments[1];
    this.format = "yyyy-mm-dd";
    this.calendarWeeks = false;
    this.startView = "month";
    this.minViewMode = "days";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["100"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["100"].prototype.constructor=DATE_PICKER["100"];

DATE_PICKER["200"]=function(target){
    this.target = target;
    this.name = "week";
    this.shortcut = arguments[1];
    this.format = "yyyy-mm-dd";
    this.calendarWeeks = true;
    this.startView = "month";
    this.minViewMode = "days";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["200"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["200"].prototype.constructor=DATE_PICKER["200"];

DATE_PICKER["300"]=function(target){
    this.target = target;
    this.name = "month";
    this.shortcut = arguments[1];
    this.format = "yyyy-mm";
    this.calendarWeeks = false;
    this.startView = "year";
    this.minViewMode = "months";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["300"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["300"].prototype.constructor=DATE_PICKER["300"];

DATE_PICKER["400"]=function(target){
    this.target = target;
    this.name = "quarter";
    this.shortcut = arguments[1];
    this.format = "yyyy-mm";
    this.calendarWeeks = false;
    this.startView = "year";
    this.minViewMode = "months";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["400"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["400"].prototype.constructor=DATE_PICKER["400"];

DATE_PICKER["500"]=function(target){
    this.target = target;
    this.name = "year";
    this.shortcut = arguments[1];
    this.format = "yyyy";
    this.calendarWeeks = false;
    this.startView = "decade";
    this.minViewMode = "years";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["500"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["500"].prototype.constructor=DATE_PICKER["500"];



DATE_PICKER.shortcut=(
    function(){
        var d=new Date()
        var today=d.toWayneString();
        var nearHour=new Date(d.setHours(d.getHours()-23)).toWayneString().hour;
        var nearDay=new Date(d.setDate(d.getDate()-6)).toWayneString().hour;
        var nearWeek=new Date(d.setDate(d.getDate()-7*3)).toWayneString().hour;
        var nearMonth=new Date(d.setMonth(d.getMonth()-2)).toWayneString().hour;
        var nearQuarter=new Date(d.setMonth(d.getMonth()-9)).toWayneString().hour;
        var nearYear=new Date(d.setFullYear(d.getFullYear()-2)).toWayneString().hour;
        return {
            hour:{
                today:today.hour,
                nearHour:nearHour
            },
            day:{
                today:today.day,
                nearDay:nearDay
            },
            week:{
                today:today.day,
                nearWeek:nearWeek
            },
            month:{
                today:today.month,
                nearMonth:nearMonth
            },
            quarter:{
                today:today.month,
                nearQuarter:nearQuarter
            },
            year:{
                today:today.year,
                nearYear:nearYear
            }
        }
    }()
);


function date_shortcut(name,target){
    console.log("asd")
}
