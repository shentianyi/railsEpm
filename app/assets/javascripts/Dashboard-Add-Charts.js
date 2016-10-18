/**
 * Created by if on 16-10-18.
 */

var DashboardAddCharts = {};

DashboardAddCharts.init = function () {
    $("#add-dashboard-show").on("click", function () {
        $("#dashboard-add-wrap").css("display", "block");
        $("#dashboard-group-name+div").css("width", "140px");
        $("#chart-group+div").css("width", "130px");
        $("#x_group+div").css({"width": "100px", "margin-top": "15px"});
        $("#chart-kpi+div").css("width", "130px");
        $("#kpi-property-select+div").css("width", "130px");
        $("#chart-view+div").css("width", "130px");

        $("#close-add-dashboard").on("click", function () {
            DashboardAddCharts.close();
        });

        $("header").css("box-shadow", "0 2px 5px rgba(71,71,71,0.3)");

        $("#db-add-type>li").on("click", function (event) {
            var target = adapt_event(event).target;
            if ($(this).hasClass("active") == false) {
                $(this).siblings().removeClass("active");
                $(this).addClass('active');
                if ($(this).attr("type") == "pie") {
                    $('#pie_compare').css({display: "block"});
                } else {
                    $('#pie_compare').css({display: "none"});
                }
            }
        });

        $("#analytic-control-condition-visible,#add-one-series").on("click", DASHBOARD.add.initial.analytic_control_condition_visible);

        $("#chart-group").prepend($("<option />").attr("value", ""));
        $("#chart-group").val('').trigger('chosen:updated');

        $("#chart-kpi").val('').trigger('chosen:updated');

        $("#chart-view").prepend($("<option />").attr("value", ""));
        $("#chart-view").val('').trigger('chosen:updated');

        $("#chart-group").on("change", function (event) {
            var id = $(adapt_event(event).target).attr("value");
            $.ajax({
                url: '/kpis/categoried/' + id,
                dataType: "json",
                success: function (data) {
                    $("#chart-kpi").empty().trigger('chosen:updated');
                    for (var i = 0; i < data.length; i++) {
                        $("#chart-kpi").append($("<option />").attr("value", data[i].id).attr("interval", data[i].frequency).text(data[i].name));
                    }
                    $("#chart-kpi").prepend($("<option />").attr("value", ""));
                    $("#chart-kpi").val('').trigger('chosen:updated');
                }
            });
        });

        $("#chart-kpi").chosen().change(function () {
            var interval = $("#chart-kpi").find(":selected").attr("interval");
            var target = "#analy-begin-time,#analy-end-time";
            $(target).val("");
            $(".index-date-extra-info").text("");
            DATE_PICKER.shortcut_count = 0;

            new DATE_PICKER[interval](target, "string").datePicker();

            $.ajax({
                url: 'kpis/x_groups/' + $(this).val(),
                type: 'get',
                success: function (data) {
                    $('#x_group').empty();
                    for (var i = 0; i < data.length; i++) {
                        $("<option type='" + data[i].type + "' value='" + data[i].value + "'>" + data[i].name + "</option>").appendTo("#x_group");
                        $("#x_group").val('').trigger('chosen:updated');
                    }
                },
                error: function () {
                    console.log("Something Error!");
                }
            });
        });

        $('#analy-begin-time').datetimepicker("remove");
        $('#analy-end-time').datetimepicker("remove");

        //点击Add 绘制图表
        DashboardAddCharts.draw_charts("#db-add-chart");
    });
};


DashboardAddCharts.get_selected_property = function () {
    var properties = $("#kpi-property-select").find("option:selected");
    var kpi_property = null;
    if (properties.length > 0) {
        kpi_property = {};
        for (var i = 0; i < properties.length; i++) {
            var _property = $(properties[i]).attr('property');
            if (kpi_property[_property] == null)
                kpi_property[_property] = [];
            kpi_property[_property].push($(properties[i]).text());
        }
    }
    return kpi_property;
}

DashboardAddCharts.get_selected_view = function get_selected_view() {
    var properties = $("#chart-view").find("option:selected");
    var kpi_property = null;
    if (properties.length > 0) {
        kpi_property = new Array();
        for (var i = 0; i < properties.length; i++) {
            if ($(properties[i]).context.text != "" && $(properties[i]).context.text != null) {
                kpi_property.push({id: $(properties[i]).context.value, text: $(properties[i]).context.text})
            }
        }
    }
    return kpi_property;
}


