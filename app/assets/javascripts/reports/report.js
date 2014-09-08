var Report = Report || {};
Report.option = {};
Report.r = {};
Report.init = function (type) {
	var option = this.get_option_by_type(type);
	
    this.option = option;
    switch (option.type) {
        case 'current-status':
            this.r = DV;
            current_status.init();
            break;
		case 'summary-report':
			this.t = Grid;
            break;
        case 'station-data':
            this.r = Grid;
            break;
        case 'daily-dpv':
            this.r = Grid;
            break;
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
        case 'current-status':
            return d_current_status['Vehicle_1'];
		case 'summary-report':
			return d_daily_dpv;
        case 'station-data':
            return null;
        case 'daily-dpv':
            return d_daily_dpv;
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
            option.type = 'current-status';
            option.container = 'data_container';
            break;
		case 'summary-report':
			option.type = 'summary-report';
        case 'daily-dpv':
            option.type = 'daily-dpv';
            break;
        default :
            option.type = 'current-status';
            option.container = 'data_container';
            break;
    }
	return option;
}
