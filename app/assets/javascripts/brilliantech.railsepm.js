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

function while_hide(a) {
     setTimeout(function() {
          $("#" + a).addClass("hide");
     }, "2000");
}

function init_rightContent() {
     var fwidth = parseInt(document.body.scrollWidth);
     if(fwidth > 990) {
          document.getElementById("right-content").style.width = document.body.scrollWidth - 191 + "px";
     } else {
          document.getElementById("right-content").style.width = 990 - 191 + "px";
     }
}

function show_addBlock(event) {
     var e = event ? event : (window.event ? window.event : null);
     if(e.stopPropagation) {
          e.stopPropagation();
     } else {
          e.cancelBubble = true;
     }
     var obj = e.srcElement || e.target;
     var height = parseInt($("#addBlock").height()) + 20 + "px";
     if($("#addBlock").data("state") == "off") {
          $("#addBlock").slideDown("2000").data("state", "on");
          $("#right-content").css("padding-top", height);
          if($(obj).data("manage") == "kpi") {
               clear_add_kpi();
               $("#add-block-mark").text("添加KPI");
          }
          //        else if($(obj).data("manage")=="user"){
          //            clear_add_user();
          //            $("#add-block-mark").text("添加用户");
          //        }
     } else {
          //        $("#addBlock").slideUp("2000").data("state","off");
          //        $("#right-content").css("padding-top","0px");
     }
}

