define(["jquery","./share","svgLoader","./menu","jquery.scroll"],function($,Share,SVGLoader,Menu){
    $("#my-reports").mCustomScrollbar({
        axis:"y",
        theme:"minimal-dark"
    });
    return{
        init:function(){
            var type=window.location.hash.slice(1);
            type=type.length===0?"current_status":type;
            var file_route="app/Reports/"+type;
            Menu.init();
            require([file_route],function(app){
                app.init();
                //snap method bundle to different type of app
                Share.getSnapInfo=app.setSnap;
                Share.getSnap=app.snap;
                //snap scroll bar
                $("#snap-groups").mCustomScrollbar({
                    axis:"y",
                    theme:"minimal"
                });
                //initail svg loader
                Share.loader=new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
                Share.partial_loader=new SVGLoader( document.getElementById( 'current_status_loader' ), { speedIn : 100 } );
                var left = document.getElementById("content").getBoundingClientRect().left,
                    top = document.getElementById("content").getBoundingClientRect().top+1,
                    height=$("#content").height(),
                    width=$("#content").width();
                $(".current-status-pageload-overlay svg").css('left', left);
                $(".current-status-pageload-overlay svg").css('top', top);
                $(".current-status-pageload-overlay svg").css("height",height+"px");
                $(".current-status-pageload-overlay svg").css("width",width+"px");
                $(window).resize(function(){
                    var  height=$("#content").height(),
                        width=$("#content").width();
                    $(".current-status-pageload-overlay svg").css("height",height+"px");
                    $(".current-status-pageload-overlay svg").css("width",width+"px");
                });
            });
        }
    }
})