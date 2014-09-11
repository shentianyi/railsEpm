var Report = Report || {};
Report.option = {};
Report.r = {};
Report.data = {};
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
//    console.log(jsondata);
    this.r.clearAll();
    this.r.parse(jsondata, 'json');
    this.data = jsondata;
    var fn = Report[this.option.type_string+"_on_json_parse"];
    if(typeof fn === 'function'){
        fn();
    }
};

/*clear data*/
Report.clear = function(){
    this.r.clearAll();
    this.data = {};
}

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
                    "<p id='ftq' style='color:"+"#COLOR#"+"'>#FTQ#%</p>" +
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
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            dhtmlxobj.setHeader("Inspection,#cspan,Vechile Total,OK Vehicle,NOK Vehicle,FTQ,DPV,DPV Target,Defects,Vehs,FTQ Target,OK,NOK");
            //mygrid.attachHeader("full,short,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
            dhtmlxobj.setInitWidths("150,100,100,100,100,100,100,100,100,100,100,100,100");
            dhtmlxobj.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
            dhtmlxobj.setColSorting("str,int,int,int,int,int,int,int,int,int,int,int,int");
            //mygrid.setColumnColor("white,#d5f1ff,#d5f1ff");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.enableMultiselect(true);
            break;
        case this.type["daily_dpv"]:
            var width=Math.floor($("#report-content .left").width()/16)-1;
            dhtmlxobj.setImagePath("/assets/dhtmlx/");
            dhtmlxobj.setHeader(this.headers["daily_dpv"]);
            //dhtmlxobj.attachHeader("#text_search,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter");

            dhtmlxobj.setInitWidths(width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width+","+width);
            dhtmlxobj.enableAutoWidth(false);

            dhtmlxobj.setColAlign("left,center,center,center,center,center,center,center,center,center,center,center,center,center,center,center");
            dhtmlxobj.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
            //dhtmlxobj.setColSorting("str,int,int,int,int,int,int,int,int,int,int,int,int,int,int,int");
            //dhtmlxobj.setNumberFormat("0,000.00", 0, ".", ",");
            dhtmlxobj.setSkin("dhx_skyblue");
            dhtmlxobj.init();
            dhtmlxobj.setColumnColor("#d5f1ff");
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
};

Report.type = {
    "high_chart": 0,
    "current_status": 1,
    "summary_report": 2,
    "station_data": 3,
    "tracking_report": 4,
    "defects": 5,
    "vehicle_info": 6,
    "daily_dpv": 7
};

Report.headers = {
    "daily_dpv" : "FALSE,iQ1,iQ2,iQ3,iQ4,iQ5,iQ6,iQ7,iQ8,iQ9,iQ10,iQ11,iQ12,iQ13,iQ14,iQ15"
};

/*
* write your init code here
* for different type
* func name should be typename_init, like current-status_init
* */
/*-----------------------------------------------*/
Report.station_data_init = function(){
    $("#retrieve").on('click',function(){
        Report.json_parse(SampleData.init_station_data());
    });
}
/*-----------------------------------------------*/
Report.current_status_init = function(){
    $("#target").on("click",function(){
    });

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
        setTimeout(function(){
            Report.r.clearAll();
            Report.json_parse(d_current_status[$("#vehicle-select option:selected").text()]);

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

    //var models = Report.r.collectValues(1);
    var models = ["CF11","CF14","CF16"];
    $("#deffect-model option").remove();
    for (i = 0; i < models.length; i++) {
        $("#deffect-model").append("<option>" + models[i] + "</option>");
    }
    chosen.single_update("deffect-model");

    //var phases = Report.r.collectValues(3);
    var phases = ["MRD1","MRD10","MRD11","MRD2","MRD8","MRD9"]
    $("#deffect-phase option").remove();
    for (i = 0; i < phases.length; i++) {

        $("#deffect-phase").append("<option>" + phases[i] + "</option>");
    }
    chosen.single_update("deffect-phase");

    //var dates = Report.r.collectValues(4);
    var dates = [];
    var j = 0;
    for(var i=Date.parse('2014-09-01');i<(new Date()).getTime();i+=24*60*60*1000){
        d = new Date(i);
        dates[j] = d.getMonth()+1+"/"+ d.getDate()+"/"+ d.getFullYear() ;
        j++;
    }

    $("#deffect-date option").remove();
    for (i = 0; i < dates.length; i++) {
        $("#deffect-date").append("<option>" + dates[i] + "</option>");
    }
    chosen.single_update("deffect-date");

    /*------------------------------------------------------------*/
    /*filter data*/
    $("#retrieve-data").on('click',function() {
        if($("#deffect-model option:selected").length > 0
            || $("#deffect-phase option:selected").length > 0
            || $("#deffect-date option:selected").length > 0){
            var data = SampleData.init_daily_dpv();
            Report.json_parse(data);
        }

    });
    /*------------------------------------------------------------*/
}
/*----------------------------------------------------*/
/*on_json_parse for current_status*/
Report.current_status_on_json_parse = function(){
    if( typeof defects != 'undefined'){
        defects.example_init();
    }
}

/*on_json_parse for different type*/
Report.daily_dpv_on_json_parse = function(){
    /*------------------------------------------------------------*/
    /*Tricky code, need to rewrite*/
    /*reload daily dpv and sdpv chart*/
    var jsondata = Report.r.serializeToJson();
    var xArray = [],data = [],header  = [];
    header = Report.headers["daily_dpv"].split(",")
    xArray = header;
    //DPV
    colindx = 2;
    for(var j = 0;j<xArray.length;j++){
        data[j] = jsondata['rows'][colindx]['data'][j]
    }

    xArray.shift();
    data.shift();
    var option_one={
        xArray:xArray,
        data:[{
            name: 'DPV',
            data: data
        }]
    };

    daily_dpv.chart_dpv.reload_daily_dpv(option_one);

    xArray = header;
    //SDPV
    colindx = 3;
    for(var j = 0;j<xArray.length;j++){
        data[j] = jsondata['rows'][colindx]['data'][j]
    }
    xArray.shift();
    data.shift();

    var option_two={
        xArray:xArray,
        data:[{
            name: 'SDPV',
            data: data
        }]
    };
    daily_dpv.chart_sdpv.reload_daily_dpv(option_two);
}

// need to rewrite
function export_report_excel() {
    Report.toExcel();
};