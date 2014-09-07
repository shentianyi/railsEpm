// extend grid
dhtmlXGridObject.prototype.serializeToJson = function () {
    var data = xml2json.parser(this.serialize().replace(/\<cell\>/g, "<data>")
        .replace(/\<\/cell\>/g, "</data>"));
    return {rows: data.rows.row};
};

// extend dataview
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

