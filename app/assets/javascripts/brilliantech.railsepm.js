/////////////////////////////////////////////////////////////////////////  共用的function  //////////////////////////////////
function init(){
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
    $("#tool-setting,#tool-help,#tool-user,#tool-print").hover(function(){
        $(this).tooltip('show');
    },function(){
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
    clear_add_kpi();
    var height=parseInt($("#addBlock").height())+20+"px";
    if($("#addBlock").data("state")=="off"){
        $("#addBlock").slideDown("2000").data("state","on");
        $("#right-content").css("padding-top",height);
        if($(obj).data("manage")=="kpi"){
            $("#add-block-mark").text("添加KPI");
            $("#add-manage-kpi").text("添加");
        }
    }
    else{
//        $("#addBlock").slideUp("2000").data("state","off");
//        $("#right-content").css("padding-top","0px");
    }

}
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth();
    var myweekday = date.getDate();
    return (myyear+"-"+mymonth + "-" + myweekday);
}
/////////////////////////////////////////////////////////////////////////  Analytics   //////////////////////////////////
function init_analytics() {
    init();
    init_rightContent();
    if (document.attachEvent) {
        window.attachEvent('onresize', init_rightContent);
    }
    else {
        window.addEventListener('resize', init_rightContent, false);
    }
    $("#tool-print,#tool-excel,#tool-pdf,.control-chart-btn").hover(function(){
        $(this).tooltip('show');
    },function(){
        $(this).tooltip('hide');
    });
    $("#from,#to").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'yy-m-d'
    });
    var date=new Date();
    var nowDate=date.getDate();
    var day=date.getDay();
    var m= date.getMonth()+1;
    var y=date.getFullYear();
    var WeekFirstDay=new Date(y, m, nowDate - day+1);
    var WeekLastDay=new Date(y, m, nowDate - day+7);
    $("#from").val(formatDate(WeekFirstDay));
    $("#to").val(formatDate(WeekLastDay));
    init_chart();
