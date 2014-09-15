var station_data={};
station_data.init=function(){
     $("#date-begin,#date-end").datepicker({
         format:"yyyy-mm-dd",
         autoclose:true
     });
    init_snap();
    station_data.flexible();
    $(window).resize(function(){
        station_data.flexible()
    });
}
station_data.flexible=function(){
    var total_height=$("#wrap-main").height()-$("header").height()-1;
    var height=total_height-$("#station-data-header").height()-$("#snap-groups").height()-2;
    $("#data_container").height(height);
    var total_width=$("#wrap-main").width(),
        menu_width=$("#report-menu").width();
    $("#data_container").width(total_width-menu_width);

}