/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-27
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
(function () {
//    $("body").on("click","#login-select-language",function(event){
//        $("#login-select-language-menu").css("left","-7px");
//        stop_propagation(event);
//    });
//    $("body").on("click",function(event){
//        var target=adapt_event(event).target;
//        if(!$(target).hasClass("login-select-language") || !$(target).parent().hasClass("login-select-language")){
//            $("#login-select-language-menu").css("left","-999em");
//        }
//    });
//    $("body").on("click","#login-select-language-menu li",function(event){
//        var value=$(this).attr("value"),text=$(this).text();
//        if(value!=$("#select-language>span").attr("value")){
//            if(changelocale(value)){
//                $("#select-language>span").text(text).attr("value",value);
//            }
//        }
//        $("#login-select-language-menu").css("left","-999em");
//        stop_propagation(event);
//    });
    $(document).ready(function(){
        $("body").on("click", "#login-operate .language-btn", function () {
            if ($("#default_lan").attr("lan") != $(this).attr("lan")) {
                var value = $(this).attr("lan");
                changelocale(value, function (data) {
                    if (data.result) {
                        window.location = '/user_sessions/new';
                    }
                });
            }
        });
    });
})()


function changelocale(value, callback) {
    var data = {
        locale: value
    }

    $.ajax({
        url: '/user_sessions/locale',
        data: data,
        type: 'POST',
        async: false,
        success: function (data) {
            if (callback) {
                callback(data);
            }
        }
    });
}

