/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-25
 * Time: 下午4:04
 * To change this template use File | Settings | File Templates.
 */
var MANAGE=MANAGE || {};
MANAGE.view={};
MANAGE.view.init=function(){
    $("#entity-add-show").on("click",function(){
         $("#manage-entity-add").css("left","150px");
         $("#manage-right-content").css("left","350px");
    });
    $("#close-add-entity").on("click",function(){
        $("#manage-entity-add").css("left","-50px");
        $("#manage-right-content").css("left","150px");
    });
};