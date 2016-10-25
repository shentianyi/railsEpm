/**
 * Created with JetBrains WebStorm.
 * User: tianyi
 * Date: 13-7-12
 * Time: 下午3:34
 * To change this template use File | Settings | File Templates.
 * need jQuery,jQuery UI Sortable
 */


/*
 Usage: include all the dependancy and this lib, do the configure in ifepm.config.js,
 customize the theme in ifepm.dashboard.template.js
 and use ifepm.dashboard.init(dashboard_id) to load all the sortable dashboard view in
 the specified container
 */

//include jquery-1.9.1.js - basic framework
//include jquery-ui-1.10.3.custom.js - need sortable module in this framework
//include hightchart.js
//include ifepm.config.js which contains the configuration of the lib
//include ifepm.dashboard.template.js which contains the theme of the dashboard view
//include ifepm.text.js which contains the text message used in this lib


if (!Date.prototype.toArray) {
    Date.prototype.toArray = function () {
        return [this.getFullYear(), this.getMonth() + 1,
            this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(),
            this.getMilliseconds()];
    };
}

if (!Date.prototype.getWeekNumber) {
    Date.prototype.getWeekNumber = function () {
        var d = new Date(+this);
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    };
}

if (!Date.prototype.getQuarter) {
    Date.prototype.getQuarter = function () {
        d = new Date(+this);
        var q = [4, 1, 2, 3];
        return q[Math.floor(d.getMonth() / 3)];
    };
}


//load or initialize the ifepm object
var ifepm = ifepm || {};


ifepm.dashboard = ifepm.dashboard || {};

ifepm.active_selector = ifepm.active_selector || new ActiveSelect();

//function to generate a chart-form dashboard view . Depands on highchart.js
/*
 =============
 @Deprecated
 =============
 */
ifepm.dashboard.form_chart = function (datas) {

}

//container of the current dashboard's item.
ifepm.dashboard.graphs = ifepm.dashboard.graphs || {};

ifepm.dashboard.graph_sequence = [];

ifepm.dashboard.set_last_update_time = function (item_id, lastupdate_time) {
    var id = item_id;
    if (isfullsize) {
        id = "full_" + item_id;
    }
    var $p = $("li#" + id + " .update-time").text(lastupdate_time);
}

var isformchart = false;

/*
 * @function form_graph
 * form highchart
 * */