//    var dateBegin,dateEnd;
//    var date1=($("#from").val()).split("-");
//    var date2=($("#to").val()).split("-");
//    for(i=0;i<3;i++){
//        if(parseInt(date1[i])<parseInt(date2[i])){
//            dateBegin=date1;
//            dateEnd=date2;
//            break;
//        }
//        else if(parseInt(date1[i])>parseInt(date2[i])){
//            dateBegin=date2;
//            dateEnd=date1;
//            break;
//        }
//        else{
//            dateBegin=date1;
//            dateEnd=date2;
//        }
//    }
//    var chart={
//        y:dateBegin[0],
//        m:parseInt(dateBegin[1])-1==0 ? 12: dateBegin[1]-1,
//        d:dateBegin[2]
//    }
//    $("#container").highcharts(
//        {
//            chart: {
//                type: 'line',
//                events: {
//                    addSeries: function() {
//                        alert ('A series was added, about to redraw chart');
//                    }
//                }
//            },
//            credits:{
//                enabled:false
//            },
//            title: {
//                text:""
//            },
//            tooltip: {
//                formatter: function() {
//                    return '<b>'+ this.series.name +'</b><br/>'+
//                        this.x +': '+ this.y;
//                }
//            },
//            xAxis: {
//                type: 'datetime',
//                dateTimeLabelFormats: {
//                    day:'%e/%b'
//                },
//                labels:{
//                    style:{
//                        fontWeight:800
//                    }
//                },
//                tickInterval: 24 * 3600 * 1000*7 // one day
//            },
//            yAxis: [{
//                title: {
//                    enabled:false
//                },
//                tickWidth:1,
//                offset:10,
//                labels:{
//                    format:'{value}$'
//                },
//                lineWidth:1
//            },{
//                opposite:true,
//                title:{
//                    enabled:false
//                },
//                tickWidth:1,
//                offset:10,
//                label:{
//                    format:'{value}days'
//                },
//                lineWidth:1
//            }],
//            series: [
//                {
//                    type:"area",
//                    name: 'actual',
//                    data: [100,100,100,150,150,150,200],
//                    pointStart: Date.UTC(chart.y,chart.m,chart.d),
//                    pointInterval: 24 * 3600 * 1000*7//one day
//                },
//                {
//                    type:"line",
//                    name: 'target',
//                    data: [80,110,120,140,150,150,300],
//                    pointStart: Date.UTC(chart.y,chart.m,chart.d),
//                    yAxis:1,
//                    pointInterval: 24 * 3600 * 1000*7 // one day
//                }
//            ]
//        }
//    );

}
function init_chart(){
      var options = {
          chart: {
              renderTo: 'container',
              type: 'line'
          },
          credits:{
                enabled:false
            },
          title: {
                text:""
            },
          tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
          xAxis: {
              type: 'datetime',
                dateTimeLabelFormats: {
                    day:'%e/%b'
                },
                labels:{
                    style:{
                        fontWeight:800
                    }
                },
                tickInterval: 24 * 3600 * 1000 // one day
          },
          yAxis: {
              title: {
                    enabled:false
                },
              tickWidth:1,
              offset:10,
              labels:{
                    format:'{value}$'
              },
              lineWidth:1
          },
          series: []
      };
      var entity=$("#chart-entity :selected").attr("id");
      var kpi=$("#none-kpi :selected").attr("id");
      var date1=($("#from").val()).split("-");
      var date2=($("#to").val()).split("-");
      var dateBegin,dateEnd;
      for(i=0;i<3;i++){
          if(parseInt(date1[i])<parseInt(date2[i])){
              dateBegin=date1;
              dateEnd=date2;
              break;
          }
          else if(parseInt(date1[i])>parseInt(date2[i])){
              dateBegin=date2;
              dateEnd=date1;
              break;
          }
          else{
              dateBegin=date1;
              dateEnd=date2;
          }
      };
      var interval=$(".control-chart-btn.active").attr("title");
      var startTime=dateBegin.join("-");
      var endTime=dateEnd.join("-");
      var chartScale={
        y:dateBegin[0],
        m:parseInt(dateBegin[1])-1==0 ? 12: dateBegin[1]-1,
        d:dateBegin[2]
      }
      $.post('../tasks/calendar', {
          entity : entity,
          kpi : kpi,
          startTime:startTime,
          endTime:endTime
      }, function(data) {
          var lines = data.split('\n');
          $.each(lines, function(lineNo, line) {
              var items = line.split(',');
              if (lineNo == 0) {
                  var series = {
                    type:"line",
                    name: 'target',
                    data: [],
                    pointStart: Date.UTC(chartScale.y,chartScale.m,chartScale.d),
                    pointInterval: 24 * 3600 * 1000
                  };
              }
              else {
                  var series = {
                      type:"area",
                      name:'actual',
                      data: [],
                      pointStart: Date.UTC(chartScale.y,chartScale.m,chartScale.d),
                      pointInterval: 24 * 3600 * 1000
                  };
                  $.each(items, function(itemNo, item) {
                      if (itemNo == 0) {
                          series.name = item;
                      } else {
                          series.data.push(parseFloat(item));
                      }
                  });

                  options.series.push(series);

              }

          });

          // Create the chart
          var chart = new Highcharts.Chart(options);
      });
  }

//            series: [
//                {
//                    type:"area",
//                    name: 'actual',
//                    data: [100,100,100,150,150,150,200],
//                    pointStart: Date.UTC(2013,6,1),
//                    pointInterval: 24 * 3600 * 1000//one day
//                },
//                {
//                    type:"line",
//                    name: 'target',
//                    data: [80,110,120,140,150,150,300],
//                    pointStart: Date.UTC(2013,6,1),
//                    yAxis:1,
//                    pointInterval: 24 * 3600 * 1000 // one day
//                }
//            ]





////////////////////////////////////////////////     dashBoard  ///////////////////////////////////////
function init_dashBoard(){
    init();
}
////////////////////////////////////////////////     manage  ///////////////////////////////////////
function init_manage(){
    init();
    init_rightContent();
    if (document.attachEvent) {
        window.attachEvent('onresize', init_rightContent);
    }
    else {
        window.addEventListener('resize', init_rightContent, false);
    }
}
///////////////  KPI  ///////////////////////////////////////

