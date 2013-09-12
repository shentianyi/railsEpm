/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-12
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
function MANAGE_KPI_INIT(){
    kpi_add_box_bind();
    $("body").on("click","#kpi-add-show",function(){
        $("#manage-kpi-add").css("left","150px");
        $("#manage-right-content").css("left","350px");
    });
}
var MANAGE_KPI = MANAGE_KPI || {};
MANAGE_KPI.kpi_for_calculate=[];

//////////////////////////////////////////////////////////////////////////  KPI添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
function kpi_add_box_bind(){
    $("body").on("click","#close-add-kpi",function(){
        $("#manage-kpi-add").css("left","-50px");
        $("#manage-right-content").css("left","150px");
        kpi_add_clear();
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
        calculate_input(object)
    });
    $("#calcuType-input").focus(function(){
        var item;
        MANAGE_KPI.kpi_for_calculate=[];
        $("#is-calcu-relate").find("option:not([value=''])").each(function(){
            item={}
            item.value=$(this).text();
            item.id=$(this).attr("value");
            MANAGE_KPI.kpi_for_calculate.push(item);
        });
    });
}
function kpi_add_clear(){
    $("#manage-kpi-add input").val("");
    $("#manage-kpi-add select").val("").trigger('chosen:updated');
    $("#manage-kpi-add textarea").val("");
    if($("#is-calcu-check").prop("checked")){
        $("#is-calcu-check").iCheck("uncheck")
    }
}
function calculate_input(object){
    var post_value=$(object).val();
    var reg;
    for(var i=0;i<MANAGE_KPI.kpi_for_calculate.length;i++){
        reg="/\\["+MANAGE_KPI.kpi_for_calculate[i].value+"]/g";
        post_value=post_value.replace(eval(reg),"["+MANAGE_KPI.kpi_for_calculate[i].id+"]");
    }
    $("#takeCal").attr("cal", post_value);
}