ifepm.dashboard.form_highchart = function (datas, container, outer, type) {
    var chart = null;
    var data, series_id, option, count;

    for (var dataLength = 0; dataLength < datas.length; dataLength++) {
        count = 0;
        data = [];
//      id改掉了
        series_id = dataLength;

        for (var j = 0; j < datas[dataLength].current.length; ++j) {
            data[j] = {};
            data[j].y = datas[dataLength].current[j];
            data[j].high = datas[dataLength].target_max[j];
            data[j].low = datas[dataLength].target_min[j];
            data[j].unit = datas[dataLength].unit[j];
            data[j].id = series_id;
        }

        option = {
            kpi: datas[dataLength].kpi_name,
            id: series_id,
            target: container,
            outer_target: outer,
            begin_time: datas[dataLength].startTime,
            type: type,
            interval: datas[dataLength].interval,
            data: data,
            count: dataLength + 1,
            view_text: datas[dataLength].view,
            total: datas[0].total
        };

        if (datas[dataLength].x_group) {
            var XGroup = {
                type: datas[dataLength].x_group.type,
                value: datas[dataLength].x_group.value,
                pie_compare: datas[dataLength].x_group.pie_compare
            };
        }

        var toolTips = {
            kpi: option.kpi,
            view: option.view_text,
            target: container,
            outer_target: "put-db-chart",
            begin_time: option.begin_time,
            type: option.type,
            interval: option.interval,
            kpi_property: "",
            x_type: XGroup
        };

        var XAxis = datas[dataLength].date;

        //如果是时间， 进行转化
        if (XGroup.type == 100) {
            XName = DashboardAddCharts.DealTimeData(toolTips, XAxis, datas[dataLength].interval);
        }

        var Data = new Array();
        var XName = datas[dataLength].date;

        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

        if (type == "pie") {
            if (XGroup.pie_compare == "占比") {
                var Max = 0;
                var SumChild = 0.0;

                for (var compare = 0; compare < XAxis.length; compare++) {
                    if (Max < parseFloat(datas[dataLength].current[compare])) {
                        Max = parseFloat(datas[dataLength].current[compare]);
                    } else {
                        SumChild += parseFloat(datas[dataLength].current[compare]);
                    }
                }

                for (var array = 0; array < XAxis.length; array++) {

                    console.log("SAArray");
                    console.log(datas[dataLength].current[array]);

                    if (parseFloat(datas[dataLength].current[array]) == Max) {
                        console.log("最大值 是 " + Max);
                    } else {
                        // Data.push({
                        //     color: color[array],
                        //     name: XName[array],
                        //     unit: data.object.unit[array],
                        //     target_min: data.object.target_min[array],
                        //     target_max: data.object.target_max[array],
                        //     y: data.object.current[array],
                        //     x_type: XGroup
                        // });

                        Data.push({
                            view: datas[dataLength].date[array],
                            name: XName[array],
                            unit: data[array].unit,
                            target_min: data[array].low,
                            target_max: data[array].high,
                            y: datas[dataLength].current[array],
                            x_type: XGroup
                        })
                    }
                }

                var Others = Max - SumChild;

                if (Others > 0) {
                    //.....输出
                    // Data.push({
                    //     color: color[XAxis.length + 1],
                    //     name: "Others",
                    //     unit: data.object.unit[0],
                    //     target_min: data.object.target_min[0],
                    //     target_max: data.object.target_max[0],
                    //     y: Others,
                    //     x_type: XGroup
                    // });

                    Data.push({
                        view: datas[dataLength].date[i],
                        name: "Others",
                        unit: data[0].unit,
                        target_min: data[0].low,
                        target_max: data[0].high,
                        y: Others,
                        x_type: XGroup
                    })
                }
            } else {
                // for (var i = 0; i < XAxis.length; i++) {
                //     Data.push({
                //         color: color[i],
                //         name: XName[i],
                //         unit: data.object.unit[i],
                //         target_min: data.object.target_min[i],
                //         target_max: data.object.target_max[i],
                //         y: data.object.current[i],
                //         x_type: XGroup
                //     })
                // }

                for (var i = 0; i < XAxis.length; i++) {
                    Data.push({
                        view: datas[dataLength].date[i],
                        name: XName[i],
                        unit: data[i].unit,
                        target_min: data[i].low,
                        target_max: data[i].high,
                        y: data[i].y,
                        x_type: XGroup
                    })
                }
            }
        } else {
            // for (var i = 0; i < XAxis.length; i++) {
            //     Data.push({
            //         color: color[0],
            //         name: XName[i],
            //         unit: data.object.unit[i],
            //         target_min: data.object.target_min[i],
            //         target_max: data.object.target_max[i],
            //         y: data.object.current[i],
            //         x_type: XGroup
            //     })
            // }

            for (var i = 0; i < XAxis.length; i++) {
                Data.push({
                    view: datas[dataLength].date[i],
                    name: XName[i],
                    unit: data[i].unit,
                    target_min: data[i].low,
                    target_max: data[i].high,
                    y: data[i].y,
                    x_type: XGroup
                })
            }
        }

        console.log(Data);

        //
        // for (var i = 0; i < XAxis.length; i++) {
        //     Data.push({
        //         view: datas[dataLength].date[i],
        //         name: XName[i],
        //         unit: data[i].unit,
        //         target_min: data[i].low,
        //         target_max: data[i].high,
        //         y: data[i].y,
        //         x_type: XGroup
        //     })
        // }

        var options = {
            id: option.id,
            name: option.kpi + "(" + option.view_text + ")",
            data: Data
        };

        if (XGroup.type == 200) {
            options.name = $("#chart-kpi :selected").text();
        }

        var Chart_Setting = {
            Container: container,
            XAxis: XAxis,
            ToolTips: toolTips,
            Options: options
        };

        if (dataLength == 0) {
            DashboardAddCharts.DrawHighChart(Chart_Setting);
        } else {
            var Charts = $('#' + container).highcharts();
            Charts.addSeries({
                id: series_id,
                name: option.kpi + "(" + option.view_text + ")",
                data: Data
            });
        }
    }
};

ifepm.dashboard.form_graph = function (datas, id) {
    var container, outer;
    if (isfullsize) {
        container = ifepm.dashboard.make_item_container_id_full(id);
        outer = ifepm.dashboard.make_item_outer_id_full(id);
    }
    else {
        container = ifepm.dashboard.make_item_container_id(id);
        outer = ifepm.dashboard.make_item_outer_id(id);
    }

    var type = ifepm.dashboard.graphs[id].chart_type;
    if (type == 'table') {
        /*-------------------------table----------------------------------*/
        window.setTimeout(function () {
            ifepm.dashboard.dhtmlxtable(container, datas);
        }, 100);

        /*-------------------------table----------------------------------*/
    } else {
        /*-------------------------绘制图表 ----------------------------------*/
        ifepm.dashboard.form_highchart(datas, container, outer, type);

        // //判断全屏
        if (isfullsize) {
            $('.dashboard-moreDetail p').css("color", "white");
            $('.dashboard-moreDetail i').css("color", "white");
            $('.dashboard-moreDetail span').css("color", "white");

            // $('#' + container).find('tspan').css("fill", "white");
            // $('#' + container).find('.highcharts-axis-labels text').css("fill", "white");
        }
    }

    if (datas.length < 1) {
        dashboard_remove_loading(outer);
        ifepm.dashboard.on_finish_load();
        window.clearTimeout(constraintFullSizeHeight);
        return;
    }

    dashboard_remove_loading(outer);
    ifepm.dashboard.on_finish_load();
};

ifepm.dashboard.parseDateTime = function (interval, time) {
    var now = new Date(time);
    switch (interval) {
        case "90":
            return now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":00";
            break;
        case "100":
            return now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
            break;
        case "200":
            return "Week " + now.getWeekNumber()
            break;
        case "300":
            return now.getFullYear() + "/" + (now.getMonth() + 1);
            break;
        case "400":
            return "Quarter " + now.getQuarter().toString();
            break;
        case "500":
            return now.getFullYear().toString();
            break;
        default:
            break;
    }
    return "/";
}

