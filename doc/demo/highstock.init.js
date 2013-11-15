var chart;
var length = 24;
var date_type;
var from_date, to_date;

var bar_fix_from, bar_fix_to;
var url = 'http://42.121.111.38:9002/HighChartsFileService/';
function init() {
     from_date = new Date("2006-01-01 00:00:00");
     to_date = new Date("2008-02-30 00:00:00");
     $("#from").val(from_date.toISOString());
     $("#to").val(to_date.toISOString());
}

function create_highstock() {
     bar_fix_from = Date.parse(from_date.toISOString());
     bar_fix_to = (from_date.addHours(length) <= to_date) ? Date.parse(from_date.addHours(length).toISOString()) : Date.parse(to_date.toISOString());
     var callback = (from_date.addHours(length) < to_date) ? add_data : null;
     init_data(Date.parse(from_date.toISOString()), bar_fix_to, init_highstock, callback);
}

function init_highstock(data, callback) {
     chart = new Highcharts.StockChart({
          chart : {
               renderTo : 'container',
               events : {
                    load : function() {
                         if(callback)
                              callback();
                    }
               }
          },
          title : {
               text : 'AAPL Stock Price'
          },
          xAxis : {
               events : {
                    setExtremes : function(e) {
                         if(e.trigger == 'navigator' || e.trigger == 'pan') {
                              bar_fix_from = e.min;
                              bar_fix_to = e.max;
                         }
                    }
               }
          },
          series : [{
               name : 'AAPL Stock Price',
               data : data[0],
               tooltip : {
                    valueDecimals : 2
               }
          }, {
               name : 'CZ Stock Price',
               data : data[1],
               tooltip : {
                    valueDecimals : 2
               }
          }],
          exporting : {
               url : url,
               filename : 'MyChart',
               width : 1200, // chart width
               exportTypes : ['chart', 'png', 'jpeg', 'pdf', 'svg', 'doc', 'docx', 'pptx', 'xls', 'xlsx'] // set download file type
          },
          rangeSelector : {
               enabled : false
          },
          scrollbar : {
               liveRedraw : false
          },
          navigator : {
               enabled : true,
               series : {
                    id : 'navigator'
               }
          }
     });
}

function add_data() {
     from_date = from_date.addHours(length);
     var next_date = (from_date.addHours(length) > to_date) ? to_date : from_date.addHours(length);
     $.getJSON('http://192.168.0.138:3000/api/kpi_entries/test_data?from=' + Date.parse(from_date.toISOString()) + '&to=' + Date.parse(next_date.toISOString()) + '&callback=?'+'&t='+Math.random(), function(data) {
          if(data) {
               // for(var i = 0; i < data.length; i++) {
               // chart.series[0].addPoint(data[i], false, false);
               // }
               for(var i = 0; i < 2; i++) {
                    var point = chart.series[i].options.data;
                    point = point.concat(data[i]);
                    chart.series[i].setData(point, true);
                    chart.redraw();
               }
               chart.xAxis[0].setExtremes(bar_fix_from, bar_fix_to);
               if(next_date < to_date) {
                    add_data();
               }
          }
     });
}

var init_data = function(from, to, callback) {
     var cb = arguments[3];
     $.getJSON('http://192.168.0.138:3000/api/kpi_entries/test_data?from=' + from + '&to=' + to + '&callback=?'+'&t='+Math.random(), function(data) {
          if(data) {
               callback(data, cb);
          }
     });
}
function l(m) {
     console.log(m);
}

Date.prototype.addHours = function(h) {
     var date = new Date(this.getTime());
     date.setHours(this.getHours() + h);
     return date;
}