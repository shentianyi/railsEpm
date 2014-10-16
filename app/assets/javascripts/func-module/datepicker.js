define(["jquery","bootstrap.datepicker"],function($){
    return {
        datepicker:function(target){
            if(Object.prototype.toString.call(target)==="[object Array]"){
                for(var i=0;i<target.length;i++){
                    $(target[i]).datepicker({
                        format: "yyyy-mm-dd",
                        todayBtn: "linked",
                        autoclose: true,
                        todayHighlight: true
                    });
                }
            }
            else{
                $(target).datepicker({
                    format: "yyyy-mm-dd",
                    todayBtn: "linked",
                    autoclose: true,
                    todayHighlight: true
                });
            }
        }
    }
})