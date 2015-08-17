// Brilliantech Gen File JS
var FileGen=FileGen||{
	default_options:{
	  host:'http://42.121.111.38:9003/'
	},
	url:{
		export_excel_url:this.host+'DHXFileService/Excel',
		export_bt_chart_excel_url:this.host+'BTReportService/ChartExcel',
		export_bt_excel_url:this.host+ 'BTReportService/Excel'
	},
	initilize:function(opt){
	 var options=($.isPlainObject(opt)||!opt)?$.extend(true,{},default_options,opt):$.extend({},default_options);
	}
};

