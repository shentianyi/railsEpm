define(["jquery","jquery.icheck"],function($){
    var count=$("#manage-sort-list").children.length;
    return{
        clean_input:function(){
            $('.clear-input').val('');
        },
        icheck_init:function(){
            $("#manage-sort-list input[type='checkbox']").on("ifChecked", function () {
                $("#manage-sort-list input[type='checkbox']").filter(function () {
                    return $(this).parent().hasClass("checked")
                }).iCheck("uncheck");
            });
            $("#manage-sort-list input[type='checkbox']").on("ifUnchecked", function () {
                if ($("#manage-sort-list .icheckbox_minimal-aero.checked").length == 1 && $("#user-edit").css("left") != "-200px") {
                    $("#user-edit").css("left", "-250px");
                    $("#manage-right-content").css("padding-left", "0px");
                    self.clean_input();
                }
            })
        } ,
        count:count,
        count_observe : function () {
        if (this.count == 0) {
            $("#dashboard-content").css("display", "none");
        }
        else {
            $("#dashboard-content").css("display", "block");
        }
    }
    }
})