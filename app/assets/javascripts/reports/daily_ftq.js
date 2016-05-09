var daily_ftq = {};

daily_ftq.init = function () {
    var ClientHeight = $(document).height();
    var ClientWidth = document.documentElement.clientWidth;
    var ReportMenuStatus = document.getElementById('report-menu').style.display;

    $('#report-content').css({
        height: (ClientHeight - 70) + 'px',
        overflow: 'auto'
    });

    if (ReportMenuStatus == 'none') {
        $('#data_chartcontainer').css({width: (ClientWidth - 20) + 'px', overflowX: 'auto'});
    } else {
        $('#data_chartcontainer').css({width: (ClientWidth - 230) + 'px', overflowX: 'auto'});
    }

    /*时间刷新*/
    window.setInterval(function () {
        var NowDateAndTime = LoadFormatDate("dateandtime");
        $('#current-clock').html(NowDateAndTime);
    }, 500);

    if (localStorage.box_msg) {
        var box_msg = localStorage.box_msg;
        var productLine = box_msg.split('_')[1];
        var datatype = box_msg.split('_')[3];

        $('#vehicle-select option').each(function () {
            if (($(this).attr('value')) == productLine) {
                $(this).attr('selected', 'true');
            }
        });

        loadChartData(productLine, datatype);
    } else {
        var productLine = $('#vehicle-select').val();
        var datatype = 100;
        loadChartData(productLine, datatype);
    }

    var IsLoading = false;

    var IntervalProductLine = $('#vehicle-select').val();
    var IntervalDataType;

    $('.control-chart-interval-group li').each(function () {
        if ($(this).datatype == "true") {
            IntervalDataType = $(this).attr('interval');
        } else {
            IntervalDataType = 100;
        }
    });

    if (!IsLoading) {
        window.setInterval("loadChartData(IntervalProductLine, IntervalDataType)", 120000);
    }

    IntervalGroup(".control-chart-interval-group");
};


function IntervalGroup(cls) {
    $(cls + ' li').each(function (index) {
        $(this).click(function () {
            $(cls + ' li').css({color: 'black', opacity: '0.3'});
            $(cls + ' li').attr('datatype', 'false');
            var ReportMenuStatus = document.getElementById('report-menu').style.display;
            if (ReportMenuStatus == 'none') {
                show_loading(70, 0, 0, 10);
            } else {
                show_loading(70, 0, 0, 230);
            }
            $(this).css({opacity: '1'});
            $(this).attr('datatype', 'true');
            var Choose_Interval_Code = $(this).attr('interval');
            var ProductLine = $('#vehicle-select').val();
            if (ProductLine == null || Choose_Interval_Code == null)
                return;

            $.ajax({
                url: '/departments/entity_groups',
                type: 'get',
                data: {
                    interval: Choose_Interval_Code,
                    product_line: ProductLine
                },
                success: function (data) {
                    //Here can do something
                    remove_loading();
                },
                error: function () {
                    console.log("Error");
                }
            });
        });
    });
}

function loadChartData(productLine, chartdatatype) {
    /*清空*/
    $('#charts_containers').children().remove();
    $('.thead-tr').children().remove();
    $('.tbody-target-max').children().remove();
    $('.tbody-target-min').children().remove();
    $('.tbody-value').children().remove();


    $('.control-chart-interval-group li').each(function (index) {
        if ($(this).attr('datatype') == 'true') {
            chartdatatype = $(this).attr('interval');
        }
    });
    /*ajax request*/
    GetDataFun(productLine, chartdatatype);
}

