(function(i, s, o, g, r, a, m) {
     i['GoogleAnalyticsObject'] = r;
     i[r] = i[r] ||
     function() {
          (i[r].q = i[r].q || []).push(arguments)
     }, i[r].l = 1 * new Date();
     a = s.createElement(o), m = s.getElementsByTagName(o)[0];
     a.async = 1;
     a.src = g;
     m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-41513970-1', '121.199.48.53');
ga('send', 'pageview');

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

function MessageBox(str, type) {
     $('#message-content').html(str);
     $('#MessageBox').removeClass('hide');
     if(type != null) {
          $(".message-header").addClass(type);
     }
     else{
     	  $(".message-header").addClass('message-normal');
     }
}

$(function() {
     $('.message-box').draggable();
});

function message_close() {
     $("#MessageBox").addClass('hide');
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

//隐藏下面的装饰
function hide_bottom(event) {
     var e = event ? event : (window.event ? window.event : null )
     e.stopPropagation();
     if($("#bottom-decoration").attr('state') == "show") {
          $("#bottom-decoration").slideUp().attr('state', 'hide');
          $("#hide-bottom-icon").removeClass('icon-chevron-down').addClass('icon-chevron-up');
     } else {
          $("#bottom-decoration").slideDown().attr('state', 'show');
          $("#hide-bottom-icon").removeClass('icon-chevron-up').addClass('icon-chevron-down');
     }
}

function MessageBoxClear() {
     $('#MessageBox > p').html("");
}

function MessageBoxAdd(str) {
     $('#MessageBox > p').html($('#MessageBox > p').html() + str).parent().show();
}

$(function() {
     $('#MessageBox > button').click(function() {
          $(this).parent().hide();
     });
    $('body').bind("click", function(event) {
        var e = event ? event : (window.event ? window.event : null);
        var obj = e.srcElement || e.target;
        if($(obj) != $("#setting-right") || $(obj) ==$("html")) {
            $("#setting-right").hide();
        }
    });
    $("#task-setting").hover(function(){
       $(this).tooltip('show');
    },function(){
        $(this).tooltip('hide');
    });
    $("#message-center").hover(function(){
        $(this).tooltip('show');
    },function(){
        $(this).tooltip('hide');
    });
    init_pagebottom();

     if (document.attachEvent) {
         window.attachEvent('onresize', init_pagebottom);
//       window.attachEvent('onresize', init_taskPart);
     }
     else {
    	 window.addEventListener('resize', init_pagebottom, false);
//       window.addEventListener('resize', init_taskPart, false);
	 }

})
function init_pagebottom(){
    document.getElementById("page-bottom").style.width=document.body.scrollWidth+"px";
}
function funcRight_show(event){
    var e = event ? event : (window.event ? window.event : null);
    e.stopPropagation();
}
function show_settingRight(event){
    var e = event ? event : (window.event ? window.event : null);
    e.stopPropagation();
    $("#setting-right").show();
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

