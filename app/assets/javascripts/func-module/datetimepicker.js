define(["jquery","bootstrap.datetimepicker"],function($){
    var option={
        startIndex : 0,
        startView : "month",
        minView : "day",
        format: "yyyy-mm-dd hh:ii",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    };
    return{
        datetimepicker:function(target){
            if(Object.prototype.toString.call(target)==="[object Array]"){
                for(var i=0;i<target.length;i++){
                    $(target[i]).datetimepicker(option);
                }
            }
            else{
                $(target).datetimepicker(option);
            }
        }
    }
})