var station_data={};
station_data.init=function(){
     $("#date-begin,#date-end").datepicker({
         format:"yyyy-mm-dd",
         autoclose:true
     });
}