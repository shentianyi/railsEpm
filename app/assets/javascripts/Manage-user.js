/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-23
 * Time: 下午8:10
 * To change this template use File | Settings | File Templates.
 */
var MANAGE = MANAGE || {};
MANAGE.user = {};
MANAGE.user.icheck = {};
//////////////////////////////////////////////////////////////////////////  User init
//////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.init = function() {
     MANAGE.user.user_add_box_bind();
     MANAGE.user.user_add_clear();
     MANAGE.user.icheck.init();
     MANAGE.user.assign.init();
     $("body").on("click", "#add-user-show", function() {
          $("#manage-user-add").css("right","261px");
          $("#manage-right-content").css("padding-right","200px");
          $("#left-content-title").css("margin-right","201px");
         $("#user-edit").css("left", "-250px");
         $("#manage-right-content").css("padding-left", "0px");

          $("#manage-user-add.create-user> div >.div-select>div").css("width","150px")
     }).on("click", "#manage-user-edit", function() {
          $("#user-edit").css("left", "0px");
          $("#manage-right-content").css("padding-left", "200px");
          $("#manage-user-add").css("right","999em");
          $("#manage-right-content").css("padding-right","0px");
          $("#left-content-title").css("margin-right","0px");
          MANAGE.user.user_edit_box_bind();
     });
     $("#manage-user-edit-old").on("click", function() {
          MANAGE.user.edit()
     });

    $("#manage-left-menu>li").each(function(){
        if($(this).attr("number")!=undefined){
            $("#department-for-kpi").append(
                $("<option />").attr("value",$(this).attr("number")).text($(this).attr("title"))
            )
        }
    });
    $("#department-for-kpi").val('').trigger('chosen:updated');
    $("#manage-user-add").height($(document).height()-$("header").height());
    $(window).resize(function(){
        $("#manage-user-add").height($(document).height()-$("header").height());
    });

}
//////////////////////////////////////////////////////////////////////////         list 那一块
//////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.icheck.init = function() {
     $("#manage-sort-list input[type='checkbox']").on("ifChecked", function() {
          $("#manage-sort-list input[type='checkbox']").filter(function() {
               return $(this).parent().hasClass("checked")
          }).iCheck("uncheck");
     });
     $("#manage-sort-list input[type='checkbox']").on("ifUnchecked", function() {
          if($("#manage-sort-list .icheckbox_minimal-aero.checked").length == 1 && $("#user-edit").css("left") != "-200px") {
               $("#user-edit").css("left", "-250px");
               $("#manage-right-content").css("padding-left", "0px");
               MANAGE.user.user_add_clear();
          }
     })
}
//////////////////////////////////////////////////////////////////////////         User 添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.user_add_box_bind = function() {
     $("body").on("click", "#close-add-user[general='close-user']", function() {
          MANAGE.user.user_add_close();
     });
    $("body").on("click", "#close-user-edit[general='close-user']", function() {
        MANAGE.user.user_edit_close();
    });
     $("#manage-user-add-new").on("click", function() {
          MANAGE.user.add_new();
     });
     $("#new-user-password-confirm").blur(function() {
          if($(this).val() != $("#new-user-password").val()) {
               $(this).css("borderColor", "#fa4545").attr("red", true);
          } else {
               $(this).css("borderColor", "#ddd").attr("red", false);
          }
     });
     $("[general='user-mail']").blur(function() {
          if(!isEmail($(this).val())) {
               $(this).css("borderColor", "#fa4545").attr("red", true);
          } else {
               $(this).css("borderColor", "#ddd").attr("red", false);
          }
     });
};
MANAGE.user.user_add_close = function() {
    $("#manage-user-add").css("right","999em");
    $("#manage-right-content").css("padding-right","0px");
    $("#left-content-title").css("margin-right","0px");
     MANAGE.user.user_add_clear();
};
MANAGE.user.user_edit_close = function() {
    $("#user-edit").css("left", "-250px");
    $("#manage-right-content").css("padding-left", "0px");
    MANAGE.user.user_add_clear();
};
MANAGE.user.user_add_clear = function() {
     $("[general='manage-user-add'] input[type='text']").val("");
     $("[general='manage-user-add'] input[type='password']").val("");
    $("[general='manage-user-add'] select").val('').trigger('chosen:updated');
     $("[general='manage-user-add'] input[type='radio']").iCheck("uncheck");
     $("[general='manage-user-add']>div>input").filter("[red='true']").css("borderColor", "#ddd").attr("red", "false");
     $("#manage-user-add input[type='radio']").first().iCheck("check");
     $("#user-edit input[type='radio']").first().iCheck("check");
};

