define(["jquery","base","./manage_share_control"],function($,Base,Manage){
    function add(name,href,postHref,type){
        this.name=name;
        this.href=href;
        this.postHref=postHref;
        this.type=type;
        this.add_show=function(){
            $("#manage-left-menu li:nth-of-type(2) span").css("left","-999em");
            $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","8px").attr("placeholder",this.name).focus();
        };
        this.add_complete=function(){
            var validate=false;
            var name=$("#manage-menu-add input").val();
            if($.trim(name).length==0){
                this.add_hide();
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
                    var href=this.href,
                        postHref=this.postHref,
                        that=this;
                    $.post(postHref, {
                        data : {
                            name : name
                        }
                    }, function(data) {
                        if(data.result) {
                            $("#manage-menu-add input").val("");
                            that.add_hide();
                            Manage.left_count++;
                            if(this.type==="kpis"){
                                $("#manage-left-menu").append($("<li />").attr("title",name).attr("number", data.object)
                                    .append($("<i />").addClass("icon-trash icon-item")).append($("<a/>").text(name)));
                            }else{
                                $("#manage-left-menu").append($("<li />").attr("title",name).attr("number", data.object)
                                    .append($("<i />").addClass("icon-trash icon-item")).append($("<a href='"+href + data.object + "'/>").text(name)));
                            }
                        } else {
                            Base.MessageBox(data.content,"top","warning");
                        }
                    });
                }
                else{
                    Base.MessageBox(I18n.t('fix.cannot_repeat'),"top","warning");
                }
            }
        };
        this.add_hide=function(){
            $("#manage-left-menu li:nth-of-type(2) span").css("left","0px");
            $("#manage-left-menu li:nth-of-type(2) input").val("").css("left","-999em");
        }
    }
    return add
})