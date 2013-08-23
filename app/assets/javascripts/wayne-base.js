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
//yy-mm-dd hh:ii格式解析
function standardParse(date_value){
    var date_value=(date_value.replace(/\s/g,"-").replace(/:/g,"-")).split("-");
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
        date_template["1"]="0"+(parseInt(date_template["1"])-1).toString();
    }
    return new Date(date_template["0"],date_template["1"],date_template["2"],date_template["3"],date_template["4"])
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
//得到日期，登出该日期的最后一天的日期以及年份
function last_date_of_week(date_value){
    var date=standardParse(date_value),endDate;
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
//compare time,return first and last
function compare_time(begin_time,end_time){
    var begin=standardParse(begin_time)-standardParse(end_time)<=0?begin_time:end_time;
    var end=standardParse(begin_time)-standardParse(end_time)>=0?begin_time:end_time;
    return{
        begin:begin,
        end:end
    }
}