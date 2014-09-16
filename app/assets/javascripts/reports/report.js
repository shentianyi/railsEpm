var Report = Report || {};
Report.option = {};
Report.r = {};
Report.data = {};
Report.host = 'http://42.121.111.38:9003/';
//Report.host='http://192.168.1.112:9002/';
Report.Url = {export_excel_url: Report.host + 'DHXFileService/Excel',
    export_chart_excel_url: Report.host + 'BTReportService/ChartExcel'};
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
Report.init = function (type) {
    this.option = this.get_option_by_type(type);
    delete this.r;
    this.r = this.get_dhtmlx();
    this.configure();
    this.json_parse(this.get_json());
    this.prepare();
};

Report.ChartAxisFormatType={
 None:0,
 IntPercent:1,
 FloatPercent:2
};
Report.CellFormatType={
    None:0,
    IntPercent:1,
    FloatPercent:2
};
/*prepare page*/
Report.prepare = function () {
    var fn = Report[this.option.type_string + "_init"];
    if (typeof fn === "function") {
        fn();
    }
};

/*parse json data*/
Report.json_parse = function (jsondata) {
//    console.log(jsondata);
    if (typeof jsondata === 'string') {
        jsondata = JSON.parse(jsondata);
    }
    this.r.clearAll();
    this.r.parse(jsondata, 'json');
    this.data = jsondata;
    var fn = Report[this.option.type_string + "_on_json_parse"];
    if (typeof fn === 'function') {
        fn();
    }
};

/*clear data*/
Report.clear = function () {
    this.r.clearAll();
    this.data = {};
};

/*refresh*/
Report.refresh = function(){
//    console.log("refresh()");
    this.r.refresh();
};

/*get dhtmlx object*/
Report.get_dhtmlx = function () {
    var container = "data_container";
    switch (this.option.type) {
        case this.type["current_status"]:
            return new dhtmlXDataView(container);
        case this.type["daily_dpv"]:
        case this.type["station_data"]:
        case this.type["daily_ftq"]:
            var o= new dhtmlXGridObject(container);
            o.addCellAttributes(['value']);
            return o;
            //return new dhtmlXGridObject(container);
        default:
            return null;
    }
};

/*color*/
Report.color = {
    ftq:{
        "higher":"#19cf22",
        "equal":"#f3d02e",
        "lower":"#eb4848"
    },
    dpv:{
        "higher":"#eb4848",
        "equal":"#f3d02e",
        "lower":"#19cf22"
    }

}

