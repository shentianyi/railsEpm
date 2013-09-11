


var MANAGE= MANAGE || {};
MANAGE.manage_menu_left_delete=function(){};
MANAGE.manage_menu_left_edit=function(){};
MANAGE.manage_menu_left_add=function(){};
MANAGE.category=MANAGE.category || {};
MANAGE.group=MANAGE.group || {};
MANAGE.entity=MANAGE.entity || {};
MANAGE.type=$("#manage-left-menu").attr("type");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////    add
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.manage_menu_left_add.prototype={
      add_show:function(){
          $("#manage-left-menu li:nth-of-type(2) span").css("left","999em");
          $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","8px").attr("placeholder",this.name).focus();
      },
      add_complete:function(){
          var validate=false;
          var name=$("#manage-menu-add input").val();
          $("#manage-left-menu li").each(function(){
              if($("#manage-menu-add input").val()!=$(this).attr("title") && name.length>0){
                  validate=true;
              }
              else{
                  validate=false;
                  return false
              }
          });
          if(validate){
              $("#manage-left-menu").append($("<li />").attr("title",name)
                  .append($("<i />").addClass("icon-trash icon-item")).append($("<a />").text(name)));
              $("#manage-menu-add input").val("");
              this.add_hide();
//              var href=this.href;
//              $.post('../kpi_categories', {
//                  category : {
//                      name : name
//                  }
//              }, function(data) {
//                  if(data.result) {
//                      $("#manage-left-menu").append($("<li />").attr("title",name).attr("number", data.object)
//                        .append($("<i />").addClass("icon-trash icon-item")).append($("<a href='"+href + data.object + "'/>").text(name)));
//                      $("#manage-menu-add input").val("");
//                  } else {
//                      MessageBox(data.content,"top","warning");
//                      MANAGE.manage_menu_left_add.add_hide();
//                  }
//              });
          }
          else{
              if(name.length>0){
                  MessageBox("Same name exist yet","top","warning");
              }
          }
      },
      add_hide:function(){
          $("#manage-left-menu li:nth-of-type(2) span").css("left","0px");
          $("#manage-left-menu li:nth-of-type(2) input").val("").blur().css("left","-999em");
      },
      constructor:MANAGE.manage_menu_left_add

}

function category_add(){
    this.name="category";
    this.href="../kpis?p=";
}
category_add.prototype=MANAGE.manage_menu_left_add.prototype;
category_add.prototype.constructor=category_add;
function group_add(){
    this.name="group";
    this.href="../users?p=";
}
group_add.prototype=MANAGE.manage_menu_left_add.prototype;
group_add.prototype.constructor=group_add;
function entity_add(){
    this.name="entity";
    this.href="../entity_groups?p=";
}
entity_add.prototype=MANAGE.manage_menu_left_add.prototype;
entity_add.prototype.constructor=entity_add;



MANAGE.category.add=new category_add();
MANAGE.group.add=new group_add();
MANAGE.entity.add=new entity_add();

function  manage_left_add_init(){
    $("#manage-menu-add").on("click",function(){
        MANAGE[MANAGE.type].add.add_show();
    });
    $("#manage-menu-add input").on("keydown",function(event){
        if(adapt_event(event).event.keyCode==13){
            MANAGE[MANAGE.type].add.add_complete();
        }
        else if(adapt_event(event).event.keyCode==27){
            MANAGE[MANAGE.type].add.add_hide();
        }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////    delete
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.manage_menu_left_delete.prototype={
    delete_complete:function(e){
        $(e.target).parent().remove();
//        var number = $(e.target).parent().attr("number");
//        $.ajax({
//            url : this.url+number,
//            type : 'DELETE',
//            success : function(data) {
//              if(data.result){
//                   window.location.href = this.local;
//              }
//              else{
//                   MessageBox(data.content,"top","warning");
//              }
//            }
//        });
    },
    constructor:MANAGE.manage_menu_left_delete
}


function category_delete(){
    this.url="../kpi_categories/";
    this.local="../kpis";
    this.name="category";
}
category_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
category_delete.prototype.constructor=category_delete;
function group_delete(){
    this.url="../entities/";
    this.local="../users";
    this.name="group";
}
group_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
group_delete.prototype.constructor=group_delete;
function entity_delete(){
    this.url="../entity_groups/";
    this.local= "../entity_groups/";
    this.name="entity";
}
entity_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
entity_delete.prototype.constructor=entity_delete;


MANAGE.category.delete=new category_delete();
MANAGE.group.delete=new group_delete();
MANAGE.entity.delete=new entity_delete();

function  manage_left_delete_init(){
    $("#manage-left-menu").on("click","i.icon-trash",function(event){
        if(confirm("Confirm to delete  ?")){
            var e = adapt_event(event).event;
            MANAGE[MANAGE.type].delete.delete_complete(e);
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    edit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.manage_menu_left_edit.prototype={
    edit_show:function(name){
        $("#manage-edit-target").css("display","none");
        $("#manage-btn-group>input").val(name).css("display","inherit").focus();
    },
    edit_check:function(e){
        if($(e.target).val().length>0){
            var validate=true;
            if($(e.target).val()==$("#manage-left-menu li.active>a").text()){
                  this.edit_hide();
            }
            else{
                $("#manage-left-menu li>a").each(function(){
                    if($(this).text()==$(e.target).val()){
                        validate=false;
                        MessageBox("Same name exist yet","top","warning");
                        return false
                    }
                });
                return validate;
            }
        }
        else{
            return false;
        }
    },
    edit_update:function(){
        var id=$("#manage-left-menu li.active").attr("number");
        var name=$("#manage-btn-group>input").val();
        $("#manage-left-menu li.active>a").text(name);
        this.edit_hide();
        $("#manage-edit-target").text(name);
//        $.ajax({
//            url : this.url,
//            type : 'PUT',
//            data : {
//                id:id,
//                data:{
//                    name:name
//                }
//            },
//            success : function(data) {
//                if(data){
//                    $("#manage-left-menu li.active>a").text(name);
//                    this.edit_hide();
//                    $("#manage-edit-target").text(name);
//                }
//            }
//        });
    },
    edit_hide:function(){
        $("#manage-edit-target").css("display","inline-block");
        $("#manage-btn-group>input").blur().css("display","none");
    },
    constructor:MANAGE.manage_menu_left_edit
}


function category_edit(){
    this.url = "../kpi_categories";
}
category_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
category_edit.prototype.constructor=category_edit;
function group_edit(){
    this.url = "../entities";
}
group_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
group_edit.prototype.constructor=group_edit;
function entity_edit(){
    this.url = "../entity_groups";
}
entity_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
entity_edit.prototype.constructor=entity_edit;


MANAGE.category.edit=new category_edit();
MANAGE.group.edit=new group_edit();
MANAGE.entity.edit=new entity_edit();

function  manage_left_edit_init(){
    $("#manage-edit-target").on("click",function(){
        var name=$(this).text();
        MANAGE[MANAGE.type].edit.edit_show(name);
    });
    $("#manage-btn-group").on("keydown","input",function(event){
        var e=adapt_event(event).event;
        if(e.keyCode==13){
            if(MANAGE[MANAGE.type].edit.edit_check(e)){
                MANAGE[MANAGE.type].edit.edit_update()
            }
        }
        else if(e.keyCode==27){
            MANAGE[MANAGE.type].edit.edit_hide();
        }
    })
}


