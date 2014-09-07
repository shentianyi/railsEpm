dhtmlXDataView.prototype.toExcel = function (url) {
    console.log(url);
    var data = this.serialize();
    var xml = "<rows  profile='color'>";
    // generate head
    xml += '<head><columns>';
    for (var h in data[0]) {
        if (h != 'id' && h != 'value') {
            xml += "<column  color=''><![CDATA[" + $.trim(h) + ']]></column>';
        }
    }
    xml += '</columns></head>';
    // generate rows
    for (var i = 0; i < data.length; i++) {
        xml += '<row>';
        for (var d in data[i]) {
            if (d != 'id' && d != 'value') {
                xml += '<cell><![CDATA[' + $.trim(data[i][d]) + ']]></cell>';
            }
        }
        xml += '</row>';
    }
    xml += '</rows>';
    // post form
    $('<form>', {
        action: url,
        method: 'post',
        target: '_blank'
    }).append($('<input>', {
            type: 'hidden',
            name: 'grid_xml',
            value: xml
        })).appendTo('body').submit();
};
dhtmlXDataView.prototype.serializeToJson = function () {
    return this.serialize();
};

var DV = {} || DV
DV.o = {}
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
    init_snap(DV.dv);
};

DV.parse = function (jsondata) {
    this.o.parse(jsondata, "json");
};

DV.clear = function () {
    this.o.clearAll();
};
// need to rewrite
function export_data_view_excel() {
    DV.o.toExcel('http://42.121.111.38:9003/DHXFileService/Excel');
}
