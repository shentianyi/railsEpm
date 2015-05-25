define(["jquery",'jquery.icheck'],function($){
    var left_count=$("#manage-left-menu").children().length-2;
    return {
        totalChecked:0,
        left_count:left_count,
        edit_array:[],
        judge_kpi_count:function(){
            if($("#manage-sort-list").children().length>0){
                $("#right-list-top-control").css("display","inherit");
            }
            else{
                $("#right-list-top-control").css("display","none");
            }
        },
        total_check_listener:function(){
            if(this.totalChecked >= 1){
                if(!$("#manage-total-check").parent().hasClass("checked")){
                    $("#manage-total-check").iCheck("check");
                }
            }
            else{
                $("#manage-total-check").iCheck("uncheck");
            }
        },
        left_count_observable:function(){
            if(this.left_count==0){
                $("#manage-right-content").children().css("display","none");
            }
            else{
                $("#manage-right-content #manage-btn-group").css("display","inline-block");
                $("#manage-right-content .manage-right-list").css("display","block");
            }
        }
    }
})