define(["jquery"],function(){
    function measure(){
        var manage_two_column_height=$("#wrap-main").height()-$("header").height()-1;
        $("#manage_two_column").height(manage_two_column_height);
        var manage_left_content_height=manage_two_column_height-$("#left-content-title").height()-1;
        $("#manage-left-content").height(manage_left_content_height);
    };
    measure();
    $(window).resize(function(){
        measure();
    })
})