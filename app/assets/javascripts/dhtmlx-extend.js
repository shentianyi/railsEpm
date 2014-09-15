// extend grid
dhtmlXGridObject.prototype.serializeToJson = function () {
    var data = xml2json.parser(this.serialize().replace(/\<cell/g, "<data")
        .replace(/\<\/cell/g, "</data"));
    return {rows: data.rows.row};
};

dhtmlXGridObject.prototype.serializeToDataJson = function () {
    var data= xml2json.parser( this.serialize().replace(/<cell*.[^>]*/g, "<data")
        .replace(/\<\/cell/g, "</data"));
    return {rows: data.rows.row};
};
//attrs=['abc']
dhtmlXGridObject.prototype.addCellAttributes=function(attrs){
   for(var i=0;i<attrs.length;i++){
       if(this.xml.cell_attrs==null || $.inArray(attrs[i],this.xml.cell_attrs)){
           console.log('*********');
             this.xml.cell_attrs.push(attrs[i]);
       }
   }
    //this.addValueToAttribute();
};

dhtmlXGridObject.prototype.addValueToAttribute=function(){
this.forEachRow(function(rowId){
       this.forEachCell(rowId,function(cell,colIndex){
          cell.setAttribute('value',cell.getValue());
       });
});
};


dhtmlXDataView.prototype.serializeToJson = function () {
    return this.serialize();
};

dhtmlXDataView.prototype.serializeToDataJson = function () {
    return this.serialize();
};
dhtmlXGridObject.prototype.get_charts = function () {
    return this.charts;
};

//var charts = [
//    {
//        title: 'DPV', width: 1100, height: 300,
//        chart_type: {  type: 'column',
//            series: [
//                {xaixs: "B1:P1", yaixs: "B4:P4",
//                    type: 'column', color: 'D1E5FE'}
//            ]  }
//    },
//    {
//        title: 'SDPV', width: 1100, height: 300,
//        chart_type: {  type: 'column',
//            series: [
//                {xaixs: "B1:P1", yaixs: "B5:P5",
//                    color: 'D1E5FE'}
//            ]           }
//    }
//];
dhtmlXGridObject.prototype.set_charts = function (_charts) {
    this.charts = _charts;
};
//customized xml for excel
//charts = [{x:0,y:1,title:title,width:1000,height:300,type:line,color:#dasdas}]
dhtmlXGridObject.prototype.serializeChartExcelXml = function () {
//    if(charts == undefined){
//        charts = [];
//    }
    var charts = this.get_charts();
    var data = this.serializeToJson();
    console.log('---------------------');
    console.log(data);

    var headercount = data["rows"][0]["data"].length;
    var xml = "<report>";
    //Head Start
    xml += "<table><head><columns>";
    for (var i = 0; i < headercount; i++) {
        xml += "<column width='60'><![CDATA[" + this.getColLabel(i) + "]]></column>";
    }
    xml += "</columns></head>";
    //Head End

    //Body Start
    xml += "<body>";
    for (var i = 0; i < data["rows"].length; i++) {
        xml += "<row>";
        for (var j = 0; j < data["rows"][i]["data"].length; j++) {
             xml+="<cell"
            var cell=     data["rows"][i]["data"][j];
            for(var a in cell){
                xml += " " + a + "='" + cell[a] + "'";
                        //          console.log(a);

            }
            xml+="></cell>"
           // xml += "<cell><![CDATA[" + data["rows"][i]["data"][j] + "]]></cell>";
        }
        xml += "</row>";
    }
    xml += "</body></table>";
    //Body End
    var charts = this.get_charts();
    //Chart Start
    xml += "<charts>"
    for (var i = 0; i < charts.length; i++) {
        var chart = charts[i];

        xml += "<chart";

        for (var a in chart.attr) {
            xml += " " + a + "='" + chart.attr[a] + "'";
        }
        xml += ">";

        for (var n = 0; n < chart.chart_types.length; n++) {
            var chart_type = chart.chart_types[n];

            xml += "<chart_type type='" + chart_type.type + "'>";
            for (var j = 0; j < chart_type.series.length; j++) {
                var serie = chart_type.series[j];
                xml += "<serie";
                for (var a in serie.attr) {
                    xml += " " + a + "='" + serie.attr[a] + "'";
                }
                xml += ">";
                xml += "<xaixs><![CDATA[" + serie["xaixs"] + "]]></xaixs><yaixs><![CDATA[" + serie['yaixs'] + "]]></yaixs>";

                xml += "</serie>";
            }
            xml += "</chart_type>";
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

dhtmlXGridObject.prototype.toChartExcel = function (url) {
    processReportExcelRequest(url, this.serializeChartExcelXml());
};
dhtmlXDataView.prototype.toExcel = function (url) {
    processReportExcelRequest(url, this.serializeToExcelXml());
};


function processReportExcelRequest(url, xml) {
    console.log(xml);
//    $('<form>', {
//        action: url,
//        method: 'post',
//        target: '_blank'
//    }).append($('<input>', {
//            type: 'hidden',
//            name: 'grid_xml',
//            value: xml
//        })).appendTo('body').submit();
}
