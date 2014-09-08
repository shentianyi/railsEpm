var Report = Report || {};
Report.option = {};
Report.r = {};
Report.init = function (type) {
	var option = this.get_option_by_type(type);
	
    this.option = option;
    switch (option.type) {
        case this.type["current-status"]:
            this.r = DV;
            current_status.init();
            break;
		case this.type["summary-report"]:
            break;
        case this.type["station-data"]:
            break;
        case this.type["tracking-report"]:
            break;
        case this.type["defect"]:
            break;
        case this.type["daily-dpv"]:
            this.r = Grid;
        default:
            break;
    }
    this.r.init(option);
    //load data
    var data = this.get_json();
    this.json_parse(data);
};

Report.json_parse = function (jsondata) {
    this.r.parse(jsondata, 'json');
};

Report.get_json = function () {
    switch (this.option.type) {
        case this.type["current-status"]:
            return d_current_status['Vehicle_1'];
        case this.type["daily-dpv"]:
            return  d_daily_dpv;
        default :
            return null;
    }
};

Report.serializeToJson = function () {
    return  this.r.o.serializeToJson();
};

Report.reload= function(){
	this.init(this.option);
}

Report.get_option_by_type = function(type){
    var option = {};
    switch(type) {
        case 'current-status':
            option.container = 'data_container';
            break;
        case 'daily-dpv':
            break;
        default :
            option.container = 'data_container';
            break;
    }
    option.type = this.type[type];
	return option;
}

Report.type = {
    "high-chart":0,
    "current-status":1,
    "summary-report":2,
    "station-data":3,
    "tracking-report":4,
    "defect":5,
    "vehicle-info":6,
    "daily-dpv":7
}