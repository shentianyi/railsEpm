var defects = {};

defects.init = function () {
    // 固定不变
    // var box_name = localStorage.box_name;
    var box_msg = localStorage.box_msg;
    // var ProductLine = box_msg.split('_')[1];
    // var Interval = box_msg.split('_')[3];
    var BoxID = box_msg.split('_')[5];

    var ClientHeight = $(document).height();
    var ClientWidth = document.documentElement.clientWidth;

    $('#report-content').css({
        height: (ClientHeight - 70) + 'px',
        overflow: 'auto'
    });

    $('#history_table').css({width: (ClientWidth - 20) + 'px', overflowX: 'auto'});

    // var pre_time = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+'00:00:00';
    var pre_time = new Date().format('yyyy-MM-dd').toString() + ' ' + '00:00:00';
    //
    // pre_time=new Date(pre_time).format('yyyy-MM-dd hh:mm:ss');
    // var current_time='2016-03-24 17:00:00';
    var current_time = new Date().format('yyyy-MM-dd hh:mm:ss');
    $('#start_time').attr('value', pre_time);
    $('#end_time').attr('value', current_time);

    GetHistoryDataFun(BoxID, pre_time, current_time);

    jeDate({
        dateCell: "#start_time",
        isinitVal: true,
        isTime: true, //isClear:false,
        minDate: "2014-09-19 00:00:00"
    });
    jeDate({
        dateCell: "#end_time",
        isinitVal: true,
        isTime: true, //isClear:false,
        minDate: "2014-09-19 00:00:00"
    });
};

function go_back() {
    var change_pre_url = localStorage.pre_url;
    try {
        if (change_pre_url == 'undefined') {
            change_pre_url = window.location.host + '/reports#current_status';
        } else if (change_pre_url.split('#')[1] == "defects") {
            change_pre_url = window.location.host + '/reports#current_status';
        }
        window.location.href = '/reports#' + change_pre_url.split('#')[1];
        window.location.reload();
    } catch (e) {
        console.log(e);
    }
}

function loadHistoryDataFun(HistoryDataName, HistoryData) {
    var normal_data = 0;
    var abnormal_data = 0;

    $('#report-menu').remove();
    $('#pop-crate').remove();
    /*清空*/
    $('#history_chart').children().remove();
    $('.history_table_thead_tr').children().remove();
    $('.history_table_tbody_target_max').children().remove();
    $('.history_table_tbody_target_min').children().remove();
    $('.history_table_tbody_value').children().remove();

    // 定义变量
    var xAxis_value = new Array();
    var history_target_max = new Array();
    var history_value = new Array();

    // 绘制表头
    $('<th>Time</th>').appendTo('.history_table_thead_tr').ready(function () {
    });

    $('<td>TargetMax</td>').appendTo('.history_table_tbody_target_max').ready(function () {
    });

    $('<td>Value</td>').appendTo('.history_table_tbody_value').ready(function () {
    });

    // 循环添加数据
    var data_entry_at_format_all = "";
    var data_entry_at_format_all_date = new Array();
    for (var i = 0; i < HistoryData.length; i++) {
        var data_id = HistoryData[i].id;
        var data_value = HistoryData[i].value;

        var data_entry_at = HistoryData[i].entry_at;
        data_entry_at_format_all = new Date(data_entry_at).format('yyyy-MM-dd hh:mm:ss');
        data_entry_at_format_all_date.push(data_entry_at_format_all);

        var data_entry_at_format = new Date(data_entry_at).format('hh:mm:ss');
        xAxis_value.push(data_entry_at_format);

        var data_target_max = HistoryData[i].target_max;
        history_target_max.push({id: data_entry_at_format_all_date[i], y: data_target_max});

        var data_target_min = HistoryData[i].target_min;

        $('<th>' + data_entry_at_format_all + '</th>').appendTo('.history_table_thead_tr').ready(function () {
        });

        $('<td>' + data_target_max + '</td>').appendTo('.history_table_tbody_target_max').ready(function () {
        });

        var data_value = HistoryData[i].value;
        if (data_value > data_target_max) {
            history_value.push({id: data_entry_at_format_all_date[i], color: '#ff0000', y: data_value});
            $('<td style="background:#ff0000;">' + data_value + '</td>').appendTo('.history_table_tbody_value').ready(function () {
            });
            abnormal_data++;
        } else {
            history_value.push({id: data_entry_at_format_all_date[i], color: 'limegreen', y: data_value});
            $('<td style="background:limegreen;">' + data_value + '</td>').appendTo('.history_table_tbody_value').ready(function () {
            });
            normal_data++;
        }
    }
    var max_count = 25;
    if (HistoryData.length < max_count) {
        max_count = HistoryData.length;
    }

    $('#normal_data').html(normal_data);
    $('#abnormal_data').html(abnormal_data);
    $('#total_data').html(normal_data + abnormal_data);

    // 图表操作
    var chart_options = {
        chart: {
            renderTo: 'history_chart'
        },
        credits: {
            enabled: false
        },
        title: {
            text: HistoryDataName, x: -20
        },
        subtitle: {
            text: '——History Data', x: 20
        },
        xAxis: {
            categories: xAxis_value,
            max: max_count
        },
        yAxis: {
            title: {text: 'Time(s)'},
            plotLines: [{value: 0, width: 1, color: '#808080'}]
        },
        tooltip: {
            formatter: function () {
                return '<span><b>' + this.point.id + '</b><br/><b>Value:</b><b>' + this.y + ' s</b><span>';
            }
        },
        scrollbar: {
            enabled: true
        },
        legend: {
            layout: 'horizontal', align: 'center', verticalAlign: 'bottom', borderHeight: 0
        },
        plotOptions: {
            series: {
                stickyTracking: false,
                turboThreshold: 0 //不限制数据点个数
            }
        },
        series: [{
            name: 'Value',
            data: history_value,
            /* date color : green*/
            color: 'limegreen'
        }, {
            type: 'line',
            name: 'TargetMax',
            data: history_target_max,
            /*orange*/
            color: '#FF7F00'
        }]
    };

    var chart = new Highcharts.Chart(chart_options);

    /*change chart type.*/
    $("button.change_charts").click(function () {
        $('.change_charts').css({
            opacity: 0.3,
            color: 'black',
            borderColor: 'black'
        });
        $(this).css({
            opacity: 1,
            color: 'orange',
            borderColor: 'orange'
        });
        var type = $(this).html();
        chart_options.chart.type = type;
        chart = new Highcharts.Chart(chart_options);
    });
}

/*get data*/
function GetHistoryDataFun(id, start_time, end_time) {
    show_loading(145, 0, 0, 10);
    if (id == null || start_time == null || end_time == null)
        return;

    $.ajax({
        url: '/departments/entity_group_history',
        type: 'get',
        data: {id: id, start_time: start_time, end_time: end_time},
//      async: false,
        success: function (data) {
            var SearchHistoryData = data;   //GetHistoryData = data;
            var SearchHistoryDataName = SearchHistoryData.name;
            var SearchHistoryDataID = SearchHistoryData.id;
            var SearchHistoryDataValue = SearchHistoryData.data;

            if (SearchHistoryDataValue.length == 0) {
                alert('This period of time there is no data, modify the query date.');
            } else {
                loadHistoryDataFun(SearchHistoryDataName, SearchHistoryDataValue);
            }
            remove_loading();
        },
        error: function () {
            console.log("something error");
        }
    });
}
