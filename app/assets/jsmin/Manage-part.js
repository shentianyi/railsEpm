function getEntities(id){$.ajax({url:"/departments/sub_entities",type:"GET",data:{id:id},dataType:"json",success:function(data){if(data.result){var childs=data.content.subents,id=data.content.id;TREE.addul($("li[entity_group="+id+"]"));for(var i=0;i<childs.length;i++)$('<li style="display:block" entities="'+childs[i].id+'"><p>'+childs[i].name+"</li>").appendTo($("li[entity_group="+id+"]>ul"))}}})}function getChild(id){$.ajax({url:"/departments/sub_departments",type:"GET",data:{id:id},dataType:"json",success:function(data){if(data.result){var childs=data.content.subdeps,id=data.content.id;TREE.addul($("li[entity_group="+id+"]"));for(var i=0;i<childs.length;i++)$('<li class="im-entities" entity_group="'+childs[i].id+'"><a><i class="icon-laptop"></i> '+childs[i].name+'</a><div class="add-block"><label class="add-block-part"><i class="icon-plus-sign"></i>'+I18n.t("manage.departments.desc.add-department")+'</label><label class="add-block-entity"><i class="icon-plus-sign"></i>'+I18n.t("manage.departments.desc.add-entity")+"</label></div></li>").appendTo($("li[entity_group="+id+"]>ul")).ready(function(){getChild(childs[i].id)})}}})}var TREE=TREE||{};TREE.current_entitygroup_id=-1,function(){$("body").on("click","#charge-man>li>i",function(event){stop_propagation(event);var user_id=$(this).parent().attr("user_id"),department_id=TREE.current_entitygroup_id;confirm(I18n.t("manage.departments.desc.delete-user"))&&$.ajax({url:"/departments/remove_user",type:"DELETE",dataType:"json",data:{user_id:user_id,department_id:department_id},success:function(data){data.result&&$("#part-info .users .inner ul.users li[user_id="+data.content+"]").remove()}})}),$("body").on("click","#tree .entity_root>a,#tree .im-entities>a",function(){var $this=$(this);$this.toggleClass("open"),$this.hasClass("open")?($this.next().css("display","block"),TREE.expand($this.parent()),TREE.shrink($this.parent()),$("[chosen=one]").click(),$this.attr("chosen","one"),getEntities($this.parent().attr("entity_group")),TREE.part_show(this)):($this.next().css("display","none"),$this.attr("chosen",""),TREE.destroyUserBlock(),TREE.remove_entities($this.parent()),TREE.destroyUser(),TREE.destroyEntity())}).on("dblclick","#part-info .basic dd",function(){var value=$(this).text();$(this).empty().append($("<input type='text' />").val(value)),$(this).find("input").focus()}).on("blur","#part-info .basic dd input",function(){{var value=$(this).val();$(this).parent().attr("post")}$.ajax({url:"departments/"+TREE.current_entitygroup_id,type:"PUT",data:{department:{name:value}},success:function(data){data.result&&(TREE.current_entityname=value,$("li[entity_group="+TREE.current_entitygroup_id+"]>a").text("").append("<i class='icon-laptop'></i>").append(TREE.current_entityname))}}),$(this).parent().empty().text(value)}).on("keyup","#part-info .basic dd input",function(event){var e=adapt_event(event).event;13==e.keyCode&&$(this).blur()}).on("click","#part-info .basic .inner a",function(){if(confirm(I18n.t("manage.departments.desc.del-department-confirm"))){var id=$(this).attr("entity-group");$.ajax({url:"/departments/"+id,type:"DELETE",success:function(data){if(data.result){var parent=$("li[entity_group="+id+"]").parent();$("li[entity_group="+id+"]").remove(),TREE.li_remove(parent)}else MessageBox(data.content,"top","warning")}})}}).on("click","#tree .entity_root>ul li p",function(){var id=$(this).parent().attr("entities"),target=$(this).parent();confirm(I18n.t("manage.departments.desc.delete-depart-confirm"))&&$.ajax({url:"/departments/remove_entity",data:{entity_id:id},dataType:"json",type:"POST",success:function(data){if(data.result){var parent=target.parent();target.remove(),TREE.li_remove(parent)}}})}).on("click","#tree .add-block .add-block-part",function(){var $this=$(this),x=$this.offset().left,y=$this.offset().top;TREE.getUserBlock(x,y),$("#user-block").find("input").focus()}).on("click","#user-block .add",function(){var department={};department.name=$("#user-block input").val(),parent=TREE.current_entitygroup_id,$.ajax({url:"/departments",type:"POST",data:{department:department,parent:parent},dataType:"json",success:function(data){if(data.result){TREE.destroyUserBlock();var entity_group=data.content;TREE.addul($("li[entity_group="+TREE.current_entitygroup_id+"]")),$('<li class="im-entities" entity_group="'+entity_group.id+'"><a><i class="icon-laptop"></i> '+entity_group.name+'</a><div class="add-block"><label class="add-block-part"><i class="icon-plus-sign"></i> 添加部门</label><label class="add-block-entity"><i class="icon-plus-sign"></i> 添加观察点</label></div></li>').appendTo($("li[entity_group='"+TREE.current_entitygroup_id+"']>ul"))}else MessageBox(data.content,"top","warning")}})}).on("click","#user-block .cancel",function(){TREE.destroyUserBlock()}).on("keyup","#user-block input",function(event){var e=adapt_event(event).event;13==e.keyCode?$("#user-block .add").click():27==e.keyCode&&$("#user-block .cancel").click()}).on("click","#tree .add-block .add-block-entity",function(){TREE.destroyUser(),TREE.getEntity(this)}).on("click","#add-entity>.icon-remove",function(){TREE.destroyEntity()}).on("click","#btn-add-user",function(){TREE.destroyEntity(),TREE.getUser()}).on("click","#add-user>.icon-remove",function(){TREE.destroyUser()}).on("click","#add-user .inner ul li",function(){var target=$(this),user_id=$(this).attr("user_id"),name=$(this).text(),id=TREE.current_entitygroup_id;$.ajax({url:"/departments/add_user",type:"POST",data:{id:id,user_id:user_id},dataType:"json",success:function(data){data.result&&(target.remove(),$("#part-info .users .inner ul.users").append("<li user_id="+user_id+">"+name+" <i class='icon icon-remove'></i></li>"))}})}).on("click","#add-entity .inner ul li",function(){var target=$(this),entity_id=target.attr("entity_id"),name=target.text(),id=TREE.current_entitygroup_id;$.ajax({url:"/departments/add_entity",data:{id:id,entity_id:entity_id},type:"POST",dataType:"json",success:function(data){data.result&&(target.remove(),TREE.addul($("li[entity_group="+id+"]")),$('<li style="display:block" entities="'+entity_id+'"><p>'+name+"</li>").appendTo($("li[entity_group="+id+"]>ul")))}})}),$(document).ready(function(){for(var roots=$("#hidden-entity li"),i=0;i<roots.length;i++)getChild(roots.eq(i).attr("entity"));TREE.part_show(".entity_root>a"),TREE.getInfoHeight(),TREE.getRightWidth()}),$(window).resize(function(){TREE.getInfoHeight(),TREE.getRightWidth()})}(),TREE.addul=function(target){target.has("ul").length<1&&target.append(target.hasClass("entity_root")?"<ul/>":target.attr("entity_group")==TREE.current_entitygroup_id?"<ul/>":"<ul style='display:none'/>")},TREE.getRightWidth=function(){var width=parseInt($(window).width());$("#part-graph").width(width-200)},TREE.part_show=function(object){var id=$(object).parent().attr("entity_group");$("#part-info .basic .inner a").attr("entity-group",id);var name=$(object).text();$.get("/departments/users",{id:id},function(data){if(data.result){var users=data.content;$("#part-info .users .inner ul.users li").remove();for(var i=0;i<users.length;i++)$("#part-info .users .inner ul.users").append("<li user_id="+users[i].id+">"+users[i].first_name+" <i class='icon icon-remove'></i></li>")}else MessageBox(data.content,"top","warning")}),$("#part-info .basic .name").text(name),TREE.current_entitygroup_id=id,TREE.current_entityname=name},TREE.remove_entities=function(target){target.children("ul").children("li[entities]").remove(),target.children("ul").children("li").length<1&&target.children("ul").remove()},TREE.part_hide=function(){},TREE.getInfoHeight=function(){var height=$(document).height()-$("header").height();$("#part-info").height(height),$("#add-entity").height(height),$("#add-user").height(height)},TREE.getUserBlock=function(x,y){$("#user-block").css("left",x-70+"px").css("top",y+"px")},TREE.destroyUserBlock=function(){$("#user-block").css("left","-999em").find("input").val("")},TREE.getEntity=function(){$.ajax({url:"/departments/valid_entities",data:{id:TREE.current_entitygroup_id},type:"GET",dataType:"json",success:function(data){if(data.result){$("#add-entity .inner ul li").remove();for(var entities=data.content,i=0;i<entities.length;i++)$("#add-entity .inner ul").append("<li entity_id="+entities[i].id+">"+entities[i].name+"</li>")}}}),$("#add-entity").css("left","0px")},TREE.destroyEntity=function(){$("#add-entity").css("left","-200px")},TREE.getUser=function(){$("#add-user").css("left","0px"),$.get("/departments/valid_users",{id:TREE.current_entitygroup_id},function(data){if(data.result){var users=data.content;$("#add-user .inner ul li").remove();for(var i=0;i<users.length;i++)$("#add-user .inner ul").append("<li user_id = "+users[i].id+">"+users[i].first_name+"</li>")}})},TREE.destroyUser=function(){$("#add-user").css("left","-200px")},TREE.li_remove=function(target){target.parent().children("ul").children("li").length<1&&target.parent().children("ul").remove()},TREE.expand=function(object){object.addClass("selected"),object.children("ul").css("display","block")},TREE.shrink=function(object){var sibs=object.siblings(".selected");sibs.length>0&&(sibs.removeClass("selected"),sibs.children("ul").css("display","none"))};