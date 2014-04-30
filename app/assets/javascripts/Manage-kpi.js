
/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-12
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
var MANAGE = MANAGE || {};
MANAGE.kpi = {};
MANAGE.attribute={};
MANAGE.kpi.library = {};
//////////////////////////////////////////////////////////////////////////  KPI init
//////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.kpi.init = function() {
     MANAGE.kpi.kpi_add_box_bind();
     MANAGE.kpi.kpi_add_clear();

     $("#manage-left-menu").on("click", "li", function() {
          var li = $(this);
          var id = li.attr('number');
          if(id) {
               $("#manage-left-menu>li").removeClass('active');
               li.addClass('active');
               $.get('/kpis/list/' + id, function(data) {
                    $("#manage-edit-target").text(li.attr('title'));
                    $('#kpi-item-container').html(data);
                    window.history.pushState(id, null, "/kpis/c/" + id);
                    MANAGE.widget_init();
                   MANAGE.kpi.isCalcuCheck();
               });
          }
     });

    //点击添加KPI的按钮
     $("body")
         .on("click", "#kpi-add-show", function() {
            $("#add-new-kpi-block").css("left","0px").css("right","0px");
            $("#add-new-kpi-block>div").css("left","50%").css("right","0px");

            $.get("/kpis/condition", function(data) {
                    $.each(data, function(key, data) {
                         var select = $("select[name='" + key + "']");
                         for(var i = 0; i < data.length; i++) {
                              select.append($("<option />").attr("value", (data[i].value == null ? data[i].id : data[i].value)).text((data[i].desc == null ? data[i].name : data[i].desc)));
                         }
                         select.prepend($("<option />").attr("value", ""));
                         select.val('').trigger('chosen:updated');
                    });
            }, 'json');

             $("#new-kpi-category").append($("<option />").text(""));
             for(var i=0;i<$("#manage-left-menu>li").length;i++){
                 var $target=$("#manage-left-menu>li").eq(i);
                 if($target.attr("number") != undefined) {
                     $("#new-kpi-category")
                         .append($("<option />")
                             .attr("value", $target.attr("number"))
                             .text($target.attr("title")))
                 }
             }
             $("#new-kpi-category").val('').trigger('chosen:updated');
        })
         .on("click","#remove-new-kpi-block",function(){
             MANAGE.kpi.kpi_add_clear();
         })
         .on("click","#cancel-new-kpi-block",function(){
             MANAGE.kpi.kpi_add_clear();
         })
     ;

     $("#kpi-library-btn").on("click", function() {
          $("#kpi-library").css("display", "block");
          $("#kpi-library>div").slideDown("3000");
          $.ajax({
               url : "/kpi_categories/template",
               dataType : "json",
               success : function(data) {
                    var category_id;
                    for(var i = 0; i < data.length; i++) {
                         var category = data[i];
                         $("#kpi-library-inner-left").append($("<div />").addClass("accordion-header").attr("title", category.name).attr("id", category.id).text(category.name)).append($("<ul />").addClass("accordion-body"));
                    }
               }
          });
     });
     MANAGE.kpi.library.init();
     $("body").on("keydown", "#manage-sort-list>li>table input[type='text']", function() {
          var $this = $(this), number = $this.getCursorPosition();
          $this.data('cursor-position', number);
     }).on('keyup', "#manage-sort-list>li>table input[type='text']", function(event) {
          var keyCode = adapt_event(event).event.keyCode >= 39 ? (adapt_event(event).event.keyCode == 40 ? 40 : 39) : adapt_event(event).event.keyCode;
          if(keyCode == 8) {
               var number = parseInt($(this).data('cursor-position')) - 1;
          } else {
               var number = keyCode - 38 == 0 ? 0 : (keyCode - 40 == 0 ? $(adapt_event(event).target).val().length : parseInt($(this).data('cursor-position')) + (keyCode - 38));
          }
          setCaretToPos($(this).get(0), number);

     });

     $("#manage-kpi-add").height($(document).height());
     $(window).resize(function() {
          $("#manage-kpi-add").height($(document).height());
     });

     MANAGE.kpi.attribute();

}
MANAGE.kpi.kpi_for_calculate = [];

