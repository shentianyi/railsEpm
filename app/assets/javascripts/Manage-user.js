/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-23
 * Time: 下午8:10
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {};
MANAGE.user={};
//////////////////////////////////////////////////////////////////////////  User init
//////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.init=function(){
    MANAGE.user.user_add_box_bind();
    MANAGE.user.user_add_clear();
    $("body").on("click","#add-user-show",function(){
        $("#manage-user-add").css("left","150px");
        $("#manage-right-content").css("left","350px");
    });
    $("input[type='radio']").iCheck({
        radioClass: 'iradio_minimal-aero'
    });
}

//////////////////////////////////////////////////////////////////////////  User添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.user.user_add_box_bind=function(){
    $("body").on("click","#close-add-user",function(){
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
    $("#new-user-mail").blur(function(){
       if(!isEmail( $(this).val() )){
           $(this).css("borderColor","#fa4545").attr("red",true);
       }
       else{
           $(this).css("borderColor","#ddd").attr("red",false);
       }
    });
};
MANAGE.user.user_add_close=function(){
    $("#manage-user-add").css("left","-50px");
    $("#manage-right-content").css("left","150px");
    MANAGE.user.user_add_clear();
};
MANAGE.user.user_add_clear=function(){
    $("#manage-user-add input[type='text']").val("");
    $("#manage-user-add input[type='radio']").iCheck("uncheck");
    $("#manage-user-add input[type='radio']").first().iCheck("check");
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
               .append($("<table />").addClass("category")
                   .append($("<tr />")
                       .append($("<td />").text(name))
                       .append($("<td />").text(authority))
                   )
                   .append($("<tr />")
                       .append($("<td />").text(mail))
                       .append($("<td />").text("Authority"))
                   )
               )
           );
           MANAGE.judge_kpi_count();
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
           MANAGE.sort_init();
           MANAGE.resize_sort_table();
           $("#manage-sort-list li").on("resize",function(){
               MANAGE.resize_sort_table()
           });
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
