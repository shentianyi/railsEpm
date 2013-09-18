/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-12
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {};
MANAGE.kpi={};
MANAGE.kpi.library={};
//////////////////////////////////////////////////////////////////////////  KPI init
//////////////////////////////////////////////////////////////////////////////////////////////////
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
        $.ajax(
            {
                url:"/kpi_categories/template",
                dataType:"json",
                success:function(data){
                        var category_id;
                        for(var i=0;i<data.length;i++){
                            category= data[i];
                            $("#kpi-library-inner-left")
                                .append($("<div />").addClass("accordion-header").attr("title",category.name).attr("id",category.id).text(category.name))
                                .append($("<ul />").addClass("accordion-body"));
                        }
                }
            }
        );
    });
    $("#manage-edit-target").text($("#manage-left-menu li.active").find("a").text());
    MANAGE.kpi.library.init();
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
        entity : $("#manage-left-menu li.active").attr("number"),
        kpi_category_id:$("#manage-left-menu li.active").attr("u"),
        name : $("#new-kpi-name").val(),
        desc : $("#new-kpi-desc").val().length>0 ? $("#new-kpi-desc").val() : "No Description",
        frequency :  $("#add-interval :selected").attr("value"),
        interval : $("#add-interval :selected").text(),
        direction : $("#add-trend :selected").attr("value"),
        trend : $("#add-trend :selected").text()==false ? "None" : $("#add-trend :selected").text() ,
        target : $("#new-kpi-target").val(),
        unit : $("#add-unit :selected").attr("value"),
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
    $.post('../kpis', {
        kpi:
            {
                kpi_category_id : option.entity,
                name:option.name,
                description:option.desc,
                frequency:option.frequency,
                direction:option.direction,
                target:option.target,
                unit:option.unit,
                is_calculated:option.is_calculated,
                formula:option.formula,
                formula_string:option.formula_string
            }
        }, function(data) {
        if(data.result){
            var id=data.object;
            var formula_string= option.is_calculated ? option.formula_string : "No";
            $("#manage-sort-list").prepend($("<li />").attr("id",id)
                .append($("<p />").addClass("sort-handle").text(":"))
                .append($("<input type='checkbox'/>"))
                .append($("<table />").addClass("category")
                    .append($("<tr />")
                        .append($("<td />").text(option.name).attr("title",option.name))
                        .append($("<td />").text(option.interval))
                        .append($("<td />").text(option.trend))
                        .append($("<td />").addClass("manage-kpi-target").append($("<span />").addClass("can-change").text(option.target).attr("title",option.target)).append($("<span />").text(option.section)).append($("<input type='text'/>").attr("effect_on",id)))
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
            MANAGE.judge_kpi_count();
        }
        else{
            MessageBox(data.content,"top","warning");
        }
    });

//    var id="21";
//    var formula_string= option.is_calculated ? option.formula_string : "No";
//    $("#manage-sort-list").prepend($("<li />").attr("id",id)
//        .append($("<p />").addClass("sort-handle").text(":"))
//        .append($("<input/>").attr("type","checkbox"))
//        .append($("<table />").addClass("category")
//            .append($("<tr />")
//                .append($("<td />").text(option.name).attr("title",option.name))
//                .append($("<td />").text(option.interval))
//                .append($("<td />").text(option.trend))
//                .append($("<td />").addClass("manage-kpi-target").append($("<span />").addClass("can-change").text(option.target).attr("title",option.target)).append($("<span />").text(option.section)).append($("<input />").attr("type","text").attr("effect_on",id)))
//                .append($("<td />").text(formula_string).attr("title",formula_string))
//            )
//            .append($("<tr />")
//                .append($("<td />").text(option.desc).attr("title",option.desc))
//                .append($("<td />").text("Frequency"))
//                .append($("<td />").text("Trend"))
//                .append($("<td />").text("Target"))
//                .append($("<td />").text("Is Calcu Type"))
//            )
//        )
//    );
//    MANAGE.iCheck_init();
//    MANAGE.sort_init();
//    MANAGE.resize_sort_table();
}
//////////////////////////////////////////////////////////////////////////  KPI Library
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.kpi.library.init=function(){
    $("body").on("click","#kpi-library-inner-left>.accordion-header",function(){
        if(!$(this).hasClass("accordion-in")){
            $("#kpi-library-inner-left>.accordion-header.accordion-in + .accordion-body").slideUp("2000");
            $("#kpi-library-inner-left>.accordion-header.accordion-in").removeClass("accordion-in");
            $(this).next().slideDown("1000");
            $(this).addClass("accordion-in");
            var category_id=$(this).attr("id");
            var header=$(this);
            $.ajax(
                {
                    url:"/kpis/template/"+category_id,
                    dataType:"json",
                    success:function(data){
                            for(var i=0;i<data.length;i++){
                                header.next(".accordion-body").append($("<li />")
                                    .append($("<input type='checkbox'/>").attr("id",data[i].id).attr("belong",data[i].admin_kpi_category_template_id))
                                    .append($("<h3 />").attr("title",data[i].name).text(data[i].id))
                                    .append($("<p />").attr("title",data[i].description).text(data[i].description))
                                );
                            }
                            $("input[type='checkbox']").iCheck({
                                checkboxClass: 'icheckbox_minimal-aero'
                            });
                    }
                }
            );
        }
        else{
            $(this).next().slideUp("1000");
            $(this).removeClass("accordion-in");
        }
    });

    $("body").on("ifChecked","#kpi-library-inner-left .accordion-body input[type='checkbox']",function(){
        var h=$(this).parent().nextAll("h3").text();
        var id=$(this).attr("id");
        var belong=$(this).attr("belong");
        var p=$(this).parent().nextAll("p").text();
        $("#library-chosen-kpi").append($("<li />").attr("id",id).attr("belong",belong)
            .append($("<h3 />").text(h).attr("title",h))
            .append($("<p />").text(p).attr("title",p))
        )
    }).on("ifUnchecked","#kpi-library-inner-left .accordion-body input[type='checkbox']",function(){
            var id=$(this).attr("id");
            $("#library-chosen-kpi").find("#"+id).remove();
    });

    $("body").on("click","#library-chosen-kpi li",function(){
        var id=$(this).attr("id");
        $("#kpi-library-inner-left .accordion-body").find("#"+id).iCheck("uncheck");
    });
    $("body").on("click","#library-cancel",function(){
        MANAGE.kpi.library.cancel();
    });
    $("body").on("click","#library-add",function(){
        var length=$("#library-chosen-kpi").children().length;
        var belong_init=$("#library-chosen-kpi li").eq(0).attr("belong");
        var kpi_group=[$("#library-chosen-kpi li").eq(0).attr("id")];
        if(belong_init !=undefined){
            for(var i=1;i<=length;i++){
                if($("#library-chosen-kpi li").eq(i).attr("belong")==belong_init){
                    kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id"));
                }
                else if($("#library-chosen-kpi li").eq(i).attr("belong")==undefined){
                    MANAGE.kpi.library.add_post(belong_init,kpi_group);
                }
                else{
                    MANAGE.kpi.library.add_post(belong_init,kpi_group);
                    belong_init=$("#library-chosen-kpi li").eq(i).attr("belong");
                    kpi_group=[];
                    kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id"));
                }
            }
            MessageBox("KPI Library Add Success","top","success");
            MANAGE.kpi.library.cancel();
        }
        else{
            MessageBox("Nothing have been chosen","top","warning");
        }

    });
}
MANAGE.kpi.library.add_post=function(category,kpis){
    $.ajax(
        {
            url:"/kpis/import",
            type:"POST",
            dataType:"json",
            data:{
                category:category,
                kpis:kpis
            },
            async:false,
            success:function(data){
                 if(data.result){
                        $("#manage-left-menu").append(
                            $("<li />").attr("title",data.content).attr("number", data.object)
                                .append($("<i />").addClass("icon-trash icon-item"))
                                .append($("<a href='../kpis?p="+ data.object + "'/>").text(data.content))
                        );
                 }
                 else{
                    MessageBox(data.content,"top","warning");
                 }
            }
        }
    );
}
MANAGE.kpi.library.cancel=function(){
    $("#kpi-library>div").slideUp("3000");
    $("#kpi-library").css("display","none");
    $("#kpi-library-inner-left").empty();
    $("#library-chosen-kpi").empty();
}