function GetDataFun(productLine, chartdatatype) {
    IsLoading = true;
    var ReportMenuStatus = document.getElementById('report-menu').style.display;
    if (ReportMenuStatus == 'none') {
        show_loading(70, 0, 0, 0);
    } else {
        show_loading(70, 0, 0, 230);
    }
    $.ajax({
        url: '/departments/entity_groups',
        type: 'get',
        data: {product_line: productLine, interval: chartdatatype},
        success: function (data) {

            var ajaxData = data;

            var yAxis_value = new Array();
            var charts_value = new Array();
            var charts_target_max = new Array();
            var charts_target_min = new Array();

            $('<th>Station</th>').appendTo('.thead-tr').ready(function () {
            });

            $('<td>TargetMax</td>').appendTo('.tbody-target-max').ready(function () {
            });
            $('<td>Value</td>').appendTo('.tbody-value').ready(function () {
            });

            /*table*/
            for (var i = 0; i < ajaxData.length; i++) {
                $('<th>' + ajaxData[i].name + '</th>').appendTo('.thead-tr').ready(function () {
                });

                $('<td>' + ajaxData[i].target_max + '</td>').appendTo('.tbody-target-max').ready(function () {
                });
                yAxis_value.push(ajaxData[i].name + "#" + ajaxData[i].code + "#" + ajaxData[i].count);
                charts_target_max.push(ajaxData[i].target_max);

                if (ajaxData[i].value > ajaxData[i].target_max) {
                    charts_value.push({id: ajaxData[i].id, color: '#ff0000', y: ajaxData[i].value});
                    $('<td style="background:#ff0000;">' + ajaxData[i].value + '</td>').appendTo('.tbody-value').ready(function () {
                    });
                } else if (ajaxData[i].value < ajaxData[i].target_min) {
                    charts_value.push({id: ajaxData[i].id, color: 'limegreen', y: ajaxData[i].value});
                    /* here can remove background. #FFB90F is orange.*/
                    $('<td style="background:#FFB90F;">' + ajaxData[i].value + '</td>').appendTo('.tbody-value').ready(function () {
                    });
                } else {
                    charts_value.push({id: ajaxData[i].id, color: 'limegreen', y: ajaxData[i].value});
                    $('<td style="background:limegreen;">' + ajaxData[i].value + '</td>').appendTo('.tbody-value').ready(function () {
                    });
                }
            }
            var max_count = 25;
            if (ajaxData.length < max_count) {
                max_count = ajaxData.length;
            }

            var chart = $('#charts_containers').highcharts({
                title: {
                    text: 'CycleTime', x: -20 //center
                },
                credits: {
                    enabled: false
                },
                colors: ['#8DB6CD', '#FFA500', '#CD8162', '#24CBE5', '#64E572', '#FF9655',
                    '#FFF263', '#6AF9C4'],
                xAxis: {
                    categories: yAxis_value,
                    labels: {
                        formatter: function () {
                            return this.value.split('#')[1];
                        }
                    }
                },
                yAxis: {
                    title: {text: 'Time(s)'},
                    plotLines: [{value: 0, width: 1, color: '#808080'}]
                },
                tooltip: {
                    valueSuffix: 's',
                    formatter: function () {
                        return '<span><b>' + this.x.split('#')[0] +
                            '</b><br/><b>CycleTime:</b><b>' + this.y + ' s</b><br/><b>TotalCount:</b><b>' + this.x.split('#')[2] + '</b><span>';
                    }
                },
                legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom', borderHeight: 0},
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        events: {//监听点的鼠标事件
                            click: function (e) {
                                var over_id = "Line_" + productLine + "_interval_" + chartdatatype + "_box_" + e.point.id;
                                if (window.localStorage) {
                                    localStorage.box_msg = over_id;
                                    localStorage.box_name = e.point.category;
                                    localStorage.pre_url = window.location.host + '/reports#daily_ftq';

                                    window.location.href = 'reports#defects';
                                    location.reload();
                                } else {
                                    alert('This browser does NOT support localStorage,please change browser.');
                                }

                            }
                        }
                    }
                },
                series: [
                    {
                        type: 'column',
                        name: 'Value',
                        data: charts_value,
                        color: 'limegreen'
                    }, {
                        name: 'TargetMax',
                        data: charts_target_max,
                        color: '#FF7F00'
                    }
                ]
            });
            remove_loading();
            IsLoading = false;
        },
        error: function () {
            console.log("something error");
        }
    });
}