function formatDate(date) {
     var myYear = date.getFullYear();
     var myMonth = parseInt(date.getMonth() + 1);
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
          firstDay : 1,
          selectOtherMonths : true,
          dateFormat : 'yy-m-d',
          showWeek : true,
          onSelect : function(dateText, inst) {
               var date = $(this).datepicker('getDate');
               if(date.getDay() == 0) {
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
               } else {
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
               }
               var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
               $("#from").attr("week", ($.datepicker.iso8601Week(startDate)));
          }
     });
     $("#to").datepicker({
          showOtherMonths : true,
          selectOtherMonths : true,
          firstDay : 1,
          dateFormat : 'yy-m-d',
          onSelect : function(dateText, inst) {
               var date = $(this).datepicker('getDate');
               if(date.getDay() == 0) {
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
               } else {
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
               }
               var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
               $("#to").attr("week", ($.datepicker.iso8601Week(startDate)));
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
     var WeekFirstDay, WeekLastDay;
     if(day == 0) {
          WeekFirstDay = new Date(y, m, nowDate - 6);
          WeekLastDay = new Date(y, m, nowDate);
     } else {
          WeekFirstDay = new Date(y, m, nowDate - day + 1);
          WeekLastDay = new Date(y, m, nowDate - day + 7);
     }
     $("#from").val(formatDate(WeekFirstDay)).attr("week", $.datepicker.iso8601Week(WeekFirstDay));
     $("#to").val(formatDate(WeekLastDay)).attr("week", $.datepicker.iso8601Week(WeekFirstDay));
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
     var week1 = parseInt($("#from").attr("week"));
     var week2 = parseInt($("#to").attr("week"));
     var dateBegin, dateEnd;
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
     var startWeek = week1 - week2 <= 0 ? week1 : week2;
     var endWeek = week1 - week2 >= 0 ? week1 : week2;
     var startQuarter = quarterBelong(dateBegin[1]);
     var endQuarter = quarterBelong(dateEnd[1]);
     var interval = $(".control-chart-btn.active").data("type");
     var startTime, endTime;
     switch(interval) {
          case "day":
               startTime = dateBegin.join("-");
               endTime = dateEnd.join("-");
               break;
          case "week":
               startTime = dateBegin[0] + "-" + startWeek;
               endTime = dateEnd[0] + "-" + endWeek;
               break;
          case "month":
               startTime = dateBegin[0] + "-" + dateBegin[1];
               endTime = dateEnd[0] + "-" + dateEnd[1];
               break;
          case "quarter":
               startTime = dateBegin[0] + "-" + startQuarter;
               endTime = dateEnd[0] + "-" + endQuarter;
               break;
          case "year":
               startTime = dateBegin[0];
               endTime = dateEnd[0];
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
          form_chart(data.series, data.unit, interval);
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
            options.tooltip.formatter=function(){
                return '<b>'+ this.series.name +'</b><br/>'+
                    "数值"+this.y +'<br />'+this.x;
            };
            options.xAxis.categories
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

    })
}

function quarterBelong(a) {
     if(a < 3)
          return 1;
     else if(a > 2 && a < 6)
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
    if($("#is-calcu-relate")){
        $("#is-calcu-relate").find("option").each(function(){
            $(this).bind("click", select_calcuRelate);
        })

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
     var entityP = $("#add-entity").find(":selected").text();
     var name = $("#new-kpi-name").val();
     var desc = $("#new-kpi-desc").val();
     var interval = $("#add-interval").find(":selected").text();
     var intervalP = $("#add-interval").find(":selected").attr("value");
     var trend = $("#add-trend").find(":selected").text();
     var trendP = $("#add-trend").find(":selected").attr("value");
     var target = $("#new-kpi-target").val();
     var unit = $("#add-unit").find(":selected").attr("sym");
     var unitP = $("#add-unit").find(":selected").val();
     var length = $("#kpi-table").find("tr").length;
     var checkedP = Boolean;
     var check = "";
     var formula = "";
     var formulaShow = ""
     if($("#is-calcu-check").attr("checked") == "checked") {
          if(name.length != 0 && target.length != 0 && $("#calcuType-input").val() && /\]$/.test($("#calcuType-input").val()) == true) {
               formula = $("#takeCal").attr("cal");
               formulaShow = $("#calcuType-input").val();
               checkedP = true;
               check = "是";
               post_kpi(entity, entityP, name, desc, interval, intervalP, trend, trendP, target, unit, unitP, check, checkedP, formula, formulaShow, length);
          } else {
               $("#add-warn").removeClass("hide").text("请填写所有带*的选项");
               while_hide("add-warn");
          }
     } else {
          if(name.length != 0 && target.length != 0) {
               checkedP = false;
               check = "否";
               post_kpi(entity, entityP, name, desc, interval, intervalP, trend, trendP, target, unit, unitP, check, checkedP, formula, formulaShow, length);
          } else {
               $("#add-warn").removeClass("hide").text("请填写所有带*的选项");
               while_hide("add-warn");
          }
     }
}

function post_kpi(entity,entityP,name,desc,interval,intervalP,trend,trendP,target,unit,unitP,check,checkedP,formula,formulaShow,length){
    $.post('../kpis', {kpi:{
       kpi_category_id : entity,
        name:name,
        description:desc,
        frequency:intervalP,
        direction:trendP,
        target:target,
        unit:unitP,
        is_calculated:checkedP,
        formula:formula,
        formula_string:formulaShow}
    }, function(data) {
         if(data.result){
              var id=data.object;
        if($("#manage-group-kpi li.active a").text() == entityP) {
            $("#kpi-table").append($("<tr />").attr("id", id).append($("<td align='center' />").text(length).addClass("kpi-order-id"))
                .append($("<td align='center' />").text(entityP).addClass("kpi-entity"))
                .append($("<td align='center' />").text(name))
                .append($("<td align='center' />").text(desc))
                .append($("<td align='center' />").text(interval))
                .append($("<td align='center' />").text(target).addClass("kpi-target"))
                .append($("<td align='center' />").text(unit))
                .append($("<td align='center' />").text(trend))
                .append($("<td align='center' />").addClass("kpi-checked").text(check))
                .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").data("belong", id).click(edit_kpiItem))
                    .append($("<a />").addClass("btn btn-success manage-operate-reverse hide").data("belong", id).click(finish_editKPI).text("完成")))
                .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong", id).click(remove_kpiItem))
                    .append($("<a />").addClass("btn manage-operate-reverse hide").attr("id", "cancel-edit-kpi-"+id).data("belong", id).click(cancel_editKPI).text("取消")))
            );
            if(formula){
                $("#"+id).find(".kpi-checked").attr("title",formulaShow);
            }
        }}else{
             alert(data.content);
        }
        cancel_add_kpi();
    });
}

function edit_kpiItem(event) {
     var id = find_id(event);
     $("#" + id).find('.manage-operate').each(function() {
          $(this).addClass("hide").next().removeClass("hide");
     });
     var entity = $("#" + id).find(".kpi-entity").text();
     var target = $("#" + id).find(".kpi-target").text();
     $("#cancel-edit-kpi-" + id).attr("entity", entity).attr("target", target);
     $("#" + id).find(".kpi-entity").text("").append($("#add-entity").clone().addClass("edit-kpiEntity-input").attr("id", ""));
     $("#" + id).find(".kpi-entity").find("option").each(function() {
          if($(this).text() == $("#manage-group-kpi li.active a").text()) {
               $(this).attr("selected", "true");
          }
     });
     $("#" + id).find(".kpi-target").text("").append($("<input type='text' onkeyup='clearNoNum(this)'/>").val(target).addClass("edit-kpiTarget-input"));
}

