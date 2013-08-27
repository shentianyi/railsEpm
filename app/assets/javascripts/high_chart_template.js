function high_chart(target, type_template, interval_template,data) {
    this.chart = {
        zoomType: 'xy',
        spacingLeft: 15,
        spacingRight: 20,
        renderTo: target,
        type: type_template.type
    },
        this.title = {
            text: null
        },
        this.tooltip = {
            xDateFormat: interval_template.tooltip.xDateFormat,
            formatter: interval_template.tooltip.formatter
        },
        this.credits = {
            enabled: false
        },
        this.colors = type_template.colors,
        this.legend = {
            enabled: false
        },
        this.plotOptions = {
            series: {
                marker: {
                    enabled: true,
                    fillColor: null,
                    lineWidth: type_template.plotOptions.series.marker.lineWidth,
                    lineColor: "white",
                    radius: type_template.plotOptions.series.marker.radius,
                    symbol: type_template.plotOptions.series.marker.symbol
                }
            }
        },
        this.xAxis = {
            lineWidth: 0,
            tickWidth:0,
            offset: 10,
            type: interval_template.xAxis.type,
            dateTimeLabelFormats: interval_template.xAxis.dateTimeLabelFormats,
            tickInterval: interval_template.xAxis.tickInterval,
            categories: interval_template.xAxis.categories
        },
        this.yAxis = {
            gridLineColor: '#ddd',
            gridLineDashStyle: 'Dot',
            offset: -25,
            title: {
                enabled: false
            },
            labels:{
                style:{
                    color:"rgba(0,0,0,0.3)"
                },
                y:-2
            }
        },
        this.series = [{
            pointStart: interval_template.series.pointStart,
            pointInterval: interval_template.series.pointInterval,
            data:data
        }]
}


var type_template = {
    line: {
        type: "line",
        colors: [
            'rgba(245,161,51,0.7)',
            'rgba(52,152,219,0.7)',
            'rgba(205,208,164,0.7)',
            'rgba(231,76,60,0.7)',
            'rgba(26,188,156,0.7)',
            'rgba(241,196,15,0.7)',
            'rgba(149,165,166,0.7)',
            'rgba(103,116,210,0.7)',
            'rgba(219,88,168,0.7)',
            'rgba(53,200,209,0.7)'
        ],
        plotOptions: {
            series: {
                marker: {
                    lineWidth: 2,
                    radius: 4,
                    symbol: "diamond"
                }
            }
        }
    },
    column: {
        type: "column",
        colors: [
            'rgba(245,161,51,0.7)',
            'rgba(52,152,219,0.7)',
            'rgba(205,208,164,0.7)',
            'rgba(231,76,60,0.7)',
            'rgba(26,188,156,0.7)',
            'rgba(241,196,15,0.7)',
            'rgba(149,165,166,0.7)',
            'rgba(103,116,210,0.7)',
            'rgba(219,88,168,0.7)',
            'rgba(53,200,209,0.7)'
        ],
        plotOptions: {
            series: {
                marker: {
                    lineWidth: 2,
                    radius: 4,
                    symbol: "diamond"
                }
            }

        }
    },
    pie: {
        type: "pie",
        colors: [
            'rgba(245,161,51,0.7)',
            'rgba(52,152,219,0.7)',
            'rgba(205,208,164,0.7)',
            'rgba(231,76,60,0.7)',
            'rgba(26,188,156,0.7)',
            'rgba(241,196,15,0.7)',
            'rgba(149,165,166,0.7)',
            'rgba(103,116,210,0.7)',
            'rgba(219,88,168,0.7)',
            'rgba(53,200,209,0.7)'
        ],
        plotOptions: {
            series: {
                marker: {
                    lineWidth: 2,
                    radius: 4,
                    symbol: "diamond"
                }
            }

        }
    },
    scatter: {
        type: "scatter",
        colors: [
            'rgba(245,161,51,0.4)',
            'rgba(52,152,219,0.4)',
            'rgba(205,208,164,0.4)',
            'rgba(231,76,60,0.4)',
            'rgba(26,188,156,0.4)',
            'rgba(241,196,15,0.4)',
            'rgba(149,165,166,0.4)',
            'rgba(103,116,210,0.4)',
            'rgba(219,88,168,0.4)',
            'rgba(53,200,209,0.4)'
        ],
        plotOptions: {
            series: {
                marker: {
                    lineWidth: 2,
                    radius: 5,
                    symbol: "circle"
                }
            }

        }
    }
}


