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
         $("#manage-right-content").css("padding-left","200px");
    });
    $("#close-add-entity").on("click",function(){
        $("#manage-entity-add").css("left","-200px");
        $("#manage-right-content").css("padding-left","0px");
    });
    $("#manage-entity-add").height($(document).height()-$("header").height()-$("#left-content-title").height()-1);
    $("body").resize(function(){
        $("#manage-entity-add").height($(document).height()-$("header").height()-$("#left-content-title").height()-1);
    });
    $("body").on("click","#manage-entity-add ul h3",function(){
        var id=$(this).attr("id"),
            text=$(this).text(),
            validate=true;
        $("#assign-entity-wrap li>h3").each(function(){
             if($(this).attr("entity_id")==id){
                 validate=false;
                 return false
             }
        });
        if(validate){
           $.ajax({
              url:"/entity_group_items",
              data:{
                  data:{
                      entity_group_id:$("#entity_group_id").val(),
                      entity_id:id
                  }
              },
              dataType:'json',
              type:'post',
              success:function(data){
                  if(data.result){
                      $("#assign-entity-wrap>ul").append($("<li />")
                          .append($("<h3 />").text(text))
                          .append($("<i />").addClass("icon-trash").attr("entity_id",data.object))
                      );
                  }
                  else{
                      MessageBox(data.content,"top","warning");
                  }
              }
           });
        }
        else{
            MessageBox("Same User Group has already been assigned","top","warning");
        }
    });
    $("body").on("click","#assign-entity-wrap li>i",function(){
        var id=$(this).attr("entity_id"),
     
            $this=$(this); 
        if(confirm("Unassign this user group ?")){
            $.ajax({
                url:'../entity_group_items/'+id,
                type: 'DELETE',
                success:function(data){
                    if(data.result){
                        $this.parent().remove();
                    }else{
                        MessageBox(data.content,"top","warning");
                    }
                }
            });
            //$(this).parent().remove();
        }
    });
};