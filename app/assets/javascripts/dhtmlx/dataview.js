define(["./share","dhtml.origin.dataview"],function(Share){
    dhtmlXDataView.prototype.serializeToDataJson = function () {
        return this.serialize();
    };
    dhtmlXDataView.prototype.serializeToExcelXml = function () {
        //console.log(url);
        var data = this.serialize();
        var xml = "<rows  profile='color'>";
        // generate head
        xml += '<head><columns>';
        for (var h in data[0]) {
            if (h != 'id' && h != 'value' && h.indexOf("STYLE_") == -1) {
                xml += "<column  color=''><![CDATA[" + $.trim(h) + ']]></column>';
            }
        }
        xml += '</columns></head>';
        // generate rows
        for (var i = 0; i < data.length; i++) {
            xml += '<row>';
            for (var d in data[i]) {
                if (d != 'id' && d != 'value' && d.indexOf("STYLE_") == -1) {
                    xml += '<cell><![CDATA[' + $.trim(data[i][d]) + ']]></cell>';
                }
            }
            xml += '</row>';
        }
        xml += '</rows>';
        return xml;
    };
    dhtmlXDataView.prototype.toExcel = function (url) {
        Share.processReportExcelRequest(url, this.serializeToExcelXml());
    }

    return  dhtmlXDataView
})