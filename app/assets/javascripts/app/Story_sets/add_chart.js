define(["jquery","datepicker","../../highchart/chart-util","base","chosen","jquery.tipsy"],function($,Datepicker,ChartUtil,Base,Chosen){
    function choseInit(){
        Chosen.init_with_width(["#type","#kpi","#view"],[270,270,270]);
        Chosen.change("#type",function(){
            console.log("change");
        })
    }
    function datePickerInit(){
        Datepicker.datepicker("#date-range");
        $("#switch-btn").tipsy({gravity:"s"});
        $("input[type='number']").on("keyup",function(event){
            var target=Base.adapt_event(event).target;
//            Base.inputOnlyPositiveNumber(target);
        })
    }
    function bindEvent(){
        $("#switch-btn").on("click",function(){
            var type=$(this).attr("current_type");
            if(!type || type==="range"){
                //switch to precise
                $(this).attr("current_type","precise");
                $("#date-precise").addClass("appear").removeClass("disappear");
                $("#date-range").addClass("disappear").removeClass("appear");
            }
            else{
                //switch to range
                $(this).attr("current_type","range");
                $("#date-range").addClass("appear").removeClass("disappear");
                $("#date-precise").addClass("disappear").removeClass("appear");
            }
        });
        $("#add-chart").on("click",function(){

        })
    }
    return{
        init:function(){
            choseInit();
            datePickerInit();
            bindEvent();
        }
    }
})