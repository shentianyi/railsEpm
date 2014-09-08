
var DV = {} || DV;
DV.o = {};
DV.init = function (option) {
    this.o = new dhtmlXDataView({
        container: option.container,
        type: {
            template:
                "<div class='dv-header'>" +
                    "<p>#INQA#</p>" +
                "</div>"+
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
            css:"dv-item",
            height: 150,
            width:230,
            margin:5,
            padding:8

        }
    });
	this.page_load();
};

DV.page_load = function(){
	$("#vehicle-select").change(function(){
	     DV.parse(d_current_status[$("#vehicle-select option:selected").text()]);
    });
}

DV.parse = function (jsondata) {
    this.o.parse(jsondata, "json");
};

DV.clear = function () {
    this.o.clearAll();
};
// need to rewrite
function export_data_view_excel() {
    DV.o.toExcel('http://42.121.111.38:9003/DHXFileService/Excel');
};