function remove_kpiItem(event) {
     if(confirm("确认删除？")) {
          var id = find_id(event);
          $.ajax({
               url : '../kpis/' + id,
               type : 'DELETE',
               success : function(data) {
                    if(data.result) {
                         $("#kpi-table").find("#" + id).nextAll("tr").each(function() {
                              var order = parseInt($(this).find(".kpi-order-id").text()) - 1;
                              $(this).find(".kpi-order-id").text(order);
                         });
                         $("#kpi-table").find("#" + id).remove();
                    } else {
                         alert(data.content);
                    }
               }
          });
     }
}

function finish_editKPI(event) {
     var id = find_id(event);
     var entity = $("#" + id).find(".kpi-entity").find(":selected").text();
     var category = $("#" + id).find(".kpi-entity").find(":selected").val();
     var target = $("#" + id).find(".kpi-target").find("input").val();
     same_editKPI(id);
     $.ajax({
          url : '/kpis',
          type : 'PUT',
          data : {
               kpi : {
                    id : id,
                    kpi_category_id : category,
                    target : target
               }
          },
          success : function(data) {
               if(entity == $("#manage-group-kpi li.active a").text()) {
                    $("#" + id).find(".kpi-entity").text(entity);
                    $("#" + id).find(".kpi-target").text(target);
               } else {
                    $("#kpi-table").find("#" + id).remove();
                    $("#kpi-table").find("#" + id).nextAll("tr").each(function() {
                         var order = parseInt($(this).find(".kpi-order-id").text()) - 1;
                         $(this).find(".kpi-order-id").text(order);
                    });
                    $("#kpi-table").find("#" + id).remove();
               }
          }
     });
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
     var val = $("#creat-newEntity").val();
     if(val && test == -1) {

          if($('#creat-newEntity').val().length > 0) {
               $.post('../kpi_categories', {
                    category : {
                         name : val
                    }
               }, function(data) {
                    if(data.result) {
                         var length = $("#manage-group-kpi").find("li").length - 1;
                         $("#manage-group-kpi li:eq(" + length + ")").before($("<li />").append($("<i />").addClass("icon-remove hide pull-left").click(remove_leftNav).attr("number", data.number).attr("belong", "kpi")).append($("<i />").addClass("icon-pencil hide pull-left").click(edit_leftNav).attr("number", data.object).attr("belong", "kpi")).append($("<a href='../kpis?p=" + data.object + "'/>").text(val)));
                         $("#creat-newEntity").val("");
                    } else {
                         alert(data.content);
                    }
               });
          }
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
          $("#is-calcu-relate option").eq(0).css("display", "none");
     } else {
          $("#is-calcu-type").slideUp("2000");
     }
}

function select_calcuRelate(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var val = "[" + $(obj).text() + "]";
     var valId = "[" + $(obj).attr("value") + "]";
     var oldVal = $("#calcuType-input").val();
     var oldValId = $("#takeCal").attr("cal");
     if(/\]$/.test(oldVal) == false) {
          var newVal = oldVal + val;
          var newValId = oldValId + valId;
          $("#calcuType-input").val(newVal);
          $("#takeCal").attr("cal", newValId);
     }
}

function select_calcuMethod(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var val = $(obj).text();
     var oldVal = $("#calcuType-input").val();
     var oldValId = $("#takeCal").attr("cal");
     if(/\]$/.test(oldVal) == true) {
          var newVal = oldVal + val;
          var newValId = oldValId + val;
          $("#calcuType-input").val(newVal);
          $("#takeCal").attr("cal", newValId);
     }
}

function calcuRelate_clear() {
     $("#calcuType-input").val("");
     $("#takeCal").attr("cal", "");
     $("#is-calcu-relate").find("option[data-order='1']").attr("selected", "true");
}

