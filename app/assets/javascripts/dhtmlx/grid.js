define(["./share","dhtml.origin.grid"],function(Share){
    dhtmlXGridObject.prototype.serializeToJson = function () {
        var data = xml2json.parser(this.serialize().replace(/\<cell/g, "<data")
            .replace(/\<\/cell/g, "</data"));
        return {rows: data.rows.row};
    };
    dhtmlXGridObject.prototype.serializeToDataJson = function () {
        var data = xml2json.parser(this.serialize().replace(/<cell*.[^>]*/g, "<data")
            .replace(/\<\/cell/g, "</data"));
        return {rows: data.rows.row};
    };
    dhtmlXGridObject.prototype.addCellAttributes = function (attrs) {
        for (var i = 0; i < attrs.length; i++) {
            if (this.xml.cell_attrs == null || $.inArray(attrs[i], this.xml.cell_attrs) == -1) {
                console.log('-----------------------')
                console.log(attrs[i]);
                console.log($.inArray(attrs[i], this.xml.cell_attrs));
                this.xml.cell_attrs.push(attrs[i]);
            }
        }
    };
    dhtmlXGridObject.prototype.addValueToAttribute = function () {
        this.forEachRow(function (rowId) {
            this.forEachCell(rowId, function (cell, colIndex) {
                cell.setAttribute('value', cell.getValue());
            });
        });
    };
    dhtmlXGridObject.prototype.setAttributeByRow = function (rowId, attr) {
        this.forEachCell(rowId, function (cell, colIndex) {
            for (var a in attr) {
                cell.setAttribute(a, attr[a]);
            }
        });
    };
    dhtmlXDataView.prototype.serializeToJson = function () {
        return this.serialize();
    };
    dhtmlXGridObject.prototype.get_charts = function () {
        return this.charts;
    };
    dhtmlXGridObject.prototype.set_charts = function (_charts) {
        this.charts = _charts;
    };
    dhtmlXGridObject.prototype.serializeChartExcelXml = function () {
        var data = this.serializeToJson();
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
                xml += "<cell"
                var cell = data["rows"][i]["data"][j];
                for (var a in cell) {
                    if (cell[a] != null && cell[a] != 'undefined') {
                        xml += " " + a + "='" + cell[a] + "'";
                    }
                    //          console.log(a);
                }
                xml += "></cell>"
                // xml += "<cell><![CDATA[" + data["rows"][i]["data"][j] + "]]></cell>";
            }
            xml += "</row>";
        }
        xml += "</body></table>";
        //Body End
        var charts = this.get_charts();
        if (charts != null) {
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
        }
        //Chart End
        xml += "</report>";
        return xml;
    };
    dhtmlXGridObject.prototype.toChartExcel = function (url) {
        Share.processReportExcelRequest(url, this.serializeChartExcelXml());
    };
    function init(config){
        config.container=config.container!=undefined?config.container:"data_container";
        var dataGrid=new dhtmlXGridObject(config.container);
        this.object=dataGrid;
        return dataGrid;
    }

    return {
        object:"",
        init:function(config){
            init(config);
        },
        render:function(config){
            var dataGrid=init(config);
            dataGrid.setImagePath("/assets/dhtmlx/");
            dataGrid.setHeader(headers);
            dataGrid.attachHeader("#select_filter,#text_filter,#text_filter");
            dataGrid.setInitWidths(widthstring);
            dataGrid.enableAutoWidth(false);
            dataGrid.setColAlign(alienstring);
            dataGrid.setColTypes(coltypestring);
            dataGrid.setColSorting(colsortstring);
            dataGrid.setSkin("dhx_skyblue");
            dataGrid.setColumnColor("#d5f1ff");
            dataGrid.enableSmartRendering(true);
            dataGrid.enableAutoWidth(true);
            dataGrid.init();

        }
    }
})