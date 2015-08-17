( function (Highcharts) {
    var Chart = Highcharts.Chart, addEvent = Highcharts.addEvent, extend = Highcharts.extend, defaultOptions = Highcharts.getOptions();

    extend(defaultOptions.lang, {
        downloadDOC: 'Download DOC',
        downloadDOCX: 'Download DOCX',
        downloadPPT: 'Download PPT',
        downloadPPTX: 'Download PPTX',
        downloadXLS: 'Download XLS',
        downloadXLSX: 'Download XLSX'
    });

    var defaultExportButtonsData = {
        png: {
            textKey: 'downloadPNG',
            type: 'image/png'
        },
        jpeg: {
            textKey: 'downloadJPEG',
            type: 'image/jpeg'
        },
        pdf: {
            textKey: 'downloadPDF',
            type: 'application/pdf'
        },
        // svg : {
        // textKey : 'downloadSVG',
        // type : 'image/svg+xml'
        // },
        // doc : {
        // textKey : 'downloadDOC',
        // type : 'application/msword'
        // },
        docx: {
            textKey: 'downloadDOCX',
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        // xls : {
        // textKey : 'downloadXLS',
        // type : 'application/vnd.ms-excel'
        // },
        xlsx: {
            textKey: 'downloadXLSX',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        // ppt : {
        // textKey : 'downloadPPT',
        // type : 'application/vnd.ms-powerpoint'
        // },
        pptx: {
            textKey: 'downloadPPTX',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        }
    };
    var exportTableFileTypes = ['xls', 'xlsx'];
    var exportTableChartTypes = ['line', 'column', 'scatter'];
    var defaultExportButtons = {
        'chart': {
            textKey: 'printChart',
            onclick: function () {
                this.print();
            }
        }
    };
    $.each(defaultExportButtonsData, function (key, value) {
        defaultExportButtons[key] = {
            textKey: value.textKey,
            onclick: function () {
                this.exportChart({
                    type: key
                });
            }
        };
    });
    // console.log(defaultExportButtons);
    extend(defaultOptions.exporting, {
        enableExtendExport: true,
        exportTypes: ['png']
    });

    extend(Chart.prototype, {
        addExportButton: function () {
            var exportingOptions = this.options.exporting, buttons = exportingOptions.buttons;
            if (exportingOptions.enableExtendExport) {
                extend(buttons.contextButton, {
                    menuItems: []
                });
                for (var i = 0; i < exportingOptions.exportTypes.length; i++) {
                    buttons.contextButton.menuItems.push(defaultExportButtons[exportingOptions.exportTypes[i]]);
                }
            }
        },
        exportChart: function (options, chartOptions) {
            options = options || {};

            var chart = this, chartExportingOptions = chart.options.exporting, svg = chart.getSVG(Highcharts.merge({
                chart: {
                    borderRadius: 0
                }
            }, chartExportingOptions.chartOptions, chartOptions, {
                exporting: {
                    sourceWidth: options.sourceWidth || chartExportingOptions.sourceWidth,
                    sourceHeight: options.sourceHeight || chartExportingOptions.sourceHeight
                }
            }));

            // merge the options
            options = Highcharts.merge(chart.options.exporting, options);
            //console.log(chart.series);
            //console.log(chart.xAxis.labels);
            //console.log(chart.xAxis.categories);
            // console.log(chart.options);
            //  console.log(chart.options.chart.type);
            //         console.log(chart.series[chart.series.length-1]);
            //       console.log(chart.series[chart.series.length-1].type);
            var tabled = exportTableFileTypes.indexOf(options.type) != -1 && exportTableChartTypes.indexOf(chart.series[chart.series.length - 1].type) != -1;


            // if (exportTableFileTypes.indexOf(options.type) != -1) {
            var table = chart.generateTableData();
            console.log(table);

            // }
            // do the post
            if (tabled) {
                var data = chart.generateBTTableChartData();
                console.log('-----------------------------------');
                console.log(data);
                console.log('-----------------------------------');
                FileGen.initialize();
                FileGen.genExcelTableChart(data);
            } else {
                Highcharts.post(options.url, {
                    filename: options.filename || 'chart',
                    type: defaultExportButtonsData[options.type].type,
                    width: options.width || 0, // IE8 fails to post undefined correctly, so use 0
                    scale: options.scale || 2,
                    svg: svg,
                    muti: 0,
                    tabled: tabled,
                    table: tabled ? JSON.stringify(table) : null
                });
            }
        },
        generateBTTableChartData: function () {
            var series = this.series;
            var tcdata = {};
            var table = {
                heads: [],
                rows: []
            };

            for (var i = 0; i < series.length; i++) {
                if (series[i].name == "Navigator") {
                    series.splice(i, 1);
                }
            }

            // generate table xAxis by order
            var _xAxis = {};
            for (var i = 0; i < series.length; i++) {
                var data = series[i].data;
                for (var j = 0; j < data.length; j++) {
                    if (!(data[j].x in _xAxis)) {
                        _xAxis[data[j].x] = data[j].name;
                    }
                }
            }
            var _xAxisIndexs = Object.keys(_xAxis).sort();
            table.heads[0] = ' ';
            for (var i = 1; i < _xAxisIndexs.length + 1; i++) {
                table.heads[i] = _xAxis[_xAxisIndexs[i - 1]];
            }
            // init table body
            for (var i = 0; i < series.length; i++) {
                var row = [];
                row.push({value: series[i].name});
                var data = series[i].data;
                console.log(data);

                for (var j = 0; j < data.length; j++) {
                    row.push({value: data[j].y})
                }
                table.rows.push(row);
            }
            tcdata.table = table;

            //init charts
            var charts = [];
            var chart={chart_types: []};
            for (var i = 0; i < table.rows.length; i++) {
                var c = {type: 'column', series: []};
                for (var i = 0; i < this.series.length; i++) {
                    c.series.push({});
                }
               chart.chart_types.push(c);
            }
            charts.push(chart);

            tcdata.charts = charts;
            // console.log(table);
            return tcdata;
        },
        generateTableData: function () {
            // var table={series:[],rows:[][],xAxis:{},xAxisIndex:[]};
            var table = {
                series: [],
                rows: [],
                xAxis: {}
            };
            // generate table xAxis by order
            var _xAxis = {};
            for (var i = 0; i < this.series.length; i++) {
                var data = this.series[i].data;
                for (var j = 0; j < data.length; j++) {
                    if (!(data[j].x in _xAxis)) {
                        _xAxis[data[j].x] = data[j].name;
                    }
                }
            }
            var _xAxisIndexs = Object.keys(_xAxis).sort();
            for (var i = 0; i < _xAxisIndexs.length; i++) {
                table.xAxis[_xAxisIndexs[i]] = _xAxis[_xAxisIndexs[i]];
            }
            // init data
            for (var i = 0; i < this.series.length; i++) {
                table.series.push(this.series[i].name);
                table.rows[i] = {};
                for (var j = 0; j < _xAxisIndexs.length; j++) {
                    table.rows[i][_xAxisIndexs[j]] = null;
                }
                var data = this.series[i].data;
                for (var j = 0; j < data.length; j++) {
                    if (data[j].x in table.rows[i]) {
                        table.rows[i][data[j].x] = data[j].y
                    }
                }
            }
            // console.log(this.options);
            // console.log(table);
            return table;
        }
    });
    Highcharts.exportCharts = function (options, chartOptions) {
        options = options || {};
        var charts = options.charts;
        var svgs = [];
        var chartExportingOptions = charts[0].options.exporting;
        for (var i = 0; i < charts.length; i++) {
            var chart = charts[i];
            var svg = chart.getSVG(Highcharts.merge({
                chart: {
                    borderRadius: 0
                }
            }, chartExportingOptions.chartOptions, chartOptions, {
                exporting: {
                    sourceWidth: options.sourceWidth || chartExportingOptions.sourceWidth,
                    sourceHeight: options.sourceHeight || chartExportingOptions.sourceHeight
                }
            }));
            svgs.push(svg);
        }

        // merge the options
        options = Highcharts.merge(chartExportingOptions, options);
        // do the post
        Highcharts.post(options.url, {
            filename: options.filename || 'chart',
            type: defaultExportButtonsData[options.type].type,
            width: options.width || 0, // IE8 fails to post undefined correctly, so use 0
            scale: options.scale || 2,
            svg: svgs,
            muti: 1,
            tabled: false
        });
    };
    Chart.prototype.callbacks.unshift(function (chart) {
        chart.addExportButton();
    });

}(Highcharts));
