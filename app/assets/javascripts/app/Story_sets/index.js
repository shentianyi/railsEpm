define(["jquery"],function($){
    var $targets=$("#latest-notice .item");
    for(var i=0;i<$targets.length;i++){
        var $target=$targets.eq(i),
            content=$target.attr("content");
        var name=content.split(",")[0];
        var word=content.split(",")[1].split(":")[0];
        var mark=content.split(",")[1].split(":")[1];
        $target.find(".name").text(name+" :");
        $target.find(".word").html("<span>"+word+"</span><span class='mark'>"+mark+"</span>");
    }
    return{
        init:function(){}
    }
})