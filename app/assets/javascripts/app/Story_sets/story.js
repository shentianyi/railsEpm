define(["jquery","jquery.scroll"],function($){
    function initScroll(){
        $("#project-desc").mCustomScrollbar({
            axis:"y",
            theme:"dark"
        });
        $(".chat-content").mCustomScrollbar({
            axis:"y",
            theme:"minimal-dark"
        });
    }
    return{
        init:function(){
            initScroll();
        }
    }
})