//左边的删除和编辑
function remove_leftNav(event) {
     if(!confirm('确定删除？'))
     return;
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var number = $(obj).attr("number");
     var belong = $(obj).attr("belong");
     var url;
     var local;
          switch(belong) {
               case "kpi":
                    url = "../kpi_categories/";
                    local="../kpis";
                    break;
               case "entity":
                    url = "../entities/";
                    local="../users"
                    break;
               case "view":
                    url = "../entity_groups/";
                    break;
          }
          if(url) {
               $.ajax({
                    url : url+number,
                    type : 'DELETE',
                    success : function(data) {
                        if(data.result){
                             window.location.href = local;
                        } 
                        else{
                             MessageBox(data.content, "message-warning");
                        }
                    }
               });
          }
}

function edit_leftNav(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var number = $(obj).attr("number");
     var belong = $(obj).attr("belong");
     var text = $("a[number='" + number + "']").text();
     var left = e.pageX;
     var top = e.pageY;
     $("#edit-block").removeClass("hide").addClass("absolute").offset({
          left : left - 35,
          top : top + 25
     });
     $("#change-leftNavi").val(text).attr("origin", text).attr("number", number).attr("belong", belong).focus();
}

function update_leftNavi() {
     var test = test_sameLeftNavi();
     var val = $("#change-leftNavi").val();
     var belong = $("#change-leftNavi").attr("belong");
     var number = $("#change-leftNavi").attr("number");
     if(val && test == -1) {
          var url;
          switch(belong) {
               case "kpi":
                    url = "../kpi_categories"
                    break;
               case "entity":
                    url = "../entities"
                    break;
               case "view":
                    url = "../entity_groups";
                    break;
          }
          if(url) {
               $.ajax({
                    url : url,
                    type : 'PUT',
                    data : {
                         id:number,
                         data:{
                             name:val
                        }
                    },
                    success : function(data) {
                        if(data){
                               $("a[number='" + number + "']").text(val);
                        } 
                        close_editBlock();
                    }
               });
          }
     }
}

