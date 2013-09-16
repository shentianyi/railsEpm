/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-16
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var ENTRY=ENTRY || {};
ENTRY.datepicker={};



ENTRY.init=function(){

}
ENTRY.datepicker.init=function(){

}

function date_picker_init(option) {
    date_and_datetime.unit_them_at_begin(option.target, option.interval_source, option.have_shortcut);
    $(option.interval_source).change(function () {
        var interval = $(this).find(":selected").attr("interval");
        form_date_or_time_picker(interval, option.target);
    });
};

function form_date_or_time_picker(interval, target) {
    $(target).val("");
    $(".index-date-extra-info").text("");
    date_and_datetime.remove_date_picker_model(target);
    switch (interval) {
        case "90":
            date_and_datetime.dateTimepickerPicker(target, spec_option['hour']);
            break;
        case "100":
            date_and_datetime.datePicker(target, spec_option['day']);
            break;
        case "200":
            date_and_datetime.datePicker(target, spec_option['week']);
            date_and_datetime.week_picker_decorate(target);
            break;
        case "300":
            date_and_datetime.datePicker(target, spec_option['month']);
            break;
        case "400":
            date_and_datetime.datePicker(target, spec_option['quarter']);
            break;
        case "500":
            date_and_datetime.datePicker(target, spec_option['year']);
            break;
        default:
            return false
    }
}
