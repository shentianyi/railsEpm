define(["jquery","jquery.scroll"],function($){
    function initScroll(){
        $("#project-desc,#conversation-list,#canvas-main-left,#canvas-main-right").mCustomScrollbar({
            axis:"y",
            theme:"dark"
        });
        $(".chat-content").mCustomScrollbar({
            axis:"y",
            theme:"minimal-dark"
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