//////////////////////////////////////////////////////////////////////////  KPI添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.kpi.kpi_add_box_bind = function() {
     $("body")
         .on("keyup", "#new-kpi-target,#new-kpi-target-low", function(event) {
          var e = adapt_event(event).event;
          clearNoNumZero(e.target);
     });
     $("#add-unit").prepend($("<option />").attr("value", ""));
     $("#add-unit").val('').trigger('chosen:updated');
     $("#add-interval").prepend($("<option />").attr("value", ""));
     $("#add-interval").val('').trigger('chosen:updated');
     $("#add-trend").prepend($("<option />").attr("value", ""));
     $("#add-trend").val('').trigger('chosen:updated');

    MANAGE.kpi.isCalcuCheck();
     $("body").on("click", "#calculate-type-box>label", function(event) {
          var obj = adapt_event(event).target;
          var sign = $(obj).attr("sign");
          var oldVal = $("#calcuType-input").val();
          var oldValId = $("#takeCal").attr("cal");
          var newVal = oldVal + sign;
          var newValId = oldValId + sign;
          $("#calcuType-input").val(newVal);
          $("#takeCal").attr("cal", newValId);
          $("#calcuType-input")[0].selectionStart = $("#calcuType-input").val().length;
          $("#calcuType-input").focus();
     });
     $("#is_calcu_relate_chosen .chosen-results").on("click", "li", function() {
          var order = parseInt($(this).attr("data-option-array-index"));
          var val = "[" + $(this).text() + "]";
          var valId = "[" + $("#is-calcu-relate option")[order].getAttribute("value") + "]";
          var oldVal = $("#calcuType-input").val();
          var oldValId = $("#takeCal").attr("cal");
          var newVal = oldVal + val;
          var newValId = oldValId + valId;
          $("#calcuType-input").val(newVal);
          $("#takeCal").attr("cal", newValId);
          $("#calcuType-input")[0].selectionStart = $("#calcuType-input").val().length;
          $("#calcuType-input").focus();
     });
     $("body").on("keyup", "#calcuType-input", function(event) {
          var object = adapt_event(event).target;
          MANAGE.kpi.calculate_input(object)
     });
     $("#calcuType-input").focus(function() {
          var item;
          MANAGE.kpi.kpi_for_calculate = [];
          $("#is-calcu-relate").find("option:not([value=''])").each(function() {
               item = {}
               item.value = $(this).text();
               item.id = $(this).attr("value");
               MANAGE.kpi.kpi_for_calculate.push(item);
          });
     });
     $("#manage-kpi-add-new").on("click", function() {
          MANAGE.kpi.add_new_kpi();
         MANAGE.kpi.kpi_add_clear();
     });
};
MANAGE.kpi.isCalcuCheck = function(){
    $("#is-calcu-check").on("ifChecked", function() {
        $("#calculate-type-box").slideDown("2000");
        $("#is_calcu_relate_chosen").css("width", "131px");
        $("#is-calcu-relate").prepend($("<option />").attr("value", ""));
        $("#is-calcu-relate").val('').trigger('chosen:updated');
    }).on("ifUnchecked", function() {
            $("#calculate-type-box").slideUp("2000");
            $("#calcuType-input").val("");
            $("#is-calcu-relate").find("option:first-of-type").remove();
            $("#is-calcu-relate").val('').trigger('chosen:updated');
            $("#takeCal").attr("cal","");

        });
};
//清空KPI添加
MANAGE.kpi.kpi_add_clear = function() {
     $("#add-new-kpi-block input").val("");
     $("#add-new-kpi-block select").val("").trigger('chosen:updated');
     $("#add-new-kpi-block textarea").val("");
     $("#add-new-kpi-block textarea").val("");
    $("#add-new-kpi-block").find("select").empty().trigger('chosen:updated');
     if($("#is-calcu-check").prop("checked")) {
          $("#is-calcu-check").iCheck("uncheck")
     }
    var count=$("#auto-form-label ul").children().length;
    if(count>1){
        for(var i=0;i<count-1;i++){
            $("#auto-form-label ul").children().eq(0).remove();
        }
    }
    $("#add-new-kpi-block").css("left","-999em").css("right","auto");
    $("#add-new-kpi-block>div").css("left","-999em").css("right","auto");

};
MANAGE.kpi.calculate_input = function(object) {
     var post_value = $(object).val();
     var reg;
     for(var i = 0; i < MANAGE.kpi.kpi_for_calculate.length; i++) {
          reg = "/\\[" + MANAGE.kpi.kpi_for_calculate[i].value + "]/g";
          post_value = post_value.replace(eval(reg), "[" + MANAGE.kpi.kpi_for_calculate[i].id + "]");
     }
     $("#takeCal").attr("cal", post_value);
};
MANAGE.kpi.add_new_kpi = function() {
     var option = {
          entity : $("#new-kpi-category :selected").attr("value"),
          name : $("#new-kpi-name").val(),
          desc : $("#new-kpi-desc").val().length > 0 ? $("#new-kpi-desc").val() : $("#new-kpi-name").val(),
          frequency : $("#add-interval :selected").attr("value"),
          interval : $("#add-interval :selected").text(),
          direction : $("#add-trend :selected").text() == false ? $("#add-trend :eq(1)").attr("value") : $("#add-trend :selected").attr("value"),
          trend : $("#add-trend :selected").text() == false ? $("#add-trend :eq(1)").text() : $("#add-trend :selected").text(),
          target_max : $("#new-kpi-target").val(),
          target_min : $("#new-kpi-target-low").val(),
          unit : $("#add-unit :selected").attr("value"),
          section : $("#add-unit :selected").attr("sym"),
          is_calculated : $("#is-calcu-check").prop("checked"),
          formula : $("#takeCal").attr("cal"),
          formula_string : $("#calcuType-input").val()
     }
    option.attributes=[];
    var count=$("#auto-form-label ul").children().length;
    if(count>1){
        var text;
        for(var i=0;i<count-1;i++){
            text= $.trim($("#auto-form-label ul").children().eq(i).find("span").text());
            option.attributes.push(text);
        }
    }
//   console.log(option);
     if(option.is_calculated) {
          if($.trim(option.name).length > 0 && option.interval != false && option.target_max.length > 0 && option.target_min.length > 0 && option.unit != false && option.formula_string.length > 0) {
               post_kpi(option);
          } else {
               MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
          }
     } else {
          if($.trim(option.name).length > 0 && option.interval != false && option.target_max.length > 0 && option.target_min.length > 0 && option.unit != false) {
               post_kpi(option);
          } else {
               MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
          }
     }
};
function post_kpi(option) {
     $.post('/kpis', {
          kpi : {
               kpi_category_id : option.entity,
               name : option.name,
               description : option.desc,
               frequency : option.frequency,
               direction : option.direction,
               target_max : option.target_max,
               target_min : option.target_min,
               unit : option.unit,
               is_calculated : option.is_calculated,
               formula : option.formula,
               formula_string : option.formula_string,
              kpi_properties:option.attributes
          }
     }, function(data) {
          if(data.result) {
               var object = data.object
               var id = object.id;
               var formula_string = object.is_calculated ? object.formula_string : I18n.t('manage.kpi.not_calculate_type');
              var attrs = object.properties;
               if(option.entity == $("#manage-left-menu .active").attr("number")) {
                    $("#manage-sort-list").prepend($("<li />").attr("id", id).append($("<p />").addClass("sort-handle").text(":")).append($("<input type='checkbox'/>").attr("is_calculated", object.is_calculated)).append($("<table />").addClass("category").append($("<tr />").append($("<td />").text(object.name).attr("title", object.name)).append($("<td />").text(object.interval)).append($("<td />").text(object.trend)).append($("<td />").addClass("manage-kpi-target").append($("<div />").append($("<span />").addClass("can-change").text(object.target_max).attr("title", object.target_max)).append($("<span />").text(object.section)).append($("<input type='text'/>").attr("effect_on", id)))).append($("<td />").addClass("manage-kpi-target").append($("<div />").append($("<span />").addClass("can-change").text(object.target_min).attr("title", object.target_min)).append($("<span />").text(object.section)).append($("<input type='text'/>").attr("effect_on", id)))).append($("<td />").text(option.is_calculated ? I18n.t('manage.kpi.calculate_type') : I18n.t('manage.kpi.not_calculate_type')).attr("title", formula_string))).append($("<tr />").append($("<td />").text(object.desc).attr("title", object.desc)).append($("<td />").text(I18n.t('manage.kpi.frequency'))).append($("<td />").text(I18n.t('manage.kpi.trend'))).append($("<td />").text(I18n.t('manage.kpi.target'))).append($("<td />").text(I18n.t('manage.kpi.target_min'))).append($("<td />").text(I18n.t('manage.kpi.is_calculate_type'))))));
                    $("#manage-sort-list li").each(function() {
                         $(this).find("table tr:first-of-type td:last-of-type").tipsy({
                              gravity : 'se'
                         });
                    });
                   //append attrs
                   $("#manage-sort-list li#"+id).append($("<div/>").addClass("attribute-position").append($("<a/>").addClass("btn btn-success edit-kpi-attribute").attr("work_at",id).text(I18n.t('manage.kpi.dimensions-edit'))).append($("<p/>").attr("kpi_id",id)));
                   for(var i = 0;i<attrs.length;i++){
                       $("p[kpi_id="+id+"]").append($("<span/>").attr("id",attrs[i].id).text(attrs[i].name));
                   }
                    MANAGE.judge_kpi_count();
                    $("#manage-sort-list input[type='checkbox']").iCheck({
                         checkboxClass : 'icheckbox_minimal-aero'
                    });
                    $("#manage-sort-list input[type='checkbox']").on("ifChanged", function() {
                         if(!$(this).parent().hasClass("checked")) {
                              MANAGE.totalChecked += 1;
                              total_check_listener();
                         } else {
                              MANAGE.totalChecked -= 1;
                              total_check_listener();
                         }
                    });
                    MANAGE.sort_init();
                    MANAGE.resize_sort_table();
                    $("#manage-kpi-add").css("right", "999em");
                    $("#manage-right-content").css("padding-right", "0px");
                    $("#left-content-title").css("margin-right", "0px");
//                    MANAGE.kpi.kpi_add_clear();
                    $("#manage-sort-list li").on("resize", function() {
                         MANAGE.resize_sort_table()
                    });


               } else {
                    $("#manage-kpi-add").css("right", "999em");
                    $("#manage-right-content").css("padding-right", "0px");
                    $("#left-content-title").css("margin-right", "0px");
//                    MANAGE.kpi.kpi_add_clear();
                    MessageBox("Add success", "top", "success");
               }
               if(!object.is_calculated) {
                    $("#is-calcu-relate").append($("<option />").attr("value", id).text(object.name));
                    $("#is-calcu-relate").val('').trigger('chosen:updated');
               }
          } else {
               MessageBox(data.content, "top", "warning");
          }
     });


}

