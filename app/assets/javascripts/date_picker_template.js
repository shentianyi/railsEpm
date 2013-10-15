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
        this.init_company(this.target,this.name,this.shortcut,this.startIndex);
    },
    init_company: function (target,name,shortcut,index) {
        if(name=="hour"){
            $(target).datetimepicker().one("show", function(){
                if( shortcut!=undefined && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                       DATE_PICKER.shortcut_form(7,name,target,shortcut,index);
                }

            });
            $(target).datetimepicker().on("change", function(){
                $(this).attr("hide_value",$(this).val());
                if($(this).attr("string_model","yes")){
                    $(this).attr("string_model","no");
                    DATE_PICKER.shortcut_supervise(target);
                }
            });
            $(target).datetimepicker().on("hide",function(){
                $(".date-pick-dynamic").css("display","none");
            });
        }
        else{
            $(target).datepicker().one("show", function(){
                $(".datepicker").find(".prev").text("").append($("<i />").addClass('icon-arrow-left'));
                $(".datepicker").find(".next").text("").append($("<i />").addClass('icon-arrow-right'));
                $(".datepicker-days").attr("week", "picker");
                if( shortcut!=undefined && $(".table-condensed").attr("already-have-shortcut")!="yes"){
                    if(name =="week"){
                        DATE_PICKER.shortcut_form(8,name,target,shortcut,index);
                    }
                    else{
                        DATE_PICKER.shortcut_form(7,name,target,shortcut,index);
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
            $(target).datepicker().on("hide",function(){
                $(".date-pick-dynamic").css("display","none");
            });
        }
    }
}
DATE_PICKER.shortcut_form=function(column,name,target,shortcut,index){
    $(".table-condensed").attr("already-have-shortcut","yes").find("tfoot")
        .append($("<tr />").addClass("relative")
            .append($("<th />").attr("colSpan",column).addClass("date-picker-shortcut").attr("interval",name))
            .hover(function(){
                $(".date-pick-dynamic").css("display","block");
                DATE_PICKER.init_short_cut(name);
            })
            .append($("<i />").addClass("icon-caret-right"))
        )
        .append(
            $("<tr />").addClass("absolute date-pick-dynamic").attr("interval",name)
                .append($("<i />").addClass("icon-remove")
                    .hover(function(){$(this).css("color","rgba(0,0,0,0.85)")},function(){$(this).css("color","rgba(0,0,0,0.4)")})
                    .on("click",function(){$(".date-pick-dynamic").css("display","none");})
                )
                .append($("<div />").attr("id","date-pick-dynamic-div")
                    .append($("<p />").text("Last"))
                    .append($("<input type='text' />"))
                    .append(
                        $("<select />").css("width","100px")
                            .append($("<option />").text("Hours").attr("value","Hours").attr("index","0"))
                            .append($("<option />").text("Days").attr("value","Days").attr("index","1"))
                            .append($("<option />").text("Weeks").attr("value","Weeks").attr("index","2"))
                            .append($("<option />").text("Months").attr("value","Months").attr("index","3"))
                            .append($("<option />").text("Quarters").attr("value","Quarters").attr("index","4"))
                            .append($("<option />").text("Years").attr("value","Years").attr("index","5"))
                    )
                )
                .append($("<a />").addClass("btn btn-primary").text("OK").attr("id","date-pick-dynamic-button")
                    .on("click",function(){date_shortcut(name,target,shortcut,index)})
                )
        );
    $("body").on("keyup","#date-pick-dynamic-div>input",function(event){
        var object=adapt_event(event).target;
        clearNoNum(object);
    })
};
DATE_PICKER.init_short_cut=function(name){
    switch(name){
        case "hour":
//            $("#date-pick-dynamic-div>input").val(8);
            $("#date-pick-dynamic-div>select").find("option[value='Hours']").prop("selected",true).prevAll().remove();
            break;
        case "day":
            $("#date-pick-dynamic-div>input").val("7");
            $("#date-pick-dynamic-div>select").find("option[value='Days']").prop("selected",true).prevAll().remove();
            break;
        case "week":
            $("#date-pick-dynamic-div>input").val("4");
            $("#date-pick-dynamic-div>select").find("option[value='Weeks']").prop("selected",true).prevAll().remove();
            break;
        case "month":
            $("#date-pick-dynamic-div>input").val("3");
            $("#date-pick-dynamic-div>select").find("option[value='Months']").prop("selected",true).prevAll().remove();
            break;
        case "quarter":
            $("#date-pick-dynamic-div>input").val("3");
            $("#date-pick-dynamic-div>select").find("option[value='Quarters']").prop("selected",true).prevAll().remove();
            break;
        case "year":
            $("#date-pick-dynamic-div>input").val("2");
            $("#date-pick-dynamic-div>select").find("option[value='Years']").prop("selected",true).prevAll().remove();
            break;
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
    this.startIndex = 0;
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
    this.startIndex = 1;
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
    this.startIndex = 2;
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
    this.startIndex = 3;
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
    this.startIndex = 4;
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
    this.startIndex = 5;
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


function date_shortcut(name,target,shortcut,index){
    $(".date-pick-dynamic").css("display","none");
    var lastIndex=parseInt($("#date-pick-dynamic-div :selected").attr("index")),
        gap_count=$("#date-pick-dynamic-div:visible>input").val(),
        lastIndexName=$("#date-pick-dynamic-div :selected").attr("value");
    alert(gap_count)
    if(gap_count.length==0){
        MessageBox("Fill the blank after the word 'Last' please","top","warning");
    }
    else{
        var object=DATE_PICKER.shortcut_model(index,lastIndex,gap_count,lastIndexName);
        var targetSplit=target.replace(",","").split("#"),
            i;
        if(shortcut=="date"){
            for(i=1;i<targetSplit.length;i++){
                var target="#"+targetSplit[i],
                    date=object[name].date[i-1];
                $(target).val(date);
                object[name].update(target,date);
            }
        }
        else if(shortcut=="string"){
            for(i=1;i<targetSplit.length;i++){
                var target="#"+targetSplit[i],
                    date=DATE_PICKER.shortcut[name].date[i-1];
                DATE_PICKER.shortcut[name].update(target,date);
                $(target).val(DATE_PICKER.shortcut[name].string);
                $(target).attr("hide_value",date).attr("string_model","yes");
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

}

//DATE_PICKER.shortcut=(
//    function(){
//        var d=new Date()
//        var today=d.toWayneString();
//        var nearHour=new Date(d.setHours(d.getHours()-23)).toWayneString().hour;
//        var nearDay=new Date(d.setDate(d.getDate()-5)).toWayneString().day;
//        var nearWeek=new Date(d.setDate(d.getDate()-7*3+6)).toWayneString().day;
//        var nearMonth=new Date(d.setMonth(d.getMonth()-2)).toWayneString().month;
//        var nearQuarter=new Date(d.setMonth(d.getMonth()-3*2-1)).toWayneString().month;
//        var nearYear=new Date(d.setFullYear(d.getFullYear()-1)).toWayneString().year;
//        return {
//            hour:{
//                date:[nearHour,today.hour],
//                string:"Last 24 Hours",
//                update:function(target,value){
//                     $(target).datetimepicker("update",value);
//                }
//            },
//            day:{
//                date:[nearDay,today.day],
//                string:"Last 7 Days",
//                update:function(target,value){
//                    $(target).datepicker("update",value);
//                }
//            },
//            week:{
//                date:[nearWeek,today.day],
//                string:"Last 4 Weeks",
//                update:function(target,value){
//                    $(target).datepicker("update",value);
//                }
//            },
//            month:{
//                date:[nearMonth,today.month],
//                string:"Last 3 Months",
//                update:function(target,value){
//                    $(target).datepicker("update",value);
//                }
//            },
//            quarter:{
//                date:[nearQuarter,today.month],
//                string:"Last 4 Quarters",
//                update:function(target,value){
//                    $(target).datepicker("update",value);
//                }
//            },
//            year:{
//                date:[nearYear,today.year],
//                string:"Last 3 Years",
//                update:function(target,value){
//                    $(target).datepicker("update",value);
//                }
//            }
//        }
//    }()
//);
//the interval between different time unit
DATE_PICKER.shortcut_model_index=[24,7,4,3,3];
DATE_PICKER.shortcut_model=function(startIndex,endIndex,gap_count,lastIndexName){
    var gap_array=DATE_PICKER.shortcut_model_index.slice(startIndex,endIndex),
        i,gap=1;
    for(i=0;i<gap_array.length;i++){
        gap*=gap_array[i];
    }
    var d=new Date(),
        today=d.toWayneString(),
        nearHour=new Date(d.setHours(d.getHours()-(gap*gap_count-1))).toWayneString().hour,
        nearDay=new Date(d.setDate(d.getDate()-5)).toWayneString().day,
        nearWeek=new Date(d.setDate(d.getDate()-7*3+6)).toWayneString().day,
        nearMonth=new Date(d.setMonth(d.getMonth()-2)).toWayneString().month,
        nearQuarter=new Date(d.setMonth(d.getMonth()-3*2-1)).toWayneString().month,
        nearYear=new Date(d.setFullYear(d.getFullYear()-1)).toWayneString().year;
    return {
            hour:{
                date:[nearHour,today.hour],
                string:"Last "+gap_count+" "+lastIndexName,
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
}





