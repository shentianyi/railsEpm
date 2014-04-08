function isNotNegaNum(v){if(!isNaN(v)){var reg=/^([0-9]\d*|\d+\.\d+)$/;return reg.test(v)}return!1}function isPositiveInt(v){if(!isNaN(v)){var reg=/^[1-9]\d*$/;return reg.test(v)}return!1}function isPositiveNum(v){if(!isNaN(v)){var reg=/^([1-9]\d*|\d+\.\d+)$/;return reg.test(v)}return!1}function isEmail(v){var reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;return reg.test(v)}function show_handle_dialog(){document.getElementById("handle-dialog-modal").style.display="block",document.getElementById("dialog-overlay").style.display="block"}function hide_handle_dialog(){document.getElementById("handle-dialog-modal").style.display="none",document.getElementById("dialog-overlay").style.display="none"}function MessageBox(str,position,type){$("#MessageBox").addClass(type).addClass(position).find("p").text(str),$("#MessageBox").slideDown("2500"),setTimeout(function(){$("#MessageBox").slideUp("2500")},2500)}function change_label_to_text(obj){var tag=obj.firstChild.tagName;if("undefined"==typeof tag||"INPUT"!=tag&&"TEXTAREA"!=tag){var val=obj.innerHTML,txt=document.createElement("INPUT");txt.value=val,txt.style.background="#FFC",txt.style.width=obj.offsetWidth+"px",obj.innerHTML="",obj.appendChild(txt),txt.focus(),txt.onblur=function(){0==txt.value.length&&(txt.value=val),obj.innerHTML=txt.value}}}function trimEnd(str){var reg=/,$/gi;return str.replace(reg,"")}function isIntBetween(i,j,p){return isPositiveInt(p)?p>=i&&j>=p:!1}function flash_message(obj,times){var i=0,t=!1,times=times||4;t||(t=setInterval(function(){i++,i%2==0?$(obj).hide():$(obj).show(),i==2*times&&clearInterval(t)},300))}function flash_hidden_message(obj,times){var i=0,t=!1,times=times||4;t||(t=setInterval(function(){i++,i%2==0?$(obj).css("visibility","hidden"):$(obj).css("visibility","visible"),i==2*times&&clearInterval(t)},300))}function clearNoNum(obj){obj.value=obj.value.replace(/[^\d]/g,""),obj.value=obj.value.replace(/^0+/g,"")}function clearNoNumZero(obj){obj.value=obj.value.replace(/[^\d.]/g,""),obj.value=obj.value.replace(/^\./g,""),obj.value=obj.value.replace(/\.{2,}/g,"."),obj.value=obj.value.replace(/^0{2,}/g,"0"),obj.value=obj.value.replace(/^0\d+/g,"0"),obj.value=obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")}function slide_box(text,success){var message_selector="#slide_box",messageSuccess="messageSuccess",messageFail="messageFail",insert_class=1==success?messageSuccess:messageFail;$(message_selector).removeClass(messageSuccess),$(message_selector).removeClass(messageFail),$(message_selector).addClass(insert_class),$(message_selector).children().first().text(text),$(message_selector).slideDown(),setTimeout(function(){$(message_selector).slideUp()},"4000")}Date.prototype.format=function(format){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(format)&&(format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var k in o)new RegExp("("+k+")").test(format)&&(format=format.replace(RegExp.$1,1==RegExp.$1.length?o[k]:("00"+o[k]).substr((""+o[k]).length)));return format},Date.prototype.toISOString||(Date.prototype.toISOString=function(){function pad(n){return 10>n?"0"+n:n}return this.getUTCFullYear()+"-"+pad(this.getUTCMonth()+1)+"-"+pad(this.getUTCDate())+"T"+pad(this.getUTCHours())+":"+pad(this.getUTCMinutes())+":"+pad(this.getUTCSeconds())+"Z"});