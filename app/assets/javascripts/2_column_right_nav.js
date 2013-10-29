/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-10-29
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */
var right_nav_main=right_nav_main||{};
right_nav_main.init=function(){
    right_nav_main.initial.height();
    right_nav_main.initial.width();
    right_nav_main.initial.name();
    right_nav_main.item.add_init();
};
right_nav_main.current_section=$("#content-right-nav").attr("name");
//////////////////////////////////////////////////initial
right_nav_main.initial={}
right_nav_main.initial.height=function(){
    $("#content-right-nav").attr("min-height", $("#content-right-nav").height());
    var min_height=$("#content-right-nav").attr("min-height"),
        height=$(window).height()-$('header').height()>min_height?$(window).height()-$('header').height()+'px':min_height+'px';
    $("#content-right-nav").css("height",height);
    $(window).resize(function(){
        height=$(window).height()-$('header').height()>min_height?$(window).height()-$('header').height()+'px':min_height+'px';
        $("#content-right-nav").height(height);
    });
};
right_nav_main.initial.width=function(){
    $("#left-content-title").width($(document).width()-$("#content-right-nav").width()-1);
    $("#current-group-item").css("max-width",$(document).width()-$("#content-right-nav").width()-1-120);
    var width;
    $(window).resize(function(){
        width=$(document).width()-$("#content-right-nav").width()-1;
        $("#left-content-title").width(width);
        $("#current-group-item").css("max-width",width-120);
    });
}
right_nav_main.initial.name=function(){
    var name=$("#content-right-nav-group>li.active").find("a").text();
    $("#current-group-item").text(name);
}
////////////////////////////////////////////////// add item
right_nav_main.item={};
right_nav_main.item.add=function(){};
right_nav_main.item.add.prototype={
    add_show:function(){
        $("#manage-left-menu li:nth-of-type(2) span").css("left","999em");
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


//                  $("#manage-left-menu").append($("<li />").attr("title",name)
//                      .append($("<i />").addClass("icon-trash icon-item")).append($("<a />").text(name)));
//                  $("#manage-menu-add input").val("");
//                  MANAGE.manage_menu_left_add.prototype.add_hide();
//                  MANAGE.left_count++;
//                  MANAGE.left_count_observable();



                var href=this.href;
                $.post(this.postHref, {
                    data : {
                        name : name
                    }
                }, function(data) {
                    if(data.result) {
                        $("#manage-left-menu").append($("<li />").attr("title",name).attr("number", data.object)
                            .append($("<i />").addClass("icon-trash icon-item")).append($("<a href='"+href + data.object + "'/>").text(name)));
                        $("#manage-menu-add input").val("");
                        MANAGE.manage_menu_left_add.prototype.add_hide();
                        MANAGE.left_count++;
                        MANAGE.left_count_observable();
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
        $("#manage-left-menu li:nth-of-type(2) span").css("left","0px");
        $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","-999em");
    },
    constructor:right_nav_main.item.add

}


function dashboard_add(){
    this.name="dashboard";
    this.href="../dashboards?p=";
    this.postHref='../dashboards';
}
dashboard_add.prototype=right_nav_main.item.add.prototype;
dashboard_add.prototype.constructor=dashboard_add;

MANAGE.dashboard.add=new dashboard_add();


right_nav_main.item.add_init=function(){
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



