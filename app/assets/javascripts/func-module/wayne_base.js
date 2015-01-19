define(["jquery"],function($){
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
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
    return{
        MessageBox:function(str, position, type) {
            $('#MessageBox').addClass(type).addClass(position).find("p").text(str);
            $('#MessageBox').slideDown("2500");
            setTimeout(function () {
                $("#MessageBox").slideUp("2500");
            }, 2500)
        },
        //保持event兼容性
        adapt_event:function(event) {
            var e = event ? event : window.event;
            var target = e.target ? e.target : e.srcElement;
            return {
                event: e,
                target: target
            }
        },
        //阻止冒泡事件
        stop_propagation:function(event) {
            var e = this.adapt_event(event);
            var event = e.event;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            else {
                event.cancelBubble = true;
            }
        },
        //只能输入数字和小数点,可以0开头，最多两位
        clearNoNumZero:function(obj) {
            //先把非数字的都替换掉，除了数字和.
            obj.value = obj.value.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            obj.value = obj.value.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            obj.value = obj.value.replace(/\.{2}/g, ".");
            obj.value = obj.value.replace(/^0{2}/g, "0");
            obj.value = obj.value.replace(/^0\d+/g, "0");
            //保证.只出现一次，而不能出现两次以上
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        },
        setSelectionRange:function(input, selectionStart, selectionEnd) {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(selectionStart, selectionEnd);
            }
            else if (input.createTextRange) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', selectionEnd);
                range.moveStart('character', selectionStart);
                range.select();
            }
        },
        setCaretToPos:function (input, pos) {
            this.setSelectionRange(input, pos, pos);
        },
        isEmail:function(v) {
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
            return reg.test(v);
        },
        //yy-mm-dd hh:ii格式解析
        standardParse:function(date_value){
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
        },
        //深度拷贝
        deepCopy:function(p,c){
            var c= c || {};
            for(var i in p){
                if(typeof p[i]==='object' && p[i] !== null){
                    c[i] = (p[i].constructor===Array) ? [] : {};
                    this.deepCopy(p[i],c[i])
                }
                else{
                    c[i]=p[i]
                }
            }
            return c
        },
        //只能输入数字,不能0开头
        inputOnlyPositiveNumber:function(obj) {
        //先把非数字的都替换掉，除了数字
        obj.value = obj.value.replace(/[^\d]/g, "");
        //不能0开头
        obj.value = obj.value.replace(/^0+/g, "");
    }
    }
})

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

//compare time,return first and last
function compare_time(begin_time,end_time){
    var begin=standardParse(begin_time).date-standardParse(end_time).date<=0?begin_time:end_time;
    var end=standardParse(begin_time).date-standardParse(end_time).date>=0?begin_time:end_time;
    return{
        begin:begin,
        end:end
    }
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

// ws: 判断数字是否是非负数
function isNotNegaNum(v) {
    if (!isNaN(v)) {
        var reg = /^([0-9]\d*|\d+\.\d+)$/;
        return reg.test(v);
    }
    return false;
}

// ws : 判断数字是否是正整数
function isPositiveInt(v) {
    if (!isNaN(v)) {
        var reg = /^[1-9]\d*$/;
        return reg.test(v);
    }
    return false;
}

// ws : 判断数字是否是正数
function isPositiveNum(v) {
    if (!isNaN(v)) {
        var reg = /^([1-9]\d*|\d+\.\d+)$/;
        return reg.test(v);
    }
    return false;
}

// ws : 验证邮件


// ws : 显示处理窗口
function show_handle_dialog() {
    document.getElementById('handle-dialog-modal').style.display = 'block';
    document.getElementById('dialog-overlay').style.display = 'block';
}

// ws : 隐藏处理窗口
function hide_handle_dialog() {
    document.getElementById('handle-dialog-modal').style.display = 'none';
    document.getElementById('dialog-overlay').style.display = 'none';
}


function change_label_to_text(obj) {
    var tag = obj.firstChild.tagName;
    if (typeof (tag) != "undefined" && (tag == "INPUT" || tag == "TEXTAREA"))
        return;
    var val = obj.innerHTML;
    var txt = document.createElement("INPUT");
    txt.value = val;
    txt.style.background = "#FFC";
    txt.style.width = obj.offsetWidth + "px";
    obj.innerHTML = "";
    obj.appendChild(txt);
    txt.focus();
    txt.onblur = function (e) {
        if (txt.value.length == 0)
            txt.value = val;
        obj.innerHTML = txt.value;
    }
}

function trimEnd(str) {
    var reg = /,$/gi;
    return str.replace(reg, "");
}

function isIntBetween(i, j, p) {
    if (isPositiveInt(p)) {
        return p >= i && p <= j;
    }
    return false;
}

function flash_message(obj, times) {
    var i = 0, t = false, times = times || 4;
    if (t)
        return;
    t = setInterval(function () {
        i++;
        if (i % 2 == 0) {
            $(obj).hide();
        } else {
            $(obj).show();
        }
        if (i == times * 2) {
            clearInterval(t);
        }
    }, 300);
}

function flash_hidden_message(obj, times) {
    var i = 0, t = false, times = times || 4;
    if (t)
        return;
    t = setInterval(function () {
        i++;
        if (i % 2 == 0) {
            $(obj).css("visibility", "hidden");
        } else {
            $(obj).css("visibility", "visible");
        }
        if (i == times * 2) {
            clearInterval(t);
        }
    }, 300);
}



Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


function slide_box(text, success) {
    var message_selector = "#slide_box";
    var messageSuccess = "messageSuccess";
    var messageFail = "messageFail";
    var insert_class = (success == true ? messageSuccess : messageFail);
    $(message_selector).removeClass(messageSuccess);
    $(message_selector).removeClass(messageFail);
    $(message_selector).addClass(insert_class);
    $(message_selector).children().first().text(text);
    $(message_selector).slideDown();
    setTimeout(function () {
        $(message_selector).slideUp();
    }, "4000")
}