ifepm.dashboard.parse2dhtmlxGridJson = function (datas) {
    var h_keys = {"View": 0, "Kpi": 0};
    var data = []
    //mearge header
    for (var i = 0; i < datas.length; i++) {
        var d = datas[i];
        data[i] = {};
        data[i]["View"] = d.view;
        data[i]["Kpi"] = d.kpi_name;
        for (var j = 0; j < d.date.length; j++) {
            h_keys[d.date[j]] = 0;
            data[i][d.date[j]] = d.current[j];
        }
    }

    var djson = {
        rows: [{
            id: 1001,
            data: []
        }]
    }

    for (var i = 0; i < data.length; i++) {
        djson.rows[i] = {id: 0, data: []};
        djson.rows[i].id = i + 1;
        $.each(Object.keys(h_keys), function (index, value) {
            if (data[i][value] == undefined) {
                djson.rows[i].data.push(0);
            } else {
                djson.rows[i].data.push(data[i][value]);
            }
        });
    }

    var headers = "";

    var interval = datas[0].interval;

    $.each(Object.keys(h_keys), function (index, value) {
        var v = null;
        if (index < 2) {
            v = value
        }
        else {
            v = ifepm.dashboard.parseDateTime(interval, value);
        }
        headers = headers + v + ",";
    });

    return {json: djson, headers: headers, colcount: Object.keys(h_keys).length};
};

ifepm.dashboard.dhtmlxtable = function (container, datas) {
    var d = ifepm.dashboard.parse2dhtmlxGridJson(datas);
    var width = $("#" + container).width() / d.colcount;
    width = width < 60 ? 60 : width;
    var widthstring = "";
    var alistr = "";

    for (var i = 0; i < d.colcount; i++) {
        if (i < 2) {
            widthstring = widthstring + 150 + ",";
            alistr = alistr + "center";
        }
        else if (i == d.colcount - 1) {
            widthstring = widthstring + width;
            alistr = alistr + "center";
        } else {
            widthstring = widthstring + width + ",";
            alistr = alistr + "center,";
        }
    }

    var table = new dhtmlXGridObject(container);
    table.setImagePath("/assets/dhtmlx/");
    table.setHeader(d.headers);
    table.setInitWidths(widthstring);
    table.setSkin("dhx_skyblue");
    table.init();
    table.parse(d.json, "json");
    return table;
}

var intervals = [];
/*
 * @function setTimer
 * set a timer for one graph to request kpi entries
 * @params graph
 * */
ifepm.dashboard.setTimer = function (graph) {
    var interval = null;
    var intv = ifepm.dashboard.getInteral(graph.sequence);
    interval = setInterval(reload(graph.id), intv);
    intervals.push(interval);
    console.log("ID:" + graph.id + " Interval:" + interval);
}
/*
 * @function reload
 * reload dashboard item data
 * */
function reload(id) {
    return function () {
        if (!ifepm.dashboard.graphs[id]) {
            return;
        }
        //var current_graph = ifepm.dashboard.graphs[id];
        var last_update = new Date().toWayneString().second;
        ifepm.dashboard.graphs[id].last_update = last_update;
        //current_graph.last_update = last_update;
        ifepm.dashboard.set_last_update_time(id, ifepm.dashboard.graphs[id].last_update);
        $.ajax(
            {
                before_send: function () {
                },
                url: ifepm.config.get_item_data_url.url,
                data: {"id": id, "last_update": last_update},
                dataType: ifepm.config.get_item_data_url.dataType,
                crossDomain: ifepm.config.get_item_data_url.crossDomain,
                success: function (data) {
                    if (data) {
                        ifepm.dashboard.update_graph(data, id);
                    }
                }
            }
        );
    };
}

/*
 * @function clearAllTimer
 * clear all the timer
 * */
ifepm.dashboard.clear_all_timer = function () {
    for (var i = 0; i < intervals.length; i++) {
        clearTimeout(intervals[i]);
    }
    intervals = [];
}

/*
 * @function getInterval
 * get the interval for timer
 * @params interval:interval of chart
 * */
ifepm.dashboard.getInteral = function (interval) {
    var intvl = null;

    var sec = 1000;
    var min = 1000 * 60;
    var hour = 1000 * 60 * 60;

    intvl = min * 30;

    switch (interval) {
        case "90":
            intvl = min * 30;
            break;
        case "100":
            intvl = hour * 60;
            break;
        case "200":
            intvl = hour * 1;
            break;
        case "300":
            intvl = hour * 24;
            break;
        case "400":
            intvl = hour * 24;
            break;
        case "500":
            intvl = hour * 24;
            break;
        default :
            intvl = min * 30;
            break;
    }

    return intvl;
}

/*
 * @function update_graph
 * reload data and update series of high_charts
 * @param data
 * @param id
 * */
