!function($){function UTCDate(){return new Date(Date.UTC.apply(Date,arguments))}function opts_from_el(el,prefix){var inkey,data=$(el).data(),out={},replace=new RegExp("^"+prefix.toLowerCase()+"([A-Z])"),prefix=new RegExp("^"+prefix.toLowerCase());for(var key in data)prefix.test(key)&&(inkey=key.replace(replace,function(_,a){return a.toLowerCase()}),out[inkey]=data[key]);return out}function opts_from_locale(lang){var out={};if(dates[lang]||(lang=lang.split("-")[0],dates[lang])){var d=dates[lang];return $.each(locale_opts,function(i,k){k in d&&(out[k]=d[k])}),out}}var $window=$(window),Datepicker=function(element,options){this._process_options(options),this.element=$(element),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on, .btn"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this.picker=$(DPGlobal.template),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&(this.picker.addClass("datepicker-rtl"),this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("tfoot th.today").attr("colspan",function(i,val){return parseInt(val)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};Datepicker.prototype={constructor:Datepicker,_process_options:function(opts){this._o=$.extend({},this._o,opts);var o=this.o=$.extend({},this._o),lang=o.language;switch(dates[lang]||(lang=lang.split("-")[0],dates[lang]||(lang=defaults.language)),o.language=lang,o.startView){case 2:case"decade":o.startView=2;break;case 1:case"year":o.startView=1;break;default:o.startView=0}switch(o.minViewMode){case 1:case"months":o.minViewMode=1;break;case 2:case"years":o.minViewMode=2;break;default:o.minViewMode=0}o.startView=Math.max(o.startView,o.minViewMode),o.weekStart%=7,o.weekEnd=(o.weekStart+6)%7;var format=DPGlobal.parseFormat(o.format);o.startDate!==-1/0&&(o.startDate=o.startDate?o.startDate instanceof Date?this._local_to_utc(this._zero_time(o.startDate)):DPGlobal.parseDate(o.startDate,format,o.language):-1/0),1/0!==o.endDate&&(o.endDate=o.endDate?o.endDate instanceof Date?this._local_to_utc(this._zero_time(o.endDate)):DPGlobal.parseDate(o.endDate,format,o.language):1/0),o.daysOfWeekDisabled=o.daysOfWeekDisabled||[],$.isArray(o.daysOfWeekDisabled)||(o.daysOfWeekDisabled=o.daysOfWeekDisabled.split(/[,\s]*/)),o.daysOfWeekDisabled=$.map(o.daysOfWeekDisabled,function(d){return parseInt(d,10)});var plc=String(o.orientation).toLowerCase().split(/\s+/g),_plc=o.orientation.toLowerCase();if(plc=$.grep(plc,function(word){return/^auto|left|right|top|bottom$/.test(word)}),o.orientation={x:"auto",y:"auto"},_plc&&"auto"!==_plc)if(1===plc.length)switch(plc[0]){case"top":case"bottom":o.orientation.y=plc[0];break;case"left":case"right":o.orientation.x=plc[0]}else _plc=$.grep(plc,function(word){return/^left|right$/.test(word)}),o.orientation.x=_plc[0]||"auto",_plc=$.grep(plc,function(word){return/^top|bottom$/.test(word)}),o.orientation.y=_plc[0]||"auto";else;},_events:[],_secondaryEvents:[],_applyEvents:function(evs){for(var el,ev,i=0;i<evs.length;i++)el=evs[i][0],ev=evs[i][1],el.on(ev)},_unapplyEvents:function(evs){for(var el,ev,i=0;i<evs.length;i++)el=evs[i][0],ev=evs[i][1],el.off(ev)},_buildEvents:function(){this.isInput?this._events=[[this.element,{focus:$.proxy(this.show,this),keyup:$.proxy(this.update,this),keydown:$.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:$.proxy(this.show,this),keyup:$.proxy(this.update,this),keydown:$.proxy(this.keydown,this)}],[this.component,{click:$.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:$.proxy(this.show,this)}]],this._secondaryEvents=[[this.picker,{click:$.proxy(this.click,this)}],[$(window),{resize:$.proxy(this.place,this)}],[$(document),{mousedown:$.proxy(function(e){this.element.is(e.target)||this.element.find(e.target).length||this.picker.is(e.target)||this.picker.find(e.target).length||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(event,altdate){var date=altdate||this.date,local_date=this._utc_to_local(date);this.element.trigger({type:event,date:local_date,format:$.proxy(function(altformat){var format=altformat||this.o.format;return DPGlobal.formatDate(date,format,this.o.language)},this)})},show:function(e){this.isInline||this.picker.appendTo("body"),this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.place(),this._attachSecondaryEvents(),e&&e.preventDefault(),this._trigger("show")},hide:function(){this.isInline||this.picker.is(":visible")&&(this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide"))},remove:function(){this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date},_utc_to_local:function(utc){return new Date(utc.getTime()+6e4*utc.getTimezoneOffset())},_local_to_utc:function(local){return new Date(local.getTime()-6e4*local.getTimezoneOffset())},_zero_time:function(local){return new Date(local.getFullYear(),local.getMonth(),local.getDate())},_zero_utc_time:function(utc){return new Date(Date.UTC(utc.getUTCFullYear(),utc.getUTCMonth(),utc.getUTCDate()))},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){return this.date},setDate:function(d){this.setUTCDate(this._local_to_utc(d))},setUTCDate:function(d){this.date=d,this.setValue()},setValue:function(){var formatted=this.getFormattedDate();this.isInput?this.element.val(formatted).change():this.component&&this.element.find("input").val(formatted).change()},getFormattedDate:function(format){return void 0===format&&(format=this.o.format),DPGlobal.formatDate(this.date,format,this.o.language)},setStartDate:function(startDate){this._process_options({startDate:startDate}),this.update(),this.updateNavArrows()},setEndDate:function(endDate){this._process_options({endDate:endDate}),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(daysOfWeekDisabled){this._process_options({daysOfWeekDisabled:daysOfWeekDisabled}),this.update(),this.updateNavArrows()},place:function(){if(!this.isInline){var calendarWidth=this.picker.outerWidth(),calendarHeight=this.picker.outerHeight(),visualPadding=10,windowWidth=$window.width(),windowHeight=$window.height(),scrollTop=$window.scrollTop(),zIndex=parseInt(this.element.parents().filter(function(){return"auto"!=$(this).css("z-index")}).first().css("z-index"))+10,offset=this.component?this.component.parent().offset():this.element.offset(),height=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),width=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),left=offset.left,top=offset.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(left-=calendarWidth-width)):(this.picker.addClass("datepicker-orient-left"),offset.left<0?left-=offset.left-visualPadding:offset.left+calendarWidth>windowWidth&&(left=windowWidth-calendarWidth-visualPadding));var top_overflow,bottom_overflow,yorient=this.o.orientation.y;"auto"===yorient&&(top_overflow=-scrollTop+offset.top-calendarHeight,bottom_overflow=scrollTop+windowHeight-(offset.top+height+calendarHeight),yorient=Math.max(top_overflow,bottom_overflow)===bottom_overflow?"top":"bottom"),this.picker.addClass("datepicker-orient-"+yorient),"top"===yorient?top+=height:top-=calendarHeight+parseInt(this.picker.css("padding-top")),this.picker.css({top:top,left:left,zIndex:zIndex})}},_allow_update:!0,update:function(){if(this._allow_update){var date,oldDate=new Date(this.date),fromArgs=!1;arguments&&arguments.length&&("string"==typeof arguments[0]||arguments[0]instanceof Date)?(date=arguments[0],date instanceof Date&&(date=this._local_to_utc(date)),fromArgs=!0):(date=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),delete this.element.data().date),this.date=DPGlobal.parseDate(date,this.o.format,this.o.language),fromArgs?this.setValue():date?oldDate.getTime()!==this.date.getTime()&&this._trigger("changeDate"):this._trigger("clearDate"),this.date<this.o.startDate?(this.viewDate=new Date(this.o.startDate),this.date=new Date(this.o.startDate)):this.date>this.o.endDate?(this.viewDate=new Date(this.o.endDate),this.date=new Date(this.o.endDate)):(this.viewDate=new Date(this.date),this.date=new Date(this.date)),this.fill()}},fillDow:function(){var dowCnt=this.o.weekStart,html="<tr>";if(this.o.calendarWeeks){var cell='<th class="cw">&nbsp;</th>';html+=cell,this.picker.find(".datepicker-days thead tr:first-child").prepend(cell)}for(;dowCnt<this.o.weekStart+7;)html+='<th class="dow">'+dates[this.o.language].daysMin[dowCnt++%7]+"</th>";html+="</tr>",this.picker.find(".datepicker-days thead").append(html)},fillMonths:function(){for(var html="",i=0;12>i;)html+='<span class="month">'+dates[this.o.language].monthsShort[i++]+"</span>";this.picker.find(".datepicker-months td").html(html)},setRange:function(range){range&&range.length?this.range=$.map(range,function(d){return d.valueOf()}):delete this.range,this.fill()},getClassNames:function(date){var cls=[],year=this.viewDate.getUTCFullYear(),month=this.viewDate.getUTCMonth(),currentDate=this.date.valueOf(),today=new Date;return date.getUTCFullYear()<year||date.getUTCFullYear()==year&&date.getUTCMonth()<month?cls.push("old"):(date.getUTCFullYear()>year||date.getUTCFullYear()==year&&date.getUTCMonth()>month)&&cls.push("new"),this.o.todayHighlight&&date.getUTCFullYear()==today.getFullYear()&&date.getUTCMonth()==today.getMonth()&&date.getUTCDate()==today.getDate()&&cls.push("today"),currentDate&&date.valueOf()==currentDate&&cls.push("active"),(date.valueOf()<this.o.startDate||date.valueOf()>this.o.endDate||-1!==$.inArray(date.getUTCDay(),this.o.daysOfWeekDisabled))&&cls.push("disabled"),this.range&&(date>this.range[0]&&date<this.range[this.range.length-1]&&cls.push("range"),-1!=$.inArray(date.valueOf(),this.range)&&cls.push("selected")),cls},fill:function(){{var tooltip,d=new Date(this.viewDate),year=d.getUTCFullYear(),month=d.getUTCMonth(),startYear=this.o.startDate!==-1/0?this.o.startDate.getUTCFullYear():-1/0,startMonth=this.o.startDate!==-1/0?this.o.startDate.getUTCMonth():-1/0,endYear=1/0!==this.o.endDate?this.o.endDate.getUTCFullYear():1/0,endMonth=1/0!==this.o.endDate?this.o.endDate.getUTCMonth():1/0;this.date&&this.date.valueOf()}this.picker.find(".datepicker-days thead th.datepicker-switch").text(dates[this.o.language].months[month]+" "+year),this.picker.find("tfoot th.today").text(dates[this.o.language].today).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot th.clear").text(dates[this.o.language].clear).toggle(this.o.clearBtn!==!1),this.updateNavArrows(),this.fillMonths();var prevMonth=UTCDate(year,month-1,28,0,0,0,0),day=DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(),prevMonth.getUTCMonth());prevMonth.setUTCDate(day),prevMonth.setUTCDate(day-(prevMonth.getUTCDay()-this.o.weekStart+7)%7);var nextMonth=new Date(prevMonth);nextMonth.setUTCDate(nextMonth.getUTCDate()+42),nextMonth=nextMonth.valueOf();for(var clsName,html=[];prevMonth.valueOf()<nextMonth;){if(prevMonth.getUTCDay()==this.o.weekStart&&(html.push("<tr>"),this.o.calendarWeeks)){var ws=new Date(+prevMonth+(this.o.weekStart-prevMonth.getUTCDay()-7)%7*864e5),th=new Date(+ws+(11-ws.getUTCDay())%7*864e5),yth=new Date(+(yth=UTCDate(th.getUTCFullYear(),0,1))+(11-yth.getUTCDay())%7*864e5),calWeek=(th-yth)/864e5/7+1;html.push('<td class="cw">'+calWeek+"</td>")}if(clsName=this.getClassNames(prevMonth),clsName.push("day"),this.o.beforeShowDay!==$.noop){var before=this.o.beforeShowDay(this._utc_to_local(prevMonth));void 0===before?before={}:"boolean"==typeof before?before={enabled:before}:"string"==typeof before&&(before={classes:before}),before.enabled===!1&&clsName.push("disabled"),before.classes&&(clsName=clsName.concat(before.classes.split(/\s+/))),before.tooltip&&(tooltip=before.tooltip)}clsName=$.unique(clsName),html.push('<td class="'+clsName.join(" ")+'"'+(tooltip?' title="'+tooltip+'"':"")+">"+prevMonth.getUTCDate()+"</td>"),prevMonth.getUTCDay()==this.o.weekEnd&&html.push("</tr>"),prevMonth.setUTCDate(prevMonth.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(html.join(""));var currentYear=this.date&&this.date.getUTCFullYear(),months=this.picker.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");currentYear&&currentYear==year&&months.eq(this.date.getUTCMonth()).addClass("active"),(startYear>year||year>endYear)&&months.addClass("disabled"),year==startYear&&months.slice(0,startMonth).addClass("disabled"),year==endYear&&months.slice(endMonth+1).addClass("disabled"),html="",year=10*parseInt(year/10,10);var yearCont=this.picker.find(".datepicker-years").find("th:eq(1)").text(year+"-"+(year+9)).end().find("td");year-=1;for(var i=-1;11>i;i++)html+='<span class="year'+(-1==i?" old":10==i?" new":"")+(currentYear==year?" active":"")+(startYear>year||year>endYear?" disabled":"")+'">'+year+"</span>",year+=1;yearCont.html(html)},updateNavArrows:function(){if(this._allow_update){var d=new Date(this.viewDate),year=d.getUTCFullYear(),month=d.getUTCMonth();switch(this.viewMode){case 0:this.picker.find(".prev").css(this.o.startDate!==-1/0&&year<=this.o.startDate.getUTCFullYear()&&month<=this.o.startDate.getUTCMonth()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(1/0!==this.o.endDate&&year>=this.o.endDate.getUTCFullYear()&&month>=this.o.endDate.getUTCMonth()?{visibility:"hidden"}:{visibility:"visible"});break;case 1:case 2:this.picker.find(".prev").css(this.o.startDate!==-1/0&&year<=this.o.startDate.getUTCFullYear()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(1/0!==this.o.endDate&&year>=this.o.endDate.getUTCFullYear()?{visibility:"hidden"}:{visibility:"visible"})}}},click:function(e){e.preventDefault();var target=$(e.target).closest("span, td, th");if(1==target.length)switch(target[0].nodeName.toLowerCase()){case"th":switch(target[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var dir=DPGlobal.modes[this.viewMode].navStep*("prev"==target[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,dir),this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,dir),1===this.viewMode&&this._trigger("changeYear",this.viewDate)}this.fill();break;case"today":var date=new Date;date=UTCDate(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0),this.showMode(-2);var which="linked"==this.o.todayBtn?null:"view";this._setDate(date,which);break;case"clear":var element;this.isInput?element=this.element:this.component&&(element=this.element.find("input")),element&&element.val("").change(),this._trigger("changeDate"),this.update(),this.o.autoclose&&this.hide()}break;case"span":if(!target.is(".disabled")){if(this.viewDate.setUTCDate(1),target.is(".month")){var day=1,month=target.parent().find("span").index(target),year=this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(month),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode&&this._setDate(UTCDate(year,month,day,0,0,0,0))}else{var year=parseInt(target.text(),10)||0,day=1,month=0;this.viewDate.setUTCFullYear(year),this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(UTCDate(year,month,day,0,0,0,0))}this.showMode(-1),this.fill()}break;case"td":if(target.is(".day")&&!target.is(".disabled")){var day=parseInt(target.text(),10)||1,year=this.viewDate.getUTCFullYear(),month=this.viewDate.getUTCMonth();target.is(".old")?0===month?(month=11,year-=1):month-=1:target.is(".new")&&(11==month?(month=0,year+=1):month+=1),this._setDate(UTCDate(year,month,day,0,0,0,0))}}},_setDate:function(date,which){which&&"date"!=which||(this.date=new Date(date)),which&&"view"!=which||(this.viewDate=new Date(date)),this.fill(),this.setValue(),this._trigger("changeDate");var element;this.isInput?element=this.element:this.component&&(element=this.element.find("input")),element&&element.change(),!this.o.autoclose||which&&"date"!=which||this.hide()},moveMonth:function(date,dir){if(!dir)return date;var new_month,test,new_date=new Date(date.valueOf()),day=new_date.getUTCDate(),month=new_date.getUTCMonth(),mag=Math.abs(dir);if(dir=dir>0?1:-1,1==mag)test=-1==dir?function(){return new_date.getUTCMonth()==month}:function(){return new_date.getUTCMonth()!=new_month},new_month=month+dir,new_date.setUTCMonth(new_month),(0>new_month||new_month>11)&&(new_month=(new_month+12)%12);else{for(var i=0;mag>i;i++)new_date=this.moveMonth(new_date,dir);new_month=new_date.getUTCMonth(),new_date.setUTCDate(day),test=function(){return new_month!=new_date.getUTCMonth()}}for(;test();)new_date.setUTCDate(--day),new_date.setUTCMonth(new_month);return new_date},moveYear:function(date,dir){return this.moveMonth(date,12*dir)},dateWithinRange:function(date){return date>=this.o.startDate&&date<=this.o.endDate},keydown:function(e){if(this.picker.is(":not(:visible)"))return void(27==e.keyCode&&this.show());var dir,newDate,newViewDate,dateChanged=!1;switch(e.keyCode){case 27:this.hide(),e.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;dir=37==e.keyCode?-1:1,e.ctrlKey?(newDate=this.moveYear(this.date,dir),newViewDate=this.moveYear(this.viewDate,dir),this._trigger("changeYear",this.viewDate)):e.shiftKey?(newDate=this.moveMonth(this.date,dir),newViewDate=this.moveMonth(this.viewDate,dir),this._trigger("changeMonth",this.viewDate)):(newDate=new Date(this.date),newDate.setUTCDate(this.date.getUTCDate()+dir),newViewDate=new Date(this.viewDate),newViewDate.setUTCDate(this.viewDate.getUTCDate()+dir)),this.dateWithinRange(newDate)&&(this.date=newDate,this.viewDate=newViewDate,this.setValue(),this.update(),e.preventDefault(),dateChanged=!0);break;case 38:case 40:if(!this.o.keyboardNavigation)break;dir=38==e.keyCode?-1:1,e.ctrlKey?(newDate=this.moveYear(this.date,dir),newViewDate=this.moveYear(this.viewDate,dir),this._trigger("changeYear",this.viewDate)):e.shiftKey?(newDate=this.moveMonth(this.date,dir),newViewDate=this.moveMonth(this.viewDate,dir),this._trigger("changeMonth",this.viewDate)):(newDate=new Date(this.date),newDate.setUTCDate(this.date.getUTCDate()+7*dir),newViewDate=new Date(this.viewDate),newViewDate.setUTCDate(this.viewDate.getUTCDate()+7*dir)),this.dateWithinRange(newDate)&&(this.date=newDate,this.viewDate=newViewDate,this.setValue(),this.update(),e.preventDefault(),dateChanged=!0);break;case 13:this.hide(),e.preventDefault();break;case 9:this.hide()}if(dateChanged){this._trigger("changeDate");var element;this.isInput?element=this.element:this.component&&(element=this.element.find("input")),element&&element.change()}},showMode:function(dir){dir&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+dir))),this.picker.find(">div").hide().filter(".datepicker-"+DPGlobal.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}};var DateRangePicker=function(element,options){this.element=$(element),this.inputs=$.map(options.inputs,function(i){return i.jquery?i[0]:i}),delete options.inputs,$(this.inputs).datepicker(options).bind("changeDate",$.proxy(this.dateUpdated,this)),this.pickers=$.map(this.inputs,function(i){return $(i).data("datepicker")}),this.updateDates()};DateRangePicker.prototype={updateDates:function(){this.dates=$.map(this.pickers,function(i){return i.date}),this.updateRanges()},updateRanges:function(){var range=$.map(this.dates,function(d){return d.valueOf()});$.each(this.pickers,function(i,p){p.setRange(range)})},dateUpdated:function(e){var dp=$(e.target).data("datepicker"),new_date=dp.getUTCDate(),i=$.inArray(e.target,this.inputs),l=this.inputs.length;if(-1!=i){if(new_date<this.dates[i])for(;i>=0&&new_date<this.dates[i];)this.pickers[i--].setUTCDate(new_date);else if(new_date>this.dates[i])for(;l>i&&new_date>this.dates[i];)this.pickers[i++].setUTCDate(new_date);this.updateDates()}},remove:function(){$.map(this.pickers,function(p){p.remove()}),delete this.element.data().datepicker}};var old=$.fn.datepicker;$.fn.datepicker=function(option){var args=Array.apply(null,arguments);args.shift();var internal_return;return this.each(function(){var $this=$(this),data=$this.data("datepicker"),options="object"==typeof option&&option;if(!data){var elopts=opts_from_el(this,"date"),xopts=$.extend({},defaults,elopts,options),locopts=opts_from_locale(xopts.language),opts=$.extend({},defaults,locopts,elopts,options);if($this.is(".input-daterange")||opts.inputs){var ropts={inputs:opts.inputs||$this.find("input").toArray()};$this.data("datepicker",data=new DateRangePicker(this,$.extend(opts,ropts)))}else $this.data("datepicker",data=new Datepicker(this,opts))}return"string"==typeof option&&"function"==typeof data[option]&&(internal_return=data[option].apply(data,args),void 0!==internal_return)?!1:void 0}),void 0!==internal_return?internal_return:this};var defaults=$.fn.datepicker.defaults={autoclose:!1,beforeShowDay:$.noop,calendarWeeks:!1,clearBtn:!1,daysOfWeekDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,orientation:"auto",rtl:!1,startDate:-1/0,startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0},locale_opts=$.fn.datepicker.locale_opts=["format","rtl","weekStart"];$.fn.datepicker.Constructor=Datepicker;var dates=$.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}},DPGlobal={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(year){return year%4===0&&year%100!==0||year%400===0},getDaysInMonth:function(year,month){return[31,DPGlobal.isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31][month]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(format){var separators=format.replace(this.validParts,"\x00").split("\x00"),parts=format.match(this.validParts);if(!separators||!separators.length||!parts||0===parts.length)throw new Error("Invalid date format.");return{separators:separators,parts:parts}},parseDate:function(date,format,language){if(date instanceof Date)return date;if("string"==typeof format&&(format=DPGlobal.parseFormat(format)),/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){var part,dir,part_re=/([\-+]\d+)([dmwy])/,parts=date.match(/([\-+]\d+)([dmwy])/g);date=new Date;for(var i=0;i<parts.length;i++)switch(part=part_re.exec(parts[i]),dir=parseInt(part[1]),part[2]){case"d":date.setUTCDate(date.getUTCDate()+dir);break;case"m":date=Datepicker.prototype.moveMonth.call(Datepicker.prototype,date,dir);break;case"w":date.setUTCDate(date.getUTCDate()+7*dir);break;case"y":date=Datepicker.prototype.moveYear.call(Datepicker.prototype,date,dir)}return UTCDate(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),0,0,0)}var val,filtered,part,parts=date&&date.match(this.nonpunctuation)||[],date=new Date,parsed={},setters_order=["yyyy","yy","M","MM","m","mm","d","dd"],setters_map={yyyy:function(d,v){return d.setUTCFullYear(v)},yy:function(d,v){return d.setUTCFullYear(2e3+v)},m:function(d,v){if(isNaN(d))return d;for(v-=1;0>v;)v+=12;for(v%=12,d.setUTCMonth(v);d.getUTCMonth()!=v;)d.setUTCDate(d.getUTCDate()-1);return d},d:function(d,v){return d.setUTCDate(v)}};setters_map.M=setters_map.MM=setters_map.mm=setters_map.m,setters_map.dd=setters_map.d,date=UTCDate(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);var fparts=format.parts.slice();if(parts.length!=fparts.length&&(fparts=$(fparts).filter(function(i,p){return-1!==$.inArray(p,setters_order)}).toArray()),parts.length==fparts.length){for(var i=0,cnt=fparts.length;cnt>i;i++){if(val=parseInt(parts[i],10),part=fparts[i],isNaN(val))switch(part){case"MM":filtered=$(dates[language].months).filter(function(){var m=this.slice(0,parts[i].length),p=parts[i].slice(0,m.length);return m==p}),val=$.inArray(filtered[0],dates[language].months)+1;break;case"M":filtered=$(dates[language].monthsShort).filter(function(){var m=this.slice(0,parts[i].length),p=parts[i].slice(0,m.length);return m==p}),val=$.inArray(filtered[0],dates[language].monthsShort)+1}parsed[part]=val}for(var _date,s,i=0;i<setters_order.length;i++)s=setters_order[i],s in parsed&&!isNaN(parsed[s])&&(_date=new Date(date),setters_map[s](_date,parsed[s]),isNaN(_date)||(date=_date))}return date},formatDate:function(date,format,language){"string"==typeof format&&(format=DPGlobal.parseFormat(format));var val={d:date.getUTCDate(),D:dates[language].daysShort[date.getUTCDay()],DD:dates[language].days[date.getUTCDay()],m:date.getUTCMonth()+1,M:dates[language].monthsShort[date.getUTCMonth()],MM:dates[language].months[date.getUTCMonth()],yy:date.getUTCFullYear().toString().substring(2),yyyy:date.getUTCFullYear()};val.dd=(val.d<10?"0":"")+val.d,val.mm=(val.m<10?"0":"")+val.m;for(var date=[],seps=$.extend([],format.separators),i=0,cnt=format.parts.length;cnt>=i;i++)seps.length&&date.push(seps.shift()),date.push(val[format.parts[i]]);return date.join("")},headTemplate:'<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};DPGlobal.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+DPGlobal.headTemplate+"<tbody></tbody>"+DPGlobal.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+DPGlobal.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+DPGlobal.footTemplate+"</table></div></div>",$.fn.datepicker.DPGlobal=DPGlobal,$.fn.datepicker.noConflict=function(){return $.fn.datepicker=old,this},$(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(e){var $this=$(this);$this.data("datepicker")||(e.preventDefault(),$this.datepicker("show"))}),$(function(){$('[data-provide="datepicker-inline"]').datepicker()})}(window.jQuery);