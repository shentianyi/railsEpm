define(["jquery","../../manage/manage_no_aside"],function($){
    function open(){
        $("#subscribe-kpi-block").css("display","block");
        $("#subscribe-kpi-block>div").css("display","block");
    }

    function close(){
        $("#subscribe-kpi-block").css("display","none");
        $("#subscribe-kpi-block>div").css("display","none");
    }
    return{
        init:function(){
            $("#manage-left-menu").on("click", "li", function () {
                var li = $(this);
                var id = li.attr('number');
                if (id) {
                    $("#manage-left-menu>li").removeClass('active');
                    li.addClass('active');
                    $.get('/kpis/access_list/' + id, function (data) {
                        $("#manage-edit-target").text(li.attr('title'));
                        $('#kpi-item-container').html(data);
                        window.history.pushState(id, null, "/kpis/access/" + id);
                    });
                }
            });
            $("body")
                .on("click",".subscribe-kpi",function(){
                    open();
                })
                .on("click","#subscribe-kpi-block-remove",function(){
                    close();
                })
            ;
        }
    }
})