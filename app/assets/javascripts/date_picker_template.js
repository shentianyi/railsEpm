//需求变更时的注意事项：
//在不变的部分需要更改language以适应多语言


////////////////////////////////////////////////////////////////datepicker template
//不变的部分
function date_picker_template(spec_date_picker) {
        this.weekStart = 1,
        this.autoclose = true,
        this.todayBtn = true,
        this.todayHighlight = true,
        this.language = 'en',
        this.format = spec_date_picker.format,
        this.calendarWeeks = spec_date_picker.calendarWeeks,
        this.minViewMode = spec_date_picker.minViewMode,
        this.startView = spec_date_picker.startView
}


//变化的部分
function spec_date_picker_template(format, calendarWeeks, minViewMode, startView) {
        this.format = format,
        this.calendarWeeks = calendarWeeks,
        this.minViewMode = minViewMode,
        this.startView = startView
}
//datepicker template//////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////根据模板生成date picker
function generate_date_picker(target, date_picker_template) {
        this.target = target,
        this.date_picker_template = date_picker_template,
        this.generate_date_picker_model = function () {
            $(this.target).datepicker({
                weekStart: this.date_picker_template.weekStart,
                autoclose: this.date_picker_template.autoclose,
                todayBtn: this.date_picker_template.todayBtn,
                todayHighlight: this.date_picker_template.todayHighlight,
                language: this.date_picker_template.language,
                format: this.date_picker_template.format,
                calendarWeeks: this.date_picker_template.calendarWeeks,
                minViewMode: this.date_picker_template.minViewMode,
                startView: this.date_picker_template.startView
            })
        }
        this.remove_date_picker_model = function () {
            $(this.target).datepicker('remove');
            $(this.target).datetimepicker('remove');
        }
}
//根据模板生成date picker//////////////////////////////////////////////////////////////











//根据KPI的interval来生成不同的datepicker,调用不同的datepicker
function form_date_or_time_picker(interval, target) {
    $(target).val("");
    $(".index-date-extra-info").text("");
    if (interval == "90") {
        var init_date=new Date();
        $(target).datepicker('remove');
        $(target).datetimepicker({
            weekStart: 1,
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            language: 'en',
            format: 'yyyy-mm-dd hh:ii',
            calendarWeeks: false,
            startView: "month",
            minView:"day",
            initialDate:new Date(init_date.getFullYear(),init_date.getMonth(),init_date.getDay(),init_date.getHours(),00)
        })
    }
    else {
        var spec_template, template, generate;
        switch (interval) {
            case "100":
                spec_template = new spec_date_picker_template("yyyy-mm-dd", false, 0, 0);
                break;
            case "200":
                spec_template = new spec_date_picker_template("yyyy-mm-dd", true, 0, 0);
                break;
            case "300":
                spec_template = new spec_date_picker_template("yyyy-mm", false, 1, 1);
                break;
            case "400":
                spec_template = new spec_date_picker_template("yyyy-mm", false, 1, 1);
                break;
            case "500":
                spec_template = new spec_date_picker_template("yyyy", false, 2, 2);
                break;
            default:
                generate = new generate_date_picker(target, null);
                generate.remove_date_picker_model();
                return false
        }
        template = new date_picker_template(spec_template);
        generate = new generate_date_picker(target, template);
        generate.remove_date_picker_model();
        generate.generate_date_picker_model();
    }
}

