var MANAGE= MANAGE || {};
MANAGE.manage_menu_left_delete=function(){};
MANAGE.manage_menu_left_edit=function(){};
MANAGE.manage_menu_left_add=function(){};
MANAGE.category=MANAGE.category || {};
MANAGE.group=MANAGE.group || {};
MANAGE.entity=MANAGE.entity || {};
MANAGE.entity_groups=MANAGE.entity_groups || {};
MANAGE.dashboard=MANAGE.dashboard || {};
MANAGE.left={};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////    add
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.manage_menu_left_add.prototype={
      add_show:function(){
          $("#manage-left-menu li:nth-of-type(2) span").css("left","-999em");
          $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","8px").attr("placeholder",this.name).focus();
      },
      add_complete:function(){
          var validate=false;
          var name=$("#manage-menu-add input").val();
          if($.trim(name).length==0){
              MANAGE.manage_menu_left_add.prototype.add_hide();
          }
          else{
              $("#manage-left-menu li").each(function(){
                  if($("#manage-menu-add input").val()!=$(this).attr("title") ){
                      validate=true;
                  }
                  else{
                      validate=false;
                      return false
                  }
              });
              if(validate){
                  var href=this.href;
                  $.post(this.postHref, {
                      data : {
                          name : name
                      }
                  }, function(data) {
                      if(data.result) {
                          $("#manage-menu-add input").val("");
                          MANAGE.manage_menu_left_add.prototype.add_hide();
                          MANAGE.left_count++;
                          if(MANAGE.type=="category"){
                                 $("#manage-left-menu").append($("<li />").attr("title",name).attr("number", data.object)
                              .append($("<i />").addClass("icon-trash icon-item")).append($("<a/>").text(name)));
                              $("#new-kpi-category").append($("<option />").attr("value",data.object).text(name));
                              $("#new-kpi-category").val('').trigger('chosen:updated');
                          }else{
                                 $("#manage-left-menu").append($("<li />").attr("title",name).attr("number", data.object)
                              .append($("<i />").addClass("icon-trash icon-item")).append($("<a href='"+href + data.object + "'/>").text(name)));
                          }
                      } else {
                          MessageBox(data.content,"top","warning");
                      }
                  });
              }
              else{
                      MessageBox(I18n.t('fix.cannot_repeat'),"top","warning");
              }
          }
      },
      add_hide:function(){
          $("#manage-left-menu li:nth-of-type(2) span").css("left","0px");
          $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","-999em");
      },
      constructor:MANAGE.manage_menu_left_add

}

function category_add(){
    this.name="category";
    this.href="/kpis/";
    this.postHref='/kpi_categories';
}
category_add.prototype=MANAGE.manage_menu_left_add.prototype;
category_add.prototype.constructor=category_add;
function group_add(){
    this.name="部门";
    this.href="/users/index/";
    this.postHref='/entities';
}
group_add.prototype=MANAGE.manage_menu_left_add.prototype;
group_add.prototype.constructor=group_add;
function entity_add(){
    this.name="view";
    this.href="/entity_groups/index/";
    this.postHref='/entity_groups';
}
entity_add.prototype=MANAGE.manage_menu_left_add.prototype;
entity_add.prototype.constructor=entity_add;
function dashboard_add(){
    this.name="dashboard";
    this.href="/dashboards?p=";
    this.postHref='/dashboards';
}
dashboard_add.prototype=MANAGE.manage_menu_left_add.prototype;
dashboard_add.prototype.constructor=dashboard_add;
//22014.2
function entity_groups_add(){
    this.name="entity_groups";
    this.href="/entity_groups/index/";
    this.postHref='/entity_groups';
}
entity_groups_add.prototype=MANAGE.manage_menu_left_add.prototype;
entity_groups_add.prototype.constructor=entity_groups_add;

MANAGE.category.add=new category_add();
MANAGE.group.add=new group_add();
MANAGE.entity.add=new entity_add();
MANAGE.dashboard.add=new dashboard_add();
MANAGE.entity_groups.add=new entity_groups_add();

