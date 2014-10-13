define(["jquery","./manage_left_menu_add","./manage_left_menu_edit","./manage_left_menu_delete","base"],function($,Add,Edit,Delete,Base){
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
    function edit_init(url){
        var edit_model=new Edit(url);
        $("#manage-edit-target")
            .text($("#manage-left-menu li.active").find("a").text())
            .on("click",function(){
                var name= $.trim($(this).text());
                edit_model.edit_show(name);
            });
        $("#manage-btn-group").on("keyup","input",function(event){
            var e=Base.adapt_event(event).event;
            if(e.keyCode==13){
                if($.trim($(e.target).val())==0){
                    Base.MessageBox("give it a name","top","warning");
                }
                else{
                    $(this).blur();
                }
            }
            else if(e.keyCode==27){
                if(edit_model.edit_check(e)){
                    edit_model.edit_update()
                }
            }
        });
        $("#manage-btn-group>input").blur(function(event){
            var e=Base.adapt_event(event).event;
            if(edit_model.edit_check(e)){
                edit_model.edit_update();
            }
        });
    }
    function delete_init(url,local,name,type){
        var delete_model=new Delete(url,local,name,type);
        $("#manage-left-menu").on("click","i.icon-trash",function(event){
            Base.stop_propagation(event);
            if(confirm(I18n.t('manage.base.delete_confirm'))){
                var e = Base.adapt_event(event).event;
                delete_model.delete_complete(e);
            }
        });
    }
    return {
        init:function(option_add,option_edit,option_delete,type){
            add_init(option_add.name,option_add.href,option_add.postHref,type);
            edit_init(option_edit.url,type);
            delete_init(option_delete.url,option_delete.local,option_delete.name,type);
        }
    }
})