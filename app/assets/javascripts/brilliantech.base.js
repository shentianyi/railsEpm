
// ws: 判断数字是否是非负数
function isNotNegaNum(v) {
     if(!isNaN(v)) {
          var reg = /^([0-9]\d*|\d+\.\d+)$/;
          return reg.test(v);
     }
     return false;
}

// ws : 判断数字是否是正整数
function isPositiveInt(v) {
     if(!isNaN(v)) {
          var reg = /^[1-9]\d*$/;
          return reg.test(v);
     }
     return false;
}

// ws : 判断数字是否是正数
function isPositiveNum(v) {
     if(!isNaN(v)) {
          var reg = /^([1-9]\d*|\d+\.\d+)$/;
          return reg.test(v);
     }
     return false;
}

// ws : 验证邮件
function isEmail(v) {
     var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
     return reg.test(v);
}

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

function MessageBox(str,position, type) {
     $('#MessageBox').addClass(type).addClass(position).find("p").text(str);
     $('#MessageBox').slideDown("2500");
     setTimeout(function(){
         $("#MessageBox").slideUp("2500");
     },2500)
}
function change_label_to_text(obj) {
     var tag = obj.firstChild.tagName;
     if( typeof (tag) != "undefined" && (tag == "INPUT" || tag == "TEXTAREA"))
          return;
     var val = obj.innerHTML;
     var txt = document.createElement("INPUT");
     txt.value = val;
     txt.style.background = "#FFC";
     txt.style.width = obj.offsetWidth + "px";
     obj.innerHTML = "";
     obj.appendChild(txt);
     txt.focus();
     txt.onblur = function(e) {
          if(txt.value.length == 0)
               txt.value = val;
          obj.innerHTML = txt.value;
     }
}

function trimEnd(str) {
     var reg = /,$/gi;
     return str.replace(reg, "");
}

function isIntBetween(i, j, p) {
     if(isPositiveInt(p)) {
          return p >= i && p <= j;
     }
     return false;
}

function flash_message(obj, times) {
     var i = 0, t = false, times = times || 4;
     if(t)
          return;
     t = setInterval(function() {
          i++;
          if(i % 2 == 0) {
               $(obj).hide();
          } else {
               $(obj).show();
          }
          if(i == times * 2) {
               clearInterval(t);
          }
     }, 300);
}

function flash_hidden_message(obj, times) {
     var i = 0, t = false, times = times || 4;
     if(t)
          return;
     t = setInterval(function() {
          i++;
          if(i % 2 == 0) {
               $(obj).css("visibility", "hidden");
          } else {
               $(obj).css("visibility", "visible");
          }
          if(i == times * 2) {
               clearInterval(t);
          }
     }, 300);
}

//只能输入数字和小数点,不能0开头
function clearNoNum(obj)
{
    //先把非数字的都替换掉，除了数字
    obj.value = obj.value.replace(/[^\d]/g,"");
    //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(/^0+/g,"");
}
//只能输入数字和小数点,可以0开头，最多两位
function clearNoNumZero(obj)
{
    //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/[^\d.]/g,"");
    //必须保证第一个为数字而不是.
    obj.value = obj.value.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(/\.{2,}/g,".");
    obj.value = obj.value.replace(/^0{2,}/g,"0");
    obj.value = obj.value.replace(/^0\d+/g,"0");
    //保证.只出现一次，而不能出现两次以上
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}
Date.prototype.format = function(format) {
     var o = {
          "M+" : this.getMonth() + 1, //month
          "d+" : this.getDate(), //day
          "h+" : this.getHours(), //hour
          "m+" : this.getMinutes(), //minute
          "s+" : this.getSeconds(), //second
          "q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
          "S" : this.getMilliseconds() //millisecond
     }

     if(/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     }

     for(var k in o) {
          if(new RegExp("(" + k + ")").test(format)) {
               format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
     }
     return format;
}
//need to be moved to base lib
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
        function pad(n) { return n < 10 ? '0' + n : n }
        return this.getUTCFullYear() + '-'
            + pad(this.getUTCMonth() + 1) + '-'
            + pad(this.getUTCDate()) + 'T'
            + pad(this.getUTCHours()) + ':'
            + pad(this.getUTCMinutes()) + ':'
            + pad(this.getUTCSeconds()) + 'Z';
    };
};


function slide_box(text,success){

    var message_selector = "#slide_box";

    var messageSuccess = "messageSuccess";
    var messageFail = "messageFail";

    var insert_class =  (success==true?messageSuccess:messageFail);

    $(message_selector).removeClass(messageSuccess);
    $(message_selector).removeClass(messageFail);


    $(message_selector).addClass(insert_class);

    $(message_selector).children().first().text(text);

    $(message_selector).slideDown();

    setTimeout(function(){
        $(message_selector).slideUp();
    },"4000")
}