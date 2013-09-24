/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-23
 * Time: 下午8:10
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {};
MANAGE.user={};
MANAGE.user.icheck={};
//////////////////////////////////////////////////////////////////////////  User init
//////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.init=function(){
    MANAGE.user.user_add_box_bind();
    MANAGE.user.user_add_clear();
    MANAGE.user.icheck.init();
    $("body").on("click","#add-user-show",function(){
        $("#manage-user-add").css("left","150px");
        $("#user-edit").css("left","-50px");
        $("#manage-right-content").css("left","350px");
    }).on("click","#manage-user-edit",function(){
            $("#manage-user-add").css("left","-50px");
            $("#user-edit").css("left","150px");
            $("#manage-right-content").css("left","350px");
            MANAGE.user.user_edit_box_bind();
    });
    $("#manage-user-edit-old").on("click",function(){
        var edit_name=$("#user-edit #edit-user-name").val(),
            edit_mail=$("#user-edit #edit-user-mail").val(),
            edit_role=$("#user-edit input[name='edit-user-role']:checked").data("name"),
            edit_authority=$("#user-edit input[name='edit-user-role']:checked").attr("value"),
            $target=$("#manage-sort-list").find("#"+$(this).attr("effect_on"));
        if(edit_name.length>0 && edit_mail.length>0){
            if($("#user-edit>div>input").filter("[red='true']").length==0){
                $target.find(".user-manage-name").text(edit_name);
                $target.find(".user-manage-mail").text(edit_mail);
                $target.find(".user-manage-authority").text(edit_role).attr("value",edit_authority);
                MANAGE.user.user_add_close();
            }
            else{
                MessageBox("Please fix the input with red border","top","danger");
            }
        }
        else{
            MessageBox("Please fill all the blanket taking *","top","warning");
        }
    });
    $("#manage-user-delivery").on("click",function(){
        MANAGE.user.assign.init();
    })
}
//////////////////////////////////////////////////////////////////////////         list 那一块
//////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.icheck.init=function(){
     $("#manage-sort-list input[type='checkbox']").on("ifChecked",function(){
         $("#manage-sort-list input[type='checkbox']").filter(function(){
             return $(this).parent().hasClass("checked")
         }).iCheck("uncheck");
     });
     $("#manage-sort-list input[type='checkbox']").on("ifUnchecked",function(){
         if($("#manage-sort-list .icheckbox_minimal-aero.checked").length==1 && $("#user-edit").css("left")!="-50px"){
             $("#user-edit").css("left","-50px");
             $("#manage-right-content").css("left","150px");
             MANAGE.user.user_add_clear();
         }
     })
}
//////////////////////////////////////////////////////////////////////////         User 添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.user_add_box_bind=function(){
    $("body").on("click","[general='close-user']",function(){
        MANAGE.user.user_add_close();
    });
    $("#manage-user-add-new").on("click",function(){
        MANAGE.user.add_new();
    });
    $("#new-user-password-confirm").blur(function(){
       if($(this).val()!=$("#new-user-password").val()){
           $(this).css("borderColor","#fa4545").attr("red",true);
       }
        else{
           $(this).css("borderColor","#ddd").attr("red",false);
       }
    });
    $("[general='user-mail']").blur(function(){
       if(!isEmail( $(this).val() )){
           $(this).css("borderColor","#fa4545").attr("red",true);
       }
       else{
           $(this).css("borderColor","#ddd").attr("red",false);
       }
    });
};
MANAGE.user.user_add_close=function(){
    $("[general='manage-user-add']").css("left","-50px");
    $("#manage-right-content").css("left","150px");
    MANAGE.user.user_add_clear();
};
MANAGE.user.user_add_clear=function(){
    $("[general='manage-user-add'] input[type='text']").val("");
    $("[general='manage-user-add'] input[type='password']").val("");
    $("[general='manage-user-add'] input[type='radio']").iCheck("uncheck");
    $("[general='manage-user-add']>div>input").filter("[red='true']").css("borderColor","#ddd").attr("red","false");
    $("#manage-user-add input[type='radio']").first().iCheck("check");
    $("#user-edit input[type='radio']").first().iCheck("check");
};

MANAGE.user.add_new=function(){
    var name=$("#new-user-name").val();
    var group=$("#manage-left-menu li.active").find("a").text();
    var mail=$("#new-user-mail").val();
    var password=$("#new-user-password").val();
    var password_confirm=$("#new-user-password-confirm").val();
    var role=$("input[name='user-role']:checked").attr("value");
    var authority=$("input[name='user-role']:checked").data("name");
    if(name.length>0&&mail.length>0&&password.length>0&&password_confirm.length>0){
       if($("#manage-user-add>div>input").filter("[red='true']").length==0){
           $("#manage-sort-list").prepend($("<li />").attr("id","21")
               .append($("<p />").addClass("sort-handle").text(":"))
               .append($("<input type='checkbox'/>"))
               .append($("<table />").addClass("group")
                   .append($("<tr />")
                       .append($("<td />").text(name).addClass("user-manage-name"))
                       .append($("<td />").text(authority).addClass("user-manage-authority").attr("value","400"))
                   )
                   .append($("<tr />")
                       .append($("<td />").text(mail).addClass("user-manage-mail"))
                       .append($("<td />").text("Authority"))
                   )
               )
           );
           $("#manage-sort-list input[type='checkbox']").iCheck({
               checkboxClass: 'icheckbox_minimal-aero'
           });
           $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
               if(!$(this).parent().hasClass("checked")){
                   MANAGE.totalChecked+=1;
                   total_check_listener();
               }
               else{
                   MANAGE.totalChecked-=1;
                   total_check_listener();
               }
           });
           $("#manage-sort-list li").on("resize",function(){
               MANAGE.resize_sort_table()
           });
           MANAGE.judge_kpi_count();
           MANAGE.sort_init();
           MANAGE.resize_sort_table();
           MANAGE.user.icheck.init();
           MANAGE.user.user_add_close();
       }
       else{
           MessageBox("Please fix the input with red border","top","danger");
       }
    }
    else{
        MessageBox("Please fill all the blanket taking *","top","warning");
    }
};
//////////////////////////////////////////////////////////////////////////         User 编辑那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.user_edit_box_bind=function(){
    var $target=$("#manage-sort-list .icheckbox_minimal-aero.checked"),
        name=$target.next().find(".user-manage-name").text(),
        mail=$target.next().find(".user-manage-mail").text(),
        authority=$target.next().find(".user-manage-authority").attr("value");
    $("#user-edit #edit-user-name").val(name);
    $("#user-edit #edit-user-mail").val(mail);
    $("#user-edit input[type='radio'][value='"+authority+"']").iCheck("check");
    $("#manage-user-edit-old").attr("effect_on",$target.parent().attr("id"));
}
//////////////////////////////////////////////////////////////////////////         User assign kpi
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.assign={};
MANAGE.user.assign.init=function(){

};
MANAGE.user.assign.close=function(){

}
