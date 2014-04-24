////////////////////////////////////////////////////////////////////////////////init select

function init_analytics() {
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
    var target = "#analy-begin-time,#analy-end-time";
    $("#chart-kpi").chosen().change(function () {
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        $(target).val("");
        $(".index-date-extra-info").text("");

        new DATE_PICKER[interval](target, "date").datePicker();
    });
    $("#chart-group").chosen().change(function () {
        $("#analy-begin-time,#analy-end-time").datepicker("remove");
        $("#analy-begin-time,#analy-end-time").datetimepicker("remove");
    });

    $("body").on("change", "#analy-begin-time",function () {
        var interval = $("#chart-kpi").find(":selected").attr("interval");
        if (interval == "200") {
            var week = standardParse($(this).val()).date.toWeekNumber();
            $(this).next().text("week " + week);
        }
        else if (interval == "400") {
            var quarter = standardParse($(this).val()).date.monthToQuarter();
            $(this).next().text("quarter " + quarter);
        }
    }).on("change", "#analy-end-time", function () {
            var interval = $("#chart-kpi").find(":selected").attr("interval");
            if (interval == "200") {
                var week = standardParse($(this).val()).date.toWeekNumber();
                $(this).next().text("week " + week);
            }
            else if (interval == "400") {
                var quarter = standardParse($(this).val()).date.monthToQuarter();
                $(this).next().text("quarter " + quarter);
            }
        });

    resize_chart.body();
    resize_chart.container();
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

    $('#chart-kpi').on('change', function (event) {
        var id = $(adapt_event(event).target).attr('value');
        $.get('/kpis/group_properties/' + id, function (data) {
            $("#kpi-property-select").empty().trigger('chosen:updated');
            if (data) {
                var properties = {};
                $.each(data, function (k, v) {
                    $.each(v, function (kk, vv) {
                        properties[k] = kk;
                        var gp = $('<optgroup/>').attr('label', kk);
                        for (var i = 0; i < vv.length; i++) {
                            gp.append($('<option/>').attr('value', vv[i].id).attr('property', k).text(vv[i].value));
                        }
                        $("#kpi-property-select").append(gp);
                    });
                });
                $("#kpi-property-select").val('').trigger('chosen:updated');
                groupDetailInit(data);
            }
        }, 'json');
    });

    //init同期对比
    ANALYTICS.currentCompare.init();
    //init详细
    ANALYTICS.detailPoint.init();
}
ANALYTICS.currentCompare={};
ANALYTICS.currentCompare.init=function(){


}
ANALYTICS.currentCompare = {};
ANALYTICS.currentCompare.init = function () {
    $("body")
        .on("click", "#compare-current-btn", function () {

        })
}
function analytic_control_condition_visible() {
    var open_state = $("#analytic-control-condition-visible").attr("state");
    if (open_state == "open") {
        $("#analytics-condition").css("top", "-16px");
        $("#chart-body").css("top", "26px").height(parseInt($("#chart-body").height()) + 86);
        $("#analytics-condition-invisible-mark").css("display", "block");
        $("#analytic-control-condition-visible").attr("state", "close").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    }
    else {
        $("#analytics-condition").css("top", "70px");
        $("#chart-body").css("top", "112px").height(parseInt($("#chart-body").height()) - 87);
        $("#analytics-condition-invisible-mark").css("display", "none");
        $("#analytic-control-condition-visible").attr("state", "open").removeClass("icon-chevron-down").addClass("icon-chevron-up");
    }
    resize_chart.container();
}

