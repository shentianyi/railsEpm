//var report_subscription={};
//report_subscription.init=function(){
//    report_subscription.flexible();
//    $(window).resize(function(){
//        report_subscription.flexible();
//    });
//    for(var i=0;i<report_subscription_data.length;i++){
//        $("#subscription-list").append(report_subscription.parse_data(report_subscription_data[i]));
//    }
//    i_check.init();
//    i_check.if_checked("#subscription-list input[type='checkbox']",function(target){
//        var $parent=target.parents(".report-item").eq(0);
//        $parent.addClass("active");
//        var id=parseInt($parent.attr("id"));
//        $("#my-reports").append(report_subscription.add_to_list(report_subscription_data[id]));
//    });
//    i_check.if_unchecked("#subscription-list input[type='checkbox']",function(target){
//        var $parent=target.parents(".report-item").eq(0);
//        $parent.removeClass("active");
//        $("#my-reports").find("[number="+$parent.attr("id")+"]").remove();
//    });
//    $("body")
//        .on("click","#report-subscription-cancel",function(){
//             window.location.reload();
//        })
//}
//report_subscription.flexible=function(){
//    var total_height=$("#wrap-main").height()-$("header").height()-1;
//    var height=total_height-$("#report-subscription-header").height()-30-1 ;
//    $("#subscription-list").height(height);
//}
//report_subscription.parse_data=function(dic){
//    dic.active=function(){
//        if(this.active_status){
//            return "active"
//        }
//        else{
//            return ""
//        }
//    };
//    dic.checked=function(){
//        if(this.active_status){
//            return "checked"
//        }
//        else{
//            return ""
//        }
//    }
//    var html=Mustache.render('<div class="report-item {{active}}" id="{{id}}">'+
//        '<div class="left-part">'+
//    '<input type="checkbox" {{checked}}/>'+
//    '</div>'+
//    '<div class="right-part">'+
//    '<p class="name">{{name}} <i class="{{icon}}"></i></p>'+
//    '<p class="desc">{{desc}}</p>'+
//    '</div>'+
//    '</div>',dic);
//    return html;
//}
//report_subscription.add_to_list=function(dic){
//    var html=Mustache.render('<li number="{{id}}">' +
//        '<a menu="{{menu}}" href="#{{menu}}">' +
//        '<i class="{{icon}} mark"></i> {{name}}<i class="icon-chevron-right indicate"></i>' +
//        '</a></li>',dic);
//    return html;
//}