ifepm.dashboard.update_graph = function (datas, id) {
    var container;
    if (isfullsize) {
        container = ifepm.dashboard.make_item_container_id_full(id);
    } else {
        container = ifepm.dashboard.make_item_container_id(id);
    }

    var type = ifepm.dashboard.graphs[id].chart_type;
    var chart = $('#' + container).highcharts();

    if (chart) {
        for (var i = 0; i < datas.length; i++) {
            var series = chart.get(i);
            if (!series) {
                continue;
            }
            for (var j = 0; j < datas[i].current.length; j++) {
                var point = series.data[j];
                //point.update(Math.random()*(200+1));
                series.data[j].update(datas[i].current[j], false);
            }
        }
        if (type == "pie") {
            pie_for_dashboard(container);
        }
        else {
            chart.redraw();
        }
    }
}

/*
 * @function load_graoh
 * load dashboard item data
 * */
ifepm.dashboard.load_graph = function (id) {
    if (!ifepm.dashboard.graphs[id]) {
        return;
    }

    var current_graph = ifepm.dashboard.graphs[id];
    var outer;
    if (isfullsize) {
        outer = ifepm.dashboard.make_item_outer_id_full(id);
    }
    else {
        outer = ifepm.dashboard.make_item_outer_id(id);
    }

    dashboard_show_loading(outer);
    $.ajax(
        {
            before_send: function () {
            },
            url: ifepm.config.get_item_data_url.url,
            data: {"id": id, "last_update": current_graph.last_update},
            dataType: ifepm.config.get_item_data_url.dataType,
            crossDomain: ifepm.config.get_item_data_url.crossDomain,
            success: function (data) {
                //condition array
                if (data) {
                    ifepm.dashboard.form_graph(data, id);
                }
            }
        }
    );
};

ifepm.dashboard.make_item_container_id = function (item_id) {
    return "container_" + item_id;
};
ifepm.dashboard.make_item_outer_id = function (item_id) {
    return "container_" + item_id + "_outer";
};
ifepm.dashboard.make_item_container_id_full = function (item_id) {
    return "container_full_" + item_id;
}
ifepm.dashboard.make_item_outer_id_full = function (item_id) {
    return "container_full_" + item_id + "_outer";
}

/*
 * @class 代表一个图标的搜索条件
 *
 * */

function Condition() {
    /*@field 全局唯一的ID*/
    this.id = null;
    /*@field 用户自定义的观察点，观察点是数个KPI输入点的集合 */
    this.entity_group = null;
    /*@field 图中使用的KPI的ID*/
    this.kpi_id = null;
    /*@field 图中使用的KPI的名称*/
    this.kpi_name = null;
    /*
     @field 计算类型, ACCUMULATE or AVERAGE
     ACCUMULATE 将获取到的同类数据做加法合并
     AVERAGE 将获取到的同类数据做除法平均
     * */
    this.calculate_type = null;

    /*@field 监测时间开始*/
    this.from = null;

    /*@field 监测时间结束*/
    this.end = null;
    /**/
    this.count = null;
};
/*
 * @class 代表在仪表盘中的一个图表以及其代表的搜索条件和数据
 *
 * */
function Graph() {
    /*@field 全局唯一的ID号*/
    this.id = null;
    /*@field 用户自定义的观察点，观察点是数个KPI输入点的集合 */
    //this.entity_group=null;
    /*@field 图中使用的KPI的ID*/
    //this.kpi_id=null;
    /*@field 图中使用的KPI的名称*/
    //this.kpi_name=null;
    /*
     @field 计算类型, ACCUMULATE or AVERAGE
     ACCUMULATE 将获取到的同类数据做加法合并
     AVERAGE 将获取到的同类数据做除法平均
     * */
    //this.calculate_type=null;

    /*@field 监测时间开始*/
    //this.from = null;

    /*@field 监测时间结束*/
    //this.end = null;

    /*@field 查看间隔，指数据将在怎么*/
    //this.interval = null;
    //this.name = null;
    this.title = null;
    this.sequence = null;

    /*@field gridview 的位置*/
    this.row = null;
    this.col = null;
    this.sizex = null;
    this.sizey = null;

    /*@field 上次更新时间*/
    this.last_update = null;

    /**/
    this.chart_type = null;

    this.placeholder = ifepm.template.view_placeholder;
    this.container = function (graph_item) {
        var id, item_container_id;
        if (isfullsize) {
            id = "full_" + graph_item.id;
            item_container_id = ifepm.dashboard.make_item_container_id_full(graph_item.id)
        }
        else {
            id = graph_item.id;
            item_container_id = ifepm.dashboard.make_item_container_id(graph_item.id)
        }

        return ifepm.template.view
            .replace(/custom_handler/g, ifepm.config.remove_view_function)
            .replace(/!item_id!/g, id)
            .replace(/!id!/g, graph_item.id)
            .replace(/!title!/g, graph_item.title)
            .replace(/!item_container_id!/g, item_container_id)
            .replace(/!attr!/g, ifepm.config.graph_indicator)
            .replace(/!last_update!/g, graph_item.last_update)
        //.replace(/!name!/g,graph_item.name)
        //.replace(/!kpi_name!/g,graph_item.kpi_name)
        //.replace(/!entity_group!/g,graph_item.entity_group)
        //.replace(/!from!/g,graph_item.from)
        //.replace(/!to!/g,graph_item.end)
        //.replace(/!calculate_type!/g,graph_item.calculate_type)
    };
}

//when user sorts the dashboard layout, the sequence should be updated in the server side
/*
 * @deprecated
 * */
