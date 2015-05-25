define(["jquery"],function(){
    function measure(){
        var manage_no_aside_height=$("#wrap-main").height()-$("header").height()-1;
        $("#manage_no_aside").height(manage_no_aside_height);
        var manage_left_content_height=manage_no_aside_height-$("#left-content-title").height()-1;
        $("#manage-left-content").height(manage_left_content_height);
    };
    measure();
    $(window).resize(function(){
        measure();
    })
})