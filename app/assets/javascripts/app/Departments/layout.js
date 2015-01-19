define(["jquery"],function($){
    var height=$("#wrap-main").height()-$("header").height()-1;
    $("#part-info").height(height);
    $("#add-user").height(height);
    $("#add-entity").height(height);
    $(window).resize(function(){
        var height=$("#wrap-main").height()-$("header").height()-1;
        $("#part-info").height(height);
        $("#add-user").height(height);
        $("#add-entity").height(height);
    })
})