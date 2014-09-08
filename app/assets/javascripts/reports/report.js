var Report = Report || {};
Report.option = {};
Report.r = {};
Report.init = function (option) {
    this.option = option;
    switch (option.type) {
        case 'current_status':
            this.r = DV;
            current_status.init();
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
        case 'current_status':
            return d_current_status['Vehicle_1'];
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