function interval_template(date_time) {
        this.date = (standardParse(date_time)).date,
        this.template = (standardParse(date_time)).template,
        this._90 = function () {
            return {
                tooltip: {
                    xDateFormat: '%Y-%m-%d %H:%M'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        hour: '%H:%M' + "<br />" + '%e/%b'
                    },
                    tickInterval: 3600 * 1000
                },
                series: {
                    pointStart: Date.UTC(this.template[0], this.template[1], this.template[2], this.template[3], this.template[4]),
                    pointInterval: 3600 * 1000
                }
            }
        },
        this._100 = function () {
            return {
                tooltip: {
                    xDateFormat: '%Y-%m-%d'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%e/%b' + "<br />" + "%Y"
                    },
                    tickInterval: 24 * 3600 * 1000
                },
                series: {
                    pointStart: Date.UTC(this.template[0], this.template[1], this.template[2], this.template[3], this.template[4]),
                    pointInterval: 24 * 3600 * 1000
                }
            }
        },
        this._200 = function () {
            Highcharts.dateFormats = {
                W: function (timestamp) {
                    d = new Date(timestamp);
                    d.setHours(0, 0, 0);
                    // Set to nearest Thursday: current date + 4 - current day number
                    // Make Sunday's day number 7
                    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                    // Get first day of year
                    var yearStart = new Date(d.getFullYear(), 0, 1);
                    // Calculate full weeks to nearest Thursday
                    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7)
                    return  weekNo;
                },
                YW: function (timestamp) {
                    d = new Date(timestamp);
                    d.setHours(0, 0, 0);
                    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                    return d.getFullYear();
                }
            }
            return {
                tooltip: {
                    xDateFormat: '%Y-%m'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        week: '%e/%b'+ "<br />" +"week "+"%W"
                    },
                    tickInterval: 7 * 24 * 3600 * 1000
                },
                series: {
                    pointStart: Date.UTC(this.template[0], this.template[1], this.template[2], this.template[3], this.template[4]),
                    pointInterval: 7 * 24 * 3600 * 1000
                }
            }
        },
        this._300 = function () {
            return {
                tooltip: {
                    xDateFormat: '%YW-week %W'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%b' + '<br />' + '%Y'
                    },
                    tickInterval: 2628000000
                },
                series: {
                    pointStart: Date.UTC(this.template[0], this.template[1], this.template[2], this.template[3], this.template[4]),
                    pointInterval: 2628000000
                }
            }
        },
        this._400 = function () {
            Highcharts.dateFormats = {
                Q: function (timestamp) {
                    d = new Date(timestamp);
                    return  d.monthToQuarter();
                }
            };
            var first_month_in_quarter=Math.floor(parseInt(this.template[1])/3)*3
            return {
                tooltip: {
                    xDateFormat: '%Y-quarter %Q'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: "quarter "+'%Q' + '<br />' + '%Y'
                    },
                    tickInterval: 2628000000 * 3
                },
                series: {
                    pointStart: Date.UTC(this.template[0], first_month_in_quarter, this.template[2], this.template[3], this.template[4]),
                    pointInterval: 2628000000 * 3
                }
            }
        },
        this._500 = function () {
            return {
                tooltip: {
                    xDateFormat: '%Y'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    tickInterval: 365 * 24 * 3600 * 1000
                },
                series: {
                    pointStart: Date.UTC(this.template[0], this.template[1], this.template[2], this.template[3], this.template[4]),
                    pointInterval: 365 * 24 * 3600 * 1000
                }
            }
        }
}