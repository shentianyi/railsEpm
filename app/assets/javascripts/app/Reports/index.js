define(["jquery","./share","svgLoader","jquery.scroll","./menu"],function($,Share,SVGLoader){
    function get_option_by_type(type) {
        var option = {};
        option.type = Share.type[type];
        option.type_string = type;
        return option;
    }
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
            Share.option = get_option_by_type(type);
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