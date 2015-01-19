define(["jquery","./share","../../manage/manage_right_list","base"],function($,Share,Rightlist,Base){
    function add_clear(){
        $("#manage-entity-add input[type='text']").val("");
        $("#manage-entity-add textarea").val("");
    };

    $("body")
        .on("click", "#add-department", function() {
            $("#manage-entity-add").css("right", "261px");
            $("#manage-right-content").css("padding-right", "200px").css("padding-left", "0px");
            $("#left-content-title").css("margin-right", "201px");
            $("#user-edit").css("left", "-200px");
        })
        .on("click","#close-add-entity",function(){
            $("#manage-entity-add").css("right", "999em");
            $("#manage-right-content").css("padding-right", "0px");
            $("#left-content-title").css("margin-right", "0px");
            add_clear();
        })
        .on("click","#add-entity-new",function(){
            var name= $.trim($("#entity-name").val()),
                code= $.trim($("#entity-code").val()),
                description= $.trim($("#entity-description").val());
            if(name.length>0){
                $.ajax({
                    url: '/entities',
                    type: 'POST',
                    data: {
                        entity: {
                            name: name,
                            code: code,
                            description: description
                        }
                    },
                    success: function (data) {
                        if (data.result) {
                            $("#manage-sort-list").prepend(
                                "<li id='"+data.content+"'>"+
                                    "<p class='sort-handle'>:</p>"+
                                    "<input type='checkbox'/>"+
                                    "<table class='group'>"+
                                    "<tr>"+
                                    "<td class='entity-manage-name'>"+name+"</td>"+
                                    "<td class='entity-manage-code'>"+code+"</td>"+
                                    "<td class='entity-manage-users'>"+"0"+"</td>"+
                                    "<td class='entity-manage-description'>"+description+"</td>"+
                                    "</tr>"+
                                    "<tr>"+
                                    "<td>"+I18n.t('manage.department.desc.name')+"</td>"+
                                    "<td>"+I18n.t('manage.department.desc.code')+"</td>"+
                                    "<td>"+I18n.t('manage.department.desc.user_quantity')+"</td>"+
                                    "<td>"+I18n.t('manage.department.desc.description')+"</td>"+
                                    "</tr>"+
                                    "</table>"+
                                    "</li>"
                            );
                            Rightlist.refresh();
                            Share.icheck_init();
                            add_clear();
                        } else {
                            Base.MessageBox(data.content, "top", "warning");
                        }
                    }
                });
            }
            else{
                Base.MessageBox("请填写输入点名称","top","warning");
            }
        })
    ;
    $("#manage-entity-add").height($("#manage_two_column").height()).css({top:$("header").height()});
    $('body').on('resize',function() {
        $("#manage-entity-add").height($("#manage_two_column").height()).css({top:$("header").height()});
    });

})