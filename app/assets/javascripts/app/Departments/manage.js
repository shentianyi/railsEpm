define(["jquery","base","./share"],function($,Base,Share){
    function expand(object){
        object.addClass("selected");
        object.children("ul").css("display","block");
    }
    function shrink (object){
        var sibs = object.siblings(".selected");
        if(sibs.length > 0)
        {
            sibs.removeClass("selected");
            sibs.children("ul").css("display","none");
        }
    }
    function getEntities(id) {
        $.ajax({
            url: '/departments/sub_entities',
            type: 'GET',
            data: {id: id},
            dataType: 'json',
            success: function (data) {
                //append a new entity to the entity group
                if (data.result) {
                    var childs = data.content.subents;
                    var id = data.content.id;
                    addul($("li[entity_group=" + id + "]"));
                    for (var i = 0; i < childs.length; i++) {
                        $('<li style="display:block" entities="' + childs[i].id + '"><p>' + childs[i].name + '</li>').appendTo($("li[entity_group=" + id + "]>ul"));
                    }
                }
            }
        });
    }
    function destroyUserBlock () {
        $("#user-block").css("left", "-999em")
            .find("input").val("");
    }
    function remove_entities (target) {
        target.children("ul").children("li[entities]").remove();
        if (target.children("ul").children("li").length < 1) {
            target.children("ul").remove();
        }
    }
    function destroyEntity() {
        $("#add-entity").css("left", "-200px");
    }
    function destroyUser () {
        $("#add-user").css("left", "-200px");
    }
    function li_remove (target) {
        if (target.parent().children("ul").children("li").length < 1) {
            target.parent().children("ul").remove();
        }
    }
    function getUserBlock (x, y) {
        $("#user-block").css("left", x - 70 + "px").css("top", y + "px");
    }
    function addul (target){
        if (target.has("ul").length < 1) {
            if(target.hasClass("entity_root")){
                target.append("<ul/>");
            }
            else{
                if(target.attr("entity_group") == Share.current_entitygroup_id)
                {
                    target.append("<ul/>");
                }
                else
                {
                    target.append("<ul style='display:none'/>");
                }

            }
        }
    }
    function getEntity() {
        $.ajax({
            url: "/departments/valid_entities",
            data: {id: Share.current_entitygroup_id},
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.result) {
                    $("#add-entity .inner ul li").remove();
                    var entities = data.content;
                    for (var i = 0; i < entities.length; i++) {
                        $("#add-entity .inner ul").append("<li entity_id=" + entities[i].id + ">" + entities[i].name + "</li>");
                    }
                } else {

                }
            }
        })
        $("#add-entity").css("left", "0px");
    }
    function getUser () {
        $("#add-user").css("left", "0px");
        $.get("/departments/valid_users", {id: Share.current_entitygroup_id}, function (data) {
            if (data.result) {
                var users = data.content;
                $("#add-user .inner ul li").remove();
                for (var i = 0; i < users.length; i++) {
                    $("#add-user .inner ul").append("<li user_id = " + users[i].id + ">" + users[i].first_name + "</li>");
                }
            } else {

            }
        });
    }
    function getChild(id) {
        $.ajax({
            url: '/departments/sub_departments',
            type: 'GET',
            data: {id: id},
            dataType: 'json',
            success: function (data) {
                if (data.result) {
                    var childs = data.content.subdeps;
                    var id = data.content.id;
                    addul($("li[entity_group=" + id + "]"));
                    for (var i = 0; i < childs.length; i++) {
                        $('<li class="im-entities" entity_group="' + childs[i].id + '"><a><i class="icon-laptop"></i> ' +
                            childs[i].name + '</a>' +
                            '<div class="add-block"><label class="add-block-part"><i class="icon-plus-sign"></i>' + I18n.t('manage.departments.desc.add-department') + '</label>' +
                            '<label class="add-block-entity"><i class="icon-plus-sign"></i>' + I18n.t('manage.departments.desc.add-entity') + '</label>' +
                            '</div>' +
                            '</li>').appendTo($("li[entity_group=" + id + "]>ul")).ready(function () {
                                getChild(childs[i].id);
                            });
                    }

                }
            }
        });
    }
    function part_show (object) {
        var option = {},
            id = $(object).parent().attr("entity_group");
        $("#part-info .basic .inner a").attr("entity-group", id);
        var name = $(object).text();
        $.get("/departments/users", {id: id}, function (data) {
            if (data.result) {
                var users = data.content;
                $("#part-info .users .inner ul.users li").remove();
                for (var i = 0; i < users.length; i++) {
                    $("#part-info .users .inner ul.users").append("<li user_id=" + users[i].id + ">" + users[i].first_name + " <i class='icon icon-remove'></i></li>");
                }
            }
            else {
                Base.MessageBox(data.content, "top", "warning");
            }
        })
        $("#part-info .basic .name").text(name);
        Share.current_entitygroup_id = id;
        Share.current_entityname = name;
    }

    $("body")
        //点击部门
        .on("click", "#tree .entity_root>a,#tree .im-entities>a", function () {
            var $this = $(this);
            $this.toggleClass("open");
            if ($this.hasClass("open")) {
                $this.next().css("display", "block");
                expand($this.parent());
                shrink($this.parent());
                $("[chosen=one]").click();
                $this.attr("chosen", "one");
                //get entity
                getEntities($this.parent().attr("entity_group"));
                part_show(this);
            }
            else {
                $this.next().css("display", "none");
                $this.attr("chosen", "");
                destroyUserBlock();
                remove_entities($this.parent());
                destroyUser();
                destroyEntity();
            }

        })
        //部门负责人删除
        .on("click","#charge-man>li>i",function(event){
            Base.stop_propagation(event);
            var user_id  = $(this).parent().attr("user_id");
            var department_id = TREE.current_entitygroup_id;
            if (confirm(I18n.t('manage.departments.desc.delete-user'))){
                $.ajax({
                    url:"/departments/remove_user",
                    type:"DELETE",
                    dataType:"json",
                    data:{user_id:user_id,department_id:department_id},
                    success:function(data){
                        if(data.result){
                            $("#part-info .users .inner ul.users li[user_id="+data.content+"]").remove();
                        }else{

                        }
                    }
                });
            }
        })
        .on("dblclick", "#part-info .basic dd", function () {
            var value = $.trim($(this).text());
            $(this).empty().append($("<input type='text' />").val(value).css("width","115px"));
            $(this).find("input").focus();
        })
        .on("click", "#part-info .basic dl i", function () {
            var $target=$(this).prevAll(".name");
            var value = $.trim($target.text());
            $target.empty().append($("<input type='text' />").val(value).css("width","115px"));
            $target.find("input").focus();
        })
        .on("blur", "#part-info .basic dd input", function () {
            var value = $(this).val(),
                post_name = $(this).parent().attr("post");

            $.ajax({
                url: "departments/" + TREE.current_entitygroup_id,
                type: "PUT",
                data: {department: {name: value}},
                success: function (data) {
                    if (data.result) {
                        Share.current_entityname = value;
                        $("li[entity_group=" + Share.current_entitygroup_id + "]>a").text("").append("<i class='icon-laptop'></i>").append(Share.current_entityname);
                    } else {
                    }
                }
            })
            $(this).parent().empty().text(value);
        })
        .on("keyup", "#part-info .basic dd input", function (event) {
            var e = Base.adapt_event(event).event;
            if (e.keyCode == 13) {
                $(this).blur();
            }
        })
        //删除部门
        .on("click", "#part-info .basic .inner a", function (event) {
            if(confirm(I18n.t('manage.departments.desc.del-department-confirm'))){
                var id = $(this).attr("entity-group");
                $.ajax({
                    url: "/departments/" + id,
                    type: "DELETE",
                    success: function (data) {
                        if (data.result) {
                            var parent = $("li[entity_group=" + id + "]").parent();
                            $("li[entity_group=" + id + "]").remove();
                            li_remove(parent);
                        } else {
                            Base.MessageBox(data.content, "top", "warning");
                        }
                    }
                });
            }
        })
        //点击输入点
        .on("click", "#tree .entity_root>ul li p", function () {
            var id = $(this).parent().attr("entities");
            var target = $(this).parent();
            if (confirm(I18n.t('manage.departments.desc.delete-depart-confirm'))) {
                $.ajax({
                    url: "/departments/remove_entity",
                    data: {entity_id: id},
                    dataType: "json",
                    type: "POST",
                    success: function (data) {
                        if (data.result) {
                            var parent = target.parent();
                            target.remove();
                            li_remove(parent);
                        }
                    }
                });
            }
        })
        //点击添加部门
        .on("click", "#tree .add-block .add-block-part", function (event) {
            var $this = $(this),
                x = $this.offset().left,
                y = $this.offset().top;
            getUserBlock(x, y);
            $("#user-block").find("input").focus();
        })
        //添加部门中确定添加
        .on("click", "#user-block .add", function () {
            var department = {
                    name:$("#user-block input").val()
                },
                parent = Share.current_entitygroup_id;
            $.ajax({
                url: "/departments",
                type: "POST",
                data: {department: department, parent: parent},
                dataType: "json",
                success: function (data) {
                    if (data.result) {
                        destroyUserBlock();
                        var entity_group = data.content;
                        addul($("li[entity_group=" + Share.current_entitygroup_id + "]"));

                        $('<li class="im-entities" entity_group="' + entity_group.id + '"><a><i class="icon-laptop"></i> ' +
                            entity_group.name + '</a>' +
                            '<div class="add-block"><label class="add-block-part"><i class="icon-plus-sign"></i>'+I18n.t('manage.departments.desc.add-department')+'</label>' +
                            '<label class="add-block-entity"><i class="icon-plus-sign"></i> '+I18n.t('manage.departments.desc.add-entity')+'</label>' +
                            '</div>' +
                            '</li>').appendTo($("li[entity_group='" + Share.current_entitygroup_id + "']>ul"));
                    } else {
                        Base.MessageBox(data.content, "top", "warning");
                    }
                }
            });
        })
        .on("click", "#user-block .cancel", function () {
            destroyUserBlock();
        })
        .on("keyup", "#user-block input", function (event) {
            var e = Base.adapt_event(event).event;
            if (e.keyCode == 13) {
                $("#user-block .add").click();
            }
            else if (e.keyCode == 27) {
                $("#user-block .cancel").click();
            }
        })
        //添加观察点
        .on("click", "#tree .add-block .add-block-entity", function () {
            destroyUser();
            getEntity(this);
        })
        .on("click", "#add-entity>.icon-remove", function () {
            destroyEntity();
        })
        //Add user
        .on("click", "#btn-add-user", function (event) {
            destroyEntity();
            getUser();
        })
        .on("click", "#add-user>.icon-remove", function () {
            destroyUser();
        })
        //Click User
        .on("click", "#add-user .inner ul li", function () {
            var target = $(this);
            var user_id = $(this).attr("user_id");
            var name = $(this).text();
            var id = Share.current_entitygroup_id;
            $.ajax({
                url: "/departments/add_user",
                type: "POST",
                data: {id: id, user_id: user_id},
                dataType: "json",
                success: function (data) {
                    if (data.result) {
                        target.remove();
                        $("#part-info .users .inner ul.users").append("<li user_id=" + user_id + ">" + name + " <i class='icon icon-remove'></i></li>");
                    } else {
                        Base.MessageBox(data.content,"top","warning")
                    }
                }
            });
        })
        .on("click", "#add-entity .inner ul li", function () {
            var target = $(this);
            var entity_id = target.attr("entity_id");
            var name = target.text();
            var id = Share.current_entitygroup_id;
            $.ajax({
                url: "/departments/add_entity",
                data: {id: id, entity_id: entity_id},
                type: "POST",
                dataType: "json",
                success: function (data) {
                    if (data.result) {
                        target.remove();
                        addul($("li[entity_group=" + id + "]"));
                        $('<li style="display:block" entities="' + entity_id + '"><p>' + name + '</li>').appendTo($("li[entity_group=" + id + "]>ul"));
                    }
                }
            });
        });

    var roots = $("#hidden-entity li");
    for (var i = 0; i < roots.length; i++) {
         getChild(roots.eq(i).attr("entity"));
    }
    part_show(".entity_root>a");

})