function test_sameLeftNavi() {
     var a = $("#change-leftNavi").val();
     var b = [];
     var belong = $("#change-leftNavi").attr("belong");
     $("a[belong='" + belong + "']").each(function() {
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

function change_leftNavi(event) {
     var e = event ? event : (window.event ? window.event : null);
     var origin = $("#change-leftNavi").attr("origin");
     if(e.keyCode == 13 && $("#change-leftNavi").val() != origin && $("#change-leftNavi").val()) {
          update_leftNavi();
     } else if(e.keyCode == 27) {
          close_editBlock();
     }
}

function close_editBlock() {
     $("#edit-block").addClass("hide").find("input").val("");
}

///////////////  user  ///////////////////////////////////////

function create_Userentity(event) {
     var e = event ? event : (window.event ? window.event : null);
     if(e.keyCode == 13) {
          insert_entityUser();
     } else if(e.keyCode == 27) {
          close_createEntity();
     }
}

function insert_entityUser() {
     var test = test_sameEntityUser();
     var val = $("#creat-newEntity").val();
     if(val && test == -1) {
          if($('#creat-newEntity').val().length > 0) {
               $.post('../entities', {
                    entity : {
                         name : $('#creat-newEntity').val()
                    }
               }, function(data) {
                    if(data.result) {
                         var length = $("#manage-group-user").find("li").length - 1;
                         $("#manage-group-user li:eq(" + length + ")").before($("<li />")
                             .append($("<i />").addClass("icon-remove hide pull-left").click(remove_leftNav).attr("number", data.number).attr("belong", "entity"))
                             .append($("<i />").addClass("icon-pencil hide pull-left").click(edit_leftNav).attr("number", data.number).attr("belong", "entity"))
                             .append($("<a href='../users?p=" + data.object + "'/>").text(val)));
                         $("#creat-newEntity").val("");
                    } else {
                         alert(data.content);
                    }
               });
          }
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

///////////////  add user  ///////////////////////////////////////
function init_addUser() {
     var mark = $("#add-user-mark").data("type");
     if(mark == "add") {
          $("#add-user-mark").text("添加我的用户");
     } else {
          $("#add-user-mark").text("修改我的用户");
     }
}

function to_userPage(event) {
     var e = event ? event : (window.event ? window.event : null);
     var obj = e.srcElement || e.target;
     var type = $("obj").attr("type");
     if(type == "add") {
          $("#add-user-mark").text("添加我的用户");
     } else if(type == "edit") {
          $("#add-user-mark").text("修改我的用户");
     }
}

///////////////  delivery kpi  ///////////////////////////////////////
function edit_delivery(event) {
    var id = find_id(event);
    $("#" + id).find('.manage-operate').each(function() {
        $(this).addClass("hide").next().removeClass("hide");
    });
    var target = $("#" + id).find(".kpi-target").text();
    $("#cancel-edit-kpi-"+id).attr("target", target);
    $("#" + id).find(".kpi-target").text("").append($("<input type='text' onkeyup='clearNoNum(this)'/>").val(target).addClass("edit-kpiTarget-input"));
}
function remove_delivery(event) {
    if(confirm("确认删除？")) {
        var id = find_id(event);
        $.ajax({
            url:'../kpis/'+id,
            type: 'DELETE',
            success:function(data){
                if(data.result){
                    $("#kpi-table").find("#" + id).nextAll("tr").each(function() {
                        var order = parseInt($(this).find(".kpi-order-id").text()) - 1;
                        $(this).find(".kpi-order-id").text(order);
                    });
                    $("#kpi-table").find("#" + id).remove();
                }else{
                    alert(data.content);
                }
            }
        });
    }
}

function finish_editDelivery(event) {
    var id = find_id(event);
    var entity = $("#" + id).find(".kpi-entity").find(":selected").text();
    var target = $("#" + id).find(".kpi-target").find("input").val();
    same_editDelivery(id);
    $.ajax({
        url:'../kpis',
        type:'PUT',
        data:{kpi:{id:id,target:target}},
        success:function(data){
                $("#" + id).find(".kpi-target").text(target);
        }
    });
}
function cancel_editDelivery(event) {
    var id = find_id(event);
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var target = $(obj).attr("target");
    same_editDelivery(id);
    $("#" + id).find(".kpi-target").text(target);
}
function same_editDelivery(a) {
    $("#" + a).find(".manage-operate-reverse").each(function() {
        $(this).addClass("hide").prev().removeClass("hide");
    });
    $("#" + a).find(".kpi-target").find("input").remove();
}
function delivery_Kpi(){
    var entityValue=$("#delivery-entity :selected").attr("value");
    var entityText=$("#delivery-entity :selected").text();
    var kpiValue=$("#delivery-kpi :selected").attr("value");
    var kpiText=$("#delivery-kpi :selected").text();
    var length = $("#kpi-table").find("tr").length;
    $.post("/kpis/assign",{
         id:$('#user-id').val(),
        category:entityValue, 
        kpi:kpiValue
    },function(data){
       $("#user-assigned-kpis").html(data);
    })

}
///////////////  view  ///////////////////////////////////////
function create_Viewentity(event) {
     var e = event ? event : (window.event ? window.event : null);
     if(e.keyCode == 13) {
          insert_entityView();
     } else if(e.keyCode == 27) {
          close_createEntity();
     }
}

function insert_entityView() {
     var test = test_sameEntityView();
     if($("#creat-newEntity").val() && test == -1) {
          var length = $("#manage-group-user").find("li").length - 1;
          var val = $("#creat-newEntity").val();
         if($('#creat-newEntity').val().length > 0) {
             $.post('../entity_groups', {
                 view : {
                     name : $('#creat-newEntity').val()
                 }
             }, function(data) {
                 if(data.result) {
                     var length = $("#manage-group-user").find("li").length - 1;
                     $("#manage-group-view li:eq(" + length + ")").before($("<li />")
                         .append($("<i />").addClass("icon-remove hide pull-left").click(remove_leftNav).attr("number", data.number).attr("belong", "view"))
                         .append($("<i />").addClass("icon-pencil hide pull-left").click(edit_leftNav).attr("number", data.number).attr("belong", "view"))
                         .append($("<a href='../users?p=" + data.object + "'/>").text(val)));
                     $("#creat-newEntity").val("");
                 } else {
                     alert(data.content);
                 }
             });
         }

     }
}

function test_sameEntityView() {
     var a = $("#creat-newEntity").val();
     var b = [];
     $("#manage-group-view").find("a").each(function() {
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

function delivery_view() {
    var length = $("#kpi-table").find("tr").length;
    var viewText=$("#delivery-view :selected").text();
    var viewValue=$("#delivery-view :selected").attr("value");
    var test=true;
    $("#kpi-table").find(".kpi-order-entity").each(function(){
        if($(this).text()==viewText){
            test=false;
        }
    });
    if(test){
        post("..",{
            viewText:viewText,
            viewValue:viewValue
        },function(data){
            if(data.result){
                $("#kpi-table").append($("<tr />").attr("id", data.id).append($("<td align='center' />").text(length).addClass("kpi-order-id"))
                    .append($("<td align='center' />").addClass("kpi-order-entity").text(viewText))
                    .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong",data.id).click(remove_viewEntity)))
                );
            }
            else{
                alert(data.content);
            }
        })
    }

}
function remove_viewEntity(event) {
    if(confirm("确认删除？")) {
        var id = find_id(event);
        $.ajax({
            url:'',
            type: 'DELETE',
            success:function(data){
                if(data.result){
                    $("#kpi-table").find("#" + id).nextAll("tr").each(function() {
                        var order = parseInt($(this).find(".kpi-order-id").text()) - 1;
                        $(this).find(".kpi-order-id").text(order);
                    });
                    $("#kpi-table").find("#" + id).remove();
                }else{
                    alert(data.content);
                }
            }
        });
    }
}


function post_newUser() {
     var name = $("#new-user-name").val();
     var mail = $("#new-user-mail").val();
     var password = $("#new-user-password").val();
     var entityP = $("#new-user-entity").find(":selected").data("order");
     var entity = $("#new-user-entity").find(":selected").val();
     var roleP = $(":radio[name='optionsRadios']:checked").data("role");
     var role = $(":radio[name='optionsRadios']:checked").parent().text();
     if(name.length != 0 && mail.length != 0) {
          if(isEmail(mail)) {
               $("#user-table").append($("<tr />").attr("id", id).append($("<td align='center' />").text(id).addClass("kpi-order-id")).append($("<td align='center' />").text(name)).append($("<td align='center' />").text(mail)).append($("<td align='center' />").text(entity)).append($("<td align='center' />").text(role)).append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").attr("type", "edit").attr("title", "编辑").data("belong", id).click(to_userPage))).append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-delivery").attr("title", "分配KPI").data("belong", id).click(edit_userItem))).append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").attr("title", "删除").data("belong", id).click(remove_userItem))));
          } else {
               $("#add-warn").text("请填写正确的邮箱").removeClass("hide");
               while_hide("add-warn");
          }
     } else {
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

               $("#show-weekOfYear").css("display", "inline-block").find("span").text($.datepicker.iso8601Week(new Date(y, m, d - day + 1)));

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
               if(date.getDay() == 0) {
                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6);
                    endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
               } else {
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
     if(($(obj).val()).split("")[0]==0 && ($(obj).val()).split("")[1]!="."){
         $(obj).val(0);
     }
     clearNoNumZero(obj);
     if(e.keyCode == 13) {
          if(parseFloat($(obj).val())==0){
              $(obj).val(0);
          }
          fill_kpiCurrent(obj);
     } else if(!$(obj).val()) {
          $("#" + id).find(".entry-kpiPercent").text("");
     }
}
function fill_kpiCurrent(obj) {
     var val = $(obj).val();
     var source = $(obj).attr("source");
     var id = $(obj).data("belong");
     if(val) {
          if(val != source) {
               var type = $("#entry-date-type").find(".active").data("type");
               var date;
               switch(type) {
                    case "day":
                         date = $("#entry-kpi").val();
                         break;
                    case "week":
                         date = $("#entry-kpi").val().split("-")[0] + "-" + $("#show-weekOfYear>span").text();
                         break;
                    case "month":
                         date = $("#entry-kpi").val();
                         break;
                    case "quarter":
                         date = $("#entry-kpi").val() + "-" + $("#select-quarter :selected").data("order");
                         break;
                    case "year":
                         date = $("#entry-kpi").val();
                         break;
               }
               post('',{
                   id:id,
                   date:date,
                   value:val
               },function(data){
                   if(data.result){
                       $(obj).attr("source", val);
                       var target = $(obj).data("target");
                       var percent = (parseFloat(val) / parseFloat(target) * 100).toFixed(0);
                       kpi_percent(percent, id);
                   }
                   else{
                      alert(data.content);
                   }
               })

          }
     }
     else {
          $("#" + id).find(".entry-kpiPercent").text("");
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


  function kpi_reinit_by_category() {
          var id = $("#delivery-entity :selected").attr("value");
         $.post('/kpis/kpi_option',{id:id},function(data){
              $("#kpi-select").html(data);
         },'html');
     }
