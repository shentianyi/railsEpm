define(["jquery","base"],function($,Base){
    function edit(url,type){
        this.url=url;
        this.edit_show=function(name){
            $("#manage-edit-target").blur().css("display","none");
            $("#manage-btn-group>input").val(name).css("display","inline-block").focus();
        };
        this.edit_check=function(e){
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
                            Base.MessageBox(I18n.t('fix.cannot_repeat'),"top","warning");
                            return false;
                        }
                    });
                    return validate;
                }
            }
            else{
                Base.MessageBox(I18n.t('fix.not_empty'),"top","warning");
                return false;
            }
        };
        this.edit_update=function(){
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
                        $("#manage-left-menu li.active>a").text(name);
                        $("#manage-left-menu li.active").attr("title",name);
                        $("#manage-edit-target").text(name);
                        if(type==="kpis"){
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
        };
        this.edit_hide=function(){
            $("#manage-edit-target").css("display","inline-block");
            $("#manage-btn-group>input").css("display","none");
        }
    }
    return edit
})