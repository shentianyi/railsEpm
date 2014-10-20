define(["jquery","base"],function($,Base){
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
    function callmessage(){
        var old_message = null;
        setTimeout(function () {
            $.ajax({
                url: '/users/message',
                dataType: 'json',
                type: 'get',
                success: function (data) {
                    if (old_message != JSON.stringify(data) || $('#user-message-control').val() == 'false') {
                        $('#user-message-ul').children().remove();
                        $.each(data, function (i, v) {
                            if (v.count != 0) {
                                $('#user-message-ul').append(
                                    $("<li/>").append(

                                        $("<a/>").attr('href', v.link)
                                            .append($("<span/>").text(v.content))
                                            .append($("<span/>").append($("<label />").text(v.count)))

                                    )
                                );
                            }
                        });
                        if ($('#user-message-ul').children().length > 0)
                            $('#user-message-div').popModal({
                                html: $('#user-messgae-div'),
                                onDocumentClickClose: false,
                                onLoad: function () {
                                    $('#user-messgae-div').show();
                                    $('#user-message-control').val("true");
                                },
                                onClose: function () {
                                    $('#user-messgae-div').hide();
                                    $('#user-message-control').val("false");
                                }
                            });
                        else {
                            if ($('#user-message-control').val() == 'true')
                                $('#user-message-div').popModal("hide");
                        }
                        old_message = JSON.stringify(data);
                    }
                    callmessage();
                },
                error: function () {
                    console.log('e');
                    callmessage();
                },
                complete: function (xhr) {
                    if (xhr.status == 304) return;
                }
            });
        }, 5000);
    }
    return{
        init:function(){
            $.ajaxSetup({
                statusCode: {
                    403: function () {
                        location.href = '/403';
                    },
                    404: function () {
                        location.href = '/404';
                    },
                    500: function () {
                        location.href = '/500';
                    }
                }
            });
            var lan=$("#select-language>span").attr("lan");
            var text=$("#menu-select-language").find("[lan='"+lan+"']").text();
            $("#select-language>span").text(text);
            $("body")
                .on("click","#menu-select-language li",function(){
                    var value=$(this).attr("lan"),text=$(this).text();
                    if(value!=$("#select-language>span").attr("lan")){
                        changelocale(value,function(data){
                            if(data.result){
                                $("#select-language>span").attr("lan",value);
                                $("#select-language>span").text(text).attr("value",value);
                                window.location = '/welcome';
                            }
                        });
                    }
                })
                .on("click",".nav-user-part>li.select-language",function(){
                    $(".nav-user-part>li.select-language .menu-select-language").css("left","2px");
                })
                .on("click",function(event){
                    var target=Base.adapt_event(event).target;
                    if(!$(target).hasClass("select-language") && !$(target).parent().hasClass("select-language") ){
                        $(".nav-user-part>li.select-language .menu-select-language").css("left","-999em");
                    }
                })
            ;
            if ($) {
                var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );

                $.ajaxSetup( {
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader( 'X-CSRF-Token', token );
                    }
                });
            }
        }
    }

})