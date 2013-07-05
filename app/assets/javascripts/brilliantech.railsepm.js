/////////////////////////////////////////////////////////////////////////  共用的function  //////////////////////////////////
function show_addBlock(event){
    var e = event ? event : (window.event ? window.event : null);
    e.stopPropagation();
    var obj = e.srcElement || e.target;
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
/////////////////////////////////////////////////////////////////////////  Analytics   //////////////////////////////////
function init_analytics() {
    $("#container").highcharts(
        {
            chart: {
                type: 'line',
                events: {
                    addSeries: function() {
                        alert ('A series was added, about to redraw chart');
                    }
                }
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
            yAxis: [{
                title: {
                    enabled:false
                },
                tickWidth:1,
                offset:10,
                labels:{
                    format:'{value}$'
                },
                lineWidth:1
            },{
                opposite:true,
                title:{
                    enabled:false
                },
                tickWidth:1,
                offset:10,
                label:{
                    format:'{value}days'
                },
                lineWidth:1
            }],
            series: [
                {
                    type:"area",
                    name: 'actual',
                    data: [100,100,100,150,150,150,200],
                    pointStart: Date.UTC(2013,6,1),
                    pointInterval: 24 * 3600 * 1000//one day
                },
                {
                    type:"line",
                    name: 'target',
                    data: [80,110,120,140,150,150,300],
                    pointStart: Date.UTC(2013,6,1),
                    yAxis:1,
                    pointInterval: 24 * 3600 * 1000 // one day
                }
            ]
        }
    );
    $("#from,#to,#compare-from,#compare-to").datepicker({

    })
}
//  function init_analytics(){
//      var options = {
//          chart: {
//              renderTo: 'container',
//              defaultSeriesType: 'column'
//          },
//          title: {
//              text: 'Fruit Consumption'
//          },
//          xAxis: {
//              categories: []
//          },
//          yAxis: {
//              title: {
//                  text: 'Units'
//              }
//          },
//          series: []
//      };
//      $.get('data.csv', function(data) {
//          // Split the lines
//          var lines = data.split('\n');
//          // Iterate over the lines and add categories or series
//          $.each(lines, function(lineNo, line) {
//              var items = line.split(',');
//
//              // header line containes categories
//              if (lineNo == 0) {
//                  $.each(items, function(itemNo, item) {
//                      if (itemNo > 0) options.xAxis.categories.push(item);
//                  });
//              }
//
//              // the rest of the lines contain data with their name in the first position
//              else {
//                  var series = {
//                      data: []
//                  };
//                  $.each(items, function(itemNo, item) {
//                      if (itemNo == 0) {
//                          series.name = item;
//                      } else {
//                          series.data.push(parseFloat(item));
//                      }
//                  });
//
//                  options.series.push(series);
//
//              }
//
//          });
//
//          // Create the chart
//          var chart = new Highcharts.Chart(options);
//      });
//  }



////////////////////////////////////////////////     dashBoard  ///////////////////////////////////////
function init_dashBoard(){
}
////////////////////////////////////////////////     manage  ///////////////////////////////////////
function init_manage(){
    $(".calcuType-method-btn").bind("click",function(){
        $(".calcuType-method-btn").removeClass("active");
        $(this).addClass("active");
    });
    cancel_add_kpi();
}
///////////////KPI
function is_calcu(){
    if($("#is-calcu-check").attr("checked")=="checked"){
        $("#is-calcu-type").slideDown("2000");
    }
    else{
        $("#is-calcu-type").slideUp("2000");
    }
}
function cancel_add_kpi(){
    $("#addBlock").slideUp("2000").data("state","off").find("input").val("");
    $("#right-content").css("padding-top","0px");
    $("#add-entity").find("option[data-order='1']").attr("selected","true");
    $("#add-interval").find("option[data-order='1']").attr("selected","true");
    $("#add-trend").find("option[data-order='1']").attr("selected","true");
    $("#add-unit").find("option[data-order='1']").attr("selected","true");
    $("#is-calcu-check").attr("checked",false);
    $("#is-calcu-relate").find("option[data-order='1']").attr("selected","true");
}
function add_kpi(){
    var entity=$("#add-entity").find(":selected").val();
    var name=$("#new-kpi-name").val();
    var desc=$("#new-kpi-desc").val();
    var interval=$("#add-interval").find(":selected").val();
    var trend=$("#add-trend").find(":selected").val();
    var target=$("#new-kpi-target").val();
    var unit=$("#add-unit").find(":selected").val();
    var id=parseInt($("#kpi-table").length)+1;
    if($("#is-calcu-check").attr("checked")=="checked"){
        var relateEntity=$("#is-calcu-relate").find(":selected").val();
        $(".calcuType-method-btn").each(function(){
            if($(this).hasClass("active")){
                var calcuType=$(this).data("calcutype");
            }
        })
    }
    else{
        if(name.length!=0 && target.length!=0){
            if($("#is-calcu-check").attr("checked")=="checked"){

            }
            else{
                $("#kpi-table").append($("<tr />").attr("id",id).append($("<td align='center' />").text(id))
                    .append($("<td align='center' />").text(entity))
                    .append($("<td align='center' />").text(name))
                    .append($("<td align='center' />").text(desc))
                    .append($("<td align='center' />").text(interval))
                    .append($("<td align='center' />").text(target))
                    .append($("<td align='center' />").text(unit))
                    .append($("<td align='center' />").text(trend))
                    .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-edit").data("belong",id)).click(edit_kpiItem))
                    .append($("<td align='center' />").append($("<div />").addClass("manage-operate manage-operate-del").data("belong",id)))
                );
                cancel_add_kpi();
            }
        }
        else{
            $("#add-warn").removeClass("hide");
            while_hide("add-warn");
        }
    }

}
function edit_kpiItem(){
    var height=parseInt($("#addBlock").height())+20+"px";
    if($("#addBlock").data("state")=="off"){
        $("#addBlock").slideDown("2000").data("state","on");
        $("#right-content").css("padding-top",height);
        $("#add-block-mark").text("修改KPI");
        $("#add-manage-kpi").text("修改");
    }
}