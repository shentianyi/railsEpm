/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-16
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var ENTRY=ENTRY || {};
ENTRY.datepicker={};





ENTRY.init=function(){
   ENTRY.datepicker.init();
   $("#entry-date-picker").val(new Date().toWayneString()[$("#entry-left-menu li.active").attr("show_section")]);
   ENTRY.datepicker.extra_convert($("#entry-left-menu li.active").attr("interval"));
   ENTRY.resize_sort_table();
   $("#entry-sort-list li").on("resize",function(){
        ENTRY.resize_sort_table()
   });
   $(".entry-actual").on("keyup",function(event){
       var object=adapt_event(event).target;
       clearNoNumZero(object);
   }).on("keydown",function(event){
       var e=adapt_event(event).event;
       if(e.keyCode==13){
           $(e.target).blur();
       }
   }).on("blur",function(event){
           var e=adapt_event(event).event;
           var actual= $(e.target).val();
           var target= $(e.target).parent().prev().find(".entry-target").text();
           var tcr= (parseFloat(actual) / parseFloat(target))*100;
           var color_style=tcr>100 ? "#55cd5e" : (tcr==100 ? "#5FA9DA" : "#ed5959");
           if(actual.length>0){
               $(e.target).parent().next().text(tcr.toFixed(1)+"%").css("color",color_style);
           }
           else{
               $(e.target).parent().next().text("");
           }

   });
}















ENTRY.datepicker.init=function(){
    var interval=$("#entry-left-menu li.active").attr("interval");
    $("#entry-date-picker").datepicker().on("changeDate", function () {
        if (interval == "200") {
            var week = $(".datepicker").find(".active").prevAll(".cw").text();
            $("#entry-date-extra").text("Week: " + week).css("left","127px");
        }
        else if (interval == "400") {
            var quarter = new Date($(this).val()).monthToQuarter();
            $("#entry-date-extra").text("Quarter: " + quarter);
        }
    });
    new DATE_PICKER[interval]("#entry-date-picker",false).datePicker();
    var entry=new ENTRY.datepicker[interval]();
    $("#entry-minus").on("click",function(){
        if($("#entry-date-picker").val().length>0){
            var target=$("#entry-date-picker").val();
            $("#entry-date-picker").val(entry.minus(target));
            ENTRY.datepicker.extra_convert(interval);
        }
    });
    $("#entry-plus").on("click",function(){
        if($("#entry-date-picker").val().length>0){
            var target=$("#entry-date-picker").val();
            $("#entry-date-picker").val(entry.plus(target));
            ENTRY.datepicker.extra_convert(interval);
        }
    });
}
ENTRY.datepicker.extra_convert=function(interval){
    var target=$("#entry-date-picker").val();
    if(interval=="200"){
        var week=standardParse(target).date.toWeekNumber();
        $("#entry-date-extra").text("Week: " + week);
    }
    else if(interval=="400"){
        var quarter=standardParse(target).date.monthToQuarter();
        $("#entry-date-extra").text("Quarter: " + quarter);
    }
};
ENTRY.datepicker["90"]=function(){;
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setHours(d.getHours()-1)).toWayneString().hour;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setHours(d.getHours()+1)).toWayneString().hour;
        return new_d
    }
}
ENTRY.datepicker["100"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()-1)).toWayneString().day;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()+1)).toWayneString().day;
        return new_d
    }
}
ENTRY.datepicker["200"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()-7)).toWayneString().day;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()+7)).toWayneString().day;
        return new_d
    }
}
ENTRY.datepicker["300"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()-1)).toWayneString().month;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()+1)).toWayneString().month;
        return new_d
    }
}
ENTRY.datepicker["400"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()-3)).toWayneString().month;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()+3)).toWayneString().month;
        return new_d
    }
}
ENTRY.datepicker["500"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setFullYear(d.getFullYear()-1)).toWayneString().year;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setFullYear(d.getFullYear()+1)).toWayneString().year;
        return new_d
    }
}













ENTRY.resize_sort_table=function(){
    var table_size=$("#entry-sort-list li").width()*0.97;
    $("#entry-sort-list table").width(table_size)
}