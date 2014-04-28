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
//等待请求队列
ANALYTICS.currentThread=[];
ANALYTICS.currentThreadOrder;
ANALYTICS.currentThreadLoading=false;
ANALYTICS.currentThreadOrderCenter;
ANALYTICS.currentThreadPreCondition;
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
        ANALYTICS.currentThreadPreCondition=option;
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
        ANALYTICS.currentThread=[];
        for (j = 0; j < not_have_data.length; j++) {
            ANALYTICS.currentThread.push(not_have_data[j]);
        }
        if(ANALYTICS.currentThread.length>0){
            ANALYTICS.currentThreadOrder=0;
            ANALYTICS.currentThreadLoading=false;
            ANALYTICS.currentThreadOrderCenter=window.setInterval("singleThreadRequest()",500);
        }
    }
}
function singleThreadRequest(){
    if(ANALYTICS.currentThreadOrder>=ANALYTICS.currentThread.length){
        window.clearInterval(ANALYTICS.currentThreadOrderCenter);
    }
    else{
        if(!ANALYTICS.currentThreadLoading){
            ANALYTICS.currentThreadLoading=true;
            var series_id=ANALYTICS.currentThread[ANALYTICS.currentThreadOrder++];
            console.log(series_id);
            ANALYTICS.currentThreadPreCondition.kpi = ANALYTICS.chartSeries.series[series_id].kpi;
            ANALYTICS.currentThreadPreCondition.kpi_id = ANALYTICS.chartSeries.series[series_id].kpi_id;
            ANALYTICS.currentThreadPreCondition.method = ANALYTICS.chartSeries.series[series_id].method;
            ANALYTICS.currentThreadPreCondition.view = ANALYTICS.chartSeries.series[series_id].view;
            ANALYTICS.currentThreadPreCondition.view_text = ANALYTICS.chartSeries.series[series_id].view_text;
            ANALYTICS.currentThreadPreCondition.id = series_id;
            ANALYTICS.currentThreadPreCondition.begin_time = ANALYTICS.chartSeries.series[series_id].begin_time;
            ANALYTICS.currentThreadPreCondition.end_time = ANALYTICS.chartSeries.series[series_id].end_time;
            if(!$("#"+ANALYTICS.currentThreadPreCondition.target).highcharts()){
                ANALYTICS.render_to(ANALYTICS.currentThreadPreCondition);
                new Highcharts.StockChart(ANALYTICS.high_chart);
            }
            ANALYTICS.currentThreadPreCondition.chart_body_close_validate = false;
            ANALYTICS.form_chart(ANALYTICS.currentThreadPreCondition);
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
    //点击table 同比
       .on("click",".table-detail-compare",function(event){
           stop_propagation(event);
           var obj=adapt_event(event).target
           ANALYTICS.DETAIL.generate_table_detail(obj);

       })
       .on("click","#assemble-tbody tr",function(){
           var obj=$(this).find(".table-detail-compare")[0]
           ANALYTICS.DETAIL.generate_table_detail(obj);
       })
       .on("click","#detail-table-remove",function(){
           $("#detail-table-compare-block").css("left","-999em").css("right","auto");
           $("#detail-table-compare-block .inner").css("left","-1000px");
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
                    if(ui.draggable.next().find("ul").children().length>0){
                        $("#conditionLocal ul").children().last().attr("type","group").find("i").eq(0).addClass("icon-inbox group");
                    }

                }
            }

        }
    });

    var width=$(document).width()-$("#assembleCondition").width();
    $("#assembleDemonstrate .right").width(width-120);
    $("body").on("resize",function(){
        var width=$(document).width()-$("#assembleCondition").width();
        $("#assembleDemonstrate .right").width(width-120);
    });

    $("body")
        .on("click","#conditionLocal .icon-remove",function(){
            $(this).parents("li").remove();
        })
        //带你家返回分析
        .on("click","#btn-back",function(){
            $("#detail-block").css("left", "-999em").css("right","auto");
            $("#conditionOrigin").find(".accordion-header").removeClass("active").css("background","#fff").find("i").attr("class","icon icon-chevron-right");
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
        $("#assembleCondition").height(rightHeight);
        $("#detail-table-compare-block").height(rightHeight+$("#detail-block .navigation").height());
    }
}
//点击某个点以后触发
function chart_point_click(object) {
//    console.log(object);
    $("#detail-block").css("left", "0").css("right","0");
    $("#detail-date").text(object.name);
    $("#detail-kpi").text(object.kpi);
    $("#detail-view").text(object.view);
    //table同比中的
    $("#table-compare-kpi").text(object.kpi);
    $("#table-compare-view").text(object.view);
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
}
//在详细中生成pie以及table
function generateDetailDate() {
    var property_map_group = {},property={},$li;
    var $target=$("#conditionLocal ul").children();
    var propertyGroupSort=[],validate=true;
    for(var i=0;i<$target.length;i++){
        $li=$target.eq(i);
        if($li.attr("type")=='item'){
            if(!property[$li.attr("group")]){
                property[$li.attr("group")]=[];
            }
            property[$li.attr("group")].push($.trim($li.find("span").text()));
            property_map_group[$li.attr("group")]=$li.attr("group");
            propertyGroupSort.push(parseInt($li.attr("group")));
        }
        else if($li.attr("type")=='group'){
            property_map_group[$li.attr("myID")] = $li.attr("myID");
            propertyGroupSort.push(parseInt($li.attr("myID")));
        }
    }
    propertyGroupSort.sort(function compare(a,b){return a-b});
    propertyGroupSort=propertyGroupSort.strip();
    condition.detail_condition.property=property;
    condition.detail_condition.property_map_group=property_map_group;
    //console.log(condition.detail_condition);
    $.ajax({
        url: '/kpi_entries/compare',
        type: 'POST',
        dataType: 'json',
        data: condition.detail_condition,
        success: function (data) {
            if (data.result) {
                //console.log(data.object)
                $("#assembleDemonstrate").css("display","block");
                generatePie(data.object);
                generateDetailTable(data.object,propertyGroupSort);
                checkConditionHeight();
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
    ANALYTICS.DETAIL.propertyGroup=[];
    for(var groupID in data){
       for(var groupTitle in data[groupID]){
           ANALYTICS.DETAIL.propertyGroup.push(groupTitle);
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

ANALYTICS.DETAIL.average;
ANALYTICS.DETAIL.count;
ANALYTICS.DETAIL.min;
ANALYTICS.DETAIL.choose_property_id;
ANALYTICS.DETAIL.max=0;
ANALYTICS.DETAIL.sum=0;
ANALYTICS.DETAIL.maxOrder=0;
ANALYTICS.DETAIL.propertyGroup=[];
//table同比时
ANALYTICS.DETAIL.generate_table_detail=function(obj){
    var c;
    c=deepCopy(condition.detail_condition,c);
    var $targets=$(obj).parents("tr").children();
    c.property={};
    for(var i=0;i<ANALYTICS.DETAIL.choose_property_id.length;i++){
        c.property[ANALYTICS.DETAIL.choose_property_id[i]]=$targets.eq(i).text();
    }
    c.point_num=10;
    $.post("/kpi_entries/compares",c,function(data){
        if(data.result){
            $("#detail-table-compare-block").css("left","0px").css("right","0px");
            $("#detail-table-compare-block .inner").css("left","0px");
            var keys=[],sum= 0,average,min,max=0;
            switch (c.frequency){
                case "90":
                    for(var i=0;i<data.object.keys.length;i++){
                        keys[i]=new Date(data.object.keys[i]).toWayneString().hour;
                        if(i==0){
                            min=data.object.values[i];
                        }
                        sum+=data.object.values[i];
                        max=max>data.object.values[i]?max:data.object.values[i];
                        min=min<data.object.values[i]?min:data.object.values[i];
                    }
                    average=(sum/data.object.values.length).toFixed(2);
                    break;
                case "100":
                    for(var i=0;i<data.object.keys.length;i++){
                        keys[i]=new Date(data.object.keys[i]).toWayneString().day;
                        if(i==0){
                            min=data.object.values[i];
                        }
                        sum+=data.object.values[i];
                        max=max>data.object.values[i]?max:data.object.values[i];
                        min=min<data.object.values[i]?min:data.object.values[i];
                    }
                    average=(sum/data.object.values.length).toFixed(2);
                    break;
                case "200":
                    for(var i=0;i<data.object.keys.length;i++){
                        keys[i]=new Date(data.object.keys[i]).toWayneString().year+" "+new Date(data.object.keys[i]).toWeekNumber()+"周";
                        if(i==0){
                            min=data.object.values[i];
                        }
                        sum+=data.object.values[i];
                        max=max>data.object.values[i]?max:data.object.values[i];
                        min=min<data.object.values[i]?min:data.object.values[i];
                    }
                    average=(sum/data.object.values.length).toFixed(2);
                    break;
                case "300":
                    for(var i=0;i<data.object.keys.length;i++){
                       keys[i]=new Date(data.object.keys[i]).toWayneString().month;
                        if(i==0){
                            min=data.object.values[i];
                        }
                        sum+=data.object.values[i];
                        max=max>data.object.values[i]?max:data.object.values[i];
                        min=min<data.object.values[i]?min:data.object.values[i];
                    }
                    average=(sum/data.object.values.length).toFixed(2);
                    break;
                case "400":
                    for(var i=0;i<data.object.keys.length;i++){
                        keys[i]=new Date(data.object.keys[i]).toWayneString().year+" "+new Date(data.object.keys[i]).monthToQuarter()+"季度";
                        if(i==0){
                            min=data.object.values[i];
                        }
                        sum+=data.object.values[i];
                        max=max>data.object.values[i]?max:data.object.values[i];
                        min=min<data.object.values[i]?min:data.object.values[i];
                    }
                    break;
                case "500":
                    for(var i=0;i<data.object.keys.length;i++){
                        keys[i]=new Date(data.object.keys[i]).toWayneString().year;
                        if(i==0){
                            min=data.object.values[i];
                        }
                        sum+=data.object.values[i];
                        max=max>data.object.values[i]?max:data.object.values[i];
                        min=min<data.object.values[i]?min:data.object.values[i];
                    }
                    average=(sum/data.object.values.length).toFixed(2);
                    break;
            }
            var line_template=CHARTDETAIL.factory("table-detail-line");
            line_template.series=[
                {type:"column",data:data.object.values},
                {type:"line",data:data.object.values}
            ];
            line_template.xAxis={};
            line_template.xAxis.labels={};
            line_template.xAxis.labels.style={};
            line_template.xAxis.labels.style.fontSize="10px";
            line_template.xAxis.categories=keys;
            new Highcharts.Chart(line_template);
            var name="";
            for (var i in c.property){
                name+=c.property[i]+"/";
            }
            $("#table-compare-condition").text(name);
            $("#table-compare-sum").text(sum);
            $("#table-compare-average").text(average);
            $("#table-compare-max").text(max);
            $("#table-compare-min").text(min);
        }
        else{
            MessageBox("发生了一些错误","top","warning")
        }
    });
}
ANALYTICS.DETAIL.compare=function(current,last){
   var number=Math.abs(current-last);
   if(last==0){
       return number.toFixed(1)+"%";
   }
    else{
       return (number/last*100).toFixed(1)+"%";
   }
}
ANALYTICS.DETAIL.compareArrow=function(current,last){
    var icon=current>last?"icon icon-arrow-up":(current==last?"":"icon icon-arrow-down");
    return icon;
}


ANALYTICS.DETAIL.pieClick=function(data){
    $("#assemble-current").text(data.y);
    $("#assemble-last").text(data.last);
    var compare=ANALYTICS.DETAIL.compare(data.y,data.last);
    $("#assemble-compare").text(compare);
    var icon=ANALYTICS.DETAIL.compareArrow(data.y,data.last);
    $("#assemble-arrow").attr("class",icon);
    $("#assemble-name").css("color",data.borderColor).text(data.name);
    $("#assemble-percent").css("color",data.borderColor).text((data.percentage).toFixed(1)+"%");
}
function generatePie(source) {
    ANALYTICS.DETAIL.max=0;
    ANALYTICS.DETAIL.sum=0;
    ANALYTICS.DETAIL.maxOrder=0;
    if($("#pie_chart").highcharts()){
        $("#pie_chart").highcharts().destroy();
    }
    var pie_template=CHARTDETAIL.factory("pie_chart");
    pie_template.chart.type="pie";
    pie_template.legend={
        enabled:true,
        y: 0,
        floating: true,
        maxHeight:55
    };
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
           y:source[i].value ,
           order:i
       })
       ANALYTICS.DETAIL.sum+=parseInt(source[i].value);
       ANALYTICS.DETAIL.max=ANALYTICS.DETAIL.max>source[i].value?ANALYTICS.DETAIL.max:source[i].value;
       ANALYTICS.DETAIL.maxOrder=ANALYTICS.DETAIL.max>source[i].value?ANALYTICS.DETAIL.maxOrder:i;
       ANALYTICS.DETAIL.min=ANALYTICS.DETAIL.min<source[i].value?ANALYTICS.DETAIL.min:source[i].value;
    }
    ANALYTICS.DETAIL.average=(ANALYTICS.DETAIL.sum/ANALYTICS.DETAIL.count).toFixed(2);
    series[ANALYTICS.DETAIL.maxOrder].sliced=true;
    series[ANALYTICS.DETAIL.maxOrder].selected=true;
    series[ANALYTICS.DETAIL.maxOrder].percentage=series[ANALYTICS.DETAIL.maxOrder].y/ANALYTICS.DETAIL.sum*100;
    var length=ANALYTICS.series_colors.length;
    series[ANALYTICS.DETAIL.maxOrder].borderColor=ANALYTICS.DETAIL.maxOrder<length?ANALYTICS.series_colors[ANALYTICS.DETAIL.maxOrder]:ANALYTICS.series_colors[ANALYTICS.DETAIL.maxOrder % ANALYTICS.series_colors.length - 1];
    ANALYTICS.DETAIL.pieClick( series[ANALYTICS.DETAIL.maxOrder] );
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
function generateDetailTable(source,property_group) {
    $("#assemble-tbody").empty();
    $("#assemble-thead tr").empty();
    ANALYTICS.DETAIL.choose_property_id=property_group;
    for(var i=property_group.length-1;i>=0;i--){
       $("#assemble-thead tr").prepend($("<td />").text(ANALYTICS.DETAIL.propertyGroup[property_group[i]-1]))
    }
    var headerDefault="<td>"+I18n.t('analytics.detail.current-val')+"</td>"+
        "<td>"+I18n.t('analytics.detail.rate')+"</td>"+
        "<td>"+I18n.t('analytics.detail.last-period')+"</td>"+
        "<td>"+I18n.t('analytics.detail.yearly')+"</td>"+
        "<td></td>"+
        "<td style='width:80px;'></td>"
    $("#assemble-thead tr").append(headerDefault);
    var sum=0;
    for(var i=0;i<source.length;i++){
        sum+=source[i].value;
    }
    var templateData={};
    templateData.data=source;
    templateData.percent= function(){
        return (parseInt(this.value)/sum*100).toFixed(1)+"%";
    }
    templateData.compare=function(){
        var current=parseInt(this.value),
            last=parseInt(this.last_value);
        var compare=Math.abs(current-last);
        if(last==0){
            return current;
        }
        else{
            return (compare/last*100).toFixed(1)+"%";
        }
    }
    templateData.icon=function(){
        var current=parseInt(this.value),
            last=parseInt(this.last_value);
        return current>last?"icon-arrow-up":(current==last?"":"icon-arrow-down");
    }
    var render =Mustache.render('{{#data}}<tr>'+
        '{{#name}}<td>{{.}}</td>{{/name}}'+
        '<td>{{value}}</td>'+
        '<td>{{percent}}</td>'+
        '<td>{{last_value}}</td>'+
        '<td>{{compare}}</td>'+
        '<td><i class="icon {{icon}}"></i></td>'+
        '<td><a class="btn btn-primary table-detail-compare">'+I18n.t('analytics.detail.year-analyse')+'</a></td>'+
        '</tr>{{/data}}',templateData);
    $("#assemble-tbody").append(render);

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







