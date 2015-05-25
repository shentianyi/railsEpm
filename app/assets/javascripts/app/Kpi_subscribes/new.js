define(["jquery","datepicker","./create","chosen"],function($,Datepicker){
    return {
        init:function(){
            Datepicker.datepicker(["#start-time","#end-time"])
        }
    }
})