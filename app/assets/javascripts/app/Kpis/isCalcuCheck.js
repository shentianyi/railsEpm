define(["jquery","jquery.icheck"],function($){
    return function(){
        $("#is-calcu-check")
            .on("ifChecked", function() {
                $("#calculate-type-box").slideDown("2000");
                $("#is_calcu_relate_chosen").css("width", "131px");
                $("#is-calcu-relate").prepend($("<option />").attr("value", ""));
                $("#is-calcu-relate").val('').trigger('chosen:updated');
            })
            .on("ifUnchecked", function() {
                $("#calculate-type-box").slideUp("2000");
                $("#calcuType-input").val("");
                $("#is-calcu-relate").find("option:first-of-type").remove();
                $("#is-calcu-relate").val('').trigger('chosen:updated');
                $("#takeCal").attr("cal","");

            })
        ;
    }
})