/////////////////////////////////////////////////////////////////////////  共用的function  //////////////////////////////////
function init() {
     //    $('#MessageBox > button').click(function() {
     //        $(this).parent().hide();
     //    });
     //    $('.message-box').draggable();
     //    $('body').bind("click", function(event) {
     //        var e = event ? event : (window.event ? window.event : null);
     //        var obj = e.srcElement || e.target;
     //        if($(obj) != $("#setting-right") || $(obj) ==$("html")) {
     //            $("#setting-right").hide();
     //        }
     //    });
     $("#tool-setting,#tool-help,#tool-user,#tool-print").hover(function() {
          $(this).tooltip('show');
     }, function() {
          $(this).tooltip('hide');
     });
}

//过段时间消失
 
function while_hide(a){
    setTimeout(function(){
        $("#"+a).addClass("hide");
    },"2000");
}
function init_rightContent(){
    var fwidth=parseInt(document.body.scrollWidth);
    if(fwidth>990){
        document.getElementById("right-content").style.width=document.body.scrollWidth-171+"px";
    }
    else{
        document.getElementById("right-content").style.width=990-171+"px";
    }
}
function show_addBlock(event){
    var e = event ? event : (window.event ? window.event : null);
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
    var obj = e.srcElement || e.target;
    var height=parseInt($("#addBlock").height())+20+"px";
    if($("#addBlock").data("state")=="off"){
        $("#addBlock").slideDown("2000").data("state","on");
        $("#right-content").css("padding-top",height);
        if($(obj).data("manage")=="kpi"){
            clear_add_kpi();
            $("#add-block-mark").text("添加KPI");
        }
//        else if($(obj).data("manage")=="user"){
//            clear_add_user();
//            $("#add-block-mark").text("添加用户");
//        }
    }
    else{
//        $("#addBlock").slideUp("2000").data("state","off");
//        $("#right-content").css("padding-top","0px");
    } 
}

function formatDate(date) {
     var myYear = date.getFullYear();
     var myMonth = parseInt(date.getMonth()+1);
     var myWeekday = date.getDate();
     return (myYear + "-" + myMonth + "-" + myWeekday);
}

/////////////////////////////////////////////////////////////////////////  Analytics   //////////////////////////////////
function init_analytics() {
     init();
     init_rightContent();
     if(document.attachEvent) {
          window.attachEvent('onresize', init_rightContent);
     } else {
          window.addEventListener('resize', init_rightContent, false);
     }
     $("#tool-print,#tool-excel,#tool-pdf,.control-chart-btn").hover(function() {
          $(this).tooltip('show');
     }, function() {
          $(this).tooltip('hide');
     });
     $("#from").datepicker({
          showOtherMonths : true,
          firstDay:1,
          selectOtherMonths : true,
          dateFormat : 'yy-m-d',
          showWeek:true,
          onSelect : function(dateText, inst) {
            var date = $(this).datepicker('getDate');
                if( date.getDay()==0){
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-6);
                }
                else{
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
                }
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $("#from").attr("week",($.datepicker.iso8601Week(startDate)));
          }
     });
     $("#to").datepicker({
          showOtherMonths : true,
          selectOtherMonths : true,
          firstDay:1,
          dateFormat : 'yy-m-d',
          onSelect : function(dateText, inst) {
            var date = $(this).datepicker('getDate');
            if( date.getDay()==0){
                startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-6);
            }
            else{
                startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
            }
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $("#to").attr("week",($.datepicker.iso8601Week(startDate)));
          }
     });
     $(".control-chart-btn").bind("click", function(event) {
          $(".control-chart-btn").removeClass("active");
          $(this).addClass("active");
          var type = $(this).data("type");
          init_chart();
     });
     var date = new Date();
     var nowDate = date.getDate();
     var day = date.getDay();
     var m = date.getMonth();
     var y = date.getFullYear();
     var WeekFirstDay,WeekLastDay;
     if(day==0){
         WeekFirstDay = new Date(y, m, nowDate - 6);
         WeekLastDay = new Date(y, m, nowDate);
     }
     else{
         WeekFirstDay = new Date(y, m, nowDate - day + 1);
         WeekLastDay = new Date(y, m, nowDate - day + 7);
     }
     $("#from").val(formatDate(WeekFirstDay)).attr("week",$.datepicker.iso8601Week(WeekFirstDay));
     $("#to").val(formatDate(WeekLastDay)).attr("week",$.datepicker.iso8601Week(WeekFirstDay));
     init_chart();
