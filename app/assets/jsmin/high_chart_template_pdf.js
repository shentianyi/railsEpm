var ANALYTICS=ANALYTICS||{};ANALYTICS.loading_data=!1,ANALYTICS.url="http://42.121.111.38:9002/HighChartsFileService/",ANALYTICS.high_chart={chart:{spacingLeft:5,spacingRight:5,marginTop:30,animation:{duration:800},events:{}},title:{text:null},credits:{enabled:!1},rangeSelector:{enabled:!1},scrollbar:{liveRedraw:!1},navigator:{enabled:!0,series:{id:"navigator"}},tooltip:{formatter:function(){var target=this.points[0],new_target=target.series.name.replace("(","#").replace(")","#").split("#"),name=new_target[0],view=new_target[1];return"column"==target.series.type?"<b>"+target.key+'</b><br />KPI: <span style="color:'+target.series.color+'">'+name+"</span><br />"+I18n.t("chart.view")+": "+view+"<br />"+I18n.t("chart.value")+": "+target.y+" "+target.point.unit+"<br />"+I18n.t("chart.target_range")+": "+target.point.target_min+"-"+target.point.high:"<b>"+target.key+'</b><br />KPI: <span style="color:'+target.series.color+'">'+name+"</span><br />"+I18n.t("chart.view")+": "+view+"<br />"+I18n.t("chart.value")+": "+target.y+" "+target.point.unit+"<br />"+I18n.t("chart.target_range")+": "+target.point.low+"-"+target.point.high}},legend:{enabled:!1,borderRadius:2,borderColor:"rgba(0,0,0,0)",itemStyle:{color:"rgba(0,0,0,0.8)"},animation:!0,maxHeight:40,itemMarginBottom:-2},plotOptions:{series:{animation:!1,enableMouseTracking:!1,shadow:!1,cursor:"pointer",point:{events:{}},marker:{enabled:!0,fillColor:null,lineColor:"white",states:{select:{fillColor:null,lineColor:"white"}}},turboThreshold:1e4,states:{select:{color:null,borderColor:null}},events:{}},arearange:{fillOpacity:.1,fillColor:"rgba(177,211,221,0.2)",lineColor:"rgba(177,211,221,0.2)",color:"rgba(177,211,221,0.2)",stickyTracking:!1,trackByArea:!1,zIndex:-1,tooltip:{tooltip:function(){return!1}},showInLegend:!1},line:{lineWidth:3,marker:{lineWidth:2,radius:4,symbol:"diamond"},events:{mouseOver:function(){this.data.length>1&&this.graph.attr("zIndex",99)},mouseOut:function(){this.data.length>1&&this.graph.attr("zIndex",this.index)}}},scatter:{marker:{radius:4,symbol:"circle"}},area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"rgba(70,174,240,1)"],[1,"rgba(70,174,240,0.55)"]]},lineColor:"rgba(70,174,240,1)",marker:{lineWidth:0,radius:0}}},xAxis:{lineWidth:0,tickWidth:0,offset:5,ordinal:!0,labels:{style:{color:"rgba(0,0,0,0.4)"}},minPadding:.02,maxPadding:.02,minRange:36e5,type:"datetime",dateTimeLabelFormats:{hour:"%H:%M<br />%e/%b",day:"%e<br />%b",week:"Week<br />%W",month:"%b<br />%Y",year:"%Y"},events:{setExtremes:function(e){("navigator"==e.trigger||"pan"==e.trigger)&&(bar_fix_from=e.min,bar_fix_to=e.max)}}},yAxis:{gridLineColor:"#ddd",gridLineDashStyle:"Dot",offset:-25,showFirstLabel:!1,min:0,title:{enabled:!1},labels:{style:{color:"rgba(0,0,0,0.25)"},y:-2}}},ANALYTICS.form_chart=function(option){ANALYTICS.loading_data=!0;var bar_fix_from,bar_fix_to,begin_time_utc=standardParse(option.begin_time).date,end_time_utc=standardParse(option.end_time).date,length=24,data_too_long=ANALYTICS.add_observe[option.interval](begin_time_utc,length)<end_time_utc?!0:!1;bar_fix_from=Date.parse(begin_time_utc),bar_fix_to=Date.parse(ANALYTICS.add_observe[option.interval](begin_time_utc,length)<=end_time_utc?ANALYTICS.add_observe[option.interval](begin_time_utc,length):end_time_utc);var top=parseInt($("#analytics-condition").height())+parseInt($("#analytics-condition").css("top"));(null==option.show_loading||option.show_loading)&&show_loading(top,0,0,0),$.post("/kpi_entries/analyse",{kpi:option.kpi_id,average:"0"==option.method,entity_group:option.view,startTime:new Date(bar_fix_from).toISOString(),endTime:new Date(bar_fix_to).toISOString(),interval:option.interval},function(msg){if((null==option.show_loading||option.show_loading)&&remove_loading(),msg.result){for(var data_length=msg.object.current.length,data_array=[],i=0;data_length>i;i++)data_array[i]={},data_array[i].y=msg.object.current[i],data_array[i].high=msg.object.target_max[i],data_array[i].low=msg.object.target_min[i],data_array[i].unit=msg.object.unit[i],data_array[i].id=option.id;option.data=data_array;var c={},p=option.data;ANALYTICS.chartSeries.series[option.id][option.interval]=deepCopy(c,p),option.chart_body_close_validate&&(ANALYTICS.render_to(option),new Highcharts.StockChart(ANALYTICS.high_chart)),ANALYTICS.add_series(option),ANALYTICS.proper_type_for_chart(option),data_too_long&&(option.begin_time_utc=begin_time_utc,option.end_time_utc=end_time_utc,option.bar_fix_from=bar_fix_from,option.bar_fix_to=bar_fix_to,option.add_length=100,ANALYTICS.add_data(option)),ANALYTICS.loading_data=!1}else MessageBox("sorry , something wrong","top","warning")})},ANALYTICS.form_chart_without_ajax=function(option,data){ANALYTICS.loading_data=!0;var bar_fix_from,bar_fix_to,begin_time_utc=standardParse(option.begin_time).date,end_time_utc=standardParse(option.end_time).date,length=24,data_too_long=ANALYTICS.add_observe[option.interval](begin_time_utc,length)<end_time_utc?!0:!1;bar_fix_from=Date.parse(begin_time_utc),bar_fix_to=Date.parse(ANALYTICS.add_observe[option.interval](begin_time_utc,length)<=end_time_utc?ANALYTICS.add_observe[option.interval](begin_time_utc,length):end_time_utc);for(var data_length=data.current.length,data_array=[],i=0;data_length>i;i++)data_array[i]={},data_array[i].y=data.current[i],data_array[i].high=data.target_max[i],data_array[i].low=data.target_min[i],data_array[i].unit=data.unit[i],data_array[i].id=option.id;option.data=data_array;var c={},p=option.data;ANALYTICS.chartSeries.series[option.id][option.interval]=deepCopy(c,p),option.chart_body_close_validate&&(ANALYTICS.render_to(option),new Highcharts.StockChart(ANALYTICS.high_chart)),ANALYTICS.add_series(option),ANALYTICS.proper_type_for_chart(option),data_too_long&&(option.begin_time_utc=begin_time_utc,option.end_time_utc=end_time_utc,option.bar_fix_from=bar_fix_from,option.bar_fix_to=bar_fix_to,option.add_length=100,ANALYTICS.add_data(option)),ANALYTICS.loading_data=!1},ANALYTICS.add_data=function(option){var begin_time_utc=ANALYTICS.add_observe[option.interval](option.begin_time_utc,option.add_length),length=option.add_length,next_date=ANALYTICS.add_observe[option.interval](begin_time_utc,length)>option.end_time_utc?option.end_time_utc:ANALYTICS.add_observe[option.interval](begin_time_utc,length);option.data_too_long=ANALYTICS.add_observe[option.interval](begin_time_utc,length)<option.end_time_utc?!0:!1,$.post("/kpi_entries/analyse",{kpi:option.kpi_id,average:"0"==option.method,entity_group:option.view,startTime:begin_time_utc.toISOString(),endTime:next_date.toISOString(),interval:option.interval},function(msg){if(msg.result){for(var data_length=msg.object.current.length,data_array=[],i=0;data_length>i;i++)data_array[i]={},data_array[i].y=msg.object.current[i],data_array[i].high=msg.object.target_max[i],data_array[i].low=msg.object.target_min[i],data_array[i].unit=msg.object.unit[i],data_array[i].id=option.id;option.data=data_array;var c={},p=option.data;ANALYTICS.chartSeries.series[option.id][option.interval].concat(deepCopy(c,p));var chart=$("#"+option.target).highcharts(),point=chart.series[option.id+1].options.data;point=point.concat(data_array),option.data=point;var new_data=ANALYTICS.deal_data(option);chart.series[option.id+1].setData(new_data,!1),chart.series[0].setData(new_data,!1),chart.redraw(),option.data_too_long&&(option.begin_time_utc=begin_time_utc,ANALYTICS.add_data(option))}else MessageBox("sorry , something wrong","top","warning")})},ANALYTICS.series_colors=["#97cbe4","#f99c92","#81dfcd","#ffdb6d","#82d9e7","#dabeea","#6485a7","#f9b360","#94cd7b","#69b0bd"],ANALYTICS.set_data=function(option){this.date=option.begin_time?standardParse(option.begin_time).date:null,this.template=option.begin_time?standardParse(option.begin_time).template:null,this.data=option.data?option.data:null,this.chart_container=option.target?option.target:null,this.chart=option.target?$("#"+option.target).highcharts():null,this.series_id=null!==option.id?option.id:null,this.type=option.type?option.type:null,this.interval=option.interval?option.interval:null,this.id=null!==option.id?option.id:null,this.count=option.count?option.count:null,this.view=option.view?option.view:null,this.view_text=option.view_text?option.view_text:null,this.kpi_name=option.kpi?option.kpi:null},ANALYTICS.render_to=function(option){ANALYTICS.high_chart.chart.renderTo=option.target,Highcharts.dateFormats={W:function(timestamp){var d=new Date(timestamp);d.setHours(0,0,0),d.setDate(d.getDate()+4-(d.getDay()||7));var yearStart=new Date(d.getFullYear(),0,1),weekNo=Math.ceil(((d-yearStart)/864e5+1)/7);return weekNo},YW:function(timestamp){var d=new Date(timestamp);return d.setHours(0,0,0),d.setDate(d.getDate()+4-(d.getDay()||7)),d.getFullYear()}}},ANALYTICS.add_series=function(option){var series_name=option.kpi,series_id=option.id,chart_container=option.target,data=ANALYTICS.deal_data(option),color=option.color?option.color:ANALYTICS.series_colors[series_id%ANALYTICS.series_colors.length];$("#"+chart_container).highcharts().addSeries({name:series_name,id:series_id,color:color,data:data})},ANALYTICS.deal_data=function(){ANALYTICS.set_data.apply(this,arguments);var i,data=this.data;switch(this.interval){case"90":for(i=0;i<data.length;i++)data[i].x=Date.UTC(this.template[0],this.template[1],this.template[2],parseInt(this.template[3])+i),data[i].name=new Date(this.template[0],this.template[1],this.template[2],parseInt(this.template[3])+i).toWayneString().hour;return data;case"100":for(i=0;i<this.data.length;i++)this.data[i].x=Date.UTC(this.template[0],this.template[1],parseInt(this.template[2])+i),this.data[i].name=new Date(this.template[0],this.template[1],parseInt(this.template[2])+i).toWayneString().day;return data;case"200":for(i=0;i<this.data.length;i++){var week_template=standardParse(last_date_of_week(Date.UTC(this.template[0],this.template[1],parseInt(this.template[2])+7*i)).date.toWayneString().day).template;this.data[i].x=Date.UTC(week_template[0],week_template[1],week_template[2]),this.data[i].name=new Date(this.template[0],this.template[1],parseInt(this.template[2])+7*i).toWayneString().day+" week"+new Date(this.template[0],this.template[1],parseInt(this.template[2])+7*i).toWeekNumber()}return data;case"300":for(i=0;i<this.data.length;i++)this.data[i].x=Date.UTC(this.template[0],parseInt(this.template[1])+i),this.data[i].name=new Date(this.template[0],parseInt(this.template[1])+i).toWayneString().month;return data;case"400":for(i=0;i<this.data.length;i++){var first_month_of_quarter=3*Math.floor(parseInt(this.template[1])/3);this.data[i].x=Date.UTC(this.template[0],first_month_of_quarter+3*i),this.data[i].name=new Date(this.template[0],parseInt(this.template[1])+3*i).getFullYear()+" quarter "+new Date(this.template[0],parseInt(this.template[1])+3*i).monthToQuarter()}return data;case"500":for(i=0;i<this.data.length;i++)this.data[i].x=Date.UTC(parseInt(this.template[0])+i,0),this.data[i].name=new Date(parseInt(this.template[0])+i,0).toWayneString().year;return data}},ANALYTICS.proper_type_for_chart=function(){ANALYTICS.set_data.apply(this,arguments);var c,obj=this,name=null===obj.kpi_name?this.chart.get(this.id).options.name:obj.kpi_name+"("+obj.view_text+")",p={name:name,id:this.chart.get(this.id).options.id,color:this.chart.get(this.id).color,data:this.chart.get(this.id).options.data},new_series=deepCopy(p,c);if("column"==this.type)for(var i=0;i<new_series.data.length;i++)new_series.data[i].target_min=new_series.data[i].low,new_series.data[i].low=0;else if(void 0!==new_series.data[0].target_min)for(var i=0;i<new_series.data.length;i++)new_series.data[i].low=new_series.data[i].target_min;new_series.type=this.type,this.chart.get(this.id).remove(!1),this.chart.addSeries(new_series,!1),this.chart.redraw()},ANALYTICS.chartSeries={count:0,id_count:0,id:0,series:[],id_array:[],id_give:function(){if(this.count>this.id_array.length)this.id=this.id_count,this.id_array.push(this.id_count),this.id_count++;else{var i,index,array=this.id_array;for(i=0;i<array.length;i++)if(void 0===array[i]){array[i]=i,index=i;break}this.id=index}},getCount:function(){return this.count},addCount:function(){this.count+=1},minusCount:function(){this.count-=1},getSeries:function(){return this.series},addSeries:function(series){if(this.count>this.series.length)this.series.push(series);else{var i,series_array=this.series;for(i=0;i<series_array.length;i++)if(void 0===series_array[i]){series_array[i]=series;break}}}},ANALYTICS.add_observe={90:function(UTCTime,addTime){var parse_date=Date.parse(UTCTime),old_date=new Date(parse_date),date=old_date.setHours(old_date.getHours()+parseInt(addTime));return new Date(date)},100:function(UTCTime,addTime){var parse_date=Date.parse(UTCTime),old_date=new Date(parse_date),date=old_date.setDate(old_date.getDate()+parseInt(addTime));return new Date(date)},200:function(UTCTime,addTime){var parse_date=Date.parse(UTCTime),old_date=new Date(parse_date),date=old_date.setDate(old_date.getDate()+7*parseInt(addTime));return new Date(date)},300:function(UTCTime,addTime){var parse_date=Date.parse(UTCTime),old_date=new Date(parse_date),date=old_date.setMonth(old_date.getMonth()+parseInt(addTime));return new Date(date)},400:function(UTCTime,addTime){var parse_date=Date.parse(UTCTime),old_date=new Date(parse_date),date=old_date.setMonth(old_date.getMonth()+3*parseInt(addTime));return new Date(date)},500:function(UTCTime,addTime){var parse_date=Date.parse(UTCTime),old_date=new Date(parse_date),date=old_date.setFullYear(old_date.getFullYear()+parseInt(addTime));return new Date(date)}};