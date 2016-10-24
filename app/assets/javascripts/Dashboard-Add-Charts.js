/**
 * Created by if on 16-10-18.
 */

var DashboardAddCharts = {};
DashboardAddCharts.initial = {};
var high_charts;
// var color = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
var color = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];

DashboardAddCharts.init = function () {
    //点击展示按钮
    $("#add-dashboard-show").on("click", function () {
        DashboardAddCharts.ChangeChartType();
        DashboardAddCharts.RemoveLine();
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

        $("#analytic-control-condition-visible,#add-one-series").on("click", DashboardAddCharts.initial.analytic_control_condition_visible);
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

DashboardAddCharts.CreateNow = function () {
    $("body").on("click", "#add-dashboard", function () {
        if ($.trim($("#dashboard-name-input").val()).length > 0) {
            if ($("#db-add-kpi-list").children().length > 0) {
                if ($("#dashboard-group-name :selected").text().length > 0) {
                    var post = {}, i;
                    post.dashboard_name = $("#dashboard-name-input").val();
                    post.type = $("#db-add-type li.active").attr("type");
                    post.interval = $("#db-chart-interval-alternate li.active").attr("interval");
                    post.dashboard_id = $("#dashboard-group-name :selected").attr("value");
                    post.series = [];


                    var kpi = $("#chart-kpi :selected").attr("value");
                    var view = DashboardAddCharts.get_selected_view();
                    var method = $("input[name='chartRadios']:checked").attr("value");
                    var type = $("#db-add-type>.active").attr("type");
                    var interval, chart_body_close_validate;
                    var kpi_property = DashboardAddCharts.get_selected_property();
                    var show_type = $('#x_group option:selected').attr("type");
                    var show_value = $('#x_group option:selected').val();
                    var show_text = $('#x_group option:selected').html();
                    var begin_time = $("#analy-begin-time").attr("hide_value"), end_time = $("#analy-end-time").attr("hide_value"),
                        begin_post, end_post;
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

                    var Charts = $('#chart-container').highcharts();
                    for (i = 0; i < Charts.series.length; i++) {
                        post.series[i] = {};
                        post.series[i].kpi = kpi;
                        post.series[i].view = view[i].id;
                        post.series[i].view_text = view[i].text;
                        post.series[i].average = method;
                        post.series[i].begin_time = begin_post;
                        post.series[i].end_time = end_post;
                        post.series[i].kpi_property = kpi_property;
                        post.series[i].x_group = Charts.series[i].points[0].x_type;
                        post.series[i].count = i + 1;

                        console.log("post");
                        console.log(post);
                    }
                    prepare_to_create_db_view(post);
                }
                else {
                    MessageBox("please choose a dashboard group", "top", "warning");
                }
            }
            else {
                MessageBox("please add one series at least", "top", "warning");
            }
        }
        else {
            MessageBox("please give the dashboard a name ", "top", "warning");
            $("#dashboard-name-input").focus();
        }
    });
};

//绘制图表
DashboardAddCharts.draw_charts = function (element) {
    $(element).click(function () {
        $("#db-chart-body").css("display", "block");
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
            chart_body_close_validate = true;
            interval = $("#db-chart-interval-alternate li.active").attr("interval")
        }
        else {
            chart_body_close_validate = false;
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
            var ValueArray = new Array();
            var XGroup;
            if (show_type == "100") {
                //如果是时间，循环请求，添加到之前的表中
                $('#db-chart-interval-alternate').css({display: 'block'});
                ValueArray.length = 0;
                XGroup = {type: show_type, value: ValueArray};
                if (view.length > 0) {
                    if (type == "pie") {
                        if (view.length > 1) {
                            MessageBox("只能显示一个视图！", "top", "warning");
                        } else {
                            DashboardAddCharts.DrawChart(kpi, method, view[0], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                        }
                    } else {
                        for (var i = 0; i < view.length; i++) {
                            if (chart_body_close_validate) {
                                DashboardAddCharts.DrawChart(kpi, method, view[0], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                                chart_body_close_validate = false;
                            } else {
                                //直接添加到已有的表中
                                if (view.length > 1) {
                                    DashboardAddCharts.RequestData(i, kpi, method, view[i], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                                }
                            }
                        }
                    }

                    // 切换类型
                    DashboardAddCharts.ChangeInterval();
                } else {
                    MessageBox("请选择视图！", "top", "warning");
                }
            } else if (show_type == "200") {
                //按照部门进行修改
                //删除 周期
                $('#db-chart-interval-alternate').css({display: 'none'});
                ValueArray.length = 0;
                for (var i = 0; i < view.length; i++) {
                    ValueArray.push(view[i].id);
                }

                XGroup = {type: show_type, value: ValueArray};
                DashboardAddCharts.DrawChart(kpi, method, view[0], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
            } else if (show_type == "300") {
                //按照部维度进行修改
                $('#db-chart-interval-alternate').css({display: 'none'});
                ValueArray.length = 0;
                ValueArray.push(show_value);
                XGroup = {type: show_type, value: ValueArray};

                if (view.length > 0) {
                    for (var i = 0; i < view.length; i++) {
                        if (chart_body_close_validate) {
                            DashboardAddCharts.DrawChart(kpi, method, view[0], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                            chart_body_close_validate = false;
                        } else {
                            //直接添加到已有的表中
                            if (view.length > 1) {
                                DashboardAddCharts.RequestData(i, kpi, method, view[i], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                            }
                        }
                    }
                } else {
                    MessageBox("请选择视图！", "top", "warning");
                }
            }

            //可以进行发布
            DashboardAddCharts.CreateNow();
        }
    });
};

//切换周期
DashboardAddCharts.ChangeInterval = function () {
    //切换周期
    $(".db-control-chart-interval-group>li").on("click", function (event) {
        if ($(this).hasClass("active") == false) {
            var kpi = $("#chart-kpi :selected").attr("value");
            var view = DashboardAddCharts.get_selected_view();
            var method = $("input[name='chartRadios']:checked").attr("value");
            var type = $("#db-add-type>.active").attr("type");
            var interval = $(this).attr("interval"), chart_body_close_validate = true;
            var kpi_property = DashboardAddCharts.get_selected_property();
            var show_type = $('#x_group option:selected').attr("type");
            var show_value = $('#x_group option:selected').val();
            var show_text = $('#x_group option:selected').html();

            var begin_time = $("#analy-begin-time").attr("hide_value"), end_time = $("#analy-end-time").attr("hide_value"),
                begin_post, end_post;

            $(this).siblings().removeClass("active");
            $(this).addClass('active');

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

                var ValueArray = new Array();
                var XGroup;
                ValueArray.length = 0;
                XGroup = {type: show_type, value: ValueArray};
                if (view.length > 0) {
                    for (var i = 0; i < view.length; i++) {
                        if (chart_body_close_validate) {
                            DashboardAddCharts.DrawChart(kpi, method, view[0], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                            chart_body_close_validate = false;
                        } else {
                            //直接添加到已有的表中
                            if (view.length > 1) {
                                DashboardAddCharts.RequestData(i, kpi, method, view[i], standardParse(begin_time).date.toISOString(), standardParse(end_time).date.toISOString(), interval, kpi_property, XGroup);
                            }
                        }
                    }
                } else {
                    MessageBox("请选择视图！", "top", "warning");
                }
            }
        }
    });
};

//获取维度数组
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
};

//获取视图数组
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
};

//图表类型切换
DashboardAddCharts.ChangeChartType = function () {
    $("#db-add-type>li").on("click", function (event) {
        if ($(this).hasClass("active") == false) {
            $(this).siblings().removeClass("active");
            $(this).addClass('active');
        }

        var Chart = $('#chart-container').highcharts();

        if ($("#db-add-type>.active").attr("type") == "pie") {
            if (Chart.series.length == 1) {
                Chart.series[0].update({
                    type: $("#db-add-type>.active").attr("type")
                });

                if ($(this).attr("type") == "pie") {
                    $('#pie_compare').css({display: "block"});
                } else {
                    $('#pie_compare').css({display: "none"});
                }
            } else {
                //合并显示
                MessageBox("饼状图只支持一组数据", "top", "warning");
            }
        } else {
            for (var i = 0; i < Chart.series.length; i++) {
                Chart.series[i].update({
                    type: $("#db-add-type>.active").attr("type")
                });
            }
        }
    });
};

//添加数据
DashboardAddCharts.RequestData = function (count, Kpi, Method, View, startTime, endTime, cycleFrequency, Property, XGroup) {
    $.ajax({
        url: '/kpi_entries/analyse',
        type: 'post',
        data: {
            kpi_id: Kpi,
            average: Method == "0",
            entity_group_id: View.id,
            start_time: startTime,
            end_time: endTime,
            frequency: cycleFrequency,
            property: Property,
            x_group: XGroup
        },
        success: function (data) {
            if (data.result) {
                var Charts = $("#chart-container").highcharts();

                var Data = new Array();
                for (var i = 0; i < data.object.current.length; i++) {
                    Data.push({
                        color: color[count],
                        name: data.object.date[i],
                        unit: data.object.unit[i],
                        target_min: data.object.target_min[i],
                        target_max: data.object.target_max[i],
                        y: data.object.current[i]
                    });
                }

                var KpiName = $("#chart-kpi :selected").text();
                try {
                    Charts.addSeries({
                        id: "series" + (count + 1),
                        name: KpiName + "(" + View.text + ")",
                        data: Data
                    });
                } catch (err) {
                    console.log("出错啦，时间段太长");
                }
            } else {
                console.log("API 请求返回值为false");
            }

            $("#db-add-kpi-list").append(
                $("<li />")
                    .append($("<span />").css("backgroundColor", color[count]))
                    .append($("<p />").text($("#chart-kpi :selected").text() + "(" + View.text + ")"))
                    .append($("<i />").addClass("icon-remove").attr("kpi_id", "series" + (count + 1)))
            );
        },
        error: function () {
            console.log("Something Error!");
        }
    });
};

//画图
DashboardAddCharts.DrawChart = function (Kpi, Method, View, startTime, endTime, cycleFrequency, Property, XGroup) {
    dashboard_show_loading("dashboard-add-inner", "40px", "0px", "0px", "200px");
    $.ajax({
        url: '/kpi_entries/analyse',
        type: 'post',
        data: {
            kpi_id: Kpi,
            average: Method == "0",
            entity_group_id: View.id,
            start_time: startTime,
            end_time: endTime,
            frequency: cycleFrequency,
            property: Property,
            x_group: XGroup
        },
        success: function (data) {
            if (data.result) {
                //去除遮罩层，能够改变 图表类型
                dashboard_remove_loading("dashboard-add-inner");
                DashboardAddCharts.ChangeChartType();

                var XAxis = data.object.date;
                var type = $("#db-add-type>.active").attr("type");

                var toolTips = {
                    kpi: $("#chart-kpi :selected").text(),
                    view: View.text,
                    target: "chart-container",
                    outer_target: "put-db-chart",
                    begin_time: startTime,
                    type: type,
                    interval: $("#db-chart-interval-alternate li.active").attr("interval"),
                    kpi_property: Property,
                    x_type: XGroup
                };

                var Data = new Array();
                var XName = data.object.date;

                //如果是时间， 进行转化
                if (XGroup.type == 100) {
                    XName = DashboardAddCharts.DealTimeData(toolTips, data.object.date, $("#db-chart-interval-alternate li.active").attr("interval"));
                }

                for (var i = 0; i < XAxis.length; i++) {
                    Data.push({
                        color: color[0],
                        name: XName[i],
                        unit: data.object.unit[i],
                        target_min: data.object.target_min[i],
                        target_max: data.object.target_max[i],
                        y: data.object.current[i],
                        x_type: XGroup
                    })
                }

                var options = {
                    id: "series-1",
                    name: $("#chart-kpi :selected").text() + "(" + View.text + ")",
                    data: Data
                };

                var Chart_Setting = {
                    Container: 'chart-container',
                    XAxis: XAxis,
                    ToolTips: toolTips,
                    Options: options
                };

                DashboardAddCharts.DrawHighChart(Chart_Setting);
            } else {
                console.log("API 请求返回值为false");
            }

            $("#db-add-kpi-list").empty();
            $("#db-add-kpi-list").append(
                $("<li />")
                    .append($("<span />").css("backgroundColor", color[0]))
                    .append($("<p />").text($("#chart-kpi :selected").text() + "(" + View.text + ")"))
                    .append($("<i />").addClass("icon-remove").attr("kpi_id", options.id))
            );
        },
        error: function () {
            console.log("Something Error!");
        }
    });
};

DashboardAddCharts.DrawHighChart = function (Chart_Settings) {
    high_charts = $("#" + Chart_Settings.Container).highcharts({
        chart: {
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            type: Chart_Settings.ToolTips.type,
            spacingLeft: 5,
            spacingRight: 5,
            spacingBottom: 1,
            marginTop: 5,
            borderRadius: 0,
            backgroundColor: "transparent",
            animation: {
                duration: 800
            }
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: Chart_Settings.XAxis
        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                var seriesName = typeof this.series.name == "string" ? this.series.name : this.series.name[this.point.seriesId];
                return '<b>' + this.x + '</b>'
                    + '<br />KPI(' + I18n.t('chart.view') + '): <span style="color:' + this.series.color + '">' + seriesName
                    + '</span>'
                    // + '<br />' + I18n.t('chart.view') + ': ' + this.series.name
                    + '<br />' + I18n.t('chart.value') + ': ' + this.y + " " + this.point.unit
                    + "<br />" + I18n.t('chart.target_range') + ": " + this.point.target_min + "-" + this.point.target_max
            }
        },
        scrollbar: {
            enabled: true
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderHeight: 0,
            borderWidth: 0
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
        series: [Chart_Settings.Options]
    });
};

DashboardAddCharts.RemoveLine = function () {
    $("body").on("click", "#db-add-kpi-list li i", function () {
        var chart = $('#chart-container').highcharts();
        if (chart.series.length) {
            chart.series[0].remove();
            $(this).parent().remove();
        }
    });
};

//关闭绘图
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
    DashboardAddCharts.initial.analytic_control_condition_visible();
    if ($("#chart-container").highcharts() != undefined) {
        $("#chart-container").highcharts().destroy();
    }
    $("#dashboard-add-wrap").css("display", "none");
};

//是否打开输入信息框
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

DashboardAddCharts.DealTimeData = function (option, origin_data, interval) {
    var BeginTime = option.begin_time ? standardParse(option.begin_time).template : null;
    var i;
    var data = origin_data;

    switch (interval) {
        case "90":
            for (i = 0; i < data.length; i++) {
                data[i] = new Date(BeginTime[0], BeginTime[1], BeginTime[2], parseInt(BeginTime[3]) + i).toWayneString().hour;
            }
            return data;
            break;
        case "100":
            for (i = 0; i < data.length; i++) {
                data[i] = new Date(BeginTime[0], BeginTime[1], parseInt(BeginTime[2]) + i).toWayneString().day;
            }
            return data;
            break;
        case "200":
            for (i = 0; i < data.length; i++) {
                // data[i] = new Date(BeginTime[0], BeginTime[1], parseInt(BeginTime[2]) + 7 * i).toWayneString().day
                //     + " week" + new Date(BeginTime[0], BeginTime[1], parseInt(BeginTime[2]) + 7 * i).toWeekNumber();
                data[i] = "Week" + new Date(BeginTime[0], BeginTime[1], parseInt(BeginTime[2]) + 7 * i).toWeekNumber();
            }
            return data;
            break;
        case "300":
            for (i = 0; i < data.length; i++) {
                data[i] = new Date(BeginTime[0], parseInt(BeginTime[1]) + i).toWayneString().month;
            }
            return data;
            break;
        case "400":
            for (i = 0; i < data.length; i++) {
                // data[i] = new Date(BeginTime[0], parseInt(BeginTime[1]) + 3 * i).getFullYear() + " quarter " + new Date(BeginTime[0], parseInt(BeginTime[1]) + 3 * i).monthToQuarter();
                data[i] = "Quarter " + new Date(BeginTime[0], parseInt(BeginTime[1]) + 3 * i).monthToQuarter();
            }
            return data;
            break;
        case "500":
            for (i = 0; i < data.length; i++) {
                data[i] = new Date(parseInt(BeginTime[0]) + i, 0).toWayneString().year;
            }
            return data;
            break;
    }
}