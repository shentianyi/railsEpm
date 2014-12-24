define(["jquery","./share","svgLoader","./menu","jquery.scroll"],function($,Share,SVGLoader,Menu){

    $("#my-reports").mCustomScrollbar({
        axis:"y",
        theme:"dark"
    });
    Share.loader=new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
    return{
        init:function(){
            var type=window.location.hash.slice(1);
            type=type.length===0?"current_status":type;
            var file_route="app/Reports/"+type;
            Menu.init();
            require([file_route],function(app){
                app.init();
                $("#snap-groups").mCustomScrollbar({
                    axis:"y",
                    theme:"dark"
                });
            });
        }
    }
})