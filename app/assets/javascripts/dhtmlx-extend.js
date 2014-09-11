// extend grid
dhtmlXGridObject.prototype.serializeToJson = function () {
    var data = xml2json.parser(this.serialize().replace(/\<cell\>/g, "<data>")
        .replace(/\<\/cell\>/g, "</data>"));
    return {rows: data.rows.row};
};

//customized xml for excel
//charts = [{x:0,y:1,title:title,width:1000,height:300,type:line,color:#dasdas}]
dhtmlXGridObject.prototype.serializeToReportXML = function(charts){
    if(charts == undefined){
        charts = [];
    }
    var data = this.serializeToJson();
    var headercount = data["rows"][0]["data"].length;
    var xml = "<report>";
    //Head Start
    xml += "<table><head><columns>";
    for(var i = 0;i < headercount;i++){
        xml += "<column width='60'>"+this.getColLabel()+"</column>";
    }
    xml += "</columns></head>";
    //Head End

    //Body Start
    xml += "<body>";
    for(var i = 0;i<data["rows"].length;i++){
        xml += "<row>";
        for(var j = 0;j<data["rows"][i]["data"].length;j++){
            xml+= "<cell>"+data["rows"][i]["data"][j]+"</cell>";
        }
        xml += "</row>";
    }
    xml += "</body></table>";
    //Body End

    //Chart Start
    xml += "<charts>"
    for(var i = 0;i<charts.length;i++){
        xml += "<chart title='"+charts[i]["title"]+"' height='"+charts[i]["height"]+"' width='"+charts[i]["width"]+"'>";
        xml += "<serie color='"+charts[i]["color"]+"' type='"+charts[i]["type"]+"'>";

        xml +="<xstart_row>"+charts[i]["x"]+"</xstart_row><xstart_col>2</xstart_col>";
        xml +="<xend_row>"+charts[i]["x"]+"</xend_row><xend_col>"+headercount+"</xend_col>";

        xml +="<xstart_row>"+charts[i]["y"]+"</xstart_row><xstart_col>2</xstart_col>";
        xml +="<xend_row>"+charts[i]["y"]+"</xend_row><xend_col>"+headercount+"</xend_col>";

        xml += "</serie>";
        xml += "</chart>";
    }
    xml += "</charts>";
    //Chart End
    xml += "</report>";
    return xml;
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

