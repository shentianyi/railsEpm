define(["jquery","./manage_left_menu_add","base"],function($,Add,Base){
    function add_init(name,href,postHref,type){
        var add_model=new Add(name,href,postHref,type);
        $("#manage-menu-add").on("click",function(){
            add_model.add_show();
        });
        $("#manage-menu-add input").on("keydown",function(event){
            if(Base.adapt_event(event).event.keyCode==13){
                if($.trim($(Base.adapt_event(event).target).val())==0){
                    Base.MessageBox(I18n.t('manage.base.not-empty'),"top","warning");
                }
                else{
                    add_model.add_complete();
                }
            }
            else if(Base.adapt_event(event).event.keyCode==27){
                add_model.add_hide();
            }
        });
        $("#manage-menu-add input").blur(function(){
            add_model.add_hide();
        });
    }
    return {
        init:function(option_add,type){
            add_init(option_add.name,option_add.href,option_add.postHref,type);
        }
    }
})