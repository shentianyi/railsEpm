var Report = Report || {};
Report.option = {};
Report.r = {};
Report.export_excel_url = 'http://42.121.111.38:9003/DHXFileService/Excel';

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
/*

Report.init = function(option){
    this.option = option;
    this.r = this.get_dhtmlx();
    this.configure();
    this.parse_json(this.get_json());
    this.prepare();
};
*/

Report.prepare = function(){
    
};

Report.parse_json = function(json){
    this.r.parse(json,"json");
};

Report.json_parse = function (jsondata) {
    this.r.parse(jsondata, 'json');
};

Report.get_dhtmlx = function(){
    var container = "data_container";
    switch(this.option.type){
        case this.type["current_status"]:
            return new dhtmlXDataView(container);
        case this.type["daily-dpv"]:
        case this.type["station-data"]:
            return new dhtmlXGridObject(container);
        default:
            return new dhtmlXDataView(container);
    }
}

Report.configure = function(){
    var dhtmlx = this.r;
    var type = this.option.type;
    switch(type){
        case this.type["current-status"]:
           dhtmlxobj.type =  {
                template: "<div class='dv-header'>" +
                "<p>#INQA#</p>" +
                "</div>" +
                "<div class='dv-body'>" +
                "<div class='left'>" +
                "<p>#FTQ#</p>" +
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
            }
            break;
        case this.type["station-data"]:
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
        case this.type["daily-dpv"]:
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            dhtmlxobj.setHeader("FALSE,Volumn,Effect,DPV,SDPV");
            dhtmlxobj.attachHeader("#text_search,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter");
            dhtmlxobj.setInitWidths("150,150,150,150,150");
            dhtmlxobj.enableAutoWidth(true);
            dhtmlxobj.setColAlign("left,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro");
            dhtmlxobj.setColSorting("str,int,int,int,int");
            dhtmlxobj.setNumberFormat("0,000.00", 0, ".", ",");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.enableSmartRendering(true);
            break;
        default:
            break;
    }
}

Report.get_json = function () {
    switch (this.option.type) {
        case this.type["current-status"]:
            return d_current_status['Vehicle_1'];
        case this.type["daily-dpv"]:
            return  d_daily_dpv;
        case this.type["station-data"]:
            return d_station_data;
        default :
            return null;
    }
};

Report.serializeToJson = function () {
    return  this.r.o.serializeToJson();
};

Report.serializeToJSONString = function () {
    return JSON.stringify(this.serializeToJson());
};

Report.reload = function () {
    this.init(this.option);
};

Report.toExcel = function () {
    this.r.o.toExcel(this.export_excel_url);
};

Report.get_option_by_type = function (type) {
    var option = {};
    switch (type) {
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
    "high-chart": 0,
    "current-status": 1,
    "summary-report": 2,
    "station-data": 3,
    "tracking-report": 4,
    "defect": 5,
    "vehicle-info": 6,
    "daily-dpv": 7
}

//===========================================
//daily-dpv
var Grid = {};
Grid.o = {};
Grid.init = function (option) {
    chosen.init(
        ["deffect-model", "deffect-phase", "deffect-date"],
        [220, 220, 220]
    );
    mygrid = {}
    mygrid = new dhtmlXGridObject('gridbox');
    mygrid.setImagePath("/assets/dhtmlx/");
    mygrid.setHeader("FALSE,Volumn,Effect,DPV,SDPV");
    mygrid.attachHeader("#text_search,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter");
    mygrid.setInitWidths("150,150,150,150,150");
    mygrid.enableAutoWidth(true);
    mygrid.setColAlign("left,center,center,center,center");
    mygrid.setColTypes("ro,ro,ro,ro,ro");
    mygrid.setColSorting("str,int,int,int,int");
    mygrid.setNumberFormat("0,000.00", 0, ".", ",");
    mygrid.setSkin("dhx_skyblue");
    mygrid.init();
    mygrid.enableSmartRendering(true);

    this.o = mygrid;
}

Grid.page_load = function () {
    var models = mygrid.collectValues(1);
    $("#deffect-model option").remove();
    for (i = 0; i < models.length; i++) {
        $("#deffect-model").append("<option>" + models[i] + "</option>");
    }
    chosen.single_update("deffect-model");

    var phases = mygrid.collectValues(3);
    $("#deffect-phase option").remove();
    for (i = 0; i < phases.length; i++) {

        $("#deffect-phase").append("<option>" + phases[i] + "</option>");
    }
    chosen.single_update("deffect-phase");

    var dates = mygrid.collectValues(4);
    $("#deffect-date option").remove();
    for (i = 0; i < dates.length; i++) {

        $("#deffect-date").append("<option>" + dates[i] + "</option>");
    }
    chosen.single_update("deffect-date");
}

Grid.onfilter = function (els) {

}

Grid.filter = function () {
    Grid.o.filterByAll();

    var models = [];
    var i = 0;
    $("#deffect-model option:selected").each(function () {
        models[i] = $(this).text();
        i++;
    });
    if (models.length > 0) {
        Grid.o.filterBy(1, function (a) {
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
        Grid.o.filterBy(3, function (a) {
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
        Grid.o.filterBy(4, function (a) {
            for (j = 0; j < dates.length; j++) {
                if (a == dates[j]) {
                    return true;
                }
            }
        })
    }

}

Grid.parse = function (jsondata) {
    this.o.parse(jsondata, "json");
}

//===========================================
//current-status
var DV = {} || DV;
DV.o = {};
DV.init = function (option) {
    this.o = new dhtmlXDataView({
        container: option.container,
        type: {
            template: "<div class='dv-header'>" +
                "<p>#INQA#</p>" +
                "</div>" +
                "<div class='dv-body'>" +
                "<div class='left'>" +
                "<p>#FTQ#</p>" +
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

        }
    });
};

DV.page_load = function () {
    $("#vehicle-select").change(function () {
        DV.parse(d_current_status[$("#vehicle-select option:selected").text()]);
    });
    $("#quick-print").on("click",function(){
        html2canvas($("#data_container"), {
            onrendered: function(canvas) {
                // Convert and download as image
                Canvas2Image.saveAsPNG(canvas);
            }
        });
    });
}

DV.parse = function (jsondata) {
    this.o.parse(jsondata, "json");
};

DV.clear = function () {
    this.o.clearAll();
};
// need to rewrite
function export_report_excel() {
    Report.toExcel();
};

var StationData = {} || StationData;

StationData.o = {};

StationData.init = function () {
    mygrid = new dhtmlXGridObject('gridbox');
    mygrid.setImagePath("../../../codebase/imgs/");
    mygrid.setHeader("Inspection,#cspan,Vechile Total,OK Vehicle,NOK Vehicle,FTQ,DPV,DPV Target,Defects,Vehs,FTQ Target,OK,NOK");
    //mygrid.attachHeader("full,short,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
    mygrid.setInitWidths("150,80,80,80,80,80,80,80,80,80,80,80,80");
    mygrid.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center,center");
    mygrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
    mygrid.setColSorting("str,int,int,int,int,int,int,int,int,int,int,int,int");
    //mygrid.setColumnColor("white,#d5f1ff,#d5f1ff");
    mygrid.setSkin("dhx_skyblue");
    mygrid.init();
    mygrid.enableMultiselect(true);
    this.o = mygrid;
}

StationData.page_load = function () {

}

StationData.parse = function (jsondata) {
    if(jsondata != null){
        this.o.parse(jsondata, "json");
    }
}