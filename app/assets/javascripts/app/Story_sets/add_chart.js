define(["jquery","datepicker","jquery.tipsy"],function($,Datepicker){
    return{
        init:function(){
            Datepicker.datepicker("#range-datepicker");
            $("#switch-btn").tipsy({gravity:"s"})
        }
    }
})