//         var dateBegin,dateEnd;
//         var date1=($("#from").val()).split("-");
//         var date2=($("#to").val()).split("-");
//         for(i=0;i<3;i++){
//             if(parseInt(date1[i])<parseInt(date2[i])){
//                 dateBegin=date1;
//                 dateEnd=date2;
//                 break;
//             }
//             else if(parseInt(date1[i])>parseInt(date2[i])){
//                 dateBegin=date2;
//                 dateEnd=date1;
//                 break;
//             }
//             else{
//                 dateBegin=date1;
//                 dateEnd=date2;
//             }
//         }
//         var chart={
//             y:dateBegin[0],
//             m:parseInt(dateBegin[1])-1==0 ? 12: dateBegin[1]-1,
//             d:dateBegin[2]
//         }
//         $("#container").highcharts(
//             {
//                 chart: {
//                     type: 'line',
//                     events: {
//                         addSeries: function() {
//                             alert ('A series was added, about to redraw chart');
//                         }
//                     }
//                 },
//                 credits:{
//                     enabled:false
//                 },
//                 title: {
//                     text:""
//                 },
//                 tooltip: {
////                     formatter: function() {
////                         return '<b>'+ this.series.name +'</b><br/>'+
////                             "数值"+this.y +'<br />'+this.x;
////                     },
//                     xDateFormat: '%Y-%m-%d'
//                 },
//                 xAxis: {
//                     type: 'datetime',
//                     dateTimeLabelFormats: {
//                         day:'%e/%b'
//                     },
//                     labels:{
//                         style:{
//                             fontWeight:800
//                         }
//                     },
//                     tickInterval: 24 * 3600 * 1000*365 // one day
//                 },
//                 yAxis: [{
//                     title: {
//                         enabled:false
//                     },
//                     tickWidth:1,
//                     offset:10,
//                     labels:{
//                         format:'{value}$'
//                     },
//                     lineWidth:1
//                 },{
//                     opposite:true,
//                     title:{
//                         enabled:false
//                     },
//                     tickWidth:1,
//                     offset:10,
//                     label:{
//                         format:'{value}days'
//                     },
//                     lineWidth:1
//                 }],
//                 series: [
//                     {
//                         type:"area",
//                         name: 'actual',
//                         data: [100,100,100,150,150,150,200],
//                         pointStart: Date.UTC(chart.y,chart.m,chart.d),
//                         pointInterval: 24 * 3600 * 1000*365//one day
//                     },
//                     {
//                         type:"line",
//                         name: 'target',
//                         data: [80,110,120,140,150,150,300],
//                         pointStart: Date.UTC(chart.y,chart.m,chart.d),
//                         yAxis:1,
//                         pointInterval: 24 * 3600 * 1000*365 // one day
//                     }
//                 ]
//             }
//         );
//
//}
}
function init_chart() {
    var entity = $("#chart-entity :selected").attr("id");
    var kpi = $("#none-kpi :selected").attr("id");
    var date1 = ($("#from").val()).split("-");
    var date2 = ($("#to").val()).split("-");
    var week1=parseInt($("#from").attr("week"));
    var week2=parseInt($("#to").attr("week"));
    var dateBegin,dateEnd;
    for( i = 0; i < 3; i++) {
        if(parseInt(date1[i]) < parseInt(date2[i])) {
            dateBegin = date1;
            dateEnd = date2;
            break;
        } else if(parseInt(date1[i]) > parseInt(date2[i])) {
            dateBegin = date2;
            dateEnd = date1;
            break;
        } else {
            dateBegin = date1;
            dateEnd = date2;
        }
    };
    var startWeek=week1-week2<=0?week1:week2;
    var endWeek=week1-week2>=0?week1:week2;
    var startQuarter=quarterBelong(dateBegin[1]);
    var endQuarter=quarterBelong(dateEnd[1]);
    var interval = $(".control-chart-btn.active").data("type");
    var startTime,endTime;
    switch(interval){
        case "day":
            startTime = dateBegin.join("-");
            endTime = dateEnd.join("-");
            break;
        case "week":
            startTime = dateBegin[0]+"-"+startWeek;
            endTime = dateEnd[0]+"-"+endWeek;
            break;
        case "month":
            startTime =dateBegin[0]+"-"+dateBegin[1];
            endTime =dateEnd[0]+"-"+dateEnd[1];
            break;
        case "quarter":
            startTime =dateBegin[0]+"-"+startQuarter;
            endTime =dateEnd[0]+"-"+endQuarter;
            break;
        case "year":
            startTime =dateBegin[0];
            endTime =dateEnd[0];
            break;
    } ;
//    var chartScale = {
//        y : dateBegin[0],
//        m : parseInt(dateBegin[1]) - 1 == 0 ? 12 : dateBegin[1] - 1,
//        d : dateBegin[2]
//    }
    $.post('../tasks/calendar', {
        entity : entity,
        kpi : kpi,
        startTime : startTime,
        endTime : endTime,
        interval : interval
    }, function(data) {
        form_chart(data.series,data.unit,interval);
        });
}
function form_chart(series,unit,interval){
    var options = {
        chart : {
            renderTo : 'container',
            type : 'line'
        },
        credits : {
            enabled : false
        },
        title : {
            text : ""
        },
        tooltip : {
 ////       formatter: function() {
////           return '<b>'+ this.series.name +'</b><br/>'+
////                  "数值"+this.y +'<br />'+this.x;
////        },
//          xDateFormat: '%Y-%m-%d'
        },
        xAxis : {
            //                categories:[],
//            type : 'datetime',
//            dateTimeLabelFormats : {
//                day : '%e/%b'
//            },
//            tickInterval : 24 * 3600 * 1000 * ticket, // one day
            labels : {
                style : {
                    fontWeight : 800
                }
            }
        },
        yAxis : {
            title : {
                enabled : false
            },
            tickWidth : 1,
            offset : 10,
            //              labels:{
            //                    format:'{value}'
            //              },
            lineWidth : 1
        },
        series : []
    };
    options.yAxis.label = {
        format : '{value}' +unit
    };
    switch (interval){
        case "day":
            options.tooltip.xDateFormat='%Y-%m-%d';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                day : '%e/%b'
            };
            options.xAxis.tickInterval=24 * 3600 * 1000;
            break;
        case "week":
            options.tooltip.formatter=function(){
                return '<b>'+ this.series.name +'</b><br/>'+
                "数值"+this.y +'<br />'+this.x;
            };
            options.xAxis.categories
            break;
        case "month":
            options.tooltip.xDateFormat='%Y-%m';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                month : '%b/%Y'
            };
            options.xAxis.tickInterval=24 * 3600 * 1000 * 30;
            break;
        case "quarter":
            break;
        case "year":
            options.tooltip.xDateFormat='%Y';
            options.xAxis.type='datetime';
            options.xAxis.dateTimeLabelFormats={
                year : '%Y'
            };
            options.xAxis.tickInterval=24 * 3600 * 1000 * 365;
            break;
    };
    var lines = data.split('\n');
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        if(lineNo == 0) {
            var series = {
                type : "line",
                name : 'target',
                data : [],
                pointStart : Date.UTC(chartScale.y, chartScale.m, chartScale.d),
                pointInterval : 24 * 3600 * 1000 * ticket
            };
            $.each(items, function(itemNo, item) {
                //                      if (itemNo == 0) {
                //                          series.name = item;
                //                      } else {
                series.data.push(parseFloat(item));
                //                      }
            });
            options.series.push(series);
        } else if(lineNo == 1) {
            var series = {
                type : "area",
                name : 'actual',
                data : [],
                pointStart : Date.UTC(chartScale.y, chartScale.m, chartScale.d),
                pointInterval : 24 * 3600 * 1000 * ticket
            };
            $.each(items, function(itemNo, item) {
                //                      if (itemNo == 0) {
                //                          series.name = item;
                //                      } else {
                series.data.push(parseFloat(item));
                //                      }
            });
            options.series.push(series);
           }

    });
    // Create the chart
    var chart = new Highcharts.Chart(options);
}