DashboardAddCharts.draw_charts = function (element) {
    $(element).click(function () {
        var kpi = $("#chart-kpi :selected").attr("value");
        var view = DashboardAddCharts.get_selected_view();
        var method = $("input[name='chartRadios']:checked").attr("value");
        var type = $("#db-add-type>.active").attr("type");
        var interval, chart_body_close_validate;
        var kpi_property = DashboardAddCharts.get_selected_property();
        var show_type = $('#x_group option:selected').attr("type");
        var show_value = $('#x_group option:selected').val();
        var show_text = $('#x_group option:selected').html();

        if ($("#db-chart-body").css("display") == "block") {
            chart_body_close_validate = false;
            interval = $("#db-chart-interval-alternate li.active").attr("interval")
        }
        else {
            chart_body_close_validate = true;
            interval = $("#analy-begin-time").attr("interval") == undefined || $("#analy-begin-time").attr("interval").length == 0 ?
                $("#chart-kpi :selected").attr("interval") : $("#analy-begin-time").attr("interval");
        }

        var begin_time = $("#analy-begin-time").attr("hide_value"), end_time = $("#analy-end-time").attr("hide_value"),
            begin_post, end_post;

        if (kpi && begin_time && view) {
            //对比时间， 如果大小颠倒， 进行倒转
            if (end_time) {
                var compare_result = compare_time(begin_time, end_time);
                begin_time = compare_result.begin;
                end_time = compare_result.end;
            }
            else {
                end_time = begin_time
            }

            if ($("#analy-begin-time").attr("hide_post").indexOf("LAST") != -1) {
                begin_post = $("#analy-begin-time").attr("hide_post");
                end_post = begin_post;
            }
            else {
                begin_post = standardParse(begin_time).date.toISOString();
                end_post = standardParse(end_time).date.toISOString();
            }

            if (is_datetime_outrange(begin_time, end_time, interval)) {
                MessageBox("对不起，时间范围太大了！", "top", "warning");
                return;
            }

            dashboard_show_loading("dashboard-add-inner", "40px", "0px", "0px", "200px");

            var ValueArray = new Array();
            if (show_type == "100") {
                ValueArray.length = 0;
            } else if (show_type == "200") {
                //按照部门进行修改
                ValueArray.length = 0;
                for (var i = 0; i < view.length; i++) {
                    ValueArray.push(view[i].id);
                }
            } else if (show_type == "300") {
                //按照部维度进行修改
                ValueArray.length = 0;
                ValueArray.push(show_value);
            }

            var XGroup = {type: show_type, value: ValueArray};

            DashboardAddCharts.DrawChart(kpi, method, view[0].id, standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
        }
    });
};

DashboardAddCharts.DrawChart = function (Kpi, Method, View, startTime, endTime, cycleFrequency, Property, XGroup) {
    $.ajax({
        url: '/kpi_entries/analyse',
        type: 'post',
        data: {
            kpi_id: Kpi,
            average: Method == "0",
            entity_group_id: View,
            start_time: startTime,
            end_time: endTime,
            frequency: cycleFrequency,
            property: Property,
            x_group: XGroup
        },
        success: function (data) {
            if (data.result) {
                console.log(">>>>Data>>>>");
                console.log(data);

                dashboard_remove_loading("dashboard-add-inner");

                var XAxis = data.object.date;

                var AllSeries = [{
                    name: 'Value',
                    data: data.object.current,
                    color: 'limegreen'
                }];

                var Chart_Setting = {
                    Container: 'chart-container',
                    XAxis: XAxis,
                    AllSeries: AllSeries
                };

                DashboardAddCharts.DrawHighChart(Chart_Setting);

            } else {
                console.log("返回值为False");
            }
        },
        error: function () {
            console.log("Something Error!");
        }
    });
};

DashboardAddCharts.DrawHighChart = function (Chart_Settings) {
    var high_charts = $("#" + Chart_Settings.Container).highcharts({
        title: {
            text: 'Cycle Time In Hours', x: -20
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: Chart_Settings.XAxis
            // categories: ["A", "B", "C", "D", "E", "F", "G"]
        },
        yAxis: {
            title: {
                text: 'Value(m)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 's',
            formatter: function () {
                return '<span><b>' + this.x + '</b><br/>CycleTime:<b>' + this.y + 's</b></span>';
            }
        },
        scrollbar: {
            enabled: true
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderHeight: 0
        },
        plotOptions: {
            series: {
                stickyTracking: false,
                turboThreshold: 0 //不限制数据点个数
            },
            column: {
                dataLabels: {
                    enabled: true
                },
                events: {
                    click: function (e) {
                        console.log('click');
                    }
                }
            }
        },
        series: [{
            name: 'Value',
            // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.64],
            data: Chart_Settings.AllSeries,
            color: 'limegreen'
        }]
    });

    console.log("SDFFFFFFFFFFFFF");
    console.log(high_charts);
    console.log(high_charts.xAxis);

};


DashboardAddCharts.close = function () {
    $("#dashboard-name-input").val("");
    $("#db-add-type li").removeClass("active");
    $("#db-add-type li").eq(1).addClass("active");
    $("#db-add-kpi-list").empty();
    $("#dashboard-group-name").val('').trigger('chosen:updated');
    $("li", "#db-chart-interval-alternate").removeClass("active");
    $("#db-chart-body").css("display", "none");
    $(".index-condition-group input:not([type='radio'])").val("");
    $(".index-condition-group select").val('').trigger('chosen:updated');
    $("[name='chartRadios']").eq(0).iCheck("check");
    $(".index-date-extra-info").text("");
    DASHBOARD.add.initial.analytic_control_condition_visible();
    if ($("#chart-container").highcharts() != undefined) {
        $("#chart-container").highcharts().destroy();
    }
    $("#dashboard-add-wrap").css("display", "none");
};

DashboardAddCharts.initial = {};
DashboardAddCharts.initial.analytic_control_condition_visible = function () {
    var open_state = $("#analytic-control-condition-visible").attr("state");
    if (open_state == "open") {
        $("#left-content-title-add").css("top", "-80px");
        $("#db-chart-body").css("top", "23px");
        $("#analytic-control-condition-visible").attr("state", "close").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
    else {
        $("#left-content-title-add").css("top", "0");
        $("#db-chart-body").css("top", "101px");
        $("#analytic-control-condition-visible").attr("state", "open").removeClass("icon-chevron-down").addClass("icon-chevron-up");

    }
};