ifepm.dashboard.update_item_sequence = function (container_selector) {

    ifepm.dashboard.graph_sequence = [];

    $(container_selector).children().filter(ifepm.config.graph_container_tag)
        .each(function () {
            ifepm.dashboard.graph_sequence.push($(this).attr(ifepm.config.graph_indicator));
        });

    $.ajax({
        url: ifepm.config.update_sequence_url.url,
        dataType: ifepm.config.update_sequence_url.dataType,
        crossDomain: ifepm.config.update_sequence_url.crossDomain,
        data: {sequence: ifepm.dashboard.graph_sequence}
    })
};
var constraintFullSizeHeight;
var current_index = 0;
/*
 * @function on_finish_load
 * called after the previous dashboard item finish loading
 * */
ifepm.dashboard.on_finish_load = function () {

    var container_selector = ifepm.config.container_selector;
    ++current_index;
    // console.log(current_index + "=====" + ifepm.dashboard.graph_sequence.length);
    if (current_index >= ifepm.dashboard.graph_sequence.length) {
        ifepm.dashboard_widget.enable(true);
        constraintFullSizeHeight = window.setTimeout(function () {
            //var height = $(document).height();
            //get screen avaliable height
            var height = document.body.clientHeight;
            //var height = window.screen.availHeight;
            console.log("timeout" + "===height=" + height)
            $("#dashboard-content-full").css("height", height + "px");

            //here is get the right content Hight;
            var ContentHig = document.getElementById('dashboard-content').offsetHeight;
            var ClientHeight_left = ContentHig / 2 - 40;
            console.log("dashboard-content-full-bg-left:" + ClientHeight_left + "px");

            $("#dashboard-content-full-bg-left").css("height", ClientHeight_left + "px");
        }, 100);


        if (isfullsize) {
            //add a full size title
            /*$(container_selector).append(ifepm.template.title.replace(/!title!/g, current_dashboard_name));
             var option = {};
             option.container_selector = container_selector;
             option.isnew = false;
             option.id = ifepm.template.titleid;
             //option.col = 1;
             //option.row = 1;
             option.sizex = 1;
             option.sizey = 1;
             ifepm.dashboard_widget.add_w(option);
             */
            ifepm.dashboard.on_drag_stop();
            $("#dash-fullsize").height()
            window.setTimeout(function () {
                //var height = $(document).height();
                //get screen avaliable height
                //  var height = window.screen.availHeight;
                var height = document.body.clientHeight;
                console.log("timeout" + "isfullsize===" + height)
                $("#dashboard-content-full").css("height", height + "px");
            }, 100)
        }
        return;
    }
    var graph_id = ifepm.dashboard.graph_sequence[current_index];
    if (ifepm.dashboard.graphs[graph_id].last_update == null) {
        ifepm.dashboard.graphs[graph_id].last_update = new Date().toWayneString().second;
    }

    $(container_selector).append(
        ifepm.dashboard.graphs[graph_id].container(ifepm.dashboard.graphs[graph_id]));

    var option = {};
    option.container_selector = container_selector;
    option.id = graph_id;

    if (isfullsize) {
        if (ifepm.dashboard.graphs[graph_id].col) {
            option.isnew = false;
            option.row = ifepm.dashboard.graphs[graph_id].row;
            option.col = ifepm.dashboard.graphs[graph_id].col;
            option.sizex = ifepm.dashboard.graphs[graph_id].sizex;
            option.sizey = ifepm.dashboard.graphs[graph_id].sizey;
            option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
            ifepm.dashboard_widget.add_w(option);
        }
        else {
            //新增
            option.isnew = true;
            option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
            var result = ifepm.dashboard_widget.add_w(option);

            ifepm.dashboard.graphs[graph_id].col = result.col;
            ifepm.dashboard.graphs[graph_id].row = result.row;
            ifepm.dashboard.graphs[graph_id].sizex = result.sizex;
            ifepm.dashboard.graphs[graph_id].sizey = result.sizey;
        }
    }
    else {
        option.isnew = true;
        option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
        ifepm.dashboard_widget.add_w(option);
    }


    /*if (ifepm.dashboard.graphs[graph_id].col) {
     option.isnew = false;
     option.row = ifepm.dashboard.graphs[graph_id].row;
     option.col = ifepm.dashboard.graphs[graph_id].col;
     option.sizex = ifepm.dashboard.graphs[graph_id].sizex;
     option.sizey = ifepm.dashboard.graphs[graph_id].sizey;
     option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
     ifepm.dashboard_widget.add_w(option);
     }
     else {
     option.isnew = true;
     option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
     var result = ifepm.dashboard_widget.add_w(option);

     ifepm.dashboard.graphs[graph_id].col = result.col;
     ifepm.dashboard.graphs[graph_id].row = result.row;
     ifepm.dashboard.graphs[graph_id].sizex = result.sizex;
     ifepm.dashboard.graphs[graph_id].sizey = result.sizey;

     var options = [];
     var opt = {};
     opt.id = graph_id;
     opt.sizex = result.sizex;
     opt.sizey = result.sizey;
     opt.col = result.col;
     opt.row = result.row;
     options.push(opt);
     ifepm.dashboard.save_grid_pos(options, {success: function () {
     }});
     } */

    if (!isfullsize) {
        ifepm.dashboard.setTimer(ifepm.dashboard.graphs[graph_id]);
    }
}

