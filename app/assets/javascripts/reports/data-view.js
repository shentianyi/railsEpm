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
var DV = {} || DataView;
DV.dv = {};
DV.init = function (container) {
    this.dv = new dhtmlXDataView({
        container: container,
        type: {
            template: "<span class='dhx_strong'>#INQA#</span> #FTQ# <span class='dhx_light'>#Defects#</span>-<span class='dhx_light'>#Pass#</span>",
            height: 35
        }
    });
    init_snap(DV.dv);
};

DV.parse = function (jsondata) {
    this.dv.parse(jsondata, "json");
};

DV.clear = function () {
    this.dv.clearAll();
};

function export_data_view_excel() {
    DV.dv.toExcel('http://42.121.111.38:9003/DHXFileService/Excel');
}

