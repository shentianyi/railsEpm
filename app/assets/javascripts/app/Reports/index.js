define(["jquery","./share","svgLoader","jquery.scroll","./menu"],function($,Share,SVGLoader){
    function get_option_by_type(type) {
        var option = {};
        option.type = Share.type[type];
        option.type_string = type;
        return option;
    }

    $("#my-reports").mCustomScrollbar({axis:"y"});
    Share.loader=new SVGLoader( document.getElementById( 'preloader' ), { speedIn : 100 } );
    return{
        init:function(){
            var type=window.location.hash.slice(1);
            type=type.length===0?"current_status":type;
            Share.option = get_option_by_type(type);
            delete Share.report;
            switch(Share.option.type){
                case Share.type["current_status"]:
                    require(["app/Reports/current_status"],function(app){
                        app.init();
                    });
                    break;
                case Share.type["daily_dpv"]:
                    require(["app/Reports/daily_dpv"],function(app){
                        app.init();
                    });
                    break;
                case Share.type["station_data"]:
                case Share.type["daily_ftq"]:
                default:
                    return ;
            }
        }
    }
})