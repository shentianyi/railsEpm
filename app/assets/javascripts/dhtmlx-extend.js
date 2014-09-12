// extend grid
dhtmlXGridObject.prototype.serializeToJson = function () {
    var data = xml2json.parser(this.serialize().replace(/\<cell\>/g, "<data>")
        .replace(/\<\/cell\>/g, "</data>"));
    return {rows: data.rows.row};
};


dhtmlXDataView.prototype.serializeToJson = function () {
    return this.serialize();
};

dhtmlXGridObject.prototype.get_charts=function(){
  return this.charts;
};

//_charts=[
//  [{xstart_row:0,xstart_col:0,xend_row:0,xend_col:0,
//    ystart_row:0,ystart_col:0,yend_row:0,yend_col:0,
//    title:'title',width:1000,height:300,type:'line',color:'#dasdas'},
//   {xstart_row:0,xstart_col:0,xend_row:0,xend_col:0,
//    ystart_row:0,ystart_col:0,yend_row:0,yend_col:0,
//    title:'title',width:1000,height:300,type:'column',color:'#dasdas'}]
// ]
dhtmlXGridObject.prototype.set_charts=function(_charts){
  this.charts=_charts;
};
//customized xml for excel
//charts = [{x:0,y:1,title:title,width:1000,height:300,type:line,color:#dasdas}]
dhtmlXGridObject.prototype.serializeChartExcelXml = function(){
//    if(charts == undefined){
//        charts = [];
//    }
    var charts=this.get_charts();
    var data = this.serializeToJson();
    var headercount = data["rows"][0]["data"].length;
    var xml = "<report>";
    //Head Start
    xml += "<table><head><columns>";
    for(var i = 0;i < headercount;i++){
        xml += "<column width='60'><![CDATA["+this.getColLabel(i)+"]]></column>";
    }
    xml += "</columns></head>";
    //Head End

    //Body Start
    xml += "<body>";
    for(var i = 0;i<data["rows"].length;i++){
        xml += "<row>";
        for(var j = 0;j<data["rows"][i]["data"].length;j++){
            xml+= "<cell><![CDATA["+data["rows"][i]["data"][j]+"]]></cell>";
        }
        xml += "</row>";
    }
    xml += "</body></table>";
    //Body End
    var charts=this.get_charts();
    //Chart Start
    xml += "<charts>"
    for(var i = 0;i<charts.length;i++){
        xml += "<chart title='"+charts[i]["title"]+"' height='"+charts[i]["height"]+"' width='"+charts[i]["width"]+"'>";
        for(var j=0;j<charts[i].series.length;j++) {
            var serie=charts[i].series[j];
            xml += "<serie color='" + serie["color"] + "' type='" + serie["type"] + "'>";

            xml += "<xstart_row><![CDATA[" +serie["xstart_row"] + "]]></xstart_row><xstart_col><![CDATA["+serie['xstart_col']+"]]></xstart_col>";
            xml += "<xend_row><![CDATA[" + serie["xend_row"] + "]]></xend_row><xend_col><![CDATA[" + serie['xend_col'] + "]]></xend_col>";

            xml += "<ystart_row><![CDATA[" + serie["ystart_row"] + "]]></ystart_row><ystart_col><![CDATA["+serie['ystart_col']+"]]></ystart_col>";
            xml += "<yend_row><![CDATA[" + serie["yend_row"] + "]]></yend_row><yend_col><![CDATA[" +serie['yend_col'] + "]]></yend_col>";

            xml += "</serie>";
        }
        xml += "</chart>";
    }
    xml += "</charts>";
    //Chart End
    xml += "</report>";
    return xml;
};

// extend dataview
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
            if (d != 'id' && d != 'value' && h.indexOf("STYLE_") == -1) {
                xml += '<cell><![CDATA[' + $.trim(data[i][d]) + ']]></cell>';
            }
        }
        xml += '</row>';
    }
    xml += '</rows>';
    return xml;
};

dhtmlXGridObject.prototype.toChartExcel=function(url){
    processReportExcelRequest(url,this.serializeChartExcelXml());
};
dhtmlXDataView.prototype.toExcel=function(url){
 processReportExcelRequest(url,this.serializeToExcelXml());
};


function processReportExcelRequest(url,xml){
    console.log(xml);
   $('<form>', {
        action: url,
        method: 'post',
        target: '_blank'
    }).append($('<input>', {
            type: 'hidden',
            name: 'grid_xml',
            value: xml
        })).appendTo('body').submit();
}
