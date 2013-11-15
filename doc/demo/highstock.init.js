var chart;
var length = 100;
var date_type;
var from_date, to_date;

var bar_fix_from, bar_fix_to;

function init() {
	from_date = new Date("2006-01-01 00:00:00");
	to_date = new Date("2007-02-30 00:00:00");
	$("#from").val(from_date.toISOString());
	$("#to").val(to_date.toISOString());
}

function create_highstock() {
	bar_fix_from = from_date.toISOString();
	bar_fix_to = (from_date.addHours(length) <= to_date) ? from_date.addHours(length).toISOString() : to_date.toISOString();
	if (from_date.addHours(length) >= to_date) {
		get_data(Date.parse(from_date.toISOString()), Date.parse(to_date.toISOString()), init_highstock);
	} else {
		get_data(Date.parse(from_date.toISOString()), Date.parse(from_date.addHours(length).toISOString()), init_highstock, add_data);
	}
}

function init_highstock(data, callback) {
	chart = new Highcharts.StockChart({
		chart : {
			renderTo : 'container',
			events : {
				load : function() {
					from_date = from_date.addHours(length);
					if (callback)
						callback();
				}
			}	
		},
		title : {
			text : 'AAPL Stock Price'
		},

		series : [{
			name : 'AAPL Stock Price',
			data : data,
			tooltip : {
				valueDecimals : 2
			}
		}],
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

function add_data(data) {
	// var point = chart.series[0].options.data;
	// point=point.concat(slice_data());
	// chart.series[0].setData(point,true);

	// for (var i = 0; i < data.length; i++) {
		// chart.series[0].addPoint(data[i], false, false);
		// // addPoint (Object options, [Boolean redraw], [Boolean shift], [Mixed animation])
	// }
	// chart.redraw();
	// // set navigate bar fix length
	// // chart.xAxis[0].setExtremes(Date.UTC(2006, 1, 1), Date.UTC(2006, 1, 3));
// 
	// chart.xAxis[0].setExtremes(Date.parse(bar_fix_from), Date.parse(bar_fix_to));
	console.log(1);
}

var get_data = function(from, to, callback) {
	c=arguments[3];
	$.getJSON('http://www.highcharts.com/samples/data/from-sql.php?start=' + from + '&end=' + to + '&callback=?', function(data) {
		if (data) {
			callback(data, c);
		}
		// get_data(from, to, callback);
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