Report.configure = function () {
    var dhtmlxobj = this.r;
    var type = this.option.type;
    switch (type) {
        case this.type["current_status"]:
            dhtmlxobj.define("type", {
                template: "<div class='dv-header'>" +
                    "<p>#INQA#</p>" +
                    "</div>" +
                    "<div class='dv-body'>" +
                    "<div class='left'>" +
                    "<p id='ftq' style='color:" + "#STYLE_COLOR#" + "'>#FTQ#%</p>" +
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
            var width = Math.floor($("#report-content").width() / 14) - 2;
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            var widstring = (width*2)+",";
            for(var i = 0;i<12;i++){
                if(i==12){
                    widstring = widstring +width;
                }else {
                    widstring = widstring + width + ",";
                }
            }
            dhtmlxobj.setHeader("Inspection,#cspan,Vechile Total,OK Vehicle,NOK Vehicle,FTQ,DPV,DPV Target,Defects,Vehs,FTQ Target,OK,NOK");
            dhtmlxobj.setInitWidths(widstring);
            dhtmlxobj.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
            dhtmlxobj.setColSorting("str,int,int,int,int,int,int,int,int,int,int,int,int");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.enableMultiselect(true);
            station_data.init();
            break;
        case this.type["daily_dpv"]:
            var width = Math.floor($("#report-content .left").width() / 17) - 2;
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            dhtmlxobj.setHeader(this.headers["daily_dpv"]);

            dhtmlxobj.setInitWidths(width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width + "," + width);
            dhtmlxobj.enableAutoWidth(false);

            dhtmlxobj.setColAlign("left,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.setColumnColor("#d5f1ff");
            dhtmlxobj.enableSmartRendering(true);
            daily_dpv.init();
            break;
        case this.type["daily_ftq"]:
            var width = 62;
            var widthstring = "";
            var head_length = this.headers["daily_ftq"].split(",").length;
            for(var i = 0 ;i <= head_length;i++){
                if(i == head_length){
                    widthstring = widthstring + width;
                }else{
                    widthstring =widthstring+width+",";
                }

            }
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            dhtmlxobj.setHeader(this.headers["daily_ftq"]);
            //dhtmlxobj.setInitWidths("80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80");
            dhtmlxobj.setInitWidths(widthstring);
            dhtmlxobj.enableAutoWidth(false);
            dhtmlxobj.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.setColumnColor("#d5f1ff");
            dhtmlxobj.init();
            dhtmlxobj.enableMultiselect(true);
            daily_ftq.init();
            break;
        default:
            break;
    }
};

Report.get_json = function () {
    switch (this.option.type) {
        case this.type["current_status"]:
            return d_current_status["CF11"];
        case this.type["daily_dpv"]:
            return  SampleData.init_daily_dpv();
        case this.type["station_data"]:
            return SampleData.init_station_data();
        case this.type["daily_ftq"]:
            return SampleData.init_daily_ftq();
        default :
            return null;
    }
};

Report.serializeToJson = function () {
    return  this.r.serializeToJson();
};
Report.serializeToDataJson = function () {
    return  this.r.serializeToDataJson();
};
Report.serializeToJSONString = function () {
    return JSON.stringify(this.serializeToDataJson());
};

Report.reload = function () {
    this.init(this.option);
};

Report.toExcel = function () {
    this.r.toExcel(this.Url.export_excel_url);
};
Report.toChartExcel = function () {
    this.r.toChartExcel(this.Url.export_chart_excel_url);
};

Report.get_option_by_type = function (type) {
    var option = {};
    option.type = this.type[type];
    option.type_string = type;
    return option;
};

Report.type = {
    "high_chart": 0,
    "current_status": 1,
    "summary_report": 2,
    "station_data": 3,
    "tracking_report": 4,
    "defects": 5,
    "vehicle_info": 6,
    "daily_dpv": 7,
    'daily_ftq': 8,
    'defect_info': 9,
    'float': 10,
    'top_issue': 11,
    'weekly_report': 12
};

Report.headers = {
    "daily_dpv": "FALSE,iQ1,iQ2,iQ IP,iQ DR,iQ3,iQ4,iQ5,iQ6,iQ7,iQ8,iQ9,iQ10,iQ11,iQ12,iQ13,iQ14,iQ15",
    "daily_ftq": "IQ Station, iQ1, iQ2, iQ3,iQ4,iQ5,iQ Dr,iQ IP,iQ6,iQ7,iQ8,iQ9,iQ10,iQ11,iQ12,iQ13,iQ14,iQ15"
};

/*
 * write your init code here
 * for different type
 * func name should be typename_init, like current-status_init
 * */
/*-----------------------------------------------*/
Report.station_data_init = function () {
    $("#retrieve").on('click', function () {
        Report.json_parse(SampleData.init_station_data());
    });
};
/*-----------------------------------------------*/
Report.current_status_init = function () {
    $("#target").on("click", function () {
    });

    $("#vehicle-select").change(function () {
        Report.r.clearAll();
        Report.json_parse(d_current_status[$("#vehicle-select option:selected").text()]);

    });

    $("#quick-print").on("click", function () {
        html2canvas($("#data_container"), {
            onrendered: function (canvas) {
                // Convert and download as image
                Canvas2Image.saveAsPNG(canvas);
            }
        });
    });

    $("#refresh").on("click", function () {
        current_status.loader_show();
        setTimeout(function () {
            Report.r.clearAll();
            Report.json_parse(d_current_status[$("#vehicle-select option:selected").text()]);

            current_status.loader_hide();
        }, 1500);

    });
};

Report.daily_dpv_init = function () {
    /*------------------------------------------------------------*/
    /*init chosen*/
    chosen.init(
        ["deffect-model", "deffect-phase", "deffect-date"],
        [220, 220, 220]
    );

    //var models = Report.r.collectValues(1);
    var models = ["CF11", "CF14", "CF16"];
    $("#deffect-model option").remove();
    for (i = 0; i < models.length; i++) {
        $("#deffect-model").append("<option>" + models[i] + "</option>");
    }
    chosen.single_update("deffect-model");

    //var phases = Report.r.collectValues(3);
    var phases = ["MRD1", "MRD10", "MRD11", "MRD2", "MRD8", "MRD9"]
    $("#deffect-phase option").remove();
    for (i = 0; i < phases.length; i++) {

        $("#deffect-phase").append("<option>" + phases[i] + "</option>");
    }
    chosen.single_update("deffect-phase");

    //var dates = Report.r.collectValues(4);
    var dates = [];
    var j = 0;
    for (var i = Date.parse('2014-09-01'); i < (new Date()).getTime(); i += 24 * 60 * 60 * 1000) {
        d = new Date(i);
        dates[j] = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        j++;
    }

    $("#deffect-date option").remove();
    for (i = 0; i < dates.length; i++) {
        $("#deffect-date").append("<option>" + dates[i] + "</option>");
    }
    chosen.single_update("deffect-date");

    /*------------------------------------------------------------*/
    /*filter data*/
    $("#retrieve-data").on('click', function () {
        if ($("#deffect-model option:selected").length > 0
            || $("#deffect-phase option:selected").length > 0
            || $("#deffect-date option:selected").length > 0) {
            var data = SampleData.init_daily_dpv();
            Report.json_parse(data);
        }

    });
    /*------------------------------------------------------------*/
};
/*----------------------------------------------------*/
/*on_json_parse for daily_ftq*/
Report.daily_ftq_on_json_parse = function(){
    var charts = [
        {
            attr: { title: 'Quality Buyoff station Vehicle status', width: 1200, height: 300, show_legend: true},
            chart_types: [
                {  type: 'column',
                    series: [
                        {xaixs: "B1:R1", yaixs: "B3:R3",
                            attr: { color: 'D1E5FE', head_address: 'A3'}},
                        {xaixs: "B1:R1", yaixs: "B4:R4",
                            attr: { color: 'D1E5FE', head_address: 'A4'}}
                    ]},
                {  type: 'line',
                    series: [
                        {xaixs: "B1:R1", yaixs: "B5:R5",
                            attr: { color: 'D1E5FE', head_address: 'A5', use_secondary_axis: true,
                                yaxis_format_type: Report.ChartAxisFormatType.IntPercent}}
                    ]}
            ]
        }
    ];
    Report.r.set_charts(charts);

    //load chart
    var headers = Report.headers["daily_ftq"].split(",");
    Report.r.addValueToAttribute();
    var jsondata = Report.data;//Report.r.serializeToDataJson();
    var xArray = [], ok = [], nok = [], ftq = [];
    //ok
    xArray = headers.slice(0);
    var colindx = 2;
    for (var j = 0; j < xArray.length; j++) {
        ok[j] = jsondata['rows'][colindx]['data'][j]
    }
    ok.shift();

    colindx = 1;
    for (var j = 0; j < xArray.length; j++) {
        nok[j] = jsondata['rows'][colindx]['data'][j]
    }
    nok.shift();


    colindx = 3;
    for (var j = 0; j < xArray.length; j++) {
        var value = parseFloat(jsondata['rows'][colindx]['data'][j].replace("%",""));
        value = isNaN(value) ? 0:value;
        ftq[j] =value;
        console.log(j);
    }
    ftq.shift();
    xArray.shift();

    var option = {
        xArray: xArray,
        data: {
            nok: {
                data: nok
            },
            ok: {
                data: ok
            },
            ftq: {
                data: ftq
            }
        }
    };

    daily_ftq.chart.reload_daily_ftq(option);


};
/*on_json_parse for current_status*/
Report.current_status_on_json_parse = function () {
    if (typeof defects != 'undefined') {
        defects.example_init();
    }
};

/*on_json_parse for different type*/
Report.daily_dpv_on_json_parse = function () {
    /*------------------------------------------------------------*/
    /*Tricky code, need to rewrite*/
    /*reload daily dpv and sdpv chart*/

    Report.r.addValueToAttribute();

    var jsondata = Report.data;//Report.r.serializeToDataJson();

    var xArray = [],data = [],header  = [];
    header = Report.headers["daily_dpv"].split(",");
    xArray = header.slice(0);
    //DPV
    colindx = 2;
    for (var j = 0; j < xArray.length; j++) {
        data[j] = parseFloat(jsondata['rows'][colindx]['data'][j]);
    }

    xArray.shift();
    data.shift();

    var option_one = {
        xArray: xArray,
        data: [
            {
                name: 'DPV',
                data: data
            }
        ],
        name:"dpv"
    };

    daily_dpv.chart_dpv.reload_daily_dpv(option_one);

    xArray = header.slice(0);
    //SDPV
    colindx = 3;
    for (var j = 0; j < xArray.length; j++) {
        data[j] = parseFloat(jsondata['rows'][colindx]['data'][j]);
    }
    xArray.shift();
    data.shift();


    var option_two = {
        xArray: xArray,
        data: [
            {
                name: 'SDPV',
                data: data
            }
        ],
        name:"sdpv"
    };
    daily_dpv.chart_sdpv.reload_daily_dpv(option_two);
};

/*station data*/
Report.station_data_on_json_parse = function () {
    var obj = Report.r;
    for (var i = 0; i < obj.getRowsNum(); i++) {
        var row_id = obj.getRowId(i);
        //FTQ
        var ftq = parseFloat(obj.cells(row_id, 5).getValue());
        var ftq_targte = parseFloat(obj.cells(row_id, 10).getValue());
        if (ftq > ftq_targte) {
            obj.cells(row_id, 5).setBgColor(Report.color.ftq["higher"]);
        } else if (ftq == ftq_targte){
            obj.cells(row_id, 5).setBgColor(Report.color.ftq["equal"]);
        }else {
            obj.cells(row_id, 5).setBgColor(Report.color.ftq["lower"]);
        }
        //DPV
        var dpv = parseFloat(obj.cells(row_id, 6).getValue());
        var dpv_target = parseFloat(obj.cells(row_id, 7).getValue());
        if (dpv > dpv_target) {
            obj.cells(row_id, 6).setBgColor(Report.color.dpv["higher"]);
        } else if (dpv == dpv_target){
            obj.cells(row_id, 6).setBgColor(Report.color.dpv["equal"]);
        }else{
            obj.cells(row_id, 6).setBgColor(Report.color.dpv["lower"]);
        }

    }
    ;
}

// need to rewrite
// default export excel
function export_report_excel() {
    Report.toExcel();
}
// default export chart excel
function export_report_chart_excel() {
    Report.toChartExcel();
}
