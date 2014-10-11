define(["jquery"],function(){
    function measure(){
        var manage_three_column_height=$("#wrap-main").height()-$("header").height();
        $("#manage_three_column").height(manage_three_column_height);
        var manage_left_content_height=manage_three_column_height-$("#left-content-title").height();
        $("#manage-left-content").height(manage_left_content_height);
    };
    measure();
    $(window).resize(function(){
        measure();
    })
})