function quarterBelong(a) {
    if(a < 3)
        return 1;
    else if(a > 2 && a< 6)
        return 2;
    else if(a > 5 && a < 9)
        return 3;
    else if(a > 8)
        return 4;
}
////////////////////////////////////////////////     dashBoard  ///////////////////////////////////////
function init_dashBoard() {
     init();
}

////////////////////////////////////////////////     manage  ///////////////////////////////////////
function init_manage() {
     init();
     init_rightContent();
     if(document.attachEvent) {
          window.attachEvent('onresize', init_rightContent);
     } else {
          window.addEventListener('resize', init_rightContent, false);
     }
}

///////////////  KPI  ///////////////////////////////////////
function cancel_add_kpi() {
     $("#addBlock").slideUp("2000").data("state", "off").find("input").val("");
     $("#right-content").css("padding-top", "0px");
     clear_add_kpi();
}

function clear_add_kpi() {
     $("#add-entity").find("option[data-order='1']").attr("selected", "true");
     $("#new-kpi-name").val("");
     $("#new-kpi-desc").val("");
     $("#add-interval").find("option[data-order='1']").attr("selected", "true");
     $("#add-trend").find("option[data-order='1']").attr("selected", "true");
     $("#add-unit").find("option[data-order='1']").attr("selected", "true");
     $("#new-kpi-target").val("");
     $("#is-calcu-check").attr("checked", false);
     $("#is-calcu-type").css("display", "none");
     calcuRelate_clear();

}

