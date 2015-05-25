define(["jquery","base"],function($,Base){
    function add_kpi_property(e){
        if(e.keyCode != undefined && e.keyCode != 13){
            return;
        }
        var kpi_id = $(this).attr("work_at");
        var property_name = $(this).parent().children("input").val().replace(/^\s+|\s+$/g, "");
        if(property_name.length == 0){
            Base.MessageBox(I18n.t('manage.kpi.dimensions-not-null'),"top","warning");
        }else{
            $.ajax({
                url:"/kpis/assign_properties",
                data:{kpi_property_name:property_name,id:kpi_id},
                dataType:"json",
                type:"POST",
                success:function(data){
                    if(data.result){
                        $("#edit-attribute-block-add").parent().children("input").val("");
                        //$('<li><label>'+data.content.name+'</label><i class="icon icon-trash" attr-id='+data.content.id+'></i></li>').appendTo($("#kpi-properties"));
                        $('<li/>').append($('<label/>').text(data.content.name)).append($('<i/>').addClass("icon icon-trash remove-attr").attr('attr-id',data.content.id)).appendTo($("#kpi-properties"));
                        $('<span id='+data.content.id+'>'+data.content.name+'</span>').appendTo($("p[kpi_id="+kpi_id+"]"));
                        $("body").on("click",".remove-attr",MANAGE.kpi.delete_kpi_property);
                    }else{
                        Base.MessageBox(data.content,"top","warning");
                    }
                }
            });
        }
    }
    function delete_kpi_property(){
        var attr_id = $(this).attr("attr-id");
        $.ajax({
            url:"/kpis/remove_properties",
            data:{id:attr_id},
            type:"POST",
            dataType:"json",
            success:function(data){
                if(data.result){
                    $("i[attr-id="+attr_id+"]").parent().remove();
                    $("span#"+attr_id).remove();
                    //MessageBox("Delete property successfully!","top","success");
                }else{

                }
            }
        })
    }
    function edit_attribute_copen(obj){
        //append kpi_property
        var attrs = $(obj).parent().children("p").children();
        $("#kpi-properties").children().remove();
        for(var i = 0;i<attrs.length;i++){
            var id = $(attrs[i]).attr("id");
            var name = $(attrs[i]).text();
            $('<li><label>'+name+'</label><i class="icon icon-trash remove-attr" attr-id='+id+'></i></li>').appendTo($("#kpi-properties"));
        }
        $("#edit-attribute-block-add").attr("work_at",$(obj).attr("work_at"));
        $("#add-kpi-property").attr("work_at",$(obj).attr("work_at"));
        $("#add-kpi-property").val("");
        //
        $("#edit-attribute-block").css("display","block");
        $("#edit-attribute-block>div").css("display","block");
    }
    function edit_attribute_close(){
        $("#edit-attribute-block").css("display","none");
        $("#edit-attribute-block>div").css("display","none");
    }
    function autoLabel(){
        $("body")
            .on("click","#auto-form-label",function(){
                $(this).find("input").focus();
            })
            .on("keyup","#auto-form-label input",function(event){
                var e=Base.adapt_event(event).event;
                var text= $.trim($(this).val());
                if(e.keyCode==13 && text.length>0){
                    $(this).parents("li").before(
                        $("<li />")
                            .append($("<span />").text(text))
                            .append($("<i />").addClass("icon icon-remove"))
                    );
                    $(this).val("");
                }
            })
            .on("click","#auto-form-label i",function(){
                $(this).parents("li").remove();
            })
    }

    $("body")
        //每一个KPI上点击编辑属性出来的
        .on("click",".edit-kpi-attribute",function(){
            edit_attribute_copen(this);
            //$("#edit-attribute-block").css("display","block");
            //$("#edit-attribute-block>div").css("display","block");
        })
        .on("click","#edit-attribute-block-remove",function(){
            edit_attribute_close();
        })
        .on("click","#edit-attribute-block-cancel",function(){
            edit_attribute_close();
        })
        .on("click","#edit-attribute-block-add",add_kpi_property)
        .on("keydown","#add-kpi-property",add_kpi_property)
        .on("click",".remove-attr",delete_kpi_property)
    autoLabel();
})