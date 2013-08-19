$(document).ready(function(){
    $("#user-portrait-background").on("click",show_left_user_setting);
})
//左边的用户设置
function show_left_user_setting(){
    var validate=$("#user-portrait-background").data("open");
    if(validate){
        $("#left-user-setting").css("left","0");
        $("#wrap-main").css("left","200px");
        $("#user-portrait-background").data("open",false);
    }
    else{
        $("#left-user-setting").css("left","-200px");
        $("#wrap-main").css("left","0");
        $("#user-portrait-background").data("open",true);
    }
}