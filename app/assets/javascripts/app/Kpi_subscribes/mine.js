define(["jquery","base","../../manage/manage_no_aside_no_menu"],function($,Base){
    function destroy(id,callback){
        $.ajax({
            url:'/kpi_subscribes/'+id,
            type:'DELETE',
            dataType:'json',
            success: function(data){
                callback(data);
            }
        })
    }

    $("body")
        .on("click", ".subscribe-remove", function (event) {
            var target = Base.adapt_event(event).target;
            destroy($(target).attr("value"), function (data) {
                if (data.result) {
                    $(target).parent().remove();
                } else {

                }
            });
        })
    ;

    return{
        init:function(){

        }
    }
})