define(["jquery","./share","jquery.scroll"],function($,Share){
    function get_option_by_type(type) {
        var option = {};
        option.type = Share.type[type];
        option.type_string = type;
        return option;
    }

    $("#my-reports").mCustomScrollbar({
        axis:"y"
    });
    return{
        init:function(){
            var type=window.location.hash.slice(1);
            type=type.length===0?"current_status":type;
            Share.option = get_option_by_type(type);
            delete Share.r;
            switch(Share.option.type){
                case Share.type["current_status"]:
                    require(["app/Reports/current_status"],function(app){
                        app.init();
                    })
                case Share.type["daily_dpv"]:
                case Share.type["station_data"]:
                case Share.type["daily_ftq"]:
                default:
                    return ;
            }
        }
    }
})