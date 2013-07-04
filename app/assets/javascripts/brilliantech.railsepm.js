/////////////////////////////////////////////////////////////////////////  共用的function  //////////////////////////////////
function show_addBlock(event){
    var e = event ? event : (window.event ? window.event : null);
    e.stopPropagation();
    var height=parseInt($("#addBlock").height())+20+"px";
    if($("#addBlock").data("state")=="off"){
        $("#addBlock").slideDown("2000").data("state","on");
        $("#right-content").css("padding-top",height);
    }
    else{
        $("#addBlock").slideUp("2000").data("state","off");
        $("#right-content").css("padding-top","0px");
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
