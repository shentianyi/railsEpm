function form_date_picker(interval_choose) {
    var date_picker_template;
    if (interval_choose == "90") {

    }
    else {
        $("#analy-begin-time,#analy-end-time").datepicker({
            format: 'yy-mm-dd',
            weekStart: 1,
            calendarWeeks: true,
            autoclose: false,
            startView: 0,
            minViewMode: 0,
            todayBtn: true,
            todayHighlight: true
        });
        $("#analy-begin-time").datepicker("show");
    }
}
var date_picker = date_picker || {};

date_picker.template = {
    90: {

    },
    100: {
       format:'yy-mm-dd',
       showWeek:false
    },
    200: {

    },
    300: {

    },
    400: {

    },
    500: {

    }


};