function cancel_add_kpi(){
    $("#addBlock").slideUp("2000").data("state","off").find("input").val("");
    $("#right-content").css("padding-top","0px");
    clear_add_kpi();
}
function clear_add_kpi(){
    $("#add-entity").find("option[data-order='1']").attr("selected","true");
    $("#new-kpi-name").val("");
    $("#new-kpi-desc").val("");
    $("#add-interval").find("option[data-order='1']").attr("selected","true");
    $("#add-trend").find("option[data-order='1']").attr("selected","true");
    $("#add-unit").find("option[data-order='1']").attr("selected","true");
    $("#new-kpi-target").val("");
    $("#is-calcu-check").attr("checked",false);
    $("#is-calcu-type").css("display","none");
    calcuRelate_clear();

}
function add_kpi(){
    var entity=$("#add-entity").find(":selected").val();
    var name=$("#new-kpi-name").val();
    var desc=$("#new-kpi-desc").val();
    var interval=$("#add-interval").find(":selected").val();
    var intervalP=$("#add-interval").find(":selected").data("order");
    var trend=$("#add-trend").find(":selected").val();
    var trendP=$("#add-trend").find(":selected").data("order");
    var target=$("#new-kpi-target").val();
    var unit=$("#add-unit").find(":selected").val();
    var unitP=$("#add-unit").find(":selected").data("order");
    var id=$("#kpi-table").find("tr").length;
    if($("#is-calcu-check").attr("checked")=="checked"){

    }
    else{
        if(name.length!=0 && target.length!=0){
            if($("#manage-group-kpi").find(".active").text()!=entity){

            }
            else{
                if($("#manage-group-kpi li.active a").text()==entity){
                    $("#kpi-table").append($("<tr />").attr("id",id).append($("<td align='center' />").text(id).addClass("kpi-order-id"))
                        .append($("<td align='center' />").text(entity))
                        .append($("<td align='center' />").text(name))
                        .append($("<td align='center' />").text(desc))
                        .append($("<td align='center' />").text(interval))
                        .append($("<td align='center' />").text(target))
                        .append($("<td align='center' />").text(unit))
                        .append($("<td align='center' />").text(trend))
                        .append($("<td align='center' />").text("否"))
                        .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").data("belong",id).click(edit_kpiItem))
                            .append($("<a />").addClass("btn btn-success manage-operate-reverse hide").data("belong",id).click(finish_editKPI).text("完成")))
                        .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong",id).click(remove_kpiItem))
                            .append($("<a />").addClass("btn manage-operate-reverse hide").attr("id","cancel-edit-kpi").data("belong",id).click(cancel_editKPI).text("取消")))
                    );
                }

                cancel_add_kpi();
            }
        }
        else{
            $("#add-warn").removeClass("hide");
            while_hide("add-warn");
        }
    }

}
function edit_kpiItem(event){
    var id=find_id(event);
    $("#"+id).find('.manage-operate').each(function(){
        $(this).addClass("hide").next().removeClass("hide");
    });
    var entity=$("#"+id).find(".kpi-entity").text();
    var target=$("#"+id).find(".kpi-target").text();
    $("#cancel-edit-kpi").attr("entity",entity).attr("target",target);
    $("#"+id).find(".kpi-entity").text("").append($("<select />").addClass("edit-kpiEntity-input").append($("<option />").text("1"))
        .append($("<option />").text("2"))
        .append($("<option />").text("3")));
    $("#"+id).find(".kpi-target").text("").append($("<input type='text' onkeyup='clearNoNum(this)'/>").val(target).addClass("edit-kpiTarget-input"));
}
function remove_kpiItem(event){
    if(confirm("确认删除？")){
        var id=find_id(event);
        $("#kpi-table").find("#"+id).nextAll("tr").each(function(){
            var order=parseInt($(this).find(".kpi-order-id").text())-1;
            $(this).find(".kpi-order-id").text(order);
        });
        $("#kpi-table").find("#"+id).remove();
    }
}
function finish_editKPI(event){
    var id=find_id(event);
    var entity=$("#"+id).find(".kpi-entity").find(":selected").text();
    var target=$("#"+id).find(".kpi-target").find("input").val();
    same_editKPI(id);
    $("#"+id).find(".kpi-entity").text(entity);
    $("#"+id).find(".kpi-target").text(target);
}
function cancel_editKPI(event){
    var id=find_id(event);
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var entity=$(obj).attr("entity");
    var target=$(obj).attr("target");
    same_editKPI(id);
    $("#"+id).find(".kpi-entity").text(entity);
    $("#"+id).find(".kpi-target").text(target);
}
function same_editKPI(a){
    $("#"+a).find(".manage-operate-reverse").each(function(){
        $(this).addClass("hide").prev().removeClass("hide");
    });
    $("#"+a).find(".kpi-entity").find("select").remove();
    $("#"+a).find(".kpi-target").find("input").remove();
}
function find_id(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var id=$(obj).data("belong");
    return id;
}
function create_entityBlock(){
    $("#creatEntity-block").removeClass("hide");
    $("#creat-newEntity").val("").focus();
}
function close_createEntity(){
    $("#creatEntity-block").addClass("hide");
    $("#creat-newEntity").val("");
}
function insert_entity(){
    var test = test_sameEntity();

    if($("#creat-newEntity").val() && test == -1) {
        var length=$("#manage-group-kpi").find("li").length-1;
        var val=$("#creat-newEntity").val();
        $("#manage-group-kpi li:eq("+length+")").before($("<li />").append($("<a href=''/>").text(val)));
        $("#creat-newEntity").val("");
        $(obj).val("");
    }
}
function test_sameEntity() {
    var a = $("#creat-newEntity").val();
    var b = [];
    $("#manage-group-kpi").find("a").each(function() {
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
function create_entity(event) {
    var e = event ? event : (window.event ? window.event : null);
    if(e.keyCode == 13) {
        insert_entity();
    } else if(e.keyCode == 27) {
        close_createEntity();
    }
}
function is_calcu(){
    if($("#is-calcu-check").attr("checked")=="checked"){
        $("#is-calcu-type").slideDown("2000");
    }
    else{
        $("#is-calcu-type").slideUp("2000");
    }
}
function select_calcuRelate(){
    var val="["+$("#is-calcu-relate :selected").val()+"]";
    var oldVal=$("#calcuType-input").val()
    if(/\]$/.test(oldVal)==false){
        var newVal=oldVal+val;
        $("#calcuType-input").val(newVal);
    }
}
function select_calcuMethod(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    var val=$(obj).text();
    var oldVal=$("#calcuType-input").val()
    if(/\]$/.test(oldVal)==true){
        var newVal=oldVal+val;
        $("#calcuType-input").val(newVal);
    }
}
function calcuRelate_clear(){
    $("#calcuType-input").val("");
    $("#is-calcu-relate").find("option[data-order='1']").attr("selected","true");
}
////////////////////////////////////////////////     entry kpi  ///////////////////////////////////////
function init_entryKpi(){
    init();
    date=new Date();
    d=date.getDate();
    day=date.getDay();
    QuarterFirstMonth=showquarterFirstMonth();
    m= date.getMonth()+1;
    y=date.getFullYear();
    WeekFirstDay=new Date(y, m, d - day+1);
    WeekLastDay=new Date(y, m, d - day+7);

    var type=$("#entry-date-type").find(".active").data("type");
    switch(type){
        case "day":
            $("#entry-kpi").val(y+"-"+m+"-"+d);
            $("#entry-kpi").datepicker({
                dateFormat:"yy-m-d",
                showOtherMonths: true,
                firstDay:1,
                showWeek: true,
                selectOtherMonths: true
            });
            break;
        case "week":
            $("#entry-kpi").val(formatDate(WeekFirstDay)+" ~ "+formatDate(WeekLastDay));
            $("#entry-kpi").bind("click",select_week);
            break;
        case "month":
            $("#entry-kpi").val(y+"-"+m);
            $('#entry-kpi').datepicker( {
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: 'yy-m',
                monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                onClose: function(dateText, inst) {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, month, 1));
                }
            }).focus(function () {
                    $(".ui-datepicker-calendar").hide();
                    $("#ui-datepicker-div").position({
                        my: "center top",
                        at: "center bottom",
                        of: $(this)
                    });
                });
            break;
        case "quarter":
            $("#entry-kpi").css("width","100px");
            $("#entry-kpi").val(y);
            $("#entry-prev-btn,#entry-next-btn").removeClass("hide");
            $("#select-quarter").removeClass("hide").find("option").each(function(){
                  if($(this).val()==QuarterFirstMonth){
                      $(this).attr("selected",true);
                  }
            });
            break;
        case "year":
            $("#entry-kpi").css("width","100px");
            $("#entry-kpi").val(y);
            $("#entry-prev-btn,#entry-next-btn").removeClass("hide");
            break;
    };
}
//本季开始年月
function showquarterFirstMonth()
{
    var Nowdate=new Date();
    if(Nowdate.getMonth()<3)
        return "第一季度";
    else if(Nowdate.getMonth()>2 && Nowdate.getMonth()<6)
        return "第二季度";
    else if(Nowdate.getMonth()>5 && Nowdate.getMonth()<9)
        return "第三季度";
    else if(Nowdate.getMonth()>8)
        return "第四季度";
}
//只选择周
function select_week(){
    var startDate;
    var endDate;
    var selectCurrentWeek = function() {
        window.setTimeout(function () {
            $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
        }, 1);
    }
    $('.week-picker').removeClass("hide").datepicker( {
        showOtherMonths: true,
        selectOtherMonths: true,
        firstDay:1,
        showWeek: true,
        dateFormat: 'yy-m-d',
        onSelect: function(dateText, inst) {
            var date = $(this).datepicker('getDate');
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()+1);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $("#entry-kpi").val($.datepicker.formatDate( dateFormat, startDate, inst.settings )+" ~ "+$.datepicker.formatDate( dateFormat, endDate, inst.settings ));
            selectCurrentWeek();
            $('.week-picker').addClass("hide");
        },
        beforeShowDay: function(date) {
            var cssClass = '';
            if(date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        onChangeMonthYear: function(year, month, inst) {
            selectCurrentWeek();
        }
    });
    $('.week-picker .ui-datepicker-calendar tr').live('mousemove', function() { $(this).find('td a').addClass('ui-state-hover'); });
    $('.week-picker .ui-datepicker-calendar tr').live('mouseleave', function() { $(this).find('td a').removeClass('ui-state-hover'); });
}
function minus_unit(event){
    $("#entry-kpi").val(parseInt( $("#entry-kpi").val())-1);
}
function plus_unit(event){
    $("#entry-kpi").val(parseInt( $("#entry-kpi").val())+1);
}
function entry_kpiCurrent(event){
    var e = event ? event : (window.event ? window.event : null);
    var obj = e.srcElement || e.target;
    clearNoNum(obj);
    if(e.keyCode==13){
         fill_kpiCurrent(obj);
    }
}
function fill_kpiCurrent(obj){
    var date=$("#entry-kpi").val();
    if(!$("#select-quarte").hasClass("hide")){
        var quarter=$("#select-quarter").find(":selected").val();
    }
    var id=$(obj).data("belong");
    var val=$(obj).val();
    var target=$(obj).data("target");
    var percent=(parseFloat(val)/parseFloat(target)*100).toFixed(0);
    kpi_percent(percent,id)
}
function kpi_percent(a,b){
    var goal=$("#"+b).find(".entry-kpiPercent");
    goal.text(a+"%");
    switch(a-100>=0){
        case true:
            goal.addClass("text-success");
            break;
        case false:
            goal.addClass("text-error");
            break;
    }

}