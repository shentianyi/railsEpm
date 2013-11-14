/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-10-29
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */
var right_nav_main=right_nav_main||{};
right_nav_main.init=function(){
    right_nav_main.initial.name();
    right_nav_main.item_prototype.add_init();
    right_nav_main.item_prototype.delete_init();
    right_nav_main.item_prototype.edit_init();
    right_nav_main.observe_count.count=$("#content-right-nav-group").children().length;
    right_nav_main.current_section=$("#content-right-nav").attr("name");
    right_nav_main.observe_count.observe();
};

right_nav_main.item_prototype={};
right_nav_main.observe_count={
    observe:function(){
        if(this.count==0){
//            $("#current-group-item").text("choose a dashboard in right");
//            $("#left-content-title>i").css("display","none");
            $("#left-content-title").css("display","none");
            $("#dashboard-content").css("display","none");
        }
        else{
            $("#left-content-title").css("display","block");
            $("#dashboard-content").css("display","block");
//            $("#left-content-title>p,#left-content-title>i").css("display","inline-block");
        }
    }
};
right_nav_main.dashboard={};
//////////////////////////////////////////////////initial
right_nav_main.initial={}
right_nav_main.initial.name=function(){
    var name=$("#content-right-nav-group>li.active").find("a").text();
    $("#current-group-item").text(name);
    if(name.length==0){
//        $("#current-group-item").text("Please choose a dashboard in DashBoard Group");
//        $("#left-content-title>i").css("display","none");
        $("#left-content-title").css("display","none");
        $("#dashboard-content").css("display","none");
    }
}
////////////////////////////////////////////////// add item
right_nav_main.item_prototype.add=function(){};
right_nav_main.item_prototype.add.prototype={
    add_show:function(){
        $("#content-right-nav-add-block").css("left","auto");
        $("#content-right-nav-add-block>input").focus();
    },
    add_complete:function(){
        var validate=false;
        var name=$("#content-right-nav-add-block>input").val();
        if($.trim(name).length==0){
            right_nav_main.item_prototype.add.prototype.add_hide();
        }
        else{
            if($("#content-right-nav-group>li").length>0){
                $("#content-right-nav-group>li").each(function(){
                    if(name!=$(this).attr("title") ){
                        validate=true;
                    }
                    else{
                        validate=false;
                        return false;
                    }
                });
            }
            else{
                validate=true;
            }
            if(validate){

//                  $("#content-right-nav-group").append($("<li />").attr("title",name)
//                      .append($("<a />").text(name))
//                      .append($("<i />").addClass("icon-remove"))
//                  );
//                  $("#content-right-nav-add-block>input").val("");
//                  right_nav_main.item_prototype.add.prototype.add_hide();
//                  right_nav_main.observe_count.count++;



                var href=this.href;
                $.post(this.postHref, {
                    data : {
                        name : name
                    }
                }, function(data) {
                    if(data.result) {
                        $("#content-right-nav-group").append($("<li />").attr("title",name).attr("number", data.object)
                            .append($("<a href='"+href + data.object + "'/>").text(name))
                            .append($("<i />").addClass("icon-remove"))
                        );
                        $("#content-right-nav-add-block>input").val("");
                        right_nav_main.item_prototype.add.prototype.add_hide();
                        right_nav_main.observe_count.count++;

                    } else {
                        MessageBox(data.content,"top","warning");
                    }
                });

            }
            else{
                MessageBox("Same name exist yet","top","warning");
            }


        }

    },
    add_hide:function(){
        $("#content-right-nav-add-block").css("left","-999em");
    },
    constructor:right_nav_main.item_prototype.add

}

function dashboard_add(){
    this.name="dashboard";
    this.href="../dashboards?p=";
    this.postHref='../dashboards';
}
dashboard_add.prototype=right_nav_main.item_prototype.add.prototype;
dashboard_add.prototype.constructor=dashboard_add;
right_nav_main.dashboard.add=new dashboard_add();