function add_kpi() {
     var entity = $("#add-entity").find(":selected").val();
     var name = $("#new-kpi-name").val();
     var desc = $("#new-kpi-desc").val();
     var interval = $("#add-interval").find(":selected").val();
     var intervalP = $("#add-interval").find(":selected").attr("value");
     var trend = $("#add-trend").find(":selected").val();
     var trendP = $("#add-trend").find(":selected").attr("value");
     var target = $("#new-kpi-target").val();
     var unit = $("#add-unit").find(":selected").val();
     var unitP = $("#add-unit").find(":selected").attr("value");
     var id = $("#kpi-table").find("tr").length;
     if($("#is-calcu-check").attr("checked") == "checked") {
           if(name.length != 0 && target.length != 0 && $("#calcuType-input").val() && /\]$/.test($("#calcuType-input").val()) == true){
               var formula=$("#takeCal").attr("cal");
               $.post('', {
                   entity : entity,
                   name:name,
                   desc:desc,
                   interval:intervalP,
                   trend:trendP,
                   target:target,
                   unit:unitP,
                   formula:formula
               }, function(data) {
                   if($("#manage-group-kpi li.active a").text() == entity) {
                       $("#kpi-table").append($("<tr />").attr("id", id).append($("<td align='center' />").text(id).addClass("kpi-order-id"))
                           .append($("<td align='center' />").text(entity))
                           .append($("<td align='center' />").text(name))
                           .append($("<td align='center' />").text(desc))
                           .append($("<td align='center' />").text(interval))
                           .append($("<td align='center' />").text(target))
                           .append($("<td align='center' />").text(unit))
                           .append($("<td align='center' />").text(trend))
                           .append($("<td align='center' />").attr("data-placement","bottom").attr("data-animation",false).text("是").attr("title",formula))
                           .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").data("belong", id).click(edit_kpiItem))
                               .append($("<a />").addClass("btn btn-success manage-operate-reverse hide").data("belong", id).click(finish_editKPI).text("完成")))
                           .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong", id).click(remove_kpiItem))
                               .append($("<a />").addClass("btn manage-operate-reverse hide").attr("id", "cancel-edit-kpi").data("belong", id).click(cancel_editKPI).text("取消")))
                       );
                   }
                   cancel_add_kpi();
               });
           }
           else{
               $("#add-warn").removeClass("hide").text("请填写所有带*的选项");
               while_hide("add-warn");
           }
     }
    else{
         if(name.length != 0 && target.length != 0){
             $.post('', {
                 entity : entity,
                 name:name,
                 desc:desc,
                 interval:intervalP,
                 trend:trendP,
                 target:target,
                 unit:unitP
             }, function(data) {
                 if($("#manage-group-kpi li.active a").text() == entity) {
                         $("#kpi-table").append($("<tr />").attr("id", id).append($("<td align='center' />").text(id).addClass("kpi-order-id"))
                             .append($("<td align='center' />").text(entity))
                             .append($("<td align='center' />").text(name))
                             .append($("<td align='center' />").text(desc))
                             .append($("<td align='center' />").text(interval))
                             .append($("<td align='center' />").text(target))
                             .append($("<td align='center' />").text(unit))
                             .append($("<td align='center' />").text(trend))
                             .append($("<td align='center' />").text("否"))
                             .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").data("belong", id).click(edit_kpiItem))
                                 .append($("<a />").addClass("btn btn-success manage-operate-reverse hide").data("belong", id).click(finish_editKPI).text("完成")))
                             .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong", id).click(remove_kpiItem))
                                 .append($("<a />").addClass("btn manage-operate-reverse hide").attr("id", "cancel-edit-kpi").data("belong", id).click(cancel_editKPI).text("取消"))));
                 }
                 cancel_add_kpi();
             });
         }
         else{
             $("#add-warn").removeClass("hide").text("请填写所有带*的选项");
             while_hide("add-warn");
         }
     }

}
function edit_kpiItem(event) {
     var id = find_id(event);
     $("#" + id).find('.manage-operate').each(function() {
          $(this).addClass("hide").next().removeClass("hide");
     });
     var entity = $("#" + id).find(".kpi-entity").text();
     var target = $("#" + id).find(".kpi-target").text();
     $("#cancel-edit-kpi").attr("entity", entity).attr("target", target);
     $("#" + id).find(".kpi-entity").text("").append($("<select />").addClass("edit-kpiEntity-input").append($("<option />").text("1")).append($("<option />").text("2")).append($("<option />").text("3")));
     $("#" + id).find(".kpi-target").text("").append($("<input type='text' onkeyup='clearNoNum(this)'/>").val(target).addClass("edit-kpiTarget-input"));
}

function remove_kpiItem(event) {
     if(confirm("确认删除？")) {
          var id = find_id(event);
          $("#kpi-table").find("#" + id).nextAll("tr").each(function() {
               var order = parseInt($(this).find(".kpi-order-id").text()) - 1;
               $(this).find(".kpi-order-id").text(order);
          });
          $("#kpi-table").find("#" + id).remove();
     }
}

function finish_editKPI(event) {
     var id = find_id(event);
     var entity = $("#" + id).find(".kpi-entity").find(":selected").text();
     var target = $("#" + id).find(".kpi-target").find("input").val();
     same_editKPI(id);
     $("#" + id).find(".kpi-entity").text(entity);
     $("#" + id).find(".kpi-target").text(target);
}

function cancel_editKPI(event) {
     var id = find_id(event);
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var entity = $(obj).attr("entity");
     var target = $(obj).attr("target");
     same_editKPI(id);
     $("#" + id).find(".kpi-entity").text(entity);
     $("#" + id).find(".kpi-target").text(target);
}

function same_editKPI(a) {
     $("#" + a).find(".manage-operate-reverse").each(function() {
          $(this).addClass("hide").prev().removeClass("hide");
     });
     $("#" + a).find(".kpi-entity").find("select").remove();
     $("#" + a).find(".kpi-target").find("input").remove();
}

function find_id(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var id = $(obj).data("belong");
     return id;
}

function create_entityBlock() {
     $("#creatEntity-block").removeClass("hide");
     $("#creat-newEntity").val("").focus();
}

function close_createEntity() {
     $("#creatEntity-block").addClass("hide");
     $("#creat-newEntity").val("");
}

function insert_entity() {
     var test = test_sameEntity();
     if($("#creat-newEntity").val() && test == -1) {
          var length = $("#manage-group-kpi").find("li").length - 1;
          var val = $("#creat-newEntity").val();
          $("#manage-group-kpi li:eq(" + length + ")").before($("<li />").append($("<a href=''/>").text(val)));
          $("#creat-newEntity").val("");
     }
}

function test_sameEntity() {
     var a = $("#creat-newEntity").val();
     var b = [];
     $("#manage-group-kpi").find("a").each(function() {
          b.push($(this).text());
     });
     if(!Array.indexOf) {
          Array.prototype.indexOf = function(obj) {
               for(var i = 0; i < this.length; i++) {
                    if(this[i] == obj) {
                         return i;
                    }
               }
               return -1;
          }
     }
     return b.indexOf(a);
}

