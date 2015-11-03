//保持event兼容性
function adapt_event(event) {
    var e = event ? event : window.event;
    var target = e.target ? e.target : e.srcElement;
    return {
        event: e,
        target: target
    }
}
//阻止冒泡事件
function stop_propagation(event) {
    var e = adapt_event(event);
    var event = e.event;
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}
//从月份转化为季度
if(!Date.prototype.monthToQuarter){
    Date.prototype.monthToQuarter=function(){
        switch(Math.floor(this.getMonth()/3)){
            case 0:
                return 1;
            break;
            case 1:
                return 2;
                break;
            case 2:
                return 3;
                break;
            case 3:
                return 4;
                break;
        }
    }
}
//化为标准格式显示用
if(!Date.prototype.toWayneString){
    Date.prototype.toWayneString=function(){
       var second=this.getSeconds()<10?"0"+this.getSeconds():this.getSeconds();
       var minute=this.getMinutes()<10?"0"+this.getMinutes():this.getMinutes();
       var hour=this.getHours()<10?"0"+this.getHours():this.getHours();
       var day=this.getDate()<10?"0"+this.getDate():this.getDate();
       var month=this.getMonth()+1<10?"0"+(this.getMonth()+1):this.getMonth()+1;
       var year=this.getFullYear();
       return{
            second: year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second,
            minute: year+"-"+month+"-"+day+" "+hour+":"+minute,
            hour:year+"-"+month+"-"+day+" "+hour+":00",
            day:year+"-"+month+"-"+day,
            week:year+"-"+month+"-"+day,
            month:year+"-"+month,
            quarter:year+"-"+month,
            year:year.toString()
       }
    }
}
//化为标准格式显示用
if(!Date.prototype.toWangString){
    Date.prototype.toWangString=function(interval){
        var second=this.getSeconds()<10?"0"+this.getSeconds():this.getSeconds();
        var minute=this.getMinutes()<10?"0"+this.getMinutes():this.getMinutes();
        var hour=this.getHours()<10?"0"+this.getHours():this.getHours();
        var day=this.getDate()<10?"0"+this.getDate():this.getDate();
        var month=this.getMonth()+1<10?"0"+(this.getMonth()+1):this.getMonth()+1;
        var year=this.getFullYear();
        var string="";
        switch(interval){
            case "90":
                string= year+"-"+month+"-"+day+" "+hour+":00";
                break;
            case "100":
                string= year+"-"+month+"-"+day;
                break;
            case "200":
                string= year+"-"+month+"-"+day;
                break;
            case "300":
                string= year+"-"+month;
                break;
            case "400":
                string= year+"-"+month;
                break;
            case "500":
                string= year.toString();
                break;
        }
        return string;
    }
}
//yy-mm-dd hh:ii格式解析
function standardParse(date_value){
    var date_value=(date_value.replace(/\s/g,"-").replace(/:/g,"-").replace(/T/g,"-")).split("-");
    var date_template={
        "0":'0000',
        "1":'00',
        "2":'01',
        "3":'00',
        "4":'00'
    };
    for (var i=0;i<date_value.length;i++){
        date_template[i.toString()]=date_value[i];
    }
    if(date_template["1"]!="00"){
        date_template["1"]=(parseInt(date_template["1"])-1).toString();
    }
    return {
        date:new Date(date_template["0"],date_template["1"],date_template["2"],date_template["3"],date_template["4"]),
        template:date_template
    }
}
//获取窗口可视部分的宽、高
function inner_size(){
    var width,height
    if (window.innerWidth)
        width = window.innerWidth;
    else if (document.body.clientWidth)
        width = document.body.clientWidth;
    if (window.innerHeight)
        height = window.innerHeight;
    else if (document.body.clientHeight)
        height = document.body.clientHeight;
    return {
        height:height,
        width:width
    }
}
//得到日期，登出该日期所在周的最后一天的日期以及年份
function last_date_of_week(date_value){
    var date=new Date(date_value),endDate;
    if(date.getDay() == 0) {
        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    } else {
        endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
    }
    return {
        date:endDate,
        year:endDate.getFullYear()
    }
}
//得到日期，登出该日期所在周的第一天的日期以及年份
function first_date_of_week(date_value){
    var date=new Date(date_value),beginDate;
    if(date.getDay() == 1) {
        beginDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    } else {
        beginDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() +1 );
    }
    return {
        date:beginDate,
        year:beginDate.getFullYear()
    }
}
//得到日期，返回所在周
if(!Date.prototype.toWeekNumber){
    Date.prototype.toWeekNumber=function(){
        this.setHours(0, 0, 0);
        this.setDate(this.getDate() + 4 - (this.getDay() || 7));
        var yearStart = new Date(this.getFullYear(), 0, 1);
        var weekNo = Math.ceil(( ( (this - yearStart) / 86400000) + 1) / 7);
        return  weekNo;
    }
}

