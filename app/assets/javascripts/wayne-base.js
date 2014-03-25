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
        if(typeof p[i]=='object'){
            c[i] = (p[i].constructor==Array) ? [] : {};
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