/*
 * @function create_dashboard
 * append dashboard item to the container_selector
 * */
ifepm.dashboard.create_dashboard = function () {
    var container_selector = ifepm.config.container_selector;
    ifepm.dashboard_widget.remove_all_widgets();
    ifepm.dashboard.clear_all_timer();
    $(container_selector).children().remove();

    if (Object.keys(ifepm.dashboard.graphs).length > 0) {
        current_index = 0;
        var graph_id = ifepm.dashboard.graph_sequence[current_index];
        if (ifepm.dashboard.graphs[graph_id].last_update == null) {
            ifepm.dashboard.graphs[graph_id].last_update = new Date().toWayneString().second;
        }

        $(container_selector).append(
            ifepm.dashboard.graphs[graph_id].container(ifepm.dashboard.graphs[graph_id]));

        var option = {};
        option.container_selector = container_selector;
        option.id = graph_id;
        //
        option.isnew = true;
        option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
        var result = ifepm.dashboard_widget.add_w(option);
        ifepm.dashboard.graphs[graph_id].sizex = result.sizex;
        ifepm.dashboard.graphs[graph_id].sizey = result.sizey;

        // change to not save position
        /*
         if (ifepm.dashboard.graphs[graph_id].sizex) {
         option.isnew = false;
         option.row = ifepm.dashboard.graphs[graph_id].row;
         option.col = ifepm.dashboard.graphs[graph_id].col;
         option.sizex = ifepm.dashboard.graphs[graph_id].sizex;
         option.sizey = ifepm.dashboard.graphs[graph_id].sizey;
         ifepm.dashboard_widget.add_w(option);
         }
         else {
         option.isnew = true;
         option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
         var result = ifepm.dashboard_widget.add_w(option);

         ifepm.dashboard.graphs[graph_id].col = result.col;
         ifepm.dashboard.graphs[graph_id].row = result.row;
         ifepm.dashboard.graphs[graph_id].sizex = result.sizex;
         ifepm.dashboard.graphs[graph_id].sizey = result.sizey;

         var options = [];
         var opt = {};
         opt.id = graph_id;
         opt.sizex = result.sizex;
         opt.sizey = result.sizey;
         opt.col = result.col;
         opt.row = result.row;
         options.push(opt);
         ifepm.dashboard.save_grid_pos(options, {success: function () {
         }});
         }
         *?
         ifepm.dashboard.setTimer(ifepm.dashboard.graphs[graph_id]);
         /*
         for(index in ifepm.dashboard.graph_sequence){
         var graph_id = ifepm.dashboard.graph_sequence[index];
         if( ifepm.dashboard.graphs[graph_id].last_update == null){
         ifepm.dashboard.graphs[graph_id].last_update =  new Date().toWayneString().second;
         }

         $(container_selector).append(
         ifepm.dashboard.graphs[graph_id].container(ifepm.dashboard.graphs[graph_id]));

         var option={};
         option.container_selector=container_selector;
         option.id= graph_id;
         if(ifepm.dashboard.graphs[graph_id].sizex){
         option.isnew=false;
         option.row=ifepm.dashboard.graphs[graph_id].row;
         option.col=ifepm.dashboard.graphs[graph_id].col;
         option.sizex=ifepm.dashboard.graphs[graph_id].sizex;
         option.sizey=ifepm.dashboard.graphs[graph_id].sizey;
         ifepm.dashboard_widget.add_w(option);
         }
         else{
         option.isnew=true;
         option.chart_type=ifepm.dashboard.graphs[graph_id].chart_type;
         var result = ifepm.dashboard_widget.add_w(option);

         ifepm.dashboard.graphs[graph_id].col = result.col;
         ifepm.dashboard.graphs[graph_id].row = result.row;
         ifepm.dashboard.graphs[graph_id].sizex = result.sizex;
         ifepm.dashboard.graphs[graph_id].sizey = result.sizey;

         var options = [];
         var opt = {};
         opt.id = graph_id;
         opt.sizex = result.sizex;
         opt.sizey = result.sizey;
         opt.col = result.col;
         opt.row = result.row;
         options.push(opt);
         ifepm.dashboard.save_grid_pos(options,{success:function(){}});
         }
         ifepm.dashboard.setTimer(ifepm.dashboard.graphs[graph_id]);
         */
        //ifepm.dashboard.set_last_update_time(ifepm.dashboard.graphs[graph_id].id,ifepm.dashboard.graphs[graph_id].last_update);
        //}
        //configure the sortable
        //$(container_selector).sortable(
        //    {
        //        placeholder: ifepm.template.move_placeholder,
        //        //update the sequence when the layout is changed
        //        stop:function(){ifepm.dashboard.update_item_sequence(container_selector)}
        //    }
        //);
        //$(container_selector).disableSelection();
    }
    else {
        $(container_selector).append((new Graph()).placeholder)
    }

    //ifepm.dashboard_widget.init();
};

/*
 * @function init
 * init graph array after select a dashboard group
 * */