function create_entity(event) {
     var e = event ? event : (window.event ? window.event : null);
     if(e.keyCode == 13) {
          insert_entity();
     } else if(e.keyCode == 27) {
          close_createEntity();
     }
}

function is_calcu() {
     if($("#is-calcu-check").attr("checked") == "checked") {
          $("#is-calcu-type").slideDown("2000");
     } else {
          $("#is-calcu-type").slideUp("2000");
     }
}

function select_calcuRelate() {
     var val = "[" + $("#is-calcu-relate :selected").val() + "]";
     var valId= "[" + $("#is-calcu-relate :selected").attr("id") + "]";
     var oldVal = $("#calcuType-input").val();
     var oldValId=$("#takeCal").attr("cal");
     if(/\]$/.test(oldVal) == false) {
          var newVal = oldVal + val;
          var newValId= oldValId+valId;
          $("#calcuType-input").val(newVal);
          $("#takeCal").attr("cal",newValId);
     }
}

function select_calcuMethod(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var val = $(obj).text();
     var oldVal = $("#calcuType-input").val();
     var oldValId=$("#takeCal").attr("cal");
     if(/\]$/.test(oldVal) == true) {
          var newVal = oldVal + val;
          var newValId= oldValId+val;
          $("#calcuType-input").val(newVal);
          $("#takeCal").attr("cal",newValId);
     }
}

function calcuRelate_clear() {
     $("#calcuType-input").val("");
     $("#takeCal").attr("cal","");
     $("#is-calcu-relate").find("option[data-order='1']").attr("selected", "true");
}

///////////////  user  ///////////////////////////////////////
function create_Userentity(event) {
     var e = event ? event : (window.event ? window.event : null);
     if(e.keyCode == 13) {
          if($('#creat-newEntity').val().length > 0) {
               $.post('../entities', {
                    entity : {
                         name : $('#creat-newEntity').val()
                    }
               }, function(data) {
                    if(data.result) {
                         insert_entityUser();
                    } else {
                         alert(data.content);
                    }
               });
          }
     } else if(e.keyCode == 27) {
          close_createEntity();
     }
}

function insert_entityUser() {
     var test = test_sameEntityUser();
     if($("#creat-newEntity").val() && test == -1) {
          var length = $("#manage-group-user").find("li").length - 1;
          var val = $("#creat-newEntity").val();
          $("#manage-group-user li:eq(" + length + ")").before($("<li />").append($("<a href=''/>").text(val)));
          $("#creat-newEntity").val("");
     }
     close_createEntity();
}

function test_sameEntityUser() {
 
     var a = $("#creat-newEntity").val();
     var b = [];
     $("#manage-group-user").find("a").each(function() {
          b.push($(this).text());
     });
     if(!Array.indexOf) {
          Array.prototype.indexOf = function(obj) {
               for(var i = 0; i < this.length; i++) {
                    if(this[i] == obj) {
                         return i;
                    }
               }
               return -1;
          }
     }
     return b.indexOf(a);
}

