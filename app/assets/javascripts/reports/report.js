var Report = Report || {};
Report.option = {};
Report.r = {};
Report.export_excel_url = 'http://42.121.111.38:9003/DHXFileService/Excel';
/*
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
            this.r = StationData;
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
    this.r.page_load();
};
*/

/*init report*/
Report.init = function(type){
    this.option = this.get_option_by_type(type);
    delete this.r;
    this.r = this.get_dhtmlx();
    this.configure();
    this.json_parse(this.get_json());
    this.prepare();
};

/*prepare page*/
Report.prepare = function(){
    var fn = Report[this.option.type_string+"_init"];
    if(typeof fn === "function"){
        fn();
    }
};

/*parse json data*/
Report.json_parse = function (jsondata) {
    this.r.parse(jsondata, 'json');
};

/*get dhtmlx object*/
Report.get_dhtmlx = function(){
    var container = "data_container";
    switch(this.option.type){
        case this.type["current_status"]:
            return new dhtmlXDataView(container);
        case this.type["daily_dpv"]:
        case this.type["station_data"]:
            return new dhtmlXGridObject(container);
        default:
            return null;
    }
}

Report.configure = function(){
    var dhtmlxobj = this.r;
    var type = this.option.type;
    switch(type){
        case this.type["current_status"]:
            dhtmlxobj.define("type",{
                template: "<div class='dv-header'>" +
                    "<p>#INQA#</p>" +
                    "</div>" +
                    "<div class='dv-body'>" +
                    "<div class='left'>" +
                    "<p>#FTQ#%</p>" +
                    "</div>" +
                    "<div class='right'>" +
                    "<p>#Defects#</p>" +
                    "<p>OPEN DEFECTS</p>" +
                    "<p>#Pass#</p>" +
                    "<p>VEHICLE PASS</p>" +
                    "</div>" +
                    "</div>",
                css: "dv-item",
                height: 150,
                width: 230,
                margin: 5,
                padding: 8
            });
            current_status.init();
            break;
        case this.type["station_data"]:
            dhtmlxobj.setImagePath("../../../codebase/imgs/");
            dhtmlxobj.setHeader("Inspection,#cspan,Vechile Total,OK Vehicle,NOK Vehicle,FTQ,DPV,DPV Target,Defects,Vehs,FTQ Target,OK,NOK");
            //mygrid.attachHeader("full,short,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
            dhtmlxobj.setInitWidths("150,80,80,80,80,80,80,80,80,80,80,80,80");
            dhtmlxobj.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
            dhtmlxobj.setColSorting("str,int,int,int,int,int,int,int,int,int,int,int,int");
            //mygrid.setColumnColor("white,#d5f1ff,#d5f1ff");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.enableMultiselect(true);
            break;
        case this.type["daily_dpv"]:
            var width=Math.floor($("#report-content .right").width()/5)+"";
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            dhtmlxobj.setHeader("FALSE,Volumn,Effect,DPV,SDPV");
            //dhtmlxobj.attachHeader("#text_search,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter");

            dhtmlxobj.setInitWidths(width+","+width+","+width+","+width+","+width);
            dhtmlxobj.enableAutoWidth(false);

            dhtmlxobj.setColAlign("left,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro");
            dhtmlxobj.setColSorting("str,int,int,int,int");
            dhtmlxobj.setNumberFormat("0,000.00", 0, ".", ",");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.enableSmartRendering(true);
            daily_dpv.init();
            break;
        default:
            break;
    }
}

Report.get_json = function () {
    switch (this.option.type) {
        case this.type["current_status"]:
            return d_current_status['CF11'];
        case this.type["daily_dpv"]:
            return  d_daily_dpv;
        case this.type["station_data"]:
            return d_station_data;
        default :
            return null;
    }
};

Report.serializeToJson = function () {
    return  this.r.serializeToJson();
};

Report.serializeToJSONString = function () {
    return JSON.stringify(this.serializeToJson());
};

Report.reload = function () {
    this.init(this.option);
};

Report.toExcel = function () {
    this.r.toExcel(this.export_excel_url);
};

Report.get_option_by_type = function (type) {
    var option = {};
    option.type = this.type[type];
    option.type_string = type;
    return option;
}

Report.type = {
    "high_chart": 0,
    "current_status": 1,
    "summary_report": 2,
    "station_data": 3,
    "tracking_report": 4,
    "defect": 5,
    "vehicle_info": 6,
    "daily_dpv": 7
}

