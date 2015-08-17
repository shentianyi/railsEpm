// Brilliantech Gen File JS
var FileGen = FileGen || {
        default_options: {
            host: 'http://42.121.111.38:9003/',
            form_method: 'post',
            input_name: 'grid_xml',
            legend_column_width: 90,
            column_width: 60,
            chart_colors: ['D1E5FE', 'FD0E0E', '25AD38', '3C6FCC', '19CF22', 'EB4848'],
            chart_height: 300,
            chart_min_width: 600,
            show_legend: true,
        },
        excelColumn: 'ABCDEFGHIJKLMNOPQSTUVWXYZ',
        url: {},
        initialize_url: function () {
            this.url = {
                export_excel_url: this.options.host + 'DHXFileService/Excel',
                export_bt_chart_excel_url: this.options.host + 'BTReportService/ChartExcel',
                export_bt_excel_url: this.options.host + 'BTReportService/Excel'
            }
        },
        options: {},
        xml: '',
        initialize: function (opt) {
            this.options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, this.default_options, opt) : $.extend({}, this.default_options);
            this.initialize_url();
        },
        //
        //  data:{
        //  table:{
        //    heads:['A','B','C','D'],
        //    rows:[
        //      [{value:'A1'},{value:1},{value:2}]
        //    ]
        //  },
        //  charts:[
        //    {
        //        title: 'DPV', width: 1100, height: 300,
        //        chart_types:[ {  type: 'column',
        //            series: [
        //                {xaixs: "B1:P1", yaixs: "B4:P4", color:'25ad38' header_address:'A4'}
        //            ]
        //        }]
        //    }
        //  ]
        //}
        genExcelTableChart: function (data) {
            if (data != null) {
                this.genExcelTableChartXML(data);
                this.gen(this.url.export_bt_chart_excel_url);
            }
        },
        genExcelTableChartXML: function (data) {
            var _xml = "<report>";

            var table = data.table;
            //// TABLE
            // HEAD START
            _xml += "<table><head><columns>"
            for (var i = 0; i < table.heads.length; i++) {
                _xml += "<column width='" + (i == 0 ? this.options.legend_column_width : this.options.column_width) + "'><![CDATA[" + table.heads[i] + "]]></column>";
            }
            _xml += "</columns></head>";
            // HEAD END

            // BODY START
            _xml += "<body>";
            for (var i = 0; i < table.rows.length; i++) {
                _xml += "<row>";
                for (var j = 0; j < table.rows[i].length; j++) {
                    _xml += "<cell"
                    var cell = table.rows[i][j];
                    for (var a in cell) {
                        if (cell[a] != null && cell[a] != 'undefined') {
                            _xml += " " + a + "='" + cell[a] + "'";
                        }
                    }
                    _xml += "></cell>"
                }
                _xml += "</row>";
            }
            _xml += "</body></table>";
            // BODY END
            //// TABLE END

            //// CHART

            var charts = data.charts;
            if (charts != null) {
                _xml += "<charts>"
                for (var i = 0; i < charts.length; i++) {
                    var chart = charts[i];
                    if(this.options.show_legend){
                        chart.show_legend='true';
                    }
                    if (chart.title == null) {
                        chart.title = table.rows[i][0].value;
                    }
                    if (chart.height == null) {
                        chart.height = this.options.chart_height;
                    }
                    if (chart.width == null) {
                        var w = this.options.legend_column_width + (table.heads.length - 1) * this.options.column_width;
                        chart.width = w < this.options.chart_min_width ? this.options.chart_min_width : w;
                    }
                    _xml += "<chart";
                    for (var a in chart) {
                        _xml += " " + a + "='" + chart[a] + "'";
                    }
                    _xml += ">";
                    for (var n = 0; n < chart.chart_types.length; n++) {
                        var chart_type = chart.chart_types[n];

                        _xml += "<chart_type type='" + chart_type.type + "'>";
                        for (var j = 0; j < chart_type.series.length; j++) {
                            var serie = chart_type.series[j];
                            if (serie.xaixs == null) {
                                serie.xaixs = this.excelColumn[1] + 1 + ':' + this.excelColumn[table.heads.length - 1] + 1;
                            }
                            if (serie.yaixs == null) {
                                serie.yaixs = this.excelColumn[1] + (j + 2) + ':' + this.excelColumn[table.heads.length - 1] + (j + 2);
                            }
                            if (serie.color == null) {
                                serie.color = this.options.chart_colors[(j % this.options.chart_colors.length)];
                            }
                            if (serie.header_address == null) {
                                serie.header_address = 'A' + (j + 2)
                            }
                            _xml += "<serie";
                            for (var a in serie) {
                                _xml += " " + a + "='" + serie[a] + "'";
                            }
                            _xml += ">";
                            _xml += "<xaixs><![CDATA[" + serie["xaixs"] + "]]></xaixs><yaixs><![CDATA[" + serie['yaixs'] + "]]></yaixs>";

                            _xml += "</serie>";
                        }
                        _xml += "</chart_type>";
                    }
                    _xml += "</chart>";
                }
                _xml += "</charts>";
            }
            //// CHART END
            _xml += "</report>";
            this.xml = _xml;
        },
        gen: function (url) {
            $('<form>', {
                action: url,
                method: this.options.form_method,
                target: '_blank'
            }).append($('<input>', {
                type: 'hidden',
                name: this.options.input_name,
                value: this.xml
            })).appendTo('body').submit();
        }
    };

