window.rcenter = (function(){
    function ReportCenter(){
        if(this === window){
            return new ReportCenter();
        }
        return this;
    }

    var RC = ReportCenter;

    /*
    {
    op/option:{type:1,type_string:current_statu},
    id:"",
    dhtmlx: dhtmlXObject
    }
    */
    RC.items = [];
    RC.types = {
        "high_chart": 0,
        "current_status": 1,
        "summary_report": 2,
        "station_data": 3,
        "tracking_report": 4,
        "defects": 5,
        "vehicle_info": 6,
        "daily_dpv": 7
    };

    RC.add_item = function(op){
        this.items.push({1:1});
        return this.items;
    };

    RC.init_dhtmlx = function(type,container){

    };

    return RC;
})();