MANAGE.user.add_new = function() {
     var name = $("#new-user-name").val();
     var group = $("#department-for-kpi :selected").text();
     var entity_id = $("#department-for-kpi :selected").attr("value");
     var mail = $("#new-user-mail").val();
     var title=$('#new-user-title').val();
     var password = $("#new-user-password").val();
     var password_confirm = $("#new-user-password-confirm").val();
     var role = $("input[name='user-role']:checked").attr("value");
     var authority = $("input[name='user-role']:checked").data("name");
     if($.trim(name).length > 0 && mail.length > 0 && password.length > 0 && password_confirm.length > 0) {
          if($("#manage-user-add>div>input").filter("[red='true']").length == 0) {
                if(group.length>0){


//                    $("#manage-sort-list").prepend($("<li />").attr("id","21")
//                        .append($("<p />").addClass("sort-handle").text(":"))
//                        .append($("<input type='checkbox'/>"))
//                        .append($("<table />").addClass("group")
//                            .append($("<tr />")
//                                .append($("<td />").text(name).addClass("user-manage-name"))
//                                .append($("<td />").text(authority).addClass("user-manage-authority").attr("value",role))
//                            )
//                            .append($("<tr />")
//                                .append($("<td />").text(mail).addClass("user-manage-mail"))
//                                .append($("<td />").text("Authority"))
//                            )
//                        )
//                    );
//                    $("#manage-sort-list input[type='checkbox']").iCheck({
//                        checkboxClass: 'icheckbox_minimal-aero'
//                    });
//                    $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
//                        if(!$(this).parent().hasClass("checked")){
//                            MANAGE.totalChecked+=1;
//                            total_check_listener();
//                        }
//                        else{
//                            MANAGE.totalChecked-=1;
//                            total_check_listener();
//                        }
//                    });
//                    $("#manage-sort-list li").on("resize",function(){
//                        MANAGE.resize_sort_table()
//                    });
//                    MANAGE.judge_kpi_count();
//                    MANAGE.sort_init();
//                    MANAGE.resize_sort_table();
//                    MANAGE.user.icheck.init();
//                    MANAGE.user.user_add_close();





                    $.ajax({
                        url : '/users',
                        data : {
                            user : {
                                first_name : name,
                                email : mail,
		                title: title,
                                password : password,
                                password_confirmation : password_confirm,
                                entity_id : entity_id,
                                role_id : role
                            }
                        },
                        type : 'POST',
                        dataType : 'json',
                        success : function(data) {
                            if(data.result) {
                                if($("#manage-left-menu li.active").attr("number")==entity_id){
                                    var object=data.object;
                                    $("#manage-sort-list").prepend($("<li />").attr("id", object.id)
                                        .append($("<p />").addClass("sort-handle").text(":"))
                                        .append($("<input type='checkbox'/>"))
                                        .append($("<table />").addClass("group")
                                            .append($("<tr />")
                                                .append($("<td />").text(object.first_name).addClass("user-manage-name"))
                                                .append($("<td />").text(object.title).addClass("user-manage-title"))
                                                .append($("<td />").text(object.role).addClass("user-manage-authority").attr("value", object.role_id)))
                                            .append($("<tr />")
                                                .append($("<td />").text(object.email).addClass("user-manage-mail"))
                                                .append($("<td />").text(I18n.t('manage.user.desc.title')))
                                                .append($("<td />").text(I18n.t('manage.user.desc.authority'))))));
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
                                    $("#manage-sort-list li").on("resize", function() {
                                        MANAGE.resize_sort_table()
                                    });
                                    MANAGE.judge_kpi_count();
                                    MANAGE.sort_init();
                                    MANAGE.resize_sort_table();
                                    MANAGE.user.icheck.init();
                                    $("#assign-kpi-user").append($("<oprion />").attr("value",object.id).text(object.email));
                                    $("#assign-kpi-user").val('').trigger('chosen:updated');
                                }
                                MANAGE.user.user_add_close();
                            }
                            else {
                                var errmsg = "";
                                if(data.content.hasOwnProperty("email")){
                                    errmsg = errmsg + "邮箱："+data.content.email[0] + ";";
                                }
                                if(data.content.hasOwnProperty("password")){
                                    errmsg = errmsg + "  密码："+data.content.password[0] + ";";
                                }
                                if(data.content.hasOwnProperty("password_confirmation")){
                                    errmsg = errmsg + "  密码确认："+data.content.password_confirmation[0] + ";";
                                }
                                MessageBox(errmsg, "top", "warning")
                            }
                        }
                    });


                }
                else{
                    MessageBox("Please choose a department to put your new user", "top", "danger");
                }
          } else {
               MessageBox("Please fix the input with red border", "top", "danger");
          }
     } else {
          MessageBox("Please fill all the blanket taking *", "top", "warning");
     }
};
//////////////////////////////////////////////////////////////////////////         User 编辑那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.user_edit_box_bind = function() {
     var $target = $("#manage-sort-list .icheckbox_minimal-aero.checked"),
         name = $target.next().find(".user-manage-name").text(),
         mail = $target.next().find(".user-manage-mail").text(),
	 title=$target.next().find('.user-manage-title').text(),
         authority = $target.next().find(".user-manage-authority").attr("value");
     $("#user-edit #edit-user-name").val(name);
     $("#user-edit #edit-user-mail").val(mail);
     $("#user-edit #edit-user-title").val(title);
     $("#user-edit input[type='radio'][value='" + authority + "']").iCheck("check");
     $("#manage-user-edit-old").attr("effect_on", $target.parent().attr("id"));
}
MANAGE.user.edit = function() {
     var edit_name = $("#user-edit #edit-user-name").val(), edit_mail = $("#user-edit #edit-user-mail").val(), edit_role = $("#user-edit input[name='edit-user-role']:checked").data("name"), edit_authority = $("#user-edit input[name='edit-user-role']:checked").attr("value"), edit_id = $("#manage-user-edit-old").attr("effect_on"), $target = $("#manage-sort-list").find("#" + edit_id);
     var title= $("#user-edit #edit-user-title").val();
     if($.trim(edit_name).length > 0 && edit_mail.length > 0) {
          if($("#user-edit>div>input").filter("[red='true']").length == 0) {
               $.ajax({
                    url : '/users',
                    type : 'PUT',
                    data : {
                         id : $("#manage-sort-list").find(":checked").parent().parent().attr("id"),
                         user : {
                              first_name : edit_name,
                              email : edit_mail,
                              title: title,
                              role_id : edit_authority
                         }
                    },
                    dataType : 'json',
                    success : function(data) {
                         if(data.result) {
                              var object=data.object;
                              $target.find(".user-manage-name").text(object.first_name);
                              $target.find(".user-manage-mail").text(object.email);
                              $target.find(".user-manage-title").text(object.title);
                              if($("#manage-sort-list").find(":checked").parent().parent().attr("is_tenant")=="false")
                              $target.find(".user-manage-authority").text(object.role).attr("value", object.role_id);
                         } else {
                              MessageBox("Something get wrong", "top", "wrong");
                         }
                    }
               });
               //                           $target.find(".user-manage-name").text(edit_name);
               //                           $target.find(".user-manage-mail").text(edit_mail);
               //                           $target.find(".user-manage-authority").text(edit_role).attr("value",edit_authority);
               MANAGE.user.user_edit_close();
          } else {
               MessageBox("Please fix the input with red border", "top", "danger");
          }
     } else {
          MessageBox("Please fill all the blanket taking *", "top", "warning");
     }
}
//////////////////////////////////////////////////////////////////////////         User assign kpi
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.assign = {};
MANAGE.user.assign.init = function() {
     //assign kpi初始化
    $("#manage-user-delivery").on("click",MANAGE.user.assign.initial)

     $("body").on("change", "#assign-kpi-user", function() {
          var id = $(this).find(":selected").attr("value")
          $.ajax({
               url : '/kpis/user/'+id,
               dataType : 'html',
               success : function(kpis) {
                    $('#assign-kpi-inner').html(kpis);
               }
          });

     });



     //左边的KPI列出来
     $("body").on("change","#kpi-category",function(event){
          var id = $(adapt_event(event).target).attr("value");
          $.ajax({
               url : '/kpis/categoried/'+id,
               dataType : 'json',
               success : function(data) {
                    $("#assign-kpi-list").empty();
                    for(var i = 0; i < data.length; i++) {
                         $("#assign-kpi-list").append($("<li />")
                             .append($("<h3 />").attr("kpi_id", data[i].id).text(data[i].name)).append($("<p />").attr("title", data[i].description).text(data[i].description)));
                    }
               }
          });
     });
     $("body").on("click", "#assign-kpi-list>li>h3", function() {
          var id = $(this).attr("kpi_id"), h3 = $(this).text(), p = $(this).next().text(), validate = true;
          if($("#assign-kpi-user :selected").text().length>0){
              $("#assign-kpi-inner>.left>li").each(function() {
                  if($(this).attr("kpi_id") == id) {
                      validate = false;
                      return false
                  }
              });
          }
          else{
              return;
          }
          if(validate) {
               var user_id = $("#assign-kpi-user :selected").attr("value");
               $.ajax({
                    url : '/kpis/assign',
                    dataType : 'json',
                    data : {
                         kpi : id,
                         user : user_id
                    },
                    type : 'post',
                    success : function(data) {
                         if(data[0]) {
                              $("#assign-kpi-inner>.left").append($("<li />").attr("id", data[0].id).attr("kpi_id", data[1].id)
                                  .append($("<table />").append($("<tr />")
                                        .append($("<td />").text(data[1].name))
                                        .append($("<td />").append($("<input type='text'/>").val(data[1].target_max).attr("kpi_id", data[0].id)))
                                         .append($("<td />").append($("<input type='text'/>").val(data[1].target_min).attr("kpi_id", data[0].id)))
                                      )
                                      .append($("<tr />")
                                          .append($("<td />").text(data[1].description))
                                          .append($("<td />").text("Target Max"))
                                          .append($("<td />").text("Target Min"))
                                      )
                                  )
                                  .append($("<i />").addClass("icon-trash")));
                         } else {
                              MessageBox("Same KPI has already been assigned", "top", "warning");
                         }
                    }
               });

//              $("#assign-kpi-inner>.left").append($("<li />").attr("id", 21).attr("kpi_id",21)
//                  .append($("<table />").append($("<tr />")
//                          .append($("<td />").text(21))
//                          .append($("<td />").append($("<input type='text'/>").val(100).attr("id", 21)))
//                          .append($("<td />").append($("<input type='text'/>").val(10).attr("id", 21)))
//                      )
//                      .append($("<tr />")
//                          .append($("<td />").text("asd"))
//                          .append($("<td />").text("Target Max"))
//                          .append($("<td />").text("Target Min"))
//                      )
//                  )
//                  .append($("<i />").addClass("icon-trash")));




          }
          else {
               MessageBox("Same KPI has already been assigned", "top", "warning");
          }
     });

     //左边KPI删除
     $("body").on("click", "#assign-kpi-inner>ul>li>i", function() {
          if(confirm("Unassign this KPI ?")) {
               var $target = $(this).parent();
               $.ajax({
                    url : '/user_kpi_items/' + $target.attr("id"),
                    dataType : 'json',
                    type : 'DELETE',
                    success : function(data) {
                         if(data.result) {
                              $target.remove();
                         }
                    }
               });
//              $target.remove();
          }
     });
     //左边input的js
     $("body").on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function(event) {
          clearNoNumZero(adapt_event(event).target);
     });
     $("body").on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function(event){
        var e=adapt_event(event).event;
        if(e.keyCode ==13){
            $(this).blur();
        }
     });
     $("body").on("blur", "#assign-kpi-inner>ul>li input[type='text']", MANAGE.user.assign.input);
     $("body").on("click", "#assign-kpi-cancel", MANAGE.user.assign.close);
};
MANAGE.user.assign.initial=function(){
    $("#assign-kpi-wrap").css("display", "block");
    $("#kpi-category+div").css("width","180px");
    $("#assign-kpi-user+div").css("width","180px");
    $.ajax({
            url : 'kpi_categories/list',
            dataType : 'json',
            success : function(data) {
                for(var i = 0; i < data.length; i++) {
                    $("#kpi-category").append($("<option />").attr("value", data[i].id).text(data[i].name))
                }
                $("#kpi-category").prepend($("<option />").attr("value", ""));
                $("#kpi-category").val('').trigger('chosen:updated');
            }
    });

//    for(var i = 0; i < 2; i++) {
//        $("#kpi-category").append($("<option />").attr("value", i).text(i))
//    }
//    $("#kpi-category").prepend($("<option />").attr("value", ""));
//    $("#kpi-category").val('').trigger('chosen:updated');

} ;
MANAGE.user.assign.close = function() {
    $("#assign-kpi-list").empty();
    $("#assign-kpi-inner").empty();
    $("#assign-kpi-user").val('').trigger('chosen:updated');
    $("#kpi-category option").remove();
    $("#kpi-category").val('').trigger('chosen:updated');
    $("#assign-kpi-wrap").css("display", "none");
};
MANAGE.user.assign.input = function(event) {
     var target = adapt_event(event).target;
     var id = $(target).attr("kpi_id");
     var target_max=$("#"+id).find(".target_max").val();
     var target_min=$("#"+id).find(".target_min").val();
     $.ajax({
          url : "/user_kpi_items",
          type : 'PUT',
          data : {
               id : id,
               user_kpi_item:{
                   target_max:target_max,
                   target_min:target_min
               }

          },
          success : function(data) {
               if(!data.result)
                    MessageBox(data.content, "top", "warning");
          }
     });
}

