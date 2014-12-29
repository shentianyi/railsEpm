define({
    host:'http://192.168.1.101:9003/',
    Url : {
        export_excel_url: this.host + 'DHXFileService/Excel',
        export_bt_chart_excel_url: this.host + 'BTReportService/ChartExcel',
        export_bt_excel_url: this.host + 'BTReportService/Excel'
    },
    current_type:"",
    loader:""
//    option : {},
//    report : {},
//    serializeToJson : function () {
//        return  this.report.serializeToJson();
//    },
//    serializeToDataJson : function () {
//        return  this.report.serializeToDataJson();
//    },
//    serializeToJSONString : function () {
//        var DataJson=this.report.serializeToDataJson();
//        return JSON.stringify(DataJson);
//    },
//    data : {},
//    type : {
//        "high_chart": 0,
//        "current_status": 1,
//        "summary_report": 2,
//        "station_data": 3,
//        "tracking_report": 4,
//        "defects": 5,
//        "vehicle_info": 6,
//        "daily_dpv": 7,
//        'daily_ftq': 8,
//        'defect_info': 9,
//        'float': 10,
//        'top_issue': 11,
//        'weekly_report': 12
//    },
//    headers : {
////        "daily_dpv": "FALSE,iQ1,iQ2,iQ IP,iQ DR,iQ3,iQ4,iQ5,iQ6,iQ7,iQ8,iQ9,iQ10,iQ11,iQ12,iQ13,iQ14,iQ15",
//        "daily_ftq": "IQ Station, iQ1, iQ2, iQ3,iQ4,iQ5,iQ Dr,iQ IP,iQ6,iQ7,iQ8,iQ9,iQ10,iQ11,iQ12,iQ13,iQ14,iQ15"
//    },
//    color:{
//        ftq: {
//            "higher": "#19cf22",
//            "equal": "#f3d02e",
//            "lower": "#eb4848"
//        },
//        dpv: {
//            "higher": "#eb4848",
//            "equal": "#f3d02e",
//            "lower": "#19cf22"
//        }
//    },
//    current_menu:"",
})