function get_selected_property() {
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
function prepare_form_chart() {
    var kpi = $("#chart-kpi :selected").attr("value");
    var view = $("#chart-view :selected").attr("value");
    var view_text = $("#chart-view :selected").text();
    var method = $("input[name='chartRadios']:checked").attr("value");
    var interval, type, chart_body_close_validate
    if ($("#chart-body").css("display") == "block") {
        chart_body_close_validate = false;
        interval = $("#chart-interval-alternate").find(".active").attr("interval");
        type = $("#chart-type-alternate").find(".image").attr("type");
    }
    else {
        chart_body_close_validate = true;
        interval = $("#analy-begin-time").attr("interval") == undefined || $("#analy-begin-time").attr("interval").length == 0 ? $("#chart-kpi :selected").attr("interval") : $("#analy-begin-time").attr("interval");
        type = "line";
    }
    var begin_time = $("#analy-begin-time").attr("hide_value"), end_time = $("#analy-end-time").attr("hide_value");
    var kpi_property = get_selected_property();

    if (kpi && begin_time && view) {
        if (end_time) {
            var compare_result = compare_time(begin_time, end_time);
            begin_time = compare_result.begin;
            end_time = compare_result.end;
        }
        else {
            end_time = begin_time
        }

        var option = {
            kpi: $("#chart-kpi :selected").text(),
            kpi_id: kpi,
            target: "chart-container",
            begin_time: begin_time,
            end_time: end_time,
            type: type,
            interval: interval,
            count: ANALYTICS.chartSeries.count + 1,
            view: view,
            view_text: view_text,
            method: method,
            chart_body_close_validate: chart_body_close_validate,
            kpi_property: kpi_property
        };


        ANALYTICS.chartSeries.addCount();
        ANALYTICS.chartSeries.id_give();
        option.id = ANALYTICS.chartSeries.id;
        ANALYTICS.chartSeries.addSeries(option);
        if (option.chart_body_close_validate) {
            show_chart_body(option);
        }
        ANALYTICS.form_chart(option);
    }
    else {
        MessageBox("please fill all blanks in *", "top", "warning")
    }
}
function show_chart_body(option) {
    $("#chart-body").css("display", "block");
    $("body").on("click", "#chart-type-alternate td", function (event) {
        alternate_chart_type(event)
    });

    $("#chart-interval-alternate").find("li").each(function () {
        $(this).bind("click", function (event) {
            var target = adapt_event(event).target;
            if (!$(target).hasClass("active")) {
                var option = {
                    interval: $(target).attr("interval"),
                    target: 'chart-container',
                    type: $("#chart-type-alternate").find(".image").attr("type")
                }
                change_interval(option);
                $("#chart-interval-alternate").find("li").removeClass("active");
                $(target).addClass("active");
            }
        });
    });
    $("#chart-interval-alternate").find("li[interval='" + option.interval + "']").addClass("active");
}

//改变图表的类型
function alternate_chart_type(event) {
    if (ANALYTICS.loading_data == true) {
        MessageBox("Can't do it during loading", "top", "warning");
    }
    else {
        var target = adapt_event(event).target;
        if (!$(target).hasClass("image")) {
            var option = {
                target: "chart-container",
                type: $(target).attr("type"),
                count: ANALYTICS.chartSeries.getCount(),
                interval: $("#chart-interval-alternate li.active").attr("interval")
            }
            for (var i = 0; i < ANALYTICS.chartSeries.series.length; i++) {
                if (ANALYTICS.chartSeries.series[i] === undefined) {
                    continue
                }
                else {
                    option.id = i;
                    ANALYTICS.proper_type_for_chart(option)
                }
            }
            $(target).siblings().removeClass("image");
            $("#chart-type-alternate td").find("p").css("display", "block")
            $(target).addClass("image").find("p").css("display", "block");
        }
    }
}

//切换小时、天、周、月、季度、年
function change_interval(option) {
    if (ANALYTICS.loading_data == true) {
        MessageBox("Can't do it during loading", "top", "warning");
    }
    else {
        var series_object, have_data = [], not_have_data = [];
        var chart = $("#" + option.target).highcharts();
        for (var i = 0; i < ANALYTICS.chartSeries.id_count; i++) {
            if (ANALYTICS.chartSeries.series[i] === undefined) {
                continue
            }
            else {
                series_object = ANALYTICS.chartSeries.series[i];
                if (series_object[option.interval]) {
                    have_data.push(i);
                }
                else {
                    not_have_data.push(i);
                }
            }
        }
        chart.destroy();
        var option = {
            target: "chart-container",
            type: option.type,
            interval: option.interval,
            count: ANALYTICS.chartSeries.getCount()

        }, j;
        //有数据的直接拿来生成
        for (j = 0; j < have_data.length; j++) {
            option.kpi = ANALYTICS.chartSeries.series[j].kpi;
            option.id = ANALYTICS.chartSeries.series[j].id;
            option.begin_time = ANALYTICS.chartSeries.series[j].begin_time;
            option.data = ANALYTICS.chartSeries.series[j][option.interval] ;
            option.view = ANALYTICS.chartSeries.series[j].view;
            option.view_text = ANALYTICS.chartSeries.series[j].view_text;
            if (j == 0) {
                ANALYTICS.render_to(option);
                new Highcharts.StockChart(ANALYTICS.high_chart);
            }
            ANALYTICS.add_series(option);
            ANALYTICS.proper_type_for_chart(option);
        }
        //没有数据的再去请求
        for (j = 0; j < not_have_data.length; j++) {

            var series_id= not_have_data[j];
            option.kpi = ANALYTICS.chartSeries.series[series_id].kpi;
            option.kpi_id = ANALYTICS.chartSeries.series[series_id].kpi_id;
            option.method = ANALYTICS.chartSeries.series[series_id].method;
            option.view = ANALYTICS.chartSeries.series[series_id].view;
            option.view_text = ANALYTICS.chartSeries.series[series_id].view_text;
            option.id = series_id;
            option.begin_time = ANALYTICS.chartSeries.series[series_id].begin_time;
            option.end_time = ANALYTICS.chartSeries.series[series_id].end_time;
            if(!$("#"+option.target).highcharts()){
                ANALYTICS.render_to(option);
                new Highcharts.StockChart(ANALYTICS.high_chart);
            }
            option.chart_body_close_validate = false;
            ANALYTICS.form_chart(option);
        }
    }
}

//窗口大小改变后，改变相应的图表大小
var resize_chart = {
    body: function () {
        $("#chart-body").height(parseInt($(window).height()) - parseInt($("#analytics-condition").height()) - parseInt($("#analytics-condition").css("top")) - 3 >= 0 ?
            parseInt($(window).height()) - parseInt($("#analytics-condition").height()) - parseInt($("#analytics-condition").css("top")) - 3 : 0);
    },
    container: function () {
        $("#chart-main-middle").height(parseInt($("#chart-body").height()) - parseInt($("#chart-interval-alternate").attr("my_height")) - parseInt($("#chart-type-alternate").attr("my_height")) - 1);
        $("#chart-container").height(parseInt($("#chart-main-middle").height()));
        if ($("#chart-container").highcharts()) {
            var chart = $("#chart-container").highcharts();
            chart.setSize(
                $("#chart-main-middle").width(),
                $("#chart-main-middle").height(),
                false
            );
        }
        if ($("#chart-type-alternate td.active").attr("type") == "pie") {
            for (var k = 0; k < $("#chart-container").highcharts().series.length; k++) {
                $("#chart-container").highcharts().series[k].update({
                    showInLegend: false
                })
            }
        }
    }
};

//清空图表的生成条件
function clear_chart_condition() {
    $("#analytics-condition").find("input[type='text']").each(function () {
        $(this).val("");
    });
     //$("#chart-view").val('').trigger('chosen:updated');
    $(".index-date-extra-info").text("");
}
//点击事件初始化
ANALYTICS.detailPoint={}
ANALYTICS.detailPoint.init=function(){
   $("body")
       .on("click","#close-detail-block",function(){
           $("#detail-block").css("left","-999em").css("right","auto");
       })
       .on("keyup","#group_detail_select_chosen input",function(event){
           var e=adapt_event(event).event;
           if(e.keyCode==13){
               generateDetailDate();
           }
       })
       .on("click","#analyse-btn",function(){
           generateDetailDate();
       })
    //accordion
       .on("click","#assembleCondition .accordion-header",function(){
           var $this=$(this),
               $body=$(this).next(".accordion-body");
           $this.toggleClass("active");
           $this.find("i").toggleClass("icon-chevron-right").toggleClass("icon-chevron-down");
           if($this.hasClass("active")){
               $body.slideDown();
           }
           else{
               $body.slideUp();
           }
       })
    //  拖拽

    $( "#conditionLocal" ).droppable({
        activeClass: "active",
        hoverClass: "hover",
        accept: ":not(.ui-sortable-helper)",
        drop: function( event, ui ) {
            var $li=$("#conditionLocal ul").children(),
                validate=true,validate1,validate2,validate3;
            for(var i=0;i<$li.length;i++){
                validate1=$li.eq(i).find("span").text()==ui.draggable.text();
                validate2=(ui.draggable[0].tagName!=="LI" && $li.eq(i).attr("type")=="item" && $li.eq(i).attr("group")==ui.draggable.attr("group")) ;
                validate3=(ui.draggable[0].tagName==="LI" && $li.eq(i).attr("type")=="group" && $li.eq(i).attr("group")==ui.draggable.attr("group"));
                if(validate1 || validate2  || validate3  ){
                    validate=false;
                    break ;
                }
            }
            if(validate){
                $("#conditionLocal ul").append(
                    $("<li />").attr("group",ui.draggable.attr("group")).attr("myID",ui.draggable.attr("id"))
                        .append($("<i />").addClass("icon"))
                        .append($("<span />").text(ui.draggable.text()))
                        .append($("<i />").addClass("icon icon-remove"))
                )
                if(ui.draggable[0].tagName==="LI"){
                    $("#conditionLocal ul").children().last().attr("type","item").find("i").eq(0).addClass("icon-ok item");
                }
                else{
                    $("#conditionLocal ul").children().last().attr("type","group").find("i").eq(0).addClass("icon-inbox group");
                }
            }

        }
    });
    var width=$(document).width()-$("#assembleCondition").width()-$("#assembleDemonstrate .left").width()-parseInt($("#assembleDemonstrate .left").css("paddingLeft"));
    $("#assembleDemonstrate .right").width(width-120);
    $("body").on("resize",function(){
        var width=$(document).width()-$("#assembleCondition").width()-$("#assembleDemonstrate .left").width()-parseInt($("#assembleDemonstrate .left").css("paddingLeft"));
        $("#assembleDemonstrate .right").width(width-120);
    });
    $("body")
        .on("click","#conditionLocal .icon-remove",function(){
            $(this).parents("li").remove();
        })
        //带你家返回分析
        .on("click","#btn-back",function(){
            $("#detail-block").css("left", "-999em").css("right","auto");
            $("#conditionOrigin").find(".accordion-header").css("background","#fff").find("i").attr("class","icon icon-chevron-right");
            $("#conditionOrigin").find(".accordion-body").css("display","none");
            $("#conditionLocal ul").empty();
            $("#assembleDemonstrate").css("display","none");
        })
        //店家聚合分析
        .on("click","#assemble-analyse",function(){
            if($("#conditionLocal ul").children().length>0){
                generateDetailDate();
            }
            else{
                MessageBox("请至少选择一个属性进行聚合","top","warning")
            }
        })
    ;

}
function checkConditionHeight(){
    var rightHeight=$("#assembleDemonstrate").height();
    var leftHeight=$("#assembleCondition").height();
    if(leftHeight<rightHeight){
        $("#assembleCondition").height(rightHeight)
    }
}
//点击某个点以后触发
function chart_point_click(object) {
//    console.log(object);
    $("#detail-block").css("left", "0").css("right","0");
    $("#detail-date").text(object.name);
    $("#detail-kpi").text(object.kpi);
    $("#detail-view").text(object.view);
    condition.detail_condition = {
        kpi_id: ANALYTICS.base_option.kpi_id,
        entity_group_id: ANALYTICS.base_option.entity_group_id,
        average: ANALYTICS.base_option.average,
        frequency: ANALYTICS.base_option.frequency,
        property: ANALYTICS.base_option.kpi_property
    };
    var current_date = object.UTCDate;
    var end_time = get_next_date(current_date, ANALYTICS.base_option.frequency).add('milliseconds', -1);
    condition.detail_condition.base_time = {start_time: new Date(current_date).toISOString(), end_time: end_time.toISOString()};
//    generateDetailDate();
}
//在详细中生成pie以及table
function generateDetailDate() {
    var property_map_group = {},property={},$li;
    var $target=$("#conditionLocal ul").children();
    for(var i=0;i<$target.length;i++){
        $li=$target.eq(i);
        if($li.attr("type")=='item'){
            if(!property[$li.attr("group")]){
                property[$li.attr("group")]=[];
            }
            property[$li.attr("group")].push($.trim($li.find("span").text()));
            property_map_group[$li.attr("group")]=$li.attr("group");
        }
        else if($li.attr("type")=='group'){
            property_map_group[$li.attr("myID")] = $li.attr("myID");
        }
    }
    condition.detail_condition.property=property;
    condition.detail_condition.property_map_group=property_map_group;
    console.log(condition.detail_condition);
    $.ajax({
        url: '/kpi_entries/compare',
        type: 'POST',
        dataType: 'json',
        data: condition.detail_condition,
        success: function (data) {
            if (data.result) {
                console.log(data.object)
                $("#assembleDemonstrate").css("display","block");
                generatePie(data.object);
//                generateDetailTable(data.object);
            }
        }
    });
}
var condition = {};
condition.detail_condition = {};



function get_next_date(date, frequency) {
    var m = moment(date);
    switch (parseInt(frequency)) {
        case 90:
            return  m.add('hours', 1);
        case 100:
            return  m.add('days', 1);
        case 200:
            return  m.add('weeks', 1);
        case 300:
            return   m.add('months', 1);
        case 400:
            return  m.add('months', 4);
        case 500:
            return  m.add('years', 1);
    }
}
function close_chart_detail() {
    $("#chart-point-detail").css("left", "-400px");
    $("#chart-main-middle").css("left", "0px");
    $("#chart-type-alternate").css("left", "0px");
}

function tcr_trend(judge) {
    switch (judge) {
        case "low":
            $("#tcr").attr("class", "");
            $("#tcr").addClass("tcr-trend low");
            break;
        case "middle":
            $("#tcr").attr("class", "");
            $("#tcr").addClass("tcr-trend middle");
            break;
        case "high":
            $("#tcr").attr("class", "");
            $("#tcr").addClass("tcr-trend high");
            break;
    }
}

//group detail
//初始化detail中聚合条件选项
function groupDetailInit(data) {
    $("#conditionOrigin>p").nextAll().remove();
    var template,body="",bodyData;
    for(var groupID in data){
       for(var groupTitle in data[groupID]){
           template='<div class="accordion-header" id="'+groupID+'" group="'+groupID+'">'+
                        '<i class="icon icon-chevron-right"></i>'+
                        '<label>'+groupTitle+'</label>'+
                    '</div>';
           bodyData={"data":data[groupID][groupTitle]};;
           body=Mustache.render('<div class="accordion-body">'+
                                    '<ul>'+
                                        '{{#data}}<li group="'+groupID+'" id="{{id}}">{{value}}</li>{{/data}}'+
                                    '</ul>'+
                                '</div>',bodyData);
           template+=body;
       }
       $("#conditionOrigin").append(template);
    }
    $( "#conditionOrigin .accordion-header" ).draggable({
        helper: "clone"
    });
    $( "#conditionOrigin li" ).draggable({
        helper: "clone"
    });
}

function searchForFilter(type) {
    var target = groupDetail.dict.dict[1].dict,
        i,
        position;
//    console.log(type)
    for (i = 0; i < target.key.length; i++) {
        if (target.key[i] === type) {
            return target.array[i];
        }
    }
}
ANALYTICS.DETAIL={};
ANALYTICS.DETAIL.sum=0;
ANALYTICS.DETAIL.average;
ANALYTICS.DETAIL.count;
ANALYTICS.DETAIL.max=0;
ANALYTICS.DETAIL.min;
function generatePie(source) {
    if($("#pie_chart").highcharts()){
        $("#pie_chart").highcharts().destroy();
    }
    var pie_template=CHARTDETAIL.factory("pie_chart");
    pie_template.chart.type="pie";
    pie_template.chart.options3d={
        enabled: true,
        alpha: 45,
        beta: 0
    }
    var series=[],name="";
    ANALYTICS.DETAIL.count=source.length;
    for(var i=0;i<source.length;i++){
        if(i==0){
            ANALYTICS.DETAIL.min=source[i].value;
        }
        name="";
        for(var j=0;j<source[i].name.length;j++){
            name+=source[i].name[j]
            if(j<source[i].name.length-1){
                name+="-";
            }
        }
       series.push({
           last:source[i].last_value,
           name:name,
           y:source[i].value
       })
       ANALYTICS.DETAIL.sum+=parseInt(source[i].value);
       ANALYTICS.DETAIL.max=ANALYTICS.DETAIL.max>source[i].value?ANALYTICS.DETAIL.max:source[i].value;
       ANALYTICS.DETAIL.min=ANALYTICS.DETAIL.min<source[i].value?ANALYTICS.DETAIL.min:source[i].value;
    }
    ANALYTICS.DETAIL.average=(ANALYTICS.DETAIL.sum/ANALYTICS.DETAIL.count).toFixed(2);
    pie_template.series=[];
    pie_template.series[0]={}
    pie_template.series[0].data=series;
    new Highcharts.Chart(pie_template);
    $("#assume-sum").text(ANALYTICS.DETAIL.sum);
    $("#assume-average").text(ANALYTICS.DETAIL.average);
    $("#assume-count").text(ANALYTICS.DETAIL.count);
    $("#assume-max").text(ANALYTICS.DETAIL.max);
    $("#assume-min").text(ANALYTICS.DETAIL.min);
}
function generateDetailTable(source) {
    var length = source.length,
        i, target, value, last, icon, compare;
    $("#group-detail-table tbody").empty();
    for (i = 0; i < length; i++) {
        target = source[i];
        value = (parseInt(getObject(target, "value")) * RATIO).toFixed(1);
        last = (parseInt(getObject(target, "last")) * RATIO).toFixed(1);
        compare = (Math.abs(value - last) / last * 100).toFixed(1) + "%";
        icon = value > last ? "icon-arrow-up" : (value == last ? "" : "icon-arrow-down");
        $("#group-detail-table tbody")
            .append($("<tr />")
                .append($("<td />").text(getObject(target, "name")))
                .append($("<td />").text(value))
                .append($("<td />").text(last))
                .append($("<td />").text(compare))
                .append($("<td />").append($("<i />").addClass("icon " + icon)))
            )
    }
}


function getObject(object, name) {
    var i, value,
        key = object.key,
        string = object.string;
    for (i = 0; i < key.length; i++) {
        if (key[i] === name) {
            return string[i];
        }
    }
}







