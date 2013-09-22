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
                format: this.format,
                calendarWeeks: this.calendarWeeks,
                startView: this.startView,
                minViewMode: this.minViewMode,
                minView:this.minView,
                initialDate:this.initialDate

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
            $(target).datetimepicker().bind("show", function(){
                if( shortcut && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                    $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                        .append($("<tr />")
                          .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",name))
                    );
                }
                else if(shortcut && $(".table-condensed").attr("already-have-shortcut")=="yes"){
                    $(".table-condensed").find(".date-picker-shortcut").attr("interval",name)
                }
            });
        }
        else{
            $(target).datepicker().bind("show", function(){
                $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
                $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
                $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                $(".datepicker").on("click",function(){
                    $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                });
                if( shortcut && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                    if(name =="week"){
                        $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                            .append($("<tr />")
                                .append($("<th />").attr("colSpan",8).addClass("date-picker-shortcut").attr("interval",name))
                        );
                    }
                    else{
                        $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
                            .append($("<tr />")
                                .append($("<th />").attr("colSpan",7).addClass("date-picker-shortcut").attr("interval",name))
                        );
                    }
                }
                else if(shortcut && $(".table-condensed").attr("already-have-shortcut")=="yes"){
                    $(".table-condensed").find(".date-picker-shortcut").attr("interval",name)
                }
            });
            if(name == "week"){
                $(target).datepicker().one("show", function () {
                    $(".datepicker-days").attr("week", "picker");
                });
            }
        }
    }
}

DATE_PICKER["90"]=function(target,shortcut){
    this.target = target;
    this.name = "hour";
    this.shortcut = shortcut;
    this.format = "yyyy-mm-dd hh:ii";
    this.calendarWeeks = undefined;
    this.startView = "month";
    this.minViewMode = undefined;
    this.minView = "day";
    this.initialDate = new Date(new Date().setMinutes(0));
};
DATE_PICKER["90"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["90"].prototype.constructor=DATE_PICKER["90"];

DATE_PICKER["100"]=function(target,shortcut){
    this.target = target;
    this.name = "day";
    this.shortcut = shortcut;
    this.format = "yyyy-mm-dd";
    this.calendarWeeks = false;
    this.startView = "month";
    this.minViewMode = "days";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["100"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["100"].prototype.constructor=DATE_PICKER["100"];

DATE_PICKER["200"]=function(target,shortcut){
    this.target = target;
    this.name = "week";
    this.shortcut = shortcut;
    this.format = "yyyy-mm-dd";
    this.calendarWeeks = true;
    this.startView = "month";
    this.minViewMode = "days";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["200"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["200"].prototype.constructor=DATE_PICKER["200"];

DATE_PICKER["300"]=function(target,shortcut){
    this.target = target;
    this.name = "month";
    this.shortcut = shortcut;
    this.format = "yyyy-mm";
    this.calendarWeeks = false;
    this.startView = "year";
    this.minViewMode = "months";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["300"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["300"].prototype.constructor=DATE_PICKER["300"];

DATE_PICKER["400"]=function(target,shortcut){
    this.target = target;
    this.name = "quarter";
    this.shortcut = shortcut;
    this.format = "yyyy-mm";
    this.calendarWeeks = false;
    this.startView = "year";
    this.minViewMode = "months";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["400"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["400"].prototype.constructor=DATE_PICKER["400"];

DATE_PICKER["500"]=function(target,shortcut){
    this.target = target;
    this.name = "year";
    this.shortcut = shortcut;
    this.format = "yyyy";
    this.calendarWeeks = false;
    this.startView = "decade";
    this.minViewMode = "years";
    this.minView = undefined;
    this.initialDate = undefined;
};
DATE_PICKER["500"].prototype=DATE_PICKER.date_picker_template.prototype;
DATE_PICKER["500"].prototype.constructor=DATE_PICKER["500"];








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