//////////////////////////////////////////////////////////////////////////  KPI Library
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.kpi.library.init = function() {
     $("body").on("click", "#kpi-library-inner-left>.accordion-header", function() {
          if(!$(this).hasClass("accordion-in")) {
               $("#kpi-library-inner-left>.accordion-header.accordion-in + .accordion-body").slideUp("2000");
               $("#kpi-library-inner-left>.accordion-header.accordion-in").removeClass("accordion-in");
               $(this).next().slideDown("1000");
               $(this).addClass("accordion-in");
               var category_id = $(this).attr("id");
               var header = $(this);
               $.ajax({
                    url : "/kpis/template/" + category_id,
                    dataType : "json",
                    success : function(data) {
                         for(var i = 0; i < data.length; i++) {
                              header.next(".accordion-body").append($("<li />").append($("<input type='checkbox'/>").attr("id", data[i].id).attr("belong", data[i].admin_kpi_category_template_id)).append($("<h3 />").attr("title", data[i].name).text(data[i].name)).append($("<p />").attr("title", data[i].description).text(data[i].description)));
                              if(data[i].is_calculated) {
                                   header.next(".accordion-body").find("#" + data[i].id).parent().append($("<i />").addClass("icon-lightbulb").attr("title", data[i].formula_string))
                              }
                         }
                         $("input[type='checkbox']").iCheck({
                              checkboxClass : 'icheckbox_minimal-aero'
                         });
                    }
               });
          } else {
               $(this).next().slideUp("1000");
               $(this).removeClass("accordion-in");
          }
     });

     $("body").on("ifChecked", "#kpi-library-inner-left .accordion-body input[type='checkbox']", function() {
          var h = $(this).parent().nextAll("h3").text();
          var id = $(this).attr("id");
          var belong = $(this).attr("belong");
          var p = $(this).parent().nextAll("p").text();
          $("#library-chosen-kpi").append($("<li />").attr("id", id).attr("belong", belong).append($("<h3 />").text(h).attr("title", h)).append($("<p />").text(p).attr("title", p)))
     }).on("ifUnchecked", "#kpi-library-inner-left .accordion-body input[type='checkbox']", function() {
          var id = $(this).attr("id");
          $("#library-chosen-kpi").find("#" + id).remove();
     });

     $("body").on("click", "#library-chosen-kpi li", function() {
          var id = $(this).attr("id");
          $("#kpi-library-inner-left .accordion-body").find("#" + id).iCheck("uncheck");
     });
     $("body").on("click", "#library-cancel", function() {
          MANAGE.kpi.library.cancel();
     });
     $("body").on("click", "#library-add", function() {
          var length = $("#library-chosen-kpi").children().length;
          var belong_init = $("#library-chosen-kpi li").eq(0).attr("belong");
          var kpi_group = [$("#library-chosen-kpi li").eq(0).attr("id")];
          if(belong_init != undefined) {
               for(var i = 1; i <= length; i++) {
                    if($("#library-chosen-kpi li").eq(i).attr("belong") == belong_init) {
                         kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id"));
                    } else if($("#library-chosen-kpi li").eq(i).attr("belong") == undefined) {
                         MANAGE.kpi.library.add_post(belong_init, kpi_group);
                    } else {
                         MANAGE.kpi.library.add_post(belong_init, kpi_group);
                         belong_init = $("#library-chosen-kpi li").eq(i).attr("belong");
                         kpi_group = [];
                         kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id"));
                    }
               }
               MessageBox("KPI Library Add Success", "top", "success");
               MANAGE.kpi.library.cancel();
          } else {
               MessageBox("Nothing have been chosen", "top", "warning");
          }
         MANAGE.kpi.isCalcuCheck();
     });
}
MANAGE.kpi.library.add_post = function(category, kpis) {
     $.ajax({
          url : "/kpis/import",
          type : "POST",
          dataType : "json",
          data : {
               category : category,
               kpis : kpis
          },
          async : false,
          success : function(data) {
               if(data.result) {
                    $("#manage-left-menu").append($("<li />").attr("title", data.content).attr("number", data.object)
                        .append($("<i />").addClass("icon-trash icon-item"))
                        .append($("<a href='/kpis/c/" + data.object + "'/>").text(data.content)));
               } else {
                    MessageBox(data.content, "top", "warning");
               }
          }
     });
}
MANAGE.kpi.library.cancel = function() {
     $("#kpi-library>div").slideUp("3000");
     $("#kpi-library").css("display", "none");
     $("#kpi-library-inner-left").empty();
     $("#library-chosen-kpi").empty();
}

