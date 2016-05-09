var Report = Report || {};
Report.option = {};
Report.r = {};
Report.data = {};
Report.host = 'http://42.121.111.38:9003/';
//Report.host='http://192.168.0.101:6023/';
Report.Url = {
    export_excel_url: Report.host + 'DHXFileService/Excel',
    export_bt_chart_excel_url: Report.host + 'BTReportService/ChartExcel',
    export_bt_excel_url: Report.host + 'BTReportService/Excel'
};

/*init report*/
var loading;

function loading_show() {
    var ReportMenuStatus = document.getElementById('report-menu').style.display;
    var top = top = document.getElementById("preloader").getBoundingClientRect().bottom >= 0 ? document.getElementById("current-status-header").getBoundingClientRect().bottom : 0;

    if (ReportMenuStatus == 'none') {
        LoadingSvgPosition(top, 0, 0, "10px");
    } else {
        LoadingSvgPosition(top, 0, 0, "230px");
    }
}

function LoadingSvgPosition(top, right, bottom, left) {
    loading = new SVGLoader(document.getElementById('preloader'), {speedIn: 100});
    $(".pageload-overlay svg").css('top', top + 'px');
    $(".pageload-overlay svg").css('right', right);
    $(".pageload-overlay svg").css('bottom', bottom);
    $(".pageload-overlay svg").css('left', left);
    loading.show();
}

function loading_hide() {
    $('#preloader').remove();
    $('<div id="preloader" class="pageload-overlay" data-opening="M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z" data-closing="M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none"><path d="M30,30 50,30 50,30 30,30 Z"/></svg></div>').appendTo('body').ready(function () {
    })
}

function LoadFormatDate(type) {
    var FormatDate;
    var today = new Date();
    var years = today.getFullYear();
    var months = today.getMonth();
    var d = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    months = months + 1;
    months = checkTime(months);
    d = checkTime(d);
    m = checkTime(m);
    s = checkTime(s);
    var weekday = new Array(7);
    weekday[0] = "星期日";
    weekday[1] = "星期一";
    weekday[2] = "星期二";
    weekday[3] = "星期三";
    weekday[4] = "星期四";
    weekday[5] = "星期五";
    weekday[6] = "星期六";
    var w = weekday[today.getDay()];
    if (type == "onlydate") {
        FormatDate = years + "-" + months + "-" + d;
    } else if (type == "onlytime") {
        FormatDate = h + ":" + m + ":" + s;
    } else if (type == "dateandtime") {
        FormatDate = years + "-" + months + "-" + d + " " + " " + h + ":" + m + ":" + s;
    } else if (type == "all") {
        FormatDate = years + "-" + months + "-" + d + " " + " " + h + ":" + m + ":" + s + " " + w;
    } else {
        FormatDate = "";
    }
    return FormatDate;
};

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
/*color*/
Report.color = {
    ftq: {
        "higher": "#19cf22",
        "equal": "#f3d02e",
        "lower": "#eb4848"
    },
    dpv: {
        "higher": "#eb4848",
        "equal": "#f3d02e",
        "lower": "#19cf22"
    }

};

Report.type = {
    "high_chart": 0,
    "current_status": 1,
    "summary_report": 2,
    "station_data": 3,
    "tracking_report": 4,
    "defects": 5,
    "vehicle_info": 6,
    "daily_dpv": 7,
    'daily_ftq': 8,
    'defect_info': 9,
    'float': 10,
    'top_issue': 11,
    'weekly_report': 12,
    'tv_cycle_time': 101
};

// default export excel
function export_report_excel() {
    Report.toExcel();
}

// default export bt chart excel
function export_bt_report_chart_excel() {
    Report.toBTChartExcel();
}

// default export bt excel
function export_bt_report_excel() {
    Report.toBTExcel();
}