function close_createEntity() {
     $("#creatEntity-block").addClass("hide");
     $("#creat-newEntity").val("");
  
    var a = $("#creat-newEntity").val();
    var b = [];
    $("#manage-group-user").find("a").each(function() {
        b.push($(this).text());
    });
    if(!Array.indexOf){
        Array.prototype.indexOf = function(obj){
            for(var i=0; i<this.length; i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
    }
    return b.indexOf(a);
}
function remove_userItem(event){
    if(confirm("确认删除？")){
        var id=find_id(event);
        $("#user-table").find("#"+id).nextAll("tr").each(function(){
            var order=parseInt($(this).find(".kpi-order-id").text())-1;
            $(this).find(".kpi-order-id").text(order);
        });
        $("#user-table").find("#"+id).remove();
    }
}

function cancel_add_user(){
    $("#addBlock").slideUp("2000").data("state","off").find("input").val("");
    $("#right-content").css("padding-top","0px");
    clear_add_user();
}
function clear_add_user(){
    $("#new-user-name").val("");
    $("#new-user-mail").val("");
    $("#new-user-entity").find("option[data-order='1']").attr("selected","true");
    $("#new-user-role").find("option[data-order='1']").attr("selected","true");
}
///////////////  add user  ///////////////////////////////////////
function init_addUser(){
    var mark=$("#add-user-mark").data("type");
    if(mark=="add"){
        $("#add-user-mark").text("添加我的用户");
    }else{
        $("#add-user-mark").text("修改我的用户");
    }
}
function to_userPage(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var type=$("obj").attr("type");
    if(type=="add"){
        $("#add-user-mark").text("添加我的用户");
    }
    else if(type=="edit"){
        $("#add-user-mark").text("修改我的用户");
    }
}
///////////////  delivery kpi  ///////////////////////////////////////
function choose_kpi(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var id=$(obj).parent().attr("id");
    var entity=$("#"+id).find(".deliveryKpi-entity").text();
    var name=$("#"+id).find(".deliveryKpi-name").text();
    var desc=$("#"+id).find(".deliveryKpi-desc").text();
    var target=$("#"+id).find(".deliveryKpi-target").text();
    var unit=$("#"+id).find(".deliveryKpi-unit").text();
    var interval=$("#"+id).find(".deliveryKpi-interval").text();
    if(test_sameDeliveryKpi(id)== -1){
        $("#my-kpi").append($("<tr />").attr("id",id).click(remove_userkpi).append($("<td />").text(entity))
            .append($("<td />").text(name))
            .append($("<td />").text(desc))
            .append($("<td />").append($("<input type='text'/>").click(myKpi_input).val(target).addClass("my-kpi-target")))
            .append($("<td />").text(unit))
            .append($("<td />").text(interval))
        );
    }
}
function myKpi_input(event){
    var e = event ? event : (window.event ? window.event : null);
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
    $("#my-kpi").find("input").bind("keyup",function(){
           clearNoNum(this);
    })
}
function test_sameDeliveryKpi(id) {
    var a = id;
    var b = [];
    $("#my-kpi").find("tr").each(function() {
        b.push($(this).attr('id'));
    });
    if(!Array.indexOf){
        Array.prototype.indexOf = function(obj){
            for(var i=0; i<this.length; i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
    }
    return b.indexOf(a);
}
function remove_userkpi(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var id=$(obj).parent().attr("id");
    $(obj).parent().remove();
}
///////////////  view  ///////////////////////////////////////
function create_Viewentity(event){
    var e = event ? event : (window.event ? window.event : null);
    if(e.keyCode == 13) {
        insert_entityView();
    } else if(e.keyCode == 27) {
        close_createEntity();
    }
}
function insert_entityView(){
    var test = test_sameEntityView();
    if($("#creat-newEntity").val() && test == -1) {
        var length=$("#manage-group-user").find("li").length-1;
        var val=$("#creat-newEntity").val();
        $("#manage-group-view li:eq("+length+")").before($("<li />").append($("<a href=''/>").text(val)));
        $("#creat-newEntity").val("");
    }
}
function test_sameEntityView() {
    var a = $("#creat-newEntity").val();
    var b = [];
    $("#manage-group-view").find("a").each(function() {
        b.push($(this).text());
    });
    if(!Array.indexOf){
        Array.prototype.indexOf = function(obj){
            for(var i=0; i<this.length; i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
    }
    return b.indexOf(a);
}
function choose_view(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var id=$(obj).attr("id");
    var text=$(obj).text();
    if(text_view(obj,"myView")== -1){
        $("#myView").append($("<p />").attr("id",id).text(text).click(del_view));
    }
}
function text_view(obj,target){
    var a = $(obj).text();
    var b = [];
    $("#"+target).find("p").each(function() {
        b.push($(this).text());
    });
    if(!Array.indexOf){
        Array.prototype.indexOf = function(obj){
            for(var i=0; i<this.length; i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        }
    }
    return b.indexOf(a);
}
function del_view(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    $(obj).remove();
}
function post_newUser(){
    var name=$("#new-user-name").val();
    var mail=$("#new-user-mail").val();
    var password=$("#new-user-password").val();
    var entityP=$("#new-user-entity").find(":selected").data("order");
    var entity=$("#new-user-entity").find(":selected").val();
    var roleP=$(":radio[name='optionsRadios']:checked").data("role");
    var role=$(":radio[name='optionsRadios']:checked").parent().text();
    if(name.length!=0 && mail.length!=0){
        if(isEmail(mail)){
                $("#user-table").append($("<tr />").attr("id",id).append($("<td align='center' />").text(id).addClass("kpi-order-id"))
                    .append($("<td align='center' />").text(name))
                    .append($("<td align='center' />").text(mail))
                    .append($("<td align='center' />").text(entity))
                    .append($("<td align='center' />").text(role))
                    .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").attr("type","edit").attr("title","编辑").data("belong",id).click(to_userPage)))
                    .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-delivery").attr("title","分配KPI").data("belong",id).click(edit_userItem)))
                    .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").attr("title","删除").data("belong",id).click(remove_userItem)))
                );
        }
        else{
            $("#add-warn").text("请填写正确的邮箱").removeClass("hide");
            while_hide("add-warn");
        }
    }
    else{
        $("#add-warn").removeClass("hide").text("请填写所有带*的选项");
        while_hide("add-warn");
    } 
}

function edit_userItem(event) {
     var id = find_id(event);
     $("#" + id).find('.manage-operate').each(function() {
          $(this).addClass("hide").next().removeClass("hide");
     });
     var userName = $("#" + id).find(".manage-userName").text();
     var userMail = $("#" + id).find(".manage-userMail").text();
     var userEntity = $("#" + id).find(".manage-userEntity").text();
     var userRole = $("#" + id).find(".manage-userRole").text();
     $("#cancel-edit-user").attr("name", userName).attr("mail", userMail).attr("entity", userEntity).attr("role", userRole);
     $("#" + id).find(".manage-userEntity").text("").append($("<select />").addClass("edit-kpiEntity-input").append($("<option />").text("entity1")).append($("<option />").text("entity2")).append($("<option />").text("entity3")));
     $("#" + id).find(".manage-userRole").text("").append($("<select />").addClass("edit-kpiEntity-input").append($("<option />").text("管理员")).append($("<option />").text("用户")).append($("<option />").text("一般用户")));
     $("#" + id).find(".manage-userName").text("").append($("<input type='text' />").val(userName).addClass("edit-userTarget-input"));
     $("#" + id).find(".manage-userMail").text("").append($("<input type='text' />").val(userMail).addClass("edit-userTarget-input"));
}

function remove_userItem(event) {
     if(confirm("确认删除？")) {
          var id = find_id(event);
          $("#user-table").find("#" + id).nextAll("tr").each(function() {
               var order = parseInt($(this).find(".kpi-order-id").text()) - 1;
               $(this).find(".kpi-order-id").text(order);
          });
          $("#user-table").find("#" + id).remove();
     }
}

function finish_editUser(event) {
     var id = find_id(event);
     var entity = $("#" + id).find(".manage-userEntity").find(":selected").text();
     var role = $("#" + id).find(".manage-userRole").find(":selected").text();
     var name = $("#" + id).find(".manage-userName").find("input").val();
     var mail = $("#" + id).find(".manage-userMail").find("input").val();
     if(isEmail(mail)) {
          same_editUser(id);
          $("#" + id).find(".manage-userEntity").text(entity);
          $("#" + id).find(".manage-userRole").text(role);
          $("#" + id).find(".manage-userName").text(name);
          $("#" + id).find(".manage-userMail").text(mail);
     }
}

function cancel_editUser(event) {
     var id = find_id(event);
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var entity = $(obj).attr("entity");
     var name = $(obj).attr("name");
     var mail = $(obj).attr("mail");
     var role = $(obj).attr("role");
     same_editUser(id);
     $("#" + id).find(".manage-userEntity").text(entity);
     $("#" + id).find(".manage-userName").text(name);
     $("#" + id).find(".manage-userMail").text(mail);
     $("#" + id).find(".manage-userRole").text(role);
}

function same_editUser(a) {
     $("#" + a).find(".manage-operate-reverse").each(function() {
          $(this).addClass("hide").prev().removeClass("hide");
     });
     $("#" + a).find(".manage-userEntity").find("select").remove();
     $("#" + a).find(".manage-userRole").find("select").remove();
     $("#" + a).find(".manage-userName").find("input").remove();
     $("#" + a).find(".manage-userMail").find("input").remove();
}

function cancel_add_user() {
     $("#addBlock").slideUp("2000").data("state", "off").find("input").val("");
     $("#right-content").css("padding-top", "0px");
     clear_add_user();
}

function clear_add_user() {
     $("#new-user-name").val("");
     $("#new-user-mail").val("");
     $("#new-user-entity").find("option[data-order='1']").attr("selected", "true");
     $("#new-user-role").find("option[data-order='1']").attr("selected", "true");
}

function add_user() {
     var name = $("#new-user-name").val();
     var mail = $("#new-user-mail").val();
     var entityP = $("#new-user-entity").find(":selected").data("order");
     var entity = $("#new-user-entity").find(":selected").val();
     var roleP = $("#new-user-role").find(":selected").data("order");
     var role = $("#new-user-role").find(":selected").val();
     var id = $("#user-table").find("tr").length;
     if(name.length != 0 && mail.length != 0) {
          if(isEmail(mail)) {
               if($("#manage-group-kpi li.active a").text() != entity) {
                    $("#user-table").append($("<tr />").attr("id", id).append($("<td align='center' />").text(id).addClass("kpi-order-id")).append($("<td align='center' />").text(name)).append($("<td align='center' />").text(mail)).append($("<td align='center' />").text(entity)).append($("<td align='center' />").text(role)).append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").data("belong", id).click(edit_userItem)).append($("<a />").addClass("btn btn-success manage-operate-reverse hide").data("belong", id).click(finish_editUser).text("完成"))).append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong", id).click(remove_userItem)).append($("<a />").addClass("btn manage-operate-reverse hide").attr("id", "cancel-edit-user").data("belong", id).click(cancel_editUser).text("取消"))));
                    cancel_add_kpi();
               }
          } else {
               $("#add-warn").text("请填写正确的邮箱").removeClass("hide");
               while_hide("add-warn");
          }
     } else {
          $("#add-warn").removeClass("hide").text("请填写所有带*的选项");
          while_hide("add-warn");
     }
}

////////////////////////////////////////////////     entry kpi  ///////////////////////////////////////
function init_entryKpi() {
     init();
     date = new Date();
     d = date.getDate();
     day = date.getDay();
     QuarterFirstMonth = showquarterFirstMonth(date);
     m = date.getMonth();
     y = date.getFullYear();
     WeekFirstDay = new Date(y, m, d - day + 1);
     WeekLastDay = new Date(y, m, d - day + 7);
     var type = $("#entry-date-type").find(".active").data("type");
     switch(type) {
          case "day":
               $("#entry-kpi").val(y + "-" + m + "-" + d);
               $("#entry-kpi").datepicker({
                    dateFormat : "yy-m-d",
                    showOtherMonths : true,
                    firstDay : 1,
                    selectOtherMonths : true
               });
               break;
          case "week":
               $("#entry-kpi").val(formatDate(WeekFirstDay) + " ~ " + formatDate(WeekLastDay));
               $("#show-weekOfYear").css("display","inline-block").find("span").text($.datepicker.iso8601Week(new Date(y, m, d - day + 1)));
               $("#entry-kpi").bind("click", select_week);
               break;
          case "month":
               $("#entry-kpi").val(y + "-" + m);
               $('#entry-kpi').datepicker({
                    changeMonth : true,
                    changeYear : true,
                    showOtherMonths : true,
                    selectOtherMonths : true,
                    dateFormat : 'yy-m',
                    monthNamesShort : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    onClose : function(dateText, inst) {
                         var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                         var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                         $(this).datepicker('setDate', new Date(year, month, 1));
                    }
               }).focus(function() {
                    $(".ui-datepicker-calendar").hide();
                    $("#ui-datepicker-div").position({
                         my : "center top",
                         at : "center bottom",
                         of : $(this)
                    });
               });
               break;
          case "quarter":
               $("#entry-kpi").css("width", "100px");
               $("#entry-kpi").val(y);
               $("#entry-prev-btn,#entry-next-btn").removeClass("hide");
               $("#select-quarter").removeClass("hide").find("option").each(function() {
                    if($(this).val() == QuarterFirstMonth) {
                         $(this).attr("selected", true);
                    }
               });
               break;
          case "year":
               $("#entry-kpi").css("width", "100px");
               $("#entry-kpi").val(y);
               $("#entry-prev-btn,#entry-next-btn").removeClass("hide");
               break;
     };
}

//本季开始年月
function showquarterFirstMonth(a) {
     if(a.getMonth() < 3)
          return "第一季度";
     else if(a.getMonth() > 2 && a.getMonth() < 6)
          return "第二季度";
     else if(a.getMonth() > 5 && a.getMonth() < 9)
          return "第三季度";
     else if(a.getMonth() > 8)
          return "第四季度";
}

//只选择周
function select_week() {
     var startDate;
     var endDate;
     var selectCurrentWeek = function() {
          window.setTimeout(function() {
               $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
          }, 1);
     }
     $('.week-picker').removeClass("hide").datepicker({
          showOtherMonths : true,
          selectOtherMonths : true,
          firstDay : 1,
          showWeek : true,
          dateFormat : 'yy-m-d',
          onSelect : function(dateText, inst) {
               var date = $(this).datepicker('getDate');
              if( date.getDay()==0){
                  startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-6);
                  endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
              }
              else{
                  startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
                  endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
              }
               var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
               $("#entry-kpi").val($.datepicker.formatDate(dateFormat, startDate, inst.settings) + " ~ " + $.datepicker.formatDate(dateFormat, endDate, inst.settings));
               $("#show-weekOfYear>span").text($.datepicker.iso8601Week(startDate));
               selectCurrentWeek();
               $('.week-picker').addClass("hide");
          },
          beforeShowDay : function(date) {
               var cssClass = '';
               if(date >= startDate && date <= endDate)
                    cssClass = 'ui-datepicker-current-day';
               return [true, cssClass];
          },
          onChangeMonthYear : function(year, month, inst) {
               selectCurrentWeek();
          }
     });
     $('.week-picker .ui-datepicker-calendar tr').live('mousemove', function() {
          $(this).find('td a').addClass('ui-state-hover');
     });
     $('.week-picker .ui-datepicker-calendar tr').live('mouseleave', function() {
          $(this).find('td a').removeClass('ui-state-hover');
     });
}

function minus_unit(event) {
     $("#entry-kpi").val(parseInt($("#entry-kpi").val()) - 1);
}

function plus_unit(event) {
     $("#entry-kpi").val(parseInt($("#entry-kpi").val()) + 1);
}

function entry_kpiCurrent(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
    var id = $(obj).data("belong");
     clearNoNum(obj);
     if(e.keyCode == 13 && $(obj).val()) {
          fill_kpiCurrent(obj);
     }
    else if( !$(obj).val()){
         $("#" + id).find(".entry-kpiPercent").text("");
         $(obj).attr("source",0);
     }
}

function fill_kpiCurrent(obj) {
    var val = $(obj).val();
    var source=$(obj).attr("source");
    var id = $(obj).data("belong");
    if(val){
        if(val!=source){
            $(obj).attr("source",val);
            var type = $("#entry-date-type").find(".active").data("type");
            var date;
            switch(type) {
                case "day":
                    date=$("#entry-kpi").val();
                    break;
                case "week":
                    date=$("#entry-kpi").val().split("-")[0]+"-"+$("#show-weekOfYear>span").text();
                    break;
                case "month":
                    date=$("#entry-kpi").val();
                    break;
                case "quarter":
                    date=$("#entry-kpi").val()+"-"+$("#select-quarter :selected").data("order");
                    break;
                case "year":
                    date=$("#entry-kpi").val();
                    break;
            }

            var target = $(obj).data("target");
            var percent = (parseFloat(val) / parseFloat(target) * 100).toFixed(0);
            kpi_percent(percent, id);
        }
    }
    else{
        $("#" + id).find(".entry-kpiPercent").text("");
        $(obj).attr("source",0);
    }
}

function kpi_percent(a, b) {
     var goal = $("#" + b).find(".entry-kpiPercent");
     goal.text(a + "%");
     switch(a-100>=0) {
          case true:
               goal.addClass("text-success");
               break;
          case false:
               goal.addClass("text-error");
               break;
     }

}