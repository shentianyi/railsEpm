/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-12
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {};
MANAGE.kpi={};
MANAGE.kpi.init=function(){
    MANAGE.kpi.kpi_add_box_bind();
    MANAGE.kpi.kpi_add_clear();
    $("body").on("click","#kpi-add-show",function(){
        $("#manage-kpi-add").css("left","150px");
        $("#manage-right-content").css("left","350px");
    });
    $("#kpi-library-btn").on("click",function(){
        $("#kpi-library").css("display","block");
        $("#kpi-library>div").slideDown("3000");
    });
}
MANAGE.kpi.kpi_for_calculate=[];

//////////////////////////////////////////////////////////////////////////  KPI添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.kpi.kpi_add_box_bind=function(){
    $("body").on("click","#close-add-kpi",function(){
        $("#manage-kpi-add").css("left","-50px");
        $("#manage-right-content").css("left","150px");
        MANAGE.kpi.kpi_add_clear();
    }).on("keyup","#new-kpi-target",function(event){
            var e = adapt_event(event).event;
            clearNoNumZero(e.target);
    });
    $("#add-unit").prepend($("<option />").attr("value", ""));
    $("#add-unit").val('').trigger('chosen:updated');
    $("#is-calcu-check").on("ifChecked",function(){
        $("#calculate-type-box").slideDown("2000");
        $("#is_calcu_relate_chosen").css("width","131px");
        $("#is-calcu-relate").prepend($("<option />").attr("value", ""));
        $("#is-calcu-relate").val('').trigger('chosen:updated');
    }).on("ifUnchecked",function(){
            $("#calculate-type-box").slideUp("2000");
            $("#calcuType-input").val("");
            $("#is-calcu-relate").find("option:first-of-type").remove();
            $("#is-calcu-relate").val('').trigger('chosen:updated');
    });
    $("body").on("click","#calculate-type-box>label",function(event){
        var obj=adapt_event(event).target;
        var sign = $(obj).attr("sign");
        var oldVal = $("#calcuType-input").val();
        var oldValId = $("#takeCal").attr("cal");
        var newVal = oldVal + sign;
        var newValId = oldValId + sign;
        $("#calcuType-input").val(newVal);
        $("#takeCal").attr("cal", newValId);
    });
    $("#is_calcu_relate_chosen .chosen-results").on("click","li",function(){
        var order=parseInt($(this).attr("data-option-array-index"));
        var val="[" +$(this).text() + "]";
        var valId="[" +$("#is-calcu-relate option")[order].getAttribute("value") + "]";
        var oldVal = $("#calcuType-input").val();
        var oldValId = $("#takeCal").attr("cal");
        var newVal = oldVal + val;
        var newValId = oldValId + valId;
        $("#calcuType-input").val(newVal);
        $("#takeCal").attr("cal", newValId);
    });
    $("body").on("keyup","#calcuType-input",function(event){
        var object=adapt_event(event).target;
        MANAGE.kpi.calculate_input(object)
    });
    $("#calcuType-input").focus(function(){
        var item;
        MANAGE.kpi.kpi_for_calculate=[];
        $("#is-calcu-relate").find("option:not([value=''])").each(function(){
            item={}
            item.value=$(this).text();
            item.id=$(this).attr("value");
            MANAGE.kpi.kpi_for_calculate.push(item);
        });
    });
    $("#manage-kpi-add-new").on("click",function(){
        MANAGE.kpi.add_new_kpi();
    });
};
MANAGE.kpi.kpi_add_clear=function(){
    $("#manage-kpi-add input").val("");
    $("#manage-kpi-add select").val("").trigger('chosen:updated');
    $("#manage-kpi-add textarea").val("");
    if($("#is-calcu-check").prop("checked")){
        $("#is-calcu-check").iCheck("uncheck")
    }
};
MANAGE.kpi.calculate_input=function(object){
    var post_value=$(object).val();
    var reg;
    for(var i=0;i<MANAGE.kpi.kpi_for_calculate.length;i++){
        reg="/\\["+MANAGE.kpi.kpi_for_calculate[i].value+"]/g";
        post_value=post_value.replace(eval(reg),"["+MANAGE.kpi.kpi_for_calculate[i].id+"]");
    }
    $("#takeCal").attr("cal", post_value);
} ;
MANAGE.kpi.add_new_kpi=function(){
    var option={
        entity : $("#manage-left-menu li.active").find("a").text(),
        name : $("#new-kpi-name").val(),
        desc : $("#new-kpi-desc").val().length>0 ? $("#new-kpi-desc").val() : "No Description",
        frequency :  $("#add-interval :selected").attr("value"),
        interval : $("#add-interval :selected").text(),
        direction : $("#add-trend :selected").attr("value"),
        trend : $("#add-trend :selected").text()==false ? "None" : $("#add-trend :selected").text() ,
        target : $("#new-kpi-target").val(),
        unit : $("#add-unit :selected").text(),
        section : $("#add-unit :selected").attr("sym"),
        is_calculated : $("#is-calcu-check").prop("checked"),
        formula : $("#takeCal").attr("cal"),
        formula_string: $("#calcuType-input").val()
    }
    if(option.is_calculated) {
        if(option.name.length>0 && option.interval!=false && option.target.length>0 && option.unit!=false && option.formula_string.length>0) {
            post_kpi(option);
        }
        else {
            MessageBox("Please fill all the blanket taking *","top","warning");
        }
    }
    else {
        if(option.name.length>0 && option.interval!=false && option.target.length>0 && option.unit!=false ) {
            post_kpi(option);
        } else {
            MessageBox("Please fill all the blanket taking *","top","warning");
        }
    }
};
function post_kpi(option){
//    $.post('../kpis', {
//        kpi:
//            {
//                kpi_category_id : option.entity,
//                name:option.name,
//                description:option.desc,
//                frequency:option.frequency,
//                direction:option.direction,
//                target:option.target,
//                unit:option.unit,
//                is_calculated:option.is_calculated,
//                formula:option.formula,
//                formula_string:option.formula_string
//            }
//        }, function(data) {
//        if(data.result){
//            var id=data.object;
//            var formula_string= option.is_calculated ? option.formula_string : "No";
//            $("#manage-sort-list").prepend($("<li />").attr("id",id)
//                .append($("<p />").addClass("sort-handle").text(":"))
//                .append($("<input type='checkbox'/>"))
//                .append($("<table />").addClass("category")
//                    .append($("<tr />")
//                        .append($("<td />").text(option.name).attr("title",option.name))
//                        .append($("<td />").text(option.interval))
//                        .append($("<td />").text(option.trend))
//                        .append($("<td />").addClass("manage-kpi-target").append($("<span />").addClass("can-change").text(option.target).attr("title",option.target)).append($("<span />").text(option.section)).append($("<input type='text'/>").attr("effect_on",id)))
//                        .append($("<td />").text(formula_string).attr("title",formula_string))
//                    )
//                    .append($("<tr />")
//                        .append($("<td />").text(option.desc).attr("title",option.desc))
//                        .append($("<td />").text("Frequency"))
//                        .append($("<td />").text("Trend"))
//                        .append($("<td />").text("Target"))
//                        .append($("<td />").text("Is Calcu Type"))
//                    )
//                )
//            );
//            MANAGE.iCheck_init();
//            MANAGE.sort_init();
//            MANAGE.resize_sort_table();
//        }
//        else{
//            MessageBox(data.content,"top","warning");
//        }
//    });

    var id="21";
    var formula_string= option.is_calculated ? option.formula_string : "No";
    $("#manage-sort-list").prepend($("<li />").attr("id",id)
        .append($("<p />").addClass("sort-handle").text(":"))
        .append($("<input/>").attr("type","checkbox"))
        .append($("<table />").addClass("category")
            .append($("<tr />")
                .append($("<td />").text(option.name).attr("title",option.name))
                .append($("<td />").text(option.interval))
                .append($("<td />").text(option.trend))
                .append($("<td />").addClass("manage-kpi-target").append($("<span />").addClass("can-change").text(option.target).attr("title",option.target)).append($("<span />").text(option.section)).append($("<input />").attr("type","text").attr("effect_on",id)))
                .append($("<td />").text(formula_string).attr("title",formula_string))
            )
            .append($("<tr />")
                .append($("<td />").text(option.desc).attr("title",option.desc))
                .append($("<td />").text("Frequency"))
                .append($("<td />").text("Trend"))
                .append($("<td />").text("Target"))
                .append($("<td />").text("Is Calcu Type"))
            )
        )
    );
    MANAGE.iCheck_init();
    MANAGE.sort_init();
    MANAGE.resize_sort_table();
}
//////////////////////////////////////////////////////////////////////////  KPI Library
///////////////////////////////////////////////////////////////////////////////////////////////////
$("body").on("click",".Accordion>.accordion-header",function(){
   if(!$(this).hasClass("accordion-in")){
       $(".Accordion>.accordion-header.accordion-in + .accordion-body").slideUp("2000");
       $(".Accordion>.accordion-header.accordion-in").removeClass("accordion-in");
       $(this).next().slideDown("1000");
       $(this).addClass("accordion-in");
   }
    else{
       $(this).next().slideUp("1000");
       $(this).removeClass("accordion-in");
   }
});
$("#kpi-library-inner-left .accordion-body input[type='checkbox']").on("ifChecked",function(){
    var h=$(this).parent().nextAll("h3").text();
    var id=$(this).attr("id");
    var p=$(this).parent().nextAll("p").text();
    $("#library-chosen-kpi").append($("<li />")
        .append($("<h3 />").text(h).attr("title",h).attr("id",id))
        .append($("<p />").text(p).attr("title",p))
    )
}).on("ifUnchecked",function(){
    var id=$(this).attr("id");
    $("#library-chosen-kpi").find("#"+id).parent().remove();
});
$("body").on("click","#library-chosen-kpi li",function(){
    var id=$(this).children("h3").attr("id");
    $("#kpi-library-inner-left .accordion-body").find("#"+id).iCheck("uncheck");
});
$("body").on("click","#library-cancel",function(){
    $("#kpi-library>div").slideUp("3000");
    $("#kpi-library").css("display","none");
});