//2014.4.21 属性的各种操作
//属性初始化
MANAGE.kpi.attribute=function(){
    $("body")
        //每一个KPI上点击编辑属性出来的
        .on("click",".edit-kpi-attribute",function(){
            MANAGE.kpi.edit_attribute_copen(this);
            //$("#edit-attribute-block").css("display","block");
            //$("#edit-attribute-block>div").css("display","block");
        })
        .on("click","#edit-attribute-block-remove",function(){
            MANAGE.kpi.edit_attribute_close();
        })
        .on("click","#edit-attribute-block-cancel",function(){
            MANAGE.kpi.edit_attribute_close();
        })
        .on("click","#edit-attribute-block-add",MANAGE.kpi.add_kpi_property)
        .on("keydown","#add-kpi-property",MANAGE.kpi.add_kpi_property)
        .on("click",".remove-attr",MANAGE.kpi.delete_kpi_property)
    MANAGE.attribute.autoLabel();
}

MANAGE.kpi.add_kpi_property=function(e){
    if(e.keyCode != undefined && e.keyCode != 13){
        return;
    }
    var kpi_id = $(this).attr("work_at");
    var property_name = $(this).parent().children("input").val().replace(/^\s+|\s+$/g, "");
    if(property_name.length == 0){
        MessageBox(I18n.t('manage.kpi.dimensions-not-null'),"top","warning");
    }else{
        $.ajax({
            url:"/kpis/assign_properties",
            data:{kpi_property_name:property_name,id:kpi_id},
            dataType:"json",
            type:"POST",
            success:function(data){
                if(data.result){
                    $("#edit-attribute-block-add").parent().children("input").val("");
                    //$('<li><label>'+data.content.name+'</label><i class="icon icon-trash" attr-id='+data.content.id+'></i></li>').appendTo($("#kpi-properties"));
                    $('<li/>').append($('<label/>').text(data.content.name)).append($('<i/>').addClass("icon icon-trash remove-attr").attr('attr-id',data.content.id)).appendTo($("#kpi-properties"));
                    $('<span id='+data.content.id+'>'+data.content.name+'</span>').appendTo($("p[kpi_id="+kpi_id+"]"));
                    $("body").on("click",".remove-attr",MANAGE.kpi.delete_kpi_property);
                }else{
                    MessageBox(data.content,"top","warning");
                }
            }
        });
    }
}

