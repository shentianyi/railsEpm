var chart;
var count = 0;
var length = 100;
var data;
function init_highstock() {
     chart = new Highcharts.StockChart({
          chart : {
               renderTo : 'container'
          },

          rangeSelector : {
               selected : 1
          },

          title : {
               text : 'AAPL Stock Price'
          },

          series : [{
               name : 'AAPL Stock Price',
               data : slice_data(),
               tooltip : {
                    valueDecimals : 2
               }
          }]
     });
}

function add_data() {
  chart.series[0].data.push(slice_data());
}

function slice_data() {
     count++;
     return data.slice((count - 1) * length, count * length - 1);
}

function get_data() {
     $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(gdata) {
          data = gdata;
     }, {
          async : false
     });
}
