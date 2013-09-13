var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {allow_single_deselect: true},
    '.chosen-select-no-single': {disable_search_threshold: 10},
    '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
    '.chosen-select-width': {width: "95%"}
}
$(document).ready(function(){
    $("#user-portrait-background").on("click",show_left_user_setting);
    $(".chosen-select").chosen({
        disable_search_threshold: 7
    });
    $(".chosen-select:first-of-type").val('').trigger('chosen:updated');
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