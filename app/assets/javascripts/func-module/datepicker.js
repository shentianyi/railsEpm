define(["jquery","bootstrap.datepicker"],function($){
    function setting_datepicker(target,option){
        if(Object.prototype.toString.call(target)==="[object Array]"){
            for(var i=0;i<target.length;i++){
                $(target[i]).datepicker(option);
            }
        }
        else{
            $(target).datepicker(option);
        }
    }
    return {
        datepicker:function(target){
            setting_datepicker(target,{
                format: "yyyy-mm-dd",
                todayBtn: "linked",
                autoclose: true,
                todayHighlight: true
            });
        },
        datepicker_daily:function(target){
            setting_datepicker(target,{
                format : "yyyy-mm-dd",
                calendarWeeks : false,
                startView : "month",
                minViewMode : "days",
                autoclose: true,
                todayHighlight: true
            });
        },
        datepicker_weekly:function(target){
            setting_datepicker(target,{
                  format : "yyyy-mm-dd",
                  calendarWeeks : true,
                  startView : "month",
                  minViewMode : "days",
                  autoclose: true,
                  todayHighlight: true
            });
            $(target).datepicker().on("show", function(){
                    $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                    $(".datepicker").bind("click",function(){
                        $(".datepicker-days").find(".active").parent().addClass("week-tr-active");
                    });
                    $(".datepicker-days").attr("week", "picker");
            });
        },
        datepicker_monthly:function(target){
            setting_datepicker(target,{
                format : "yyyy-mm",
                startView : "year",
                minViewMode : "months",
                autoclose: true,
                todayHighlight: true
            });
        },
        datepicker_quarterly:function(target){
            setting_datepicker(target,{
                format : "yyyy-mm",
                startView : "year",
                minViewMode : "months",
                autoclose: true,
                todayHighlight: true
            });
        },
        datepicker_yearly:function(target){
            setting_datepicker(target,{
                format : "yyyy",
                startView : "decade",
                minViewMode : "years",
                autoclose: true,
                todayHighlight: true
            });
        }
    }
})