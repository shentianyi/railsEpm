var Report = Report || {};
Report.init = function(option){
    switch(option.type){
        case 'current_status':
            DV.init(option);
            break;
        case 'station_data':
            Grid.init(option);
            break;
        case 'daily-dpv':
            Grid.init(option);
            break;
        default:
            break;
    }
}

Report.json_parse = function (jsondata) {

}