right_nav_main.item_prototype.add_init=function(){
    $("#content-right-nav-add-button").on("click",function(){
        right_nav_main[right_nav_main.current_section].add.add_show();
    });
    $("#content-right-nav-add-block>input").on("keydown",function(event){
        if(adapt_event(event).event.keyCode==13){
            if($.trim($(adapt_event(event).target).val())==0){
                MessageBox("it needs a name","top","warning");
            }
            else{
                right_nav_main[right_nav_main.current_section].add.add_complete();
            }
        }
        else if(adapt_event(event).event.keyCode==27){
            right_nav_main[right_nav_main.current_section].add.add_hide();
        }
    }).on("blur",function(){
            right_nav_main[right_nav_main.current_section].add.add_hide();
    });

};
////////////////////////////////////////////////// remove item
right_nav_main.item_prototype.delete=function(){};
right_nav_main.item_prototype.delete.prototype={
    delete_complete:function(e){

//        $(e.target).parent().remove();
//        right_nav_main.observe_count.count--;



        var number = $(e.target).parent().attr("number");
        var local=this.local
        $.ajax({
            url : this.url+number,
            type : 'DELETE',
            success : function(data) {
                if(data.result){
                    window.location.href = local;
                    right_nav_main.observe_count.count--;

                }
                else{
                    MessageBox(data.content,"top","warning");
                }
            }
        });


    },
    constructor:right_nav_main.item_prototype.delete
}

function dashboard_delete(){
    this.url="../dashboards/";
    this.local= "../dashboards";
    this.name="dashboard";
}
dashboard_delete.prototype=right_nav_main.item_prototype.delete.prototype;
dashboard_delete.prototype.constructor=dashboard_delete;

right_nav_main.dashboard.delete=new dashboard_delete();

right_nav_main.item_prototype.delete_init=function(){
    $("#content-right-nav-group").on("click","i.icon-remove",function(event){
        if(confirm(I18n.t('view.manage.base.delete_confirm'))){
            var e = adapt_event(event).event;
            right_nav_main[right_nav_main.current_section].delete.delete_complete(e);
        }
    });
}
////////////////////////////////////////////////// edit item
right_nav_main.item_prototype.edit=function(){};
right_nav_main.item_prototype.edit.prototype={
    edit_show:function(e){
        var x= e.clientX-10,
            y= e.clientY-55,
            name=$("#left-content-title>p").text();
        $("#content-left-content-edit-block").css("left",x).css("top",y);
        $("#content-left-content-edit-block>input").val(name).focus();
    },
    edit_check:function(e){
            var validate=true;
            if($(e.target).val()==$("#content-right-nav-group>li.active").attr("title")){
                this.edit_hide();
                return false;
            }
            else{
                $("#content-right-nav-group>li").each(function(){
                    if($(this).attr("title")==$(e.target).val()){
                        validate=false;
                        MessageBox("Same name exist yet","top","warning");
                        return false;
                    }
                });
                return validate;
            }
    },
    edit_update:function(){
        var id=$("#content-right-nav-group>li.active").attr("number");
        var name=$("#content-left-content-edit-block>input").val();

//            $("#content-right-nav-group>li.active>a").text(name);
//            $("#content-right-nav-group>li.active").attr("title",name);
//            $("#current-group-item").text(name);
//            this.edit_hide();



        $.ajax({
            url : this.url,
            type : 'PUT',
            data : {
                id:id,
                data:{
                    name:name
                }
            },
            success : function(data) {
                if(data){
                    $("#content-right-nav-group>li.active>a").text(name);
                    $("#current-group-item").text(name);
                    $("#content-right-nav-group>li.active").attr("title",name);
                }
            }
        });
        this.edit_hide();

    },
    edit_hide:function(){
        $("#content-left-content-edit-block").css("left","-999em");
    },
    constructor:right_nav_main.item_prototype.edit
}

function dashboard_edit(){
    this.url = "../dashboards";
}
dashboard_edit.prototype=right_nav_main.item_prototype.edit.prototype;
dashboard_edit.prototype.constructor=dashboard_edit;


right_nav_main.dashboard.edit=new dashboard_edit();

right_nav_main.item_prototype.edit_init=function(){
    $("body").on("click","#current-group-item-edit",function(event){
        var e=adapt_event(event).event;
        right_nav_main[right_nav_main.current_section].edit.edit_show(e);
    });
    $("#content-left-content-edit-block").on("keydown","input",function(event){
        var e=adapt_event(event).event;
        if(e.keyCode==13){
            if($.trim($(e.target).val())==0){
                MessageBox("please don\'t leave it empty","top","warning");
            }
            else{
                if(right_nav_main[right_nav_main.current_section].edit.edit_check(e)){
                    right_nav_main[right_nav_main.current_section].edit.edit_update()
                }
            }
        }
        else if(e.keyCode==27){
            right_nav_main[right_nav_main.current_section].edit.edit_hide();
        }
    }).on("blur","input",function(){
            right_nav_main[right_nav_main.current_section].edit.edit_hide();
    });
    $("#content-left-content-edit-block").on("click","input",function(event){
            stop_propagation(event);
    })
}


