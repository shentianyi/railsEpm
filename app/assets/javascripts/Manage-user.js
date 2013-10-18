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
          $("#manage-user-add").css("left", "150px");
          $("#user-edit").css("left", "-50px");
          $("#manage-right-content").css("left", "350px");
     }).on("click", "#manage-user-edit", function() {
          $("#manage-user-add").css("left", "-50px");
          $("#user-edit").css("left", "150px");
          $("#manage-right-content").css("left", "350px");
          MANAGE.user.user_edit_box_bind();
     });
     $("#manage-user-edit-old").on("click", function() {
          MANAGE.user.edit()
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
          if($("#manage-sort-list .icheckbox_minimal-aero.checked").length == 1 && $("#user-edit").css("left") != "-50px") {
               $("#user-edit").css("left", "-50px");
               $("#manage-right-content").css("left", "150px");
               MANAGE.user.user_add_clear();
          }
     })
}
//////////////////////////////////////////////////////////////////////////         User 添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.user_add_box_bind = function() {
     $("body").on("click", "[general='close-user']", function() {
          MANAGE.user.user_add_close();
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
     $("[general='manage-user-add']").css("left", "-50px");
     $("#manage-right-content").css("left", "150px");
     MANAGE.user.user_add_clear();
};
MANAGE.user.user_add_clear = function() {
     $("[general='manage-user-add'] input[type='text']").val("");
     $("[general='manage-user-add'] input[type='password']").val("");
     $("[general='manage-user-add'] input[type='radio']").iCheck("uncheck");
     $("[general='manage-user-add']>div>input").filter("[red='true']").css("borderColor", "#ddd").attr("red", "false");
     $("#manage-user-add input[type='radio']").first().iCheck("check");
     $("#user-edit input[type='radio']").first().iCheck("check");
};

MANAGE.user.add_new = function() {
     var name = $("#new-user-name").val();
     var group = $("#manage-left-menu li.active").find("a").text();
     var entity_id = $("#manage-left-menu li.active").attr("number");
     var mail = $("#new-user-mail").val();
     var password = $("#new-user-password").val();
     var password_confirm = $("#new-user-password-confirm").val();
     var role = $("input[name='user-role']:checked").attr("value");
     var authority = $("input[name='user-role']:checked").data("name");
     if(name.length > 0 && mail.length > 0 && password.length > 0 && password_confirm.length > 0) {
          if($("#manage-user-add>div>input").filter("[red='true']").length == 0) {
               //           $("#manage-sort-list").prepend($("<li />").attr("id","21")
               //               .append($("<p />").addClass("sort-handle").text(":"))
               //               .append($("<input type='checkbox'/>"))
               //               .append($("<table />").addClass("group")
               //                   .append($("<tr />")
               //                       .append($("<td />").text(name).addClass("user-manage-name"))
               //                       .append($("<td />").text(authority).addClass("user-manage-authority").attr("value","400"))
               //                   )
               //                   .append($("<tr />")
               //                       .append($("<td />").text(mail).addClass("user-manage-mail"))
               //                       .append($("<td />").text("Authority"))
               //                   )
               //               )
               //           );
               //           $("#manage-sort-list input[type='checkbox']").iCheck({
               //               checkboxClass: 'icheckbox_minimal-aero'
               //           });
               //           $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
               //               if(!$(this).parent().hasClass("checked")){
               //                   MANAGE.totalChecked+=1;
               //                   total_check_listener();
               //               }
               //               else{
               //                   MANAGE.totalChecked-=1;
               //                   total_check_listener();
               //               }
               //           });
               //           $("#manage-sort-list li").on("resize",function(){
               //               MANAGE.resize_sort_table()
               //           });
               //           MANAGE.judge_kpi_count();
               //           MANAGE.sort_init();
               //           MANAGE.resize_sort_table();
               //           MANAGE.user.icheck.init();
               //           MANAGE.user.user_add_close();

               $.ajax({
                    url : '/users',
                    data : {
                         user : {
                              first_name : name,
                              email : mail,
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
                              $("#manage-sort-list").prepend($("<li />").attr("id", data.id).append($("<p />").addClass("sort-handle").text(":")).append($("<input type='checkbox'/>")).append($("<table />").addClass("group").append($("<tr />").append($("<td />").text(name).addClass("user-manage-name")).append($("<td />").text(authority).addClass("user-manage-authority").attr("value", "400"))).append($("<tr />").append($("<td />").text(mail).addClass("user-manage-mail")).append($("<td />").text("Authority")))));
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
                              MANAGE.user.user_add_close();
                         } else {
                              MessageBox(data.content, "top", "warning")
                         }
                    }
               });
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
     var $target = $("#manage-sort-list .icheckbox_minimal-aero.checked"), name = $target.next().find(".user-manage-name").text(), mail = $target.next().find(".user-manage-mail").text(), authority = $target.next().find(".user-manage-authority").attr("value");
     $("#user-edit #edit-user-name").val(name);
     $("#user-edit #edit-user-mail").val(mail);
     $("#user-edit input[type='radio'][value='" + authority + "']").iCheck("check");
     $("#manage-user-edit-old").attr("effect_on", $target.parent().attr("id"));
}
MANAGE.user.edit = function() {
     var edit_name = $("#user-edit #edit-user-name").val(), edit_mail = $("#user-edit #edit-user-mail").val(), edit_role = $("#user-edit input[name='edit-user-role']:checked").data("name"), edit_authority = $("#user-edit input[name='edit-user-role']:checked").attr("value"), edit_id = $("#manage-user-edit-old").attr("effect_on"), $target = $("#manage-sort-list").find("#" + edit_id);
     if(edit_name.length > 0 && edit_mail.length > 0) {
          if($("#user-edit>div>input").filter("[red='true']").length == 0) {
               $.ajax({
                    url : '/users',
                    type : 'PUT',
                    data : {
                         id : $("#manage-sort-list").find(":checked").parent().parent().attr("id"),
                         user : {
                              first_name : edit_name,
                              email : edit_mail,
                              role_id : edit_authority
                         }
                    },
                    dataType : 'json',
                    success : function(data) {
                         if(data.result) {
                              console.log(edit_name);
                              $target.find(".user-manage-name").text(edit_name);
                              $target.find(".user-manage-mail").text(edit_mail);
                              if($("#manage-sort-list").find(":checked").parent().parent().attr("is_tenant")=="false")
                              $target.find(".user-manage-authority").text(edit_role).attr("value", edit_authority);
                         } else {
                              MessageBox("Something get wrong", "top", "wrong");
                         }
                    }
               });
               //                           $target.find(".user-manage-name").text(edit_name);
               //                           $target.find(".user-manage-mail").text(edit_mail);
               //                           $target.find(".user-manage-authority").text(edit_role).attr("value",edit_authority);
               MANAGE.user.user_add_close();
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
     $("body").on("click", "#manage-user-delivery", function() {
          var $target = $("#manage-sort-list").find(":checked"), id = $target.parent().parent().attr("id"), user_name = $target.parent().next().find(".user-manage-name").text();
          $.ajax({
               url : '/kpis/user_kpis',
               data : {
                    id : id
               },
               dataType : 'html',
               success : function(kpis) {
                    $('#assign-kpi-inner').html(kpis);
                    $("#assign-kpi-wrap").css("display", "block");
                    $("#assign-kpi>.assign-kpi-top>p>span:first-of-type").text(user_name);
               }
          });

          $("#assign-kpi-wrap").css("display", "block");
          $("#assign-kpi>.assign-kpi-top>p>span:first-of-type").text(user_name);
     });
     //assign kpi category 初始化
     $("#assign-kpi-pick").on("click", function() {
          $.ajax({
               url : 'kpi_categories/list',
               dataType : 'json',
               success : function(data) {
                    for(var i = 0; i < data.length; i++) {
                         $("#kpi-category").append($("<option />").attr("value", data[i].id).text(data[i].name))
                    }
                    $("#assign-kpi-options[special='user']").show("1000").find(".select-div>.chosen-container").css("width", "180px");
                    $("#kpi-category").prepend($("<option />").attr("value", ""));
                    $("#kpi-category").val('').trigger('chosen:updated');
               }
          });

          //         $("#assign-kpi-options[special='user']").show("1000").find(".select-div>.chosen-container").css("width", "180px");
     });

     $("body").on("click", "#close-assign-kpi-options", function() {
          $("#assign-kpi-options[special='user']").hide("1000");
          $("#assign-kpi-list").empty();
          $("#kpi-category").children().first().remove();
     });
     //右边的KPI列出来
     $("#kpi-category").chosen().change(function(event) {
          var id = $(adapt_event(event).target).attr("value");
          $.ajax({
               url : '/kpis/get_by_category',
               dataType : 'json',
               data : {
                    id : id
               },
               success : function(data) {
                    $("#assign-kpi-list").empty();
                    for(var i = 0; i < data.length; i++) {
                         $("#assign-kpi-list").append($("<li />").append($("<h3 />").attr("kpi_id", data[i].id).text(data[i].name)).append($("<p />").attr("title", data[i].description).text(data[i].description)));
                    }
               }
          });
     });
     $("body").on("click", "#assign-kpi-list>li>h3", function() {
          var id = $(this).attr("kpi_id"), h3 = $(this).text(), p = $(this).next().text(), validate = true;
          $("#assign-kpi-inner>.left>li").each(function() {
               if($(this).attr("kpi_id") == id) {
                    validate = false;
                    return false
               }
          });
          if(validate) {
               var $target = $("#manage-sort-list").find(":checked"), user_id = $target.parent().parent().attr("id");
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
                              $("#assign-kpi-inner>.left").append($("<li />").attr("id", data[0].id).attr("kpi_id", data[1].id).append($("<table />").append($("<tr />").append($("<td />").text(data[1].name)).append($("<td />").append($("<input type='text'/>").val(data[1].target).attr("id", data[0].id)))).append($("<tr />").append($("<td />").text(data[1].description)).append($("<td />").text("target")))).append($("<i />").addClass("icon-trash")));
                         } else {
                              MessageBox("Same KPI has already been assigned", "top", "warning");
                         }
                    }
               });
          } else {
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
          }
     });
     //左边input的js
     $("body").on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function(event) {
          clearNoNumZero(adapt_event(event).target);
     }).on("keydown", "#assign-kpi-inner>ul>li input[type='text']", function(event) {
          if(adapt_event(event).event.keyCode == 13) {
               $(adapt_event(event).target).blur();
          }
     });
     $("#assign-kpi-wrap").on("blur", "#assign-kpi-inner>ul>li input[type='text']", MANAGE.user.assign.input);
     $("body").on("click", "#assign-kpi-cancel", MANAGE.user.assign.close);
};

MANAGE.user.assign.close = function() {
     $("#assign-kpi-inner>.left").empty();
     if($("#assign-kpi-options[special='user']").css("display") == "block") {
          $("#assign-kpi-options[special='user']").hide("1000")
     }
     $("#assign-kpi-wrap").css("display", "none");
};
MANAGE.user.assign.input = function(event) {
     var target = adapt_event(event).target;
     var id = $(target).attr("id");
     var value = $(target).val();
     $.ajax({
          url : "/user_kpi_items",
          type : 'PUT',
          data : {
               id : id,
               user_kpi_item : {
                    target : value
               }
          },
          success : function(data) {
               if(!data.result)
                    MessageBox(data.content, "top", "warning");
          }
     });
}