if(!Date.prototype.endOfHour){
 Date.prototype.endOfHour=function(){
   this.setMinutes(59,59,999);
   return this;
 }
}

// get end of day
if(!Date.prototype.endOfDay){
   Date.prototype.endOfDay=function(){
     this.setHours(23,59,59,999);
	 return this;
   }
}
// get end of week
if(!Date.prototype.endOfWeek){
 Date.prototype.endOfWeek=function(){
   var day=this.getDay()==0 ? 7 : (this.getDay());
  var first=this.getDate()-day+1;
  var last=first+6;
  return new Date(this.setDate(last)).endOfDay();
 }
}

// get end of month
if(!Date.prototype.endOfMonth){
  Date.prototype.endOfMonth=function(){
    var year=this.getFullYear();
	var month=this.getMonth();
    return new Date(new Date(this.getFullYear(),this.getMonth()+1,1)-1).endOfDay();
  }
}

// get end of quarter
if(!Date.prototype.endOfQuarter){
  Date.prototype.endOfQuarter=function(){
   return  new Date(this.getFullYear(),Math.ceil(this.getMonth()/3)*3-1,1).endOfMonth();
  }
}

// get end of year
if(!Date.prototype.endOfYear){
 Date.prototype.endOfYear=function(){
   return new Date(this.getFullYear(),11,31).endOfDay();
 }
}

//compare time,return first and last
function compare_time(begin_time,end_time){
    var begin=standardParse(begin_time).date-standardParse(end_time).date<=0?begin_time:end_time;
    var end=standardParse(begin_time).date-standardParse(end_time).date>=0?begin_time:end_time;
    return{
        begin:begin,
        end:end
    }
}
//深度拷贝
function deepCopy(p,c){
    var c= c || {};
    for(var i in p){
        if(typeof p[i]==='object' && p[i] !== null){
            c[i] = (p[i].constructor===Array) ? [] : {};
            deepCopy(p[i],c[i])
        }
        else{
            c[i]=p[i]
        }
    }
    return c
}

//计算百分率
function TCR(a,t){
    var a=parseFloat(a);
    var t=parseFloat(t);
    var judge= (a / t) < 1 ? "low" : ((a / t) == 1 ? "middle" : "high");
    return {
        value: (a / t * 100).toFixed(1)+" %",
        judge: judge
    }
}
//show loading
function show_loading(top,right,bottom,left){
    var body=document.getElementsByTagName("body")[0];
    var loading=document.createElement("div");
    loading.className="loading";
    loading.innerHTML="<p>Wait a minute , it's coming </p>";
    loading.setAttribute("id","loading");
    loading.setAttribute("style","top:"+top+"px;right:"+right+"px;bottom:"+bottom+"px;left:"+left+"px;");
    body.appendChild(loading);
}
function remove_loading(){
    var body=document.getElementsByTagName("body")[0];
    var loading=document.getElementById("loading");
    body.removeChild(loading);
}
//dashboard-add show loading
function dashboard_show_loading(out_id){
    $("#"+out_id).prepend(
        $("<div />").addClass("dashboard-show-loading")
            .append($("<i />").addClass("icon-spinner icon-spin icon-2x"))
    );
    if(arguments.length>1){
        var top=arguments[1],right=arguments[2],bottom=arguments[3],left=arguments[4];
        $("#"+out_id).find(".dashboard-show-loading").css("top",top).css("right",right).css("bottom",bottom).css("left",left);
    }
}
function dashboard_remove_loading(out_id){
    $("#"+out_id).find(".dashboard-show-loading").remove();
}
//数组中去除重复元素
Array.prototype.strip = function(){
    if (this.length<2) return [this[0]] || [];
    var arr = [];
    for (var i=0;i<this.length;i++)
    {
        arr.push(this.splice(i--,1));
        for (var j=0; j<this.length; j++)
        {
            if (this[j] == arr[arr.length -1])
            {
                this.splice(j--,1);
            }
        }
    }
    return arr;
}
