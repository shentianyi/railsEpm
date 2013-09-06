var manage= manage || {};
manage.manage_menu_left_delete=function(){};
manage.manage_menu_left_edit=function(){};
manage.manage_menu_left_add=function(){};
manage.category={}

manage.manage_menu_left_add.prototype={
      add_show:function(){
          $("#manage-left-menu li:nth-of-type(2) span").css("left","999em");
          $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","8px").attr("placeholder",this.name).focus();
      },
      add_complete:function(){
          $("#manage-left-menu li").each(function(){
              if($("#manage-menu-add input").val()!=$(this).attr("title") && $("#manage-menu-add input").val().length>0){
                      alert("das");
                  return false
              }
          })
      },
      add_hide:function(){
          $("#manage-left-menu li:nth-of-type(2) span").css("left","0px");
          $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","-999em").blur();
      }

}
manage.manage_menu_left_add.prototype.constructor=manage.manage_menu_left_add;






function category_add(){
    this.name="category"
}
category_add.prototype=manage.manage_menu_left_add.prototype;
category_add.prototype.constructor=category_add;

manage.category.add=new category_add();











$("#manage-menu-add").on("click",function(){
    var type=$(this).attr("type");
    manage[type].add.add_show();
});
$("#manage-menu-add input").on("keydown",function(event){
    var type=$("#manage-menu-add").attr("type");
    if(adapt_event(event).event.keyCode==13){
        manage[type].add.add_complete();
    }
    else if(adapt_event(event).event.keyCode==27){
        manage[type].add.add_hide();
    }
})
