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
        $("#conversation-list").mCustomScrollbar({
            axis:"y",
            theme:"dark"
        });
        $("#people").mCustomScrollbar({
            axis:"x", // horizontal scrollbar
            advanced:{
                autoExpandHorizontalScroll: true
            },
            theme:"rounded-dark"
        });
    }
    return{
        init:function(){
            initScroll();

        }
    }
})