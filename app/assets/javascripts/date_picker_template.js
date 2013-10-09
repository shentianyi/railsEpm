//需求变更时的注意事项：
//在不变的部分需要更改language以适应多语言
var DATE_PICKER= DATE_PICKER || {};
DATE_PICKER.shortcut_count=0;





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
                          .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",name)).bind("click",function(){date_shortcut(name,target,shortcut)})
                    );
                }

            });
            $(target).datetimepicker().on("change", function(){
                $(this).attr("hide_value",$(this).val());
                if($(this).attr("string_model","yes")){
                    $(this).attr("string_model","no");
                    DATE_PICKER.shortcut_supervise(target);
                }
            });
        }
        else{
            $(target).datepicker().one("show", function(){
                $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
                $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
                $(".datepicker-days").attr("week", "picker");
                if( shortcut!=undefined && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                    if(name =="week"){
                        $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                            .append($("<tr />")
                                .append($("<th />").attr("colSpan",8).addClass("date-picker-shortcut").attr("interval",name)).bind("click",function(){date_shortcut(name,target,shortcut)})
                        );
                    }
                    else{
                        $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                            .append($("<tr />")
                                .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",name)).bind("click",function(){date_shortcut(name,target,shortcut)})
                        );
                    }
                }
            });
            $(target).datepicker().on("show", function(){
                if(name =="week"){
                $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                }
                else{
                    $(".datepicker-days").find(".active").parent().removeClass("week-tr-active");
                }
                $(".datepicker").on("click",function(){
                    $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                });
            });
            $(target).datepicker().on("change", function(){
                $(this).attr("hide_value",$(this).val());
                if($(this).attr("string_model","yes")){
                    $(this).attr("string_model","no");
                    DATE_PICKER.shortcut_supervise(target);
                }

            });
        }
    }
}
DATE_PICKER.shortcut_supervise=function(target){
    DATE_PICKER.shortcut_count--;
    if(DATE_PICKER.shortcut_count==1){
        var target=target.split(","),i;
        for(i=0;i<target.length;i++){
            $(target[i]).val($(target[i]).attr("hide_value"));
        }
    }
};
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
        var nearDay=new Date(d.setDate(d.getDate()-5)).toWayneString().day;
        var nearWeek=new Date(d.setDate(d.getDate()-7*3+6)).toWayneString().day;
        var nearMonth=new Date(d.setMonth(d.getMonth()-2)).toWayneString().month;
        var nearQuarter=new Date(d.setMonth(d.getMonth()-3*2-1)).toWayneString().month;
        var nearYear=new Date(d.setFullYear(d.getFullYear()-1)).toWayneString().year;
        return {
            hour:{
                date:[nearHour,today.hour],
                string:"Last 24 Hours",
                update:function(target,value){
                     $(target).datetimepicker("update",value);
                }
            },
            day:{
                date:[nearDay,today.day],
                string:"Last 7 Days",
                update:function(target,value){
                    $(target).datepicker("update",value);
                }
            },
            week:{
                date:[nearWeek,today.day],
                string:"Last 4 Weeks",
                update:function(target,value){
                    $(target).datepicker("update",value);
                }
            },
            month:{
                date:[nearMonth,today.month],
                string:"Last 3 Months",
                update:function(target,value){
                    $(target).datepicker("update",value);
                }
            },
            quarter:{
                date:[nearQuarter,today.month],
                string:"Last 4 Quarters",
                update:function(target,value){
                    $(target).datepicker("update",value);
                }
            },
            year:{
                date:[nearYear,today.year],
                string:"Last 3 Years",
                update:function(target,value){
                    $(target).datepicker("update",value);
                }
            }
        }
    }()
);


function date_shortcut(name,target,shortcut){
    var targetSplit=target.replace(",","").split("#"),
        i;
    if(shortcut=="date"){
        for(i=1;i<targetSplit.length;i++){
            $("#"+targetSplit[i]).val(DATE_PICKER.shortcut[name].date[i-1]);
            DATE_PICKER.shortcut[name].update("#"+targetSplit[i],DATE_PICKER.shortcut[name].date[i-1]);
        }
    }
    else if(shortcut=="string"){
        for(i=1;i<targetSplit.length;i++){
            DATE_PICKER.shortcut[name].update("#"+targetSplit[i],DATE_PICKER.shortcut[name].date[i-1]);
            $("#"+targetSplit[i]).val(DATE_PICKER.shortcut[name].string);
            $("#"+targetSplit[i]).attr("hide_value",DATE_PICKER.shortcut[name].date[i-1]).attr("string_model","yes");
        }
        DATE_PICKER.shortcut_count=targetSplit.length-1;
    }
    if(name=="hour"){
        $(target).datetimepicker("hide");
    }
    else{
        $(target).datepicker("hide");
    }
}