ifepm.dashboard.init = function (id, callback) {
    ifepm.dashboard.graphs = {};
    ifepm.dashboard.graph_sequence = [];
    $.ajax(
        {
            crossDomain: ifepm.config.get_dashboard_items_url.crossDomain,
            dataType: ifepm.config.get_dashboard_items_url.dataType,
            url: ifepm.config.get_dashboard_items_url.url,
            data: {id: id},
            success: function (data) {
                ifepm.dashboard_widget.enable(false);
                ifepm.dashboard.clear_all_timer();
                for (var i = 0; i < data.length; i++) {
                    var graph_item = new Graph();
                    graph_item.id = data[i].id;
                    //graph_item.name = data[i].name;
                    graph_item.title = data[i].title;
                    //graph_item.calculate_type = data[i].calculate_type
                    //graph_item.from =data[i].start
                    //graph_item.end = data[i].end
                    graph_item.chart_type = data[i].chart_type
                    //graph_item.entity_group = data[i].entity_group
                    //graph_item.kpi_id = data[i].kpi_id
                    //graph_item.kpi_name = data[i].kpi_name
                    //graph_item.interval = data[i].interval
                    graph_item.sequence = data[i].sequence
                    graph_item.dashboard_id = data[i].dashboard_id
                    graph_item.row = data[i].row;
                    graph_item.col = data[i].col;
                    graph_item.sizex = data[i].sizex;
                    graph_item.sizey = data[i].sizey;
                    graph_item.last_update = data[i].last_update;
                    ifepm.dashboard.graphs[data[i].id] = graph_item;
                    //ifepm.dashboard.setTimer(ifepm.dashboard.graphs[data[i].id]);
                    ifepm.dashboard.graph_sequence.push(data[i].id)
                }

                if (callback) {
                    callback.call();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Oops, something went wrong, please try again");
            }
        }
    );

};

/*
 * @function on_view_added
 * called after a dashboard item added successfully
 * */
ifepm.dashboard.on_view_added = function (data) {
    var graph_item = new Graph();
    graph_item.id = data.id;
    graph_item.name = data.name;
    graph_item.title = data.title;
    graph_item.calculate_type = data.calculate_type;
    graph_item.from = data.start;
    graph_item.end = data.end;
    graph_item.chart_type = data.chart_type;
    graph_item.entity_group = data.entity_group;
    graph_item.kpi_id = data.kpi_id;
    graph_item.kpi_name = data.kpi_name;
    graph_item.interval = data.interval;
    graph_item.sequence = data.sequence;
    graph_item.dashboard_id = data.dashboard_id;
    graph_item.last_update = data.last_update;
    var container_selector = ifepm.config.container_selector;
    var option = {};
    option.isnew = true;
    option.id = data.id;
    option.container_selector = container_selector;
    option.chart_type = data.chart_type;

    ifepm.dashboard.graphs[graph_item.id] = graph_item;
    ifepm.dashboard.graph_sequence.push(graph_item.id);

    //create chart
    $(container_selector).append(graph_item.container(graph_item));

    //add widget,return size and pos
    var result = ifepm.dashboard_widget.add_w(option);
    graph_item.sizex = result.sizex;
    graph_item.sizey = result.sizey;
    //graph_item.col = result.col;
    //graph_item.row = result.row;

    ifepm.dashboard.graphs[graph_item.id] = graph_item;
    ifepm.dashboard.setTimer(graph_item);

    //save position
    var options = [];
    var opt = {};
    opt.id = graph_item.id;
    opt.sizex = graph_item.sizex;
    opt.sizey = graph_item.sizey;
    opt.col = graph_item.col;
    opt.row = graph_item.row;
    options.push(opt);
    ifepm.dashboard.save_grid_pos(options, {
        success: function () {
        }
    });
}

/*
 * @function on_drag_stop
 * called after drag widget stop
 * */
ifepm.dashboard.on_drag_stop = function () {
    //get all the new position
    var result = {};
    var options = [];
    for (var i in ifepm.dashboard.graph_sequence) {
        var id = ifepm.dashboard.graph_sequence[i];
        if (id == null) {
            continue;
        }
        var opt = {};
        var filter = "#full_" + id;
        result = ifepm.dashboard_widget.get_pos(filter);
        if ((ifepm.dashboard.graphs[id].row == result.row ) && ( ifepm.dashboard.graphs[id].col == result.col)) {
            continue;
        }
        ifepm.dashboard.graphs[id].row = result.row;
        ifepm.dashboard.graphs[id].col = result.col;

        opt.id = id;
        opt.row = result.row;
        opt.col = result.col;
        opt.sizex = ifepm.dashboard.graphs[id].size_x;
        opt.sizey = ifepm.dashboard.graphs[id].size_y;
        options.push(opt);
    }
    //
    if (options.length > 0) {
        ifepm.dashboard.save_grid_pos(options, {
            success: function () {
            }
        });
    }
}

/*
 * @function on_view_deleted
 * called after a dashboard_item deleted
 * */
ifepm.dashboard.on_view_deleted = function (id) {
    var need_delete_full_size = false;
    if (current_select_id == ifepm.dashboard.graphs[id].dashboard_id) {
        need_delete_full_size = true;
    }
    delete ifepm.dashboard.graphs[id];

    var value = Number(id);
    var index = ifepm.dashboard.graph_sequence.indexOf(value);
    if (index >= 0) {
        ifepm.dashboard.graph_sequence.splice(index, 1);
    }
    var filter;
    if (need_delete_full_size) {
        filter = ifepm.config.container_selector_full + " #full_" + id;
        ifepm.dashboard_widget.remove_w(filter, true);
    }
    filter = ifepm.config.container_selector + " #" + id;
    ifepm.dashboard_widget.remove_w(filter, false);
}

/*
 * @function delete
 * delete a dashboard [group]
 * */
ifepm.dashboard.delete = function (id, options) {
    $.ajax({
        url: ifepm.config.dashboard_delete_url.url,
        crossDomain: ifepm.config.dashboard_delete_url.crossDomain,
        dataType: ifepm.config.dashboard_delete_url.dataType,
        data: {"id": id},
        success: options.success,
        error: options.error,
        complete: options.complete
    })
};
/*
 * @function add
 * add a dashboard [group]
 * */
ifepm.dashboard.add = function (dashboard, options) {
    $.ajax({
        url: ifepm.config.dashboard_create_url.url,
        crossDomain: ifepm.config.dashboard_create_url.crossDomain,
        dataType: ifepm.config.dashboard_create_url.dataType,
        data: {
            "data": dashboard
        },
        success: options.success,
        error: options.error,
        complete: options.complete
    })
};

/*
 * @function delete_item
 * delete a dashboard item
 * */
ifepm.dashboard.delete_item = function (item_id, options) {
    $.ajax({
        url: ifepm.config.dashboard_item_delete_url.url,
        crossDomain: ifepm.config.dashboard_item_delete_url.crossDomain,
        data: {"id": item_id},
        dataType: ifepm.config.dashboard_item_delete_url.dataType,
        success: options.success,
        error: options.error,
        complete: options.complete
    })
};

/*
 * @function add_item
 * add a dashboard item
 * */
ifepm.dashboard.add_item = function (dashboard_item, options) {
    $.ajax({
        url: ifepm.config.dashboard_item_create_url.url,
        data: {
            dashboard_item: dashboard_item.db,
            conditions: dashboard_item.conditions
        },
        crossDomain: ifepm.config.dashboard_item_create_url.crossDomain,
        dataType: ifepm.config.dashboard_item_create_url.dataType,
        success: options.success,
        error: options.error,
        complete: options.complete
    })
};

/*
 * @function save_grid_pos
 * save widget position
 * */
ifepm.dashboard.save_grid_pos = function (sequence, options) {
    $.ajax({
        //url: ifepm.config.dashboard_item_save_grid_url.url,
        url: '/dashboard_items/save_grid',
        data: {sequence: sequence},
        type: 'POST',
        //crossDomain: ifepm.config.dashboard_item_save_grid_url.crossDomain,
        //dataType: ifepm.config.dashboard_item_save_grid_url.dataType,
        success: options.success,
        error: options.error,
        complete: options.complete
    })
}

/*
 * @function on_dashboard_deleted
 * need to delete the full size grid if same
 * */
ifepm.dashboard.on_dashboard_deleted = function (id) {
    if (current_dashboard_id == id) {
        var container_selector = ifepm.config.container_selector;
        ifepm.dashboard_widget.remove_all_widgets(isfullsize);
        $(container_selector).children().remove();
    }
}

/*
 * @full_size
 * for full size,fill graph data into gridster
 * */
var isfullsize = false;
var current_select_id = -1;

ifepm.dashboard.full_size = function (option) {
    isfullsize = option.fullsize;
    //if(isfullsize && (current_select_id == option.id)){
    //    return;
    //}
    current_select_id = option.id

    if (isfullsize) {
        /*
         * match the position of normal size
         * */
        var container_selector = ifepm.config.container_selector_full;
        ifepm.dashboard_widget.remove_all_widgets(isfullsize);
        $(container_selector).children().remove();

        if (Object.keys(ifepm.dashboard.graphs).length > 0) {
            current_index = 0;
            var graph_id = ifepm.dashboard.graph_sequence[current_index];

            $(container_selector).append(
                ifepm.dashboard.graphs[graph_id].container(ifepm.dashboard.graphs[graph_id]));

            var option = {};
            option.container_selector = container_selector;
            option.id = graph_id;

            if (ifepm.dashboard.graphs[graph_id].col) {
                option.isnew = false;
                option.col = ifepm.dashboard.graphs[graph_id].col;
                option.row = ifepm.dashboard.graphs[graph_id].row;
                option.sizex = ifepm.dashboard.graphs[graph_id].sizex;
                option.sizey = ifepm.dashboard.graphs[graph_id].sizey;
                option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
            }
            else {
                option.isnew = true;
                option.chart_type = ifepm.dashboard.graphs[graph_id].chart_type;
            }

            var result = ifepm.dashboard_widget.add_w(option);
            if (option.isnew) {
                ifepm.dashboard.graphs[graph_id].col = result.col;
                ifepm.dashboard.graphs[graph_id].row = result.row;
                ifepm.dashboard.graphs[graph_id].sizex = result.sizex;
                ifepm.dashboard.graphs[graph_id].sizey = result.sizey;
            }
        }
        else {
            //$(container_selector).append((new Graph()).placeholder)
        }

    }
}