/*
* write your init code here
* for different type
* func name should be typename_init, like current-status_init
* */
Report.current_status_init = function(){
    $("#vehicle-select").change(function () {
        Report.r.clearAll();
        Report.json_parse(d_current_status[$("#vehicle-select option:selected").text()]);
    });
    $("#quick-print").on("click",function(){
        html2canvas($("#data_container"), {
            onrendered: function(canvas) {
                // Convert and download as image
                Canvas2Image.saveAsPNG(canvas);
            }
        });
    });

    $("#refresh").on("click",function(){
        current_status.loader_show();
        Report.r.clearAll();
        Report.json_parse(d_current_status[$("#vehicle-select option:selected").text()]);
        setTimeout(function(){
            current_status.loader_hide();
        },1500);
    });
}

Report.daily_dpv_init = function(){
    /*------------------------------------------------------------*/
    /*init chosen*/
    chosen.init(
        ["deffect-model", "deffect-phase", "deffect-date"],
        [220, 220, 220]
    );

    var models = Report.r.collectValues(1);
    $("#deffect-model option").remove();
    for (i = 0; i < models.length; i++) {
        $("#deffect-model").append("<option>" + models[i] + "</option>");
    }
    chosen.single_update("deffect-model");

    var phases = Report.r.collectValues(3);
    $("#deffect-phase option").remove();
    for (i = 0; i < phases.length; i++) {

        $("#deffect-phase").append("<option>" + phases[i] + "</option>");
    }
    chosen.single_update("deffect-phase");

    var dates = Report.r.collectValues(4);
    $("#deffect-date option").remove();
    for (i = 0; i < dates.length; i++) {

        $("#deffect-date").append("<option>" + dates[i] + "</option>");
    }
    chosen.single_update("deffect-date");

    /*------------------------------------------------------------*/
    /*filter data*/
    $("#retrieve-data").on('click',function(){
        //Report.r.filterByAll();

        var models = [];
        var i = 0;
        $("#deffect-model option:selected").each(function () {
            models[i] = $(this).text();
            i++;
        });
        if (models.length > 0) {
            Report.r.filterBy(1, function (a) {
                for (j = 0; j < models.length; j++) {
                    if (a == models[j]) {
                        return true;
                    }
                }
            })
        }

        var phases = [];
        i = 0;
        $("#deffect-phase option:selected").each(function () {
            phases[i] = $(this).text();
            i++;
        });
        if (phases.length > 0) {
            Report.r.filterBy(3, function (a) {
                for (j = 0; j < phases.length; j++) {
                    if (a == phases[j]) {
                        return true;
                    }
                }
            })
        }


        var dates = [];
        i = 0;
        $("#deffect-date option:selected").each(function () {
            dates[i] = $(this).text();
            i++;
        });
        if (dates.length > 0) {
            Report.r.filterBy(4, function (a) {
                for (j = 0; j < dates.length; j++) {
                    if (a == dates[j]) {
                        return true;
                    }
                }
            })
        }
    });

    /*------------------------------------------------------------*/
    /*Tricky code, need to rewrite*/
    /*reload daily dpv and sdpv chart*/
    var jsondata = Report.r.serializeToJson();
    var xArray = [],data = [];

    var colindx = 0;
    for(var j = 0;j<jsondata['rows'].length;j++){
        xArray[j] = jsondata['rows'][j]['data'][colindx]
    }

    //DPV
    colindx = 3;
    for(var j = 0;j<jsondata['rows'].length;j++){
        data[j] = jsondata['rows'][j]['data'][colindx]
    }

    var option_one={
        xArray:xArray,
        data:[{
            name: 'DPV',
            data: data
        }]
    };

    daily_dpv.chart_dpv.reload_daily_dpv(option_one);

    //SDPV
    colindx = 4;
    for(var j = 0;j<jsondata['rows'].length;j++){
        data[j] = jsondata['rows'][j]['data'][colindx]
    }

    option_one={
        xArray:xArray,
        data:[{
            name: 'SDPV',
            data: data
        }]
    };
    daily_dpv.chart_sdpv.reload_daily_dpv(option_one);
    /*------------------------------------------------------------*/
}
// need to rewrite
function export_report_excel() {
    Report.toExcel();
};