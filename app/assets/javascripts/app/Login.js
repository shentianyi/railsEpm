/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 14-9-30
 * Time: 上午10:53
 * To change this template use File | Settings | File Templates.
 */
define(["jquery","base"],function($,Base){
//    function error_dis() {
//        if (errors != '') {
//            Base.MessageBox(errors, "top", "warning");
//        }
//        if (notice != '') {
//            Base.MessageBox(notice, "top", "success");
//        }
//    }
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
        })
    }
    function show_signup() {
        if ($("#sign-up-now").attr("state") == "open") {
            $('#signIn-block').slideUp('500');
            $("#sign-in").attr('state', 'close');
        }
        $('#signUp-block').slideDown('500');
    }
    function login() {
        var user_session = {
            email: $("#user_session_email").val(),
            password: $("#user_session_password").val()
        }
        var data = {
            user: user_session
        }
        $.ajax({
            url: '/user_sessions/',
            data: data,
            type: 'POST',
            success: function (data) {
                if (data.result) {
                    Base.MessageBox(data.content, "top", "success");
                    window.location = '/welcome';
                }
                else {
                    Base.MessageBox(data.content, "top", "warning");
                }
            }
        })
    }
    function signup() {
        var data = {
            email: $("#email").val(),
            password: $("#password").val(),
            password_confirmation: $("#password_confirmation").val(),
            company_name: $("#company_name").val()
        }

        $.ajax({
            url: '/subscriptions',
            data: data,
            type: 'POST',
            success: function (data) {
                if (data.result) {
                    Base.MessageBox(data.content, "top", "success");
                    window.location = '/welcome';
                }
                else {
                    Base.MessageBox(data.content, "top", "warning");
                }
            }
        });
    }

    return {
        init:function(){
                $("#sign-in").on("click", function () {
                    if ($(this).attr('state') == "close") {
                        if ($("#sign-up").attr("state") == "open") {
                            $('#signUp-block').slideUp('500');
                            $("#sign-up").attr('state', 'close');
                        }
                        $('#signIn-block').slideDown('500');
                        $(this).attr('state', 'open');
                    }
                    else {
                        $('#signIn-block').slideUp('500');
                        $(this).attr('state', 'close');
                    }

                });
                $("#sign-up,#sign-up-now").on("click", function () {
                    if ($("#sign-up-now").attr('state') == "close") {
                        $('#signIn-block').slideDown('500');
                        $("#sign-up-now").attr('state', 'open');
                        $("#user_session_email").focus();
                    }
                    else {
                        $('#signIn-block').slideUp('500');
                        $("#sign-up-now").attr('state', 'close');
                    }
                });
                $("body")
                    .on("keyup", "input[type='text'],input[type='password']", function (event) {
                        var e = Base.adapt_event(event).event;
                        if (e.keyCode == 13) {
                            if ($("#sign-up-now").attr("state") == "open") {
                                $("#sign-in-btn").click();
                            }
                            else if ($("#sign-up").attr("state") == "open") {
                                $("#sign-up-btn").click();
                            }
                        }
                    })
                    .on("click", "#login-operate .language-btn", function () {
                        if ($("#default_lan").attr("lan") != $(this).attr("lan")) {
                            var value = $(this).attr("lan");
                            changelocale(value, function (data) {
                                if (data.result) {
                                    window.location = '/user_sessions/new';
                                }
                            });
                        }
                    })
                    .on("click","#sign-in-btn",function(){
                        login();
                    })
                    .on("click","#sign-up-btn",function(){
                        signup();
                    })
                ;
//                error_dis();
        }
    }
})