MANAGE.kpi.delete_kpi_property=function(){
    var attr_id = $(this).attr("attr-id");
    $.ajax({
        url:"/kpis/remove_properties",
        data:{id:attr_id},
        type:"POST",
        dataType:"json",
        success:function(data){
            if(data.result){
                $("i[attr-id="+attr_id+"]").parent().remove();
                $("span#"+attr_id).remove();
                //MessageBox("Delete property successfully!","top","success");
            }else{

            }
        }
    })
}

MANAGE.kpi.edit_attribute_copen=function(obj){
    //append kpi_property
    var attrs = $(obj).parent().children("p").children();
    $("#kpi-properties").children().remove();
    for(var i = 0;i<attrs.length;i++){
        var id = $(attrs[i]).attr("id");
        var name = $(attrs[i]).text();
        $('<li><label>'+name+'</label><i class="icon icon-trash remove-attr" attr-id='+id+'></i></li>').appendTo($("#kpi-properties"));
    }
    $("#edit-attribute-block-add").attr("work_at",$(obj).attr("work_at"));
    $("#add-kpi-property").attr("work_at",$(obj).attr("work_at"));
    $("#add-kpi-property").val("");
    //
    $("#edit-attribute-block").css("display","block");
    $("#edit-attribute-block>div").css("display","block");
}

MANAGE.kpi.edit_attribute_close=function(){
    $("#edit-attribute-block").css("display","none");
    $("#edit-attribute-block>div").css("display","none");
}

MANAGE.attribute.autoLabel=function(){
    $("body")
        .on("click","#auto-form-label",function(){
            $(this).find("input").focus();
        })
        .on("keyup","#auto-form-label input",function(event){
            var e=adapt_event(event).event;
            var text= $.trim($(this).val());
            if(e.keyCode==13 && text.length>0){
               $(this).parents("li").before(
                   $("<li />")
                       .append($("<span />").text(text))
                       .append($("<i />").addClass("icon icon-remove"))
               );
               $(this).val("");
            }
        })
        .on("click","#auto-form-label i",function(){
             $(this).parents("li").remove();
        })
}




