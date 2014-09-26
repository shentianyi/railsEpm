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
    //color setting
    var a = ["higher","equal","lower"];
    $("#station-data-color-ftq").find(".color-group").remove();
    $("#station-data-color-dpv").find(".color-group").remove();
    var color_html,color_type;
    for(var i=0;i<3;i++){
        color_html='<div idx='+a[i]+' class="color-group">'+
            '<span class="color-item" style="background:#19cf22" ></span>'+
            '<span class="color-item" style="background:#eb4848" ></span>'+
            '<span class="color-item" style="background:#f3d02e" ></span>'+
            '<span class="color-item" style="background:#0fd9bf" ></span>'+
            '<span class="color-item" style="background:#c222ea" ></span>'+
            '<span class="color-item" style="background:#3a6be7" ></span>'+
            '<span class="color-item" style="background:#f56c22" ></span>'+
            '</div>';
        color_type=Report.color.ftq[a[i]];
        $("#station-data-color-ftq").append(color_html);
        $("#station-data-color-dpv").append(color_html);
        $("#station-data-color-ftq div[idx="+a[i]+"]").find(".color-item").each(function(index,value){
            if($(value).css("backgroundColor")===color_type){
                $(value).addClass("active");
            }
        });

        color_type=Report.color.dpv[a[i]];

        $("#station-data-color-dpv div[idx="+a[i]+"]").find(".color-item").each(function(index,value){
            if($(value).css("backgroundColor")===color_type){
                $(value).addClass("active");
            }
        });
    };

    $("#station-data-color-ftq .color-item").on("click",function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        var col = $(this).parent().attr("idx");
        var color = $(this).css("backgroundColor");

        Report.color.ftq[col] = color;

        Report.refresh();
    });

    $("#station-data-color-dpv .color-item").on("click",function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        var col = $(this).parent().attr("idx");
        var color = $(this).css("backgroundColor");

        Report.color.dpv[col] = color;
        Report.refresh();
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