MANAGE.left.manage_left_add_init=function(){
    $("#manage-menu-add").on("click",function(){
        MANAGE[MANAGE.type].add.add_show();
    });
    $("#manage-menu-add input").on("keydown",function(event){
        if(adapt_event(event).event.keyCode==13){
            if($.trim($(adapt_event(event).target).val())==0){
                MessageBox("it needs a name","top","warning");
            }
            else{
                MANAGE[MANAGE.type].add.add_complete();
            }
        }
        else if(adapt_event(event).event.keyCode==27){
            MANAGE[MANAGE.type].add.add_complete();
        }
    });
    $("#manage-menu-add input").blur(function(){
        MANAGE[MANAGE.type].add.add_complete();
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////    delete
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.manage_menu_left_delete.prototype={
    delete_complete:function(e){
        var number = $(e.target).parent().attr("number");
        var local=this.local;
        $.ajax({
            url : this.url+number,
            type : 'DELETE',
            success : function(data) {
              if(data.result){
                  if(MANAGE.type=="category"){
                      $("#new-kpi-category option").each(function(){
                          if($(this).attr('value')==number){
                              $(this).remove();
                              return false;
                          }
                      })
                      $("#new-kpi-category").val('').trigger('chosen:updated');
                  }
                   window.location.href = local;
                   MANAGE.left_count--;
              }
              else{
                   MessageBox(data.content,"top","warning");
              }
            }
        });
    },
    constructor:MANAGE.manage_menu_left_delete
}


function category_delete(){
    this.url="/kpi_categories/";
    this.local="/kpis";
    this.name="category";
}
category_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
category_delete.prototype.constructor=category_delete;
function group_delete(){
    this.url="/entities/";
    this.local="/users";
    this.name="group";
}
group_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
group_delete.prototype.constructor=group_delete;
function entity_delete(){
    this.url="/entity_groups/";
    this.local= "/entity_groups/";
    this.name="entity";
}
entity_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
entity_delete.prototype.constructor=entity_delete;
function dashboard_delete(){
    this.url="/dashboards/";
    this.local= "/dashboards";
    this.name="dashboard";
}
dashboard_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
dashboard_delete.prototype.constructor=dashboard_delete;

//2014.2
function entity_groups_delete(){
    this.url="/entity_groups/";
    this.local= "/entity_groups";
    this.name="entity_groups";
}
entity_groups_delete.prototype=MANAGE.manage_menu_left_delete.prototype;
entity_groups_delete.prototype.constructor=entity_groups_delete;

MANAGE.category.delete=new category_delete();
MANAGE.group.delete=new group_delete();
MANAGE.entity.delete=new entity_delete();
MANAGE.dashboard.delete=new dashboard_delete();
MANAGE.entity_groups.delete=new entity_groups_delete();

MANAGE.left.manage_left_delete_init=function(){
    $("#manage-left-menu").on("click","i.icon-trash",function(event){
        if(confirm(I18n.t('manage.base.delete_confirm'))){
            var e = adapt_event(event).event;
            MANAGE[MANAGE.type].delete.delete_complete(e);
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////    edit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.manage_menu_left_edit.prototype={
    edit_show:function(name){
        $("#manage-edit-target").blur().css("display","none");
        $("#manage-btn-group>input").val(name).css("display","inline-block").focus();
    },
    edit_check:function(e){
        if($.trim($(e.target).val()).length>0){
            var validate=true;
            if($(e.target).val()==$("#manage-left-menu li.active>a").text()){
                  this.edit_hide();
                  return false;
            }
            else{
                $("#manage-left-menu li>a").each(function(){
                    if($(this).text()==$(e.target).val()){
                        validate=false;
                        MessageBox(I18n.t('fix.cannot_repeat'),"top","warning");
                        return false;
                    }
                });
                return validate;
            }
        }
        else{
            MessageBox(I18n.t('fix.not_empty'),"top","warning");
            return false;
        }
    },
    edit_update:function(){
        var id=$("#manage-left-menu li.active").attr("number");
        var name=$("#manage-btn-group>input").val();
            $("#manage-edit-target").text(name);
            $.ajax({
                url : this.url,
                type : 'PUT',
                data : {
                    id:id,
                    data:{
                        name:name
                    }
                },
                async:false,
                success : function(data) {
                    if(data){
                        alert(data)    ;
                        $("#manage-left-menu li.active>a").text(name);
                        $("#manage-left-menu li.active").attr("title",name);
                        $("#manage-edit-target").text(name);
                        if(MANAGE.type=="category"){
                            $("#new-kpi-category option").each(function(){
                                if($(this).attr('value')==id){
                                    $(this).text(name);
                                    return false;
                                }
                            });
                            $("#new-kpi-category").val('').trigger('chosen:updated');
                        }
                    }
                }
            });
            this.edit_hide();

    },
    edit_hide:function(){
        $("#manage-edit-target").css("display","inline-block");
        $("#manage-btn-group>input").css("display","none");
    },
    constructor:MANAGE.manage_menu_left_edit
}


function category_edit(){
    this.url = "/kpi_categories";
}
category_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
category_edit.prototype.constructor=category_edit;
function group_edit(){
    this.url = "/entities";
}
group_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
group_edit.prototype.constructor=group_edit;
function entity_edit(){
    this.url = "/entity_groups";
}
entity_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
entity_edit.prototype.constructor=entity_edit;
function dashboard_edit(){
    this.url = "/dashboard";
}
dashboard_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
dashboard_edit.prototype.constructor=dashboard_edit;

function entity_groups_edit(){
    this.url = "/entity_groups";
}
entity_groups_edit.prototype=MANAGE.manage_menu_left_edit.prototype;
entity_groups_edit.prototype.constructor=entity_groups_edit;


MANAGE.category.edit=new category_edit();
MANAGE.group.edit=new group_edit();
MANAGE.entity.edit=new entity_edit();
MANAGE.dashboard.edit=new dashboard_edit();
MANAGE.entity_groups.edit=new entity_groups_edit();

MANAGE.left.manage_left_edit_init=function(){
    $("#manage-edit-target")
        .text($("#manage-left-menu li.active").find("a").text())
        .on("click",function(){
            var name= $.trim($(this).text());
            MANAGE[MANAGE.type].edit.edit_show(name);
    });
    $("#manage-btn-group").on("keyup","input",function(event){
        var e=adapt_event(event).event;
        if(e.keyCode==13){

            if($.trim($(e.target).val())==0){
                MessageBox("give it a name","top","warning");
            }
            else{
                $(this).blur();
//                if(MANAGE[MANAGE.type].edit.edit_check(e)){
//
//                    MANAGE[MANAGE.type].edit.edit_update();
//                }
            }
        }
        else if(e.keyCode==27){
            if(MANAGE[MANAGE.type].edit.edit_check(e)){
                MANAGE[MANAGE.type].edit.edit_update()
            }
        }
    });
    $("#manage-btn-group>input").blur(function(event){
        var e=adapt_event(event).event;
        if(MANAGE[MANAGE.type].edit.edit_check(e)){
                MANAGE[MANAGE.type].